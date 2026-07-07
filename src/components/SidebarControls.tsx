import React, { useState, useRef, useEffect } from 'react';
import { BookPage, BookElement, PresetBackground, PresetCharacter } from '../types';
import { PRESET_BACKGROUNDS, PRESET_CHARACTERS } from '../presets';
import { CUTE_SVG_ASSETS } from '../cuteSvgAssets';
import { 
  Type, Upload, Image as ImageIcon, Plus, ArrowUp, ArrowDown, 
  FlipHorizontal, Trash2, AlignLeft, AlignCenter, AlignRight, Bold, Italic, 
  Settings, Layers, BookOpen, FileText, Palette, HelpCircle, Copy, Sliders, MessageSquare, Sun, Heart, Sparkles
} from 'lucide-react';

interface SidebarControlsProps {
  page: BookPage;
  selectedElementId: string | null;
  onUpdateElement: (elementId: string, updates: Partial<BookElement>) => void;
  onMoveElementDepth: (elementId: string, action: 'forward' | 'backward' | 'front' | 'back') => void;
  onAddElement: (type: 'text' | 'character', details?: Partial<BookElement>) => void;
  onUpdatePageBackground: (
    backgroundUrl: string | undefined, 
    backgroundColor?: string, 
    backgroundPattern?: 'none' | 'polka-dots' | 'stripes' | 'stars' | 'hearts' | 'clouds',
    backgroundPatternColor?: string,
    backgroundPatternOpacity?: number,
    backgroundPatternSize?: number
  ) => void;
  onDeleteElement: (elementId: string) => void;
  pageIndex: number;
  totalPages: number;
  onAddPage: () => void;
  onDeletePage: () => void;
  onDuplicatePage: () => void;
  onNavigatePage: (index: number) => void;
}

type SidebarTab = 'text' | 'media' | 'pages';

const PASTEL_COLORS = [
  { name: 'Rosa Confetto', hex: '#ffccd5' },
  { name: 'Menta Fresca', hex: '#e8f5e9' },
  { name: 'Azzurro Cielo', hex: '#caf0f8' },
  { name: 'Crema', hex: '#fefae0' },
  { name: 'Lilla', hex: '#f3c4fb' },
  { name: 'Pesca Dolce', hex: '#fcd5ce' },
  { name: 'Sabbia Calda', hex: '#faedcd' },
  { name: 'Giallo Sole', hex: '#fff9c4' },
  { name: 'Bianco Candido', hex: '#ffffff' },
  { name: 'Grigio Nuvoletta', hex: '#f1f5f9' },
];

