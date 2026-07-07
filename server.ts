import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Increase payload limit to support base64 uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Lazy initializer for Google Gen AI to prevent crashing if API key is not yet set
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('La chiave API di Gemini (GEMINI_API_KEY) non è configurata.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Check status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
  });
});

// 1. Generate / Continue a story in Italian
app.post('/api/gemini/generate-story', async (req: express.Request, res: express.Response) => {
  try {
    const { prompt, currentStory, ageGroup } = req.body;
    const ai = getAiClient();

    const systemPrompt = `Sei uno scrittore esperto di libri illustrati per bambini e ragazzi in lingua italiana.
Crea testi magici, poetici o avventurosi. Usa frasi brevi, un linguaggio evocativo e adatto alla fascia d'età: ${ageGroup || '4-8 anni'}.
Il tuo output deve essere in puro formato JSON con tre campi:
- 'title': Un titolo creativo se la storia è nuova.
- 'text': Il testo principale per la pagina corrente (circa 2-4 frasi, adatte ad essere illustrate).
- 'suggestions': Un array di 2 o 3 brevi frasi o idee per le pagine successive.`;

    const userPrompt = currentStory 
      ? `Continua la storia esistente. Ecco cosa è successo finora:\n"${currentStory}"\n\nDirettiva per la nuova pagina:\n"${prompt}"`
      : `Inizia una nuova storia basata su questa idea:\n"${prompt}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            text: { type: Type.STRING },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['text', 'suggestions']
        }
      }
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error('Errore durante la generazione della storia:', error);
    res.status(500).json({ error: error.message || 'Errore nella generazione' });
  }
});

// 2. Suggest artistic emphasis for a page of text
app.post('/api/gemini/suggest-artistic-text', async (req: express.Request, res: express.Response) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Nessun testo fornito' });
    }

    const ai = getAiClient();
    const systemInstruction = `Analizza il testo di una pagina di un libro illustrato per bambini. Identifica da 1 a 2 parole o brevissime frasi (massimo 3 parole ciascuna) che esprimono un'emozione forte, un suono, un'azione o un elemento magico cruciale (es. "BOOM!", "Sussurrò", "DRAGO", "Volò via", "Mistero").
Suggerisci come formattare queste scritte in modo artistico per enfatizzare il racconto.
Ritorna i risultati come JSON strutturato.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Testo della pagina:\n"${text}"`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            emphases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING, description: "La parola o breve frase esatta da enfatizzare" },
                  fontFamily: { 
                    type: Type.STRING, 
                    description: "Il font consigliato. Scegli strettamente tra: 'pacifico' (dolce/magico), 'lilita' (forte/allegro), 'cinzel' (epico/antico), 'creepster' (spaventoso), 'bangers' (esplosivo/fumetto)" 
                  },
                  color: { type: Type.STRING, description: "Un codice colore esadecimale vivace adatto (es. '#FF0055')" },
                  styleType: { 
                    type: Type.STRING, 
                    description: "Lo stile artistico. Scegli strettamente tra: 'artistic-giant', 'artistic-shadow', 'artistic-glow', 'artistic-spooky', 'artistic-stroke'" 
                  },
                  reason: { type: Type.STRING, description: "Breve spiegazione in italiano del perché questa scelta" }
                },
                required: ['word', 'fontFamily', 'color', 'styleType']
              }
            }
          },
          required: ['emphases']
        }
      }
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error('Errore durante la formattazione artistica:', error);
    res.status(500).json({ error: error.message || 'Errore nella formattazione' });
  }
});

// 3. AI image generator using gemini-3.1-flash-lite-image
app.post('/api/gemini/generate-image-ai', async (req: express.Request, res: express.Response) => {
  try {
    const { prompt, aspectRatio } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Nessun prompt fornito' });
    }

    const ai = getAiClient();
    
    // Default style guidance to make it children's book-friendly
    const styledPrompt = `${prompt}, beautiful digital art style illustration for a children's storybook, colorful, high quality details, cute and whimsical`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [
          { text: styledPrompt },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio || '4:3', // 4:3 is standard for children's books
        },
      },
    });

    let base64Image = '';
    
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          base64Image = part.inlineData.data;
          break;
        }
      }
    }

    if (!base64Image) {
      throw new Error('Nessuna immagine restituita dal modello.');
    }

    res.json({ imageUrl: `data:image/png;base64,${base64Image}` });
  } catch (error: any) {
    console.error('Errore durante la generazione dell\'immagine AI:', error);
    res.status(500).json({ error: error.message || 'Errore nella generazione dell\'immagine' });
  }
});

// Vite & Static file serving setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
  });
}

startServer();