export default function SidebarControls({
  page,
  selectedElementId,
  onUpdateElement,
  onMoveElementDepth,
  onAddElement,
  onUpdatePageBackground,
  onDeleteElement,
  pageIndex,
  totalPages,
  onAddPage,
  onDeletePage,
  onDuplicatePage,
  onNavigatePage
}: SidebarControlsProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>('text');

  // Auto-switch to the customization/element tab ('text') when an element is selected on the canvas,
  // but only if the user is not actively on the 'media' tab adding stickers/backgrounds
  useEffect(() => {
    if (selectedElementId && activeTab !== 'media') {
      setActiveTab('text');
    }
  }, [selectedElementId]);
  
  // File upload refs
  const bgUploadRef = useRef<HTMLInputElement>(null);
  const charUploadRef = useRef<HTMLInputElement>(null);

  // Get active selected element details
  const selectedElement = page.elements.find(el => el.id === selectedElementId);

  // Read file as Base64 helper
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'bg' | 'char') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (type === 'bg') {
        onUpdatePageBackground(base64String);
      } else {
        onAddElement('character', {
          url: base64String,
          name: file.name.split('.')[0] || 'Caricato',
          width: 30,
          height: 30,
        });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 border-r border-slate-200 shadow-sm overflow-hidden select-none">
      
      {/* Sidebar Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 flex flex-col items-center py-3 text-[10px] font-bold uppercase tracking-wider transition ${
            activeTab === 'text' 
              ? 'text-blue-600 bg-blue-50/40 border-b-2 border-blue-600' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <Type size={16} className="mb-1" />
          Testo & Fumetti
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`flex-1 flex flex-col items-center py-3 text-[10px] font-bold uppercase tracking-wider transition ${
            activeTab === 'media' 
              ? 'text-blue-600 bg-blue-50/40 border-b-2 border-blue-600' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <ImageIcon size={16} className="mb-1" />
          Sfondi & Sticker
        </button>
        <button
          onClick={() => setActiveTab('pages')}
          className={`flex-1 flex flex-col items-center py-3 text-[10px] font-bold uppercase tracking-wider transition ${
            activeTab === 'pages' 
              ? 'text-blue-600 bg-blue-50/40 border-b-2 border-blue-600' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <BookOpen size={16} className="mb-1" />
          Pagine ({totalPages})
        </button>
      </div>

      {/* Main Tab Content scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* ==================== TAB 1: TEXTS & ELEMENT CUSTOMIZATION ==================== */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            
            {/* Selected Element Customizer */}
            {selectedElement ? (
              <div className="p-4 bg-white border border-blue-200 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-extrabold text-blue-700 flex items-center gap-1.5 uppercase tracking-wider">
                    <Settings size={14} />
                    Personalizza Elemento
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        // Duplicate current element
                        const maxZIndex = page.elements.reduce((max, el) => Math.max(max, el.zIndex), 0);
                        onAddElement(selectedElement.type, {
                          ...selectedElement,
                          id: undefined,
                          x: Math.min(80, selectedElement.x + 5),
                          y: Math.min(80, selectedElement.y + 5),
                          zIndex: maxZIndex + 1
                        });
                      }}
                      className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Duplica"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      onClick={() => onDeleteElement(selectedElement.id)}
                      className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Elimina"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* --- A. TEXT SPECIFIC STYLING --- */}
                {selectedElement.type === 'text' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide block mb-1">Contenuto del Testo</label>
                      <textarea
                        value={selectedElement.text || ''}
                        onChange={(e) => onUpdateElement(selectedElement.id, { text: e.target.value })}
                        rows={2}
                        className="w-full text-xs p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Cosa dice la tua storia?"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide block mb-1">Carattere</label>
                        <select
                          value={selectedElement.fontFamily || 'sans'}
                          onChange={(e) => onUpdateElement(selectedElement.id, { fontFamily: e.target.value as any })}
                          className="w-full text-xs p-2 border border-slate-200 rounded-xl bg-white"
                        >
                          <option value="fredoka">🎈 Arrotondato (Fredoka)</option>
                          <option value="pacifico">🦄 Magico (Pacifico)</option>
                          <option value="lilita">🎨 Fumetto (Lilita)</option>
                          <option value="bangers">💥 Esplosivo (Bangers)</option>
                          <option value="sans">🧸 Semplice (Sans)</option>
                          <option value="cinzel">🏰 Fiaba Epica (Cinzel)</option>
                          <option value="creepster">👻 Mostro (Creepster)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide block mb-1">Colore Testo</label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="color"
                            value={selectedElement.color || '#1e293b'}
                            onChange={(e) => onUpdateElement(selectedElement.id, { color: e.target.value })}
                            className="w-8 h-8 border border-slate-200 rounded-lg cursor-pointer p-0"
                          />
                          <span className="text-[10px] font-mono text-slate-400 uppercase">{selectedElement.color || '#1e293b'}</span>
                        </div>
                      </div>
                    </div>

                    {/* FUMETTI / SPEECH BUBBLE BUILDER */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2.5">
                      <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wide flex items-center gap-1">
                        <MessageSquare size={12} />
                        Stile Fumetto (Fumetto)
                      </span>
                      <select
                        value={selectedElement.bubbleType || 'none'}
                        onChange={(e) => onUpdateElement(selectedElement.id, { bubbleType: e.target.value as any })}
                        className="w-full text-xs p-1.5 border border-slate-200 rounded-lg bg-white"
                      >
                        <option value="none">Normal (Senza Fumetto)</option>
                        <option value="speech">🗨️ Fumetto Parlato</option>
                        <option value="thought">💭 Nuvola dei Pensieri</option>
                        <option value="cloud">☁️ Nuvola Morbida</option>
                        <option value="heart">💖 Cuore d'Amore</option>
                        <option value="banner">🎗️ Banner/Insegna</option>
                      </select>

                      {selectedElement.bubbleType && selectedElement.bubbleType !== 'none' && (
                        <div className="grid grid-cols-2 gap-2 pt-1 animate-fadeIn">
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase">Sfondo Fumetto</label>
                            <input
                              type="color"
                              value={selectedElement.bubbleColor || '#ffffff'}
                              onChange={(e) => onUpdateElement(selectedElement.id, { bubbleColor: e.target.value })}
                              className="w-full h-7 border border-slate-200 rounded cursor-pointer p-0"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase">Bordo Fumetto</label>
                            <input
                              type="color"
                              value={selectedElement.bubbleBorderColor || '#1e293b'}
                              onChange={(e) => onUpdateElement(selectedElement.id, { bubbleBorderColor: e.target.value })}
                              className="w-full h-7 border border-slate-200 rounded cursor-pointer p-0"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Text Size Slider */}
                    <div>
                      <div className="flex justify-between text-[10px] font-extrabold text-slate-500 uppercase tracking-wide mb-1">
                        <span>Dimensione Carattere</span>
                        <span className="text-blue-600 font-mono font-bold">{selectedElement.fontSize || 24}px</span>
                      </div>
                      <input
                        type="range"
                        min={12}
                        max={110}
                        value={selectedElement.fontSize || 24}
                        onChange={(e) => onUpdateElement(selectedElement.id, { fontSize: parseInt(e.target.value) })}
                        className="w-full accent-blue-600"
                      />
                    </div>

                    {/* Align & Font Weights */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1">
                        {(['left', 'center', 'right'] as const).map((dir) => (
                          <button
                            key={dir}
                            onClick={() => onUpdateElement(selectedElement.id, { align: dir })}
                            className={`p-2 rounded-lg border transition ${selectedElement.align === dir ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                          >
                            {dir === 'left' ? <AlignLeft size={14} /> : dir === 'center' ? <AlignCenter size={14} /> : <AlignRight size={14} />}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onUpdateElement(selectedElement.id, { bold: !selectedElement.bold })}
                          className={`p-2 rounded-lg border transition ${selectedElement.bold ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                          title="Grassetto"
                        >
                          <Bold size={14} />
                        </button>
                        <button
                          onClick={() => onUpdateElement(selectedElement.id, { italic: !selectedElement.italic })}
                          className={`p-2 rounded-lg border transition ${selectedElement.italic ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                          title="Corsivo"
                        >
                          <Italic size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Artistic Predefined Style Select */}
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide block mb-1">Stile Testo Predefinito</label>
                      <select
                        value={selectedElement.styleType || 'normal'}
                        onChange={(e) => onUpdateElement(selectedElement.id, { styleType: e.target.value as any })}
                        className="w-full text-xs p-1.5 border border-slate-200 rounded-lg bg-white"
                      >
                        <option value="normal">Nessun Effetto (Semplice)</option>
                        <option value="artistic-giant">Enfatizzato Gigante</option>
                        <option value="artistic-shadow">Ombra Fumetto (Giallo)</option>
                        <option value="artistic-glow">Bagliore Stellare</option>
                        <option value="artistic-spooky">Fantasmino Spaventoso</option>
                        <option value="artistic-stroke">Contorno Forte</option>
                      </select>
                    </div>

                  </div>
                )}

                {/* --- B. STICKER SPECIFIC STYLING --- */}
                {selectedElement.type === 'character' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                        <img src={selectedElement.url} alt={selectedElement.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate text-slate-700">{selectedElement.name || 'Sticker'}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Sticker Personaggio</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateElement(selectedElement.id, { flipX: !selectedElement.flipX })}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold transition shadow-sm bg-white"
                      >
                        <FlipHorizontal size={14} />
                        Rifletti
                      </button>
                    </div>
                  </div>
                )}

                {/* --- C. UNIVERSAL PROPERTIES (Borders, Shadows, Layers, Filters) --- */}
                <div className="border-t border-slate-100 pt-3 space-y-3">
                  
                  {/* Layer ordering strip */}
                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide block mb-1.5">Ordine di Livello (Layer)</label>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onMoveElementDepth(selectedElement.id, 'forward')}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 rounded-lg transition shadow-sm"
                          title="Sposta un livello sopra"
                        >
                          <ArrowUp size={13} />
                          Porta Avanti
                        </button>
                        <button
                          onClick={() => onMoveElementDepth(selectedElement.id, 'backward')}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 rounded-lg transition shadow-sm"
                          title="Sposta un livello sotto"
                        >
                          <ArrowDown size={13} />
                          Invia Dietro
                        </button>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onMoveElementDepth(selectedElement.id, 'front')}
                          className="flex-1 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold rounded-lg transition border border-slate-200 shadow-sm"
                          title="Porta sopra a tutti"
                        >
                          🔝 Primo Piano
                        </button>
                        <button
                          onClick={() => onMoveElementDepth(selectedElement.id, 'back')}
                          className="flex-1 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold rounded-lg transition border border-slate-200 shadow-sm"
                          title="Invia sotto a tutti"
                        >
                          🧳 Invia in Fondo
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* CUSTOM BORDERS (Bordi Giocattolo) */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2.5">
                    <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wide flex items-center gap-1">
                      <Palette size={12} />
                      Bordo Giocattolo / Cornice
                    </span>
                    <select
                      value={selectedElement.borderStyle || 'none'}
                      onChange={(e) => onUpdateElement(selectedElement.id, { borderStyle: e.target.value as any })}
                      className="w-full text-xs p-1.5 border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="none">Senza Bordo</option>
                      <option value="solid">➖➖ Linea Continua</option>
                      <option value="dashed">--- Tratteggiato</option>
                      <option value="dotted">.... Puntinato</option>
                      <option value="bubbly">〰️ Ondulato/Disegnato</option>
                    </select>

                    {selectedElement.borderStyle && selectedElement.borderStyle !== 'none' && (
                      <div className="space-y-2 pt-1 animate-fadeIn">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Colore</label>
                            <input
                              type="color"
                              value={selectedElement.borderColor || '#3b82f6'}
                              onChange={(e) => onUpdateElement(selectedElement.id, { borderColor: e.target.value })}
                              className="w-full h-7 border border-slate-200 rounded cursor-pointer p-0"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Spessore ({selectedElement.borderWidth || 3}px)</label>
                            <input
                              type="range"
                              min={1}
                              max={12}
                              value={selectedElement.borderWidth || 3}
                              onChange={(e) => onUpdateElement(selectedElement.id, { borderWidth: parseInt(e.target.value) })}
                              className="w-full accent-blue-600"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CUSTOM SHADOWS & GLOWS */}
                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide block mb-1">Bagliore o Ombra 3D</label>
                    <select
                      value={selectedElement.shadowStyle || 'none'}
                      onChange={(e) => onUpdateElement(selectedElement.id, { shadowStyle: e.target.value as any })}
                      className="w-full text-xs p-1.5 border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="none">Senza Ombra</option>
                      <option value="sm">Ombra Leggera</option>
                      <option value="md">Ombra Media</option>
                      <option value="lg">Ombra Grande</option>
                      <option value="glow-yellow">🌟 Bagliore Giallo Sole</option>
                      <option value="glow-pink">🌸 Bagliore Rosa Incantato</option>
                      <option value="glow-blue">🐳 Bagliore Oceano Magico</option>
                      <option value="comic-3d">🧱 Ombra 3D Stile Comic</option>
                    </select>
                  </div>

                  {/* FILTRI MAGICI (Advanced sliders for children recolor and edit!) */}
                  <div className="p-3 bg-yellow-50/50 rounded-xl border border-yellow-100 space-y-2.5">
                    <span className="text-[10px] font-extrabold text-yellow-800 uppercase tracking-wide flex items-center gap-1">
                      <Sliders size={12} />
                      Filtri Magici (Cambia Colori & Opacità!)
                    </span>

                    {/* Hue rotate (Recolor!) */}
                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-slate-500">
                        <span>🪄 Recolor (Tonalità)</span>
                        <span className="text-slate-600">{selectedElement.hueRotate || 0}°</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={360}
                        value={selectedElement.hueRotate || 0}
                        onChange={(e) => onUpdateElement(selectedElement.id, { hueRotate: parseInt(e.target.value) })}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    {/* Opacity slider */}
                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-slate-500">
                        <span>Trasparenza</span>
                        <span className="text-slate-600">{selectedElement.opacity !== undefined ? selectedElement.opacity : 100}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={selectedElement.opacity !== undefined ? selectedElement.opacity : 100}
                        onChange={(e) => onUpdateElement(selectedElement.id, { opacity: parseInt(e.target.value) })}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    {/* Saturation slider */}
                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-slate-500">
                        <span>Saturazione Colore</span>
                        <span className="text-slate-600">{selectedElement.saturation !== undefined ? selectedElement.saturation : 100}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={200}
                        value={selectedElement.saturation !== undefined ? selectedElement.saturation : 100}
                        onChange={(e) => onUpdateElement(selectedElement.id, { saturation: parseInt(e.target.value) })}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    {/* Brightness slider */}
                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-slate-500">
                        <span>Luminosità</span>
                        <span className="text-slate-600">{selectedElement.brightness !== undefined ? selectedElement.brightness : 100}%</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={150}
                        value={selectedElement.brightness !== undefined ? selectedElement.brightness : 100}
                        onChange={(e) => onUpdateElement(selectedElement.id, { brightness: parseInt(e.target.value) })}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    {/* Blur slider */}
                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-slate-500">
                        <span>Sfocatura (Nebbia)</span>
                        <span className="text-slate-600">{selectedElement.blur || 0}px</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={8}
                        value={selectedElement.blur || 0}
                        onChange={(e) => onUpdateElement(selectedElement.id, { blur: parseInt(e.target.value) })}
                        className="w-full accent-amber-500"
                      />
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="text-center p-6 border border-dashed border-slate-200 bg-white rounded-2xl text-xs text-slate-400">
                👉 Clicca su una scritta o un personaggio nel foglio di destra per modificarlo, aggiungere fumetti, bordi, ombre o cambiarne il colore!
              </div>
            )}

            {/* SPAWN NEW TEXT MODULE */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Scrivi un Testo</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onAddElement('text', {
                    text: 'Scrivi qui...',
                    fontFamily: 'fredoka',
                    fontSize: 24,
                    color: '#1e293b',
                    width: 60,
                    height: 12,
                    x: 20,
                    y: 30
                  })}
                  className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-xl bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 transition group text-center"
                >
                  <FileText className="text-slate-500 group-hover:text-blue-600 mb-1" size={18} />
                  <span className="text-xs font-bold text-slate-700">Testo Normale</span>
                  <span className="text-[9px] text-slate-400">Per raccontare la storia</span>
                </button>

                <button
                  onClick={() => onAddElement('text', {
                    text: 'IL DRAGO! 🐲',
                    fontFamily: 'bangers',
                    fontSize: 50,
                    color: '#e11d48',
                    styleType: 'artistic-shadow',
                    width: 50,
                    height: 15,
                    x: 25,
                    y: 20,
                    rotation: -4
                  })}
                  className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-xl bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 transition group text-center"
                >
                  <Sparkles className="text-amber-500 group-hover:text-blue-600 mb-1" size={18} />
                  <span className="text-xs font-bold text-slate-700">Scritta Artistica</span>
                  <span className="text-[9px] text-slate-400">Suoni ed emozioni!</span>
                </button>
              </div>
            </div>

            {/* Quick pre-made cute texts */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Suoni dei cartoni</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'C\'era una volta...', font: 'fredoka', style: 'normal', color: '#1e293b' },
                  { label: 'BOOM! 💥', font: 'bangers', style: 'artistic-shadow', color: '#ea580c' },
                  { label: 'WOW! ⭐', font: 'bangers', style: 'artistic-glow', color: '#facc15' },
                  { label: 'SPLAT! 💦', font: 'lilita', style: 'artistic-shadow', color: '#06b6d4' },
                  { label: 'GNAM! 🍰', font: 'lilita', style: 'artistic-glow', color: '#ec4899' },
                  { label: 'AIUTO! 👻', font: 'creepster', style: 'artistic-spooky', color: '#22c55e' },
                  { label: 'FINE ✨', font: 'pacifico', style: 'artistic-stroke', color: '#312e81' },
                ].map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => onAddElement('text', {
                      text: word.label,
                      fontFamily: word.font as any,
                      fontSize: 40,
                      color: word.color,
                      styleType: word.style as any,
                      width: 50,
                      height: 14,
                      x: 25,
                      y: 35,
                      rotation: Math.floor(Math.random() * 12) - 6
                    })}
                    className="text-xs font-bold px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 hover:border-blue-300 rounded-full transition"
                  >
                    {word.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 2: BACKGROUNDS & CHARACTER STICKERS ==================== */}
        {activeTab === 'media' && (
          <div className="space-y-4">
            
            {/* Custom file uploading segment */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-200 rounded-2xl p-4 space-y-3 shadow-sm">
              <span className="text-xs font-extrabold text-blue-800 flex items-center gap-1.5 uppercase tracking-wider">
                <Upload size={14} />
                Usa i tuoi File personali
              </span>
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                Carica disegni fatti da te, sfondi o foto personali! Supportiamo file PNG, JPG con trasparenze.
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => bgUploadRef.current?.click()}
                  className="flex items-center justify-center gap-1.5 p-2 bg-white border border-slate-300 rounded-xl hover:bg-blue-50/50 hover:border-blue-300 text-xs font-bold text-slate-700 shadow-sm transition"
                >
                  <ImageIcon size={14} className="text-slate-500" />
                  Carica Sfondo
                </button>
                <input
                  type="file"
                  ref={bgUploadRef}
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'bg')}
                  className="hidden"
                />

                <button
                  onClick={() => charUploadRef.current?.click()}
                  className="flex items-center justify-center gap-1.5 p-2 bg-white border border-slate-300 rounded-xl hover:bg-blue-50/50 hover:border-blue-300 text-xs font-bold text-slate-700 shadow-sm transition"
                >
                  <Upload size={14} className="text-slate-500" />
                  Carica Sticker
                </button>
                <input
                  type="file"
                  ref={charUploadRef}
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'char')}
                  className="hidden"
                />
              </div>
            </div>

            {/* Pastel backgrounds & Patterns block */}
            <div className="bg-white p-4 border border-slate-200 rounded-2xl shadow-sm space-y-3.5">
              <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                <Palette size={14} />
                Sfondi a Colori Pastello & Pattern
              </span>

              {/* Pastel Quick Palette selector */}
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 block mb-1.5 uppercase">1. Colore di Sfondo</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {PASTEL_COLORS.map((col) => (
                    <button
                      key={col.hex}
                      onClick={() => onUpdatePageBackground(undefined, col.hex)}
                      className={`w-full aspect-square rounded-xl border border-slate-200 relative flex items-center justify-center group hover:scale-105 transition`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      <span className="opacity-0 group-hover:opacity-100 text-[10px] font-bold pointer-events-none">🖌️</span>
                    </button>
                  ))}
                  {/* Custom direct color circle */}
                  <div className="relative w-full aspect-square rounded-xl border border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center hover:scale-105 transition">
                    <input 
                      type="color" 
                      value={page.backgroundColor || '#ffffff'}
                      onChange={(e) => onUpdatePageBackground(undefined, e.target.value)}
                      className="absolute inset-0 w-full h-full cursor-pointer p-0 opacity-0"
                    />
                    <span className="text-xs">🌈</span>
                  </div>
                </div>

                {page.backgroundColor && page.backgroundColor !== '#ffffff' && !page.backgroundUrl && (
                  <button
                    onClick={() => onUpdatePageBackground(page.backgroundUrl, '#ffffff')}
                    className="w-full mt-2 py-1.5 px-3 bg-red-50 border border-red-200 hover:bg-red-100 rounded-xl text-xs font-bold text-red-700 flex items-center justify-center gap-1.5 transition"
                  >
                    ❌ Rimuovi Colore di Sfondo (Ritorna a Bianco)
                  </button>
                )}
              </div>

              {/* Repeating Background patterns switcher */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="text-[10px] font-extrabold text-slate-400 block mb-1 uppercase">2. Trama di Sfondo (Pattern)</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'none', label: '❌ Nessuna' },
                    { id: 'polka-dots', label: '⚪ Pois' },
                    { id: 'stripes', label: '💈 Righe' },
                    { id: 'stars', label: '⭐ Stelline' },
                    { id: 'hearts', label: '💖 Cuori' },
                    { id: 'clouds', label: '☁️ Nuvole' }
                  ].map((pat) => (
                    <button
                      key={pat.id}
                      onClick={() => {
                        onUpdatePageBackground(page.backgroundUrl, page.backgroundColor, pat.id as any);
                      }}
                      className={`py-1.5 px-2 border rounded-xl text-[11px] font-bold text-slate-600 transition ${
                        page.backgroundPattern === pat.id ? 'border-blue-500 bg-blue-50/50 text-blue-700' : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      {pat.label}
                    </button>
                  ))}
                </div>

                {/* Additional controls for the active pattern */}
                {page.backgroundPattern && page.backgroundPattern !== 'none' && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 space-y-2.5 mt-2">
                    <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wide block">⚙️ Personalizza la Trama</span>
                    
                    {/* Pattern color selection */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-600">Colore del Pattern:</span>
                      <div className="flex items-center gap-1.5">
                        <input 
                          type="color" 
                          value={page.backgroundPatternColor || '#1e293b'} 
                          onChange={(e) => onUpdatePageBackground(page.backgroundUrl, page.backgroundColor, page.backgroundPattern, e.target.value)}
                          className="w-7 h-7 rounded-lg border border-slate-200 cursor-pointer overflow-hidden p-0"
                        />
                        <span className="text-[10px] font-mono font-bold text-slate-500">{page.backgroundPatternColor || '#1E293B'}</span>
                      </div>
                    </div>

                    {/* Pattern Opacity Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-600">
                        <span>Opacità Pattern:</span>
                        <span className="text-blue-600 font-mono text-[10px]">{page.backgroundPatternOpacity !== undefined ? page.backgroundPatternOpacity : 15}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="100" 
                        value={page.backgroundPatternOpacity !== undefined ? page.backgroundPatternOpacity : 15}
                        onChange={(e) => onUpdatePageBackground(page.backgroundUrl, page.backgroundColor, page.backgroundPattern, page.backgroundPatternColor, parseInt(e.target.value))}
                        className="w-full accent-blue-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Pattern Size Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-600">
                        <span>Dimensione Pattern:</span>
                        <span className="text-blue-600 font-mono text-[10px]">{page.backgroundPatternSize !== undefined ? page.backgroundPatternSize : 32}px</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="120" 
                        value={page.backgroundPatternSize !== undefined ? page.backgroundPatternSize : 32}
                        onChange={(e) => onUpdatePageBackground(page.backgroundUrl, page.backgroundColor, page.backgroundPattern, page.backgroundPatternColor, page.backgroundPatternOpacity, parseInt(e.target.value))}
                        className="w-full accent-blue-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Custom SVG transparent assets (BEST KIDS STICKERS!) */}
            <div className="bg-white p-4 border border-slate-200 rounded-2xl shadow-sm space-y-3">
              <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                <Sun size={15} className="text-yellow-500" />
                Sticker Vettoriali HD (Trasparenza Perfetta)
              </span>
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                Questi sticker non hanno fastidiosi sfondi quadrati! Si fondono meravigliosamente in qualsiasi pagina del libro.
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                {CUTE_SVG_ASSETS.map((svgAsset) => (
                  <button
                    key={svgAsset.id}
                    onClick={() => onAddElement('character', {
                      url: svgAsset.url,
                      name: svgAsset.name,
                      width: 25,
                      height: 25,
                    })}
                    className="flex flex-col items-center p-2.5 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50/40 transition group text-center"
                  >
                    <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center p-1 border border-slate-100 group-hover:scale-105 transition">
                      <img src={svgAsset.url} alt={svgAsset.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 mt-1.5 truncate w-full">
                      {svgAsset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Preset Classic Illustrations Library */}
            <div className="bg-white p-4 border border-slate-200 rounded-2xl shadow-sm space-y-3">
              <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                <ImageIcon size={15} className="text-indigo-500" />
                Libreria Sfondi Pronti Illustrati
              </span>

              {page.backgroundUrl && (
                <button
                  onClick={() => onUpdatePageBackground(undefined, '#ffffff')}
                  className="w-full py-1.5 px-3 bg-red-50 border border-red-200 hover:bg-red-100 rounded-xl text-xs font-bold text-red-700 flex items-center justify-center gap-1.5 transition"
                >
                  ❌ Rimuovi Sfondo Illustrato
                </button>
              )}

              <div className="grid grid-cols-2 gap-2">
                {PRESET_BACKGROUNDS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => onUpdatePageBackground(bg.url, '#ffffff')}
                    className={`relative h-16 border rounded-xl overflow-hidden group transition ${
                      page.backgroundUrl === bg.url ? 'border-indigo-600 ring-2 ring-indigo-600/30' : 'border-slate-200 hover:border-blue-400'
                    }`}
                  >
                    <img src={bg.url} alt={bg.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition flex items-end p-1.5" />
                    <span className="absolute bottom-1 left-1.5 text-[10px] font-bold text-white tracking-wide truncate max-w-[90%]">
                      {bg.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Preset Classic Character Sticker Library */}
            <div className="bg-white p-4 border border-slate-200 rounded-2xl shadow-sm space-y-3">
              <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                <Sun size={15} className="text-indigo-500" />
                Sticker Classici Pronti
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {PRESET_CHARACTERS.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => onAddElement('character', {
                      url: char.url,
                      name: char.name,
                      width: 30,
                      height: 30,
                    })}
                    className="flex flex-col items-center p-2 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50/40 transition group"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex items-center justify-center p-0.5 border border-slate-100">
                      <img src={char.url} alt={char.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition duration-200" />
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 mt-1 truncate w-full text-center">
                      {char.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 3: PAGES MANAGEMENT & SEQUENCING ==================== */}
        {activeTab === 'pages' && (
          <div className="space-y-4">
            
            <div className="flex items-center justify-between bg-white p-3 border border-slate-200 rounded-2xl shadow-sm">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Navigatore Pagine</span>
              <button
                onClick={onAddPage}
                className="flex items-center gap-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow transition"
              >
                <Plus size={13} />
                Nuova Pagina
              </button>
            </div>

            {/* Quick action strip */}
            <div className="grid grid-cols-2 gap-2 bg-white p-3 border border-slate-200 rounded-2xl shadow-sm">
              <button
                onClick={onDuplicatePage}
                className="py-2 px-3 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold shadow-sm transition"
              >
                Duplica Pagina
              </button>
              <button
                onClick={onDeletePage}
                disabled={totalPages <= 1}
                className="py-2 px-3 border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold shadow-sm disabled:opacity-50 transition"
              >
                Elimina Pagina
              </button>
            </div>

            {/* Multi page stack view list */}
            <div className="space-y-2 pt-1.5">
              {Array.from({ length: totalPages }).map((_, index) => {
                const isActive = pageIndex === index;
                return (
                  <button
                    key={index}
                    onClick={() => onNavigatePage(index)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl border text-left transition ${
                      isActive 
                        ? 'border-blue-600 bg-blue-50 text-blue-800 font-extrabold' 
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs border border-slate-200">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs truncate">Pagina {index + 1}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">
                        {pageIndex === index ? 'Pagina Corrente' : 'Clicca per aprire'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
