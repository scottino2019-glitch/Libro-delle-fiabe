import React, { useState, useEffect } from 'react';
import { Book, BookPage, BookElement } from './types';
import { PRESET_BACKGROUNDS, PRESET_CHARACTERS } from './presets';
import { 
  getArtisticTextClass, 
  generateUUID, 
  getElementFilter, 
  getElementBorderStyle, 
  getElementShadowStyle, 
  getPatternStyle 
} from './utils';
import BookNavbar from './components/BookNavbar';
import SidebarControls from './components/SidebarControls';
import InteractiveCanvas from './components/InteractiveCanvas';
import { HelpCircle, Sparkles, BookOpen, ChevronLeft, ChevronRight, Plus, Trash2, Layers, CheckCircle } from 'lucide-react';

// Define the initial fairytale starter book
const createStarterBook = (): Book => {
  const page1Id = generateUUID();
  const page2Id = generateUUID();
  const page3Id = generateUUID();

  return {
    id: 'starter-book-bernardo',
    title: 'Il Drago Buono 🐉',
    author: 'Il mio Nome',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pages: [
      {
        id: page1Id,
        backgroundUrl: PRESET_BACKGROUNDS[1].url, // Castello luna
        backgroundColor: '#ffffff',
        elements: [
          {
            id: generateUUID(),
            type: 'text',
            x: 15,
            y: 12,
            width: 70,
            height: 18,
            rotation: 0,
            zIndex: 10,
            text: 'IL DRAGO BUONO',
            fontSize: 55,
            fontFamily: 'cinzel',
            color: '#facc15',
            align: 'center',
            bold: true,
            styleType: 'artistic-shadow'
          },
          {
            id: generateUUID(),
            type: 'character',
            x: 35,
            y: 35,
            width: 30,
            height: 30,
            rotation: 0,
            zIndex: 5,
            url: PRESET_CHARACTERS[0].url, // Drago
            name: PRESET_CHARACTERS[0].name
          },
          {
            id: generateUUID(),
            type: 'text',
            x: 10,
            y: 80,
            width: 80,
            height: 10,
            rotation: 0,
            zIndex: 10,
            text: 'Una bellissima fiaba illustrata sul drago pasticcere Bernardo',
            fontSize: 20,
            fontFamily: 'fredoka',
            color: '#ffffff',
            align: 'center',
            bold: true,
            styleType: 'artistic-glow'
          }
        ]
      },
      {
        id: page2Id,
        backgroundUrl: PRESET_BACKGROUNDS[0].url, // Bosco incantato
        backgroundColor: '#ffffff',
        elements: [
          {
            id: generateUUID(),
            type: 'character',
            x: 15,
            y: 32,
            width: 25,
            height: 25,
            rotation: 0,
            zIndex: 5,
            url: PRESET_CHARACTERS[0].url, // Drago Bernardo
            name: PRESET_CHARACTERS[0].name
          },
          {
            id: generateUUID(),
            type: 'text',
            x: 48,
            y: 25,
            width: 45,
            height: 20,
            rotation: -8,
            zIndex: 15,
            text: 'ROOOAR!',
            fontSize: 60,
            fontFamily: 'bangers',
            color: '#f43f5e',
            align: 'center',
            styleType: 'artistic-shadow'
          },
          {
            id: generateUUID(),
            type: 'text',
            x: 10,
            y: 72,
            width: 80,
            height: 18,
            rotation: 0,
            zIndex: 10,
            text: "C'era una volta, in un bosco magico, Bernardo un piccolo drago verde. A Bernardo non piaceva spaventare la gente, preferiva preparare deliziose torte alle fragole fresche!",
            fontSize: 20,
            fontFamily: 'fredoka',
            color: '#1e293b',
            align: 'left',
            bold: false
          }
        ]
      },
      {
        id: page3Id,
        backgroundUrl: PRESET_BACKGROUNDS[2].url, // Oltre le stelle
        backgroundColor: '#ffffff',
        elements: [
          {
            id: generateUUID(),
            type: 'text',
            x: 20,
            y: 10,
            width: 60,
            height: 15,
            rotation: 6,
            zIndex: 10,
            text: 'VOLÒ VIA!',
            fontSize: 48,
            fontFamily: 'pacifico',
            color: '#38bdf8',
            align: 'center',
            styleType: 'artistic-glow'
          },
          {
            id: generateUUID(),
            type: 'character',
            x: 35,
            y: 32,
            width: 28,
            height: 28,
            rotation: 12,
            zIndex: 5,
            url: PRESET_CHARACTERS[1].url, // Astronauta
            name: PRESET_CHARACTERS[1].name
          },
          {
            id: generateUUID(),
            type: 'text',
            x: 10,
            y: 74,
            width: 80,
            height: 18,
            rotation: 0,
            zIndex: 10,
            text: "Una sera Bernardo decise di fare un volo speciale oltre le stelle. Voleva scoprire se lo spazio sapesse di zucchero filato o di fresco gelato al limone!",
            fontSize: 20,
            fontFamily: 'fredoka',
            color: '#f8fafc',
            align: 'center',
            bold: false
          }
        ]
      }
    ]
  };
};

export default function App() {
  const [currentBook, setCurrentBook] = useState<Book>(createStarterBook());
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [showSaveToast, setShowSaveToast] = useState<boolean>(false);

  // Load books from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('creatore-libri-salvati');
      if (stored) {
        const books = JSON.parse(stored) as Book[];
        // Clean up old default background color from '#f1f5f9' to '#ffffff' for all saved books
        const migratedBooks = books.map(b => ({
          ...b,
          pages: b.pages.map(p => ({
            ...p,
            backgroundColor: p.backgroundColor === '#f1f5f9' ? '#ffffff' : p.backgroundColor
          }))
        }));
        setSavedBooks(migratedBooks);
        
        // Also load the last active book if available
        const lastActiveId = localStorage.getItem('creatore-ultimo-libro');
        if (lastActiveId) {
          const match = migratedBooks.find(b => b.id === lastActiveId);
          if (match) {
            setCurrentBook(match);
            setActivePageIndex(0);
          }
        }
      }
    } catch (err) {
      console.error('Errore nel caricamento dei dati locali:', err);
    }
  }, []);

  // Update book fields
  const handleUpdateBookTitle = (title: string) => {
    setCurrentBook(prev => ({
      ...prev,
      title,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleUpdateBookAuthor = (author: string) => {
    setCurrentBook(prev => ({
      ...prev,
      author,
      updatedAt: new Date().toISOString()
    }));
  };

  // Start a fresh empty book
  const handleNewBook = () => {
    const fresh: Book = {
      id: generateUUID(),
      title: 'Nuova Storia Magica ✨',
      author: 'Autore',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pages: [
        {
          id: generateUUID(),
          backgroundColor: '#ffffff',
          elements: []
        }
      ]
    };
    setCurrentBook(fresh);
    setActivePageIndex(0);
    setSelectedElementId(null);
  };

  // Save the current book to local catalog
  const handleSaveBook = () => {
    try {
      const booksToSave = [...savedBooks];
      const index = booksToSave.findIndex(b => b.id === currentBook.id);
      
      const updatedBook = {
        ...currentBook,
        updatedAt: new Date().toISOString()
      };

      if (index >= 0) {
        booksToSave[index] = updatedBook;
      } else {
        booksToSave.push(updatedBook);
      }

      setSavedBooks(booksToSave);
      localStorage.setItem('creatore-libri-salvati', JSON.stringify(booksToSave));
      localStorage.setItem('creatore-ultimo-libro', currentBook.id);
      
      // Flash save toast confirmation
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 2500);
    } catch (err) {
      console.error(err);
      alert('Impossibile salvare i dati locali. Spazio insufficiente.');
    }
  };

  const handleLoadBook = (bookId: string) => {
    const match = savedBooks.find(b => b.id === bookId);
    if (match) {
      setCurrentBook(match);
      setActivePageIndex(0);
      setSelectedElementId(null);
      localStorage.setItem('creatore-ultimo-libro', bookId);
    }
  };

  // Page level operations
  const activePage = currentBook.pages[activePageIndex] || currentBook.pages[0];

  const handleAddPage = () => {
    const newPage: BookPage = {
      id: generateUUID(),
      backgroundColor: '#ffffff',
      elements: []
    };
    
    const newPages = [...currentBook.pages];
    newPages.splice(activePageIndex + 1, 0, newPage);

    setCurrentBook(prev => ({
      ...prev,
      pages: newPages,
      updatedAt: new Date().toISOString()
    }));
    setActivePageIndex(activePageIndex + 1);
    setSelectedElementId(null);
  };

  const handleDeletePage = () => {
    if (currentBook.pages.length <= 1) return;

    const newPages = currentBook.pages.filter((_, idx) => idx !== activePageIndex);
    const newIndex = Math.max(0, activePageIndex - 1);

    setCurrentBook(prev => ({
      ...prev,
      pages: newPages,
      updatedAt: new Date().toISOString()
    }));
    setActivePageIndex(newIndex);
    setSelectedElementId(null);
  };

  const handleDuplicatePage = () => {
    // deep clone elements
    const elementsClone = activePage.elements.map(el => ({
      ...el,
      id: generateUUID()
    }));

    const pageClone: BookPage = {
      id: generateUUID(),
      backgroundUrl: activePage.backgroundUrl,
      backgroundColor: activePage.backgroundColor,
      elements: elementsClone
    };

    const newPages = [...currentBook.pages];
    newPages.splice(activePageIndex + 1, 0, pageClone);

    setCurrentBook(prev => ({
      ...prev,
      pages: newPages,
      updatedAt: new Date().toISOString()
    }));
    setActivePageIndex(activePageIndex + 1);
    setSelectedElementId(null);
  };

  // Element level operations
  const handleUpdateElement = (elementId: string, updates: Partial<BookElement>) => {
    const updatedElements = activePage.elements.map(el => {
      if (el.id === elementId) {
        return { ...el, ...updates };
      }
      return el;
    });

    const updatedPages = currentBook.pages.map((p, idx) => {
      if (idx === activePageIndex) {
        return { ...p, elements: updatedElements };
      }
      return p;
    });

    setCurrentBook(prev => ({
      ...prev,
      pages: updatedPages
    }));
  };

  const handleMoveElementDepth = (elementId: string, action: 'forward' | 'backward' | 'front' | 'back') => {
    // 1. Sort copy of elements by current zIndex to establish the correct current stack order
    const sorted = [...activePage.elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
    
    const targetIndex = sorted.findIndex(el => el.id === elementId);
    if (targetIndex === -1) return;

    const target = sorted[targetIndex];

    // 2. Perform safe shift or relocation of the element
    if (action === 'front') {
      sorted.splice(targetIndex, 1);
      sorted.push(target);
    } else if (action === 'back') {
      sorted.splice(targetIndex, 1);
      sorted.unshift(target);
    } else if (action === 'forward') {
      if (targetIndex < sorted.length - 1) {
        // Swap with the item directly above it
        sorted[targetIndex] = sorted[targetIndex + 1];
        sorted[targetIndex + 1] = target;
      }
    } else if (action === 'backward') {
      if (targetIndex > 0) {
        // Swap with the item directly below it
        sorted[targetIndex] = sorted[targetIndex - 1];
        sorted[targetIndex - 1] = target;
      }
    }

    // 3. Re-assign clean sequential z-indices with spacing to prevent overlapping values
    const updatedElements = sorted.map((el, idx) => ({
      ...el,
      zIndex: (idx + 1) * 10
    }));

    // 4. Update the state
    const updatedPages = currentBook.pages.map((p, idx) => {
      if (idx === activePageIndex) {
        return { ...p, elements: updatedElements };
      }
      return p;
    });

    setCurrentBook(prev => ({
      ...prev,
      pages: updatedPages
    }));
  };

  const handleAddElement = (type: 'text' | 'character', details?: Partial<BookElement>) => {
    const maxZIndex = activePage.elements.reduce((max, el) => Math.max(max, el.zIndex), 0);
    
    const defaultTextElement: BookElement = {
      id: generateUUID(),
      type: 'text',
      x: 25,
      y: 40,
      width: 50,
      height: 12,
      rotation: 0,
      zIndex: maxZIndex + 1,
      text: 'Scrivi qui...',
      fontSize: 24,
      fontFamily: 'fredoka',
      color: '#1e293b',
      align: 'center'
    };

    const defaultCharElement: BookElement = {
      id: generateUUID(),
      type: 'character',
      x: 35,
      y: 35,
      width: 25,
      height: 25,
      rotation: 0,
      zIndex: maxZIndex + 1,
      url: PRESET_CHARACTERS[0].url,
      name: PRESET_CHARACTERS[0].name
    };

    const baseElement = type === 'text' ? defaultTextElement : defaultCharElement;
    const finalElement = { ...baseElement, ...details };

    const updatedPages = currentBook.pages.map((p, idx) => {
      if (idx === activePageIndex) {
        return { ...p, elements: [...p.elements, finalElement] };
      }
      return p;
    });

    setCurrentBook(prev => ({
      ...prev,
      pages: updatedPages
    }));
    setSelectedElementId(finalElement.id);
  };

  const handleDeleteElement = (elementId: string) => {
    const updatedElements = activePage.elements.filter(el => el.id !== elementId);
    
    const updatedPages = currentBook.pages.map((p, idx) => {
      if (idx === activePageIndex) {
        return { ...p, elements: updatedElements };
      }
      return p;
    });

    setCurrentBook(prev => ({
      ...prev,
      pages: updatedPages
    }));
    setSelectedElementId(null);
  };

  const handleDuplicateElement = (element: BookElement) => {
    const maxZIndex = activePage.elements.reduce((max, el) => Math.max(max, el.zIndex), 0);
    
    const duplicate: BookElement = {
      ...element,
      id: generateUUID(),
      x: Math.min(90, element.x + 5), // Offset slightly to separate from original
      y: Math.min(90, element.y + 5),
      zIndex: maxZIndex + 1
    };

    const updatedPages = currentBook.pages.map((p, idx) => {
      if (idx === activePageIndex) {
        return { ...p, elements: [...p.elements, duplicate] };
      }
      return p;
    });

    setCurrentBook(prev => ({
      ...prev,
      pages: updatedPages
    }));
    setSelectedElementId(duplicate.id);
  };

  const handleUpdatePageBackground = (
    backgroundUrl: string | undefined, 
    backgroundColor?: string,
    backgroundPattern?: 'none' | 'polka-dots' | 'stripes' | 'stars' | 'hearts' | 'clouds',
    backgroundPatternColor?: string,
    backgroundPatternOpacity?: number,
    backgroundPatternSize?: number
  ) => {
    const updatedPages = currentBook.pages.map((p, idx) => {
      if (idx === activePageIndex) {
        return { 
          ...p, 
          backgroundUrl, 
          backgroundColor: backgroundColor !== undefined ? backgroundColor : p.backgroundColor,
          backgroundPattern: backgroundPattern !== undefined ? backgroundPattern : p.backgroundPattern,
          backgroundPatternColor: backgroundPatternColor !== undefined ? backgroundPatternColor : p.backgroundPatternColor,
          backgroundPatternOpacity: backgroundPatternOpacity !== undefined ? backgroundPatternOpacity : p.backgroundPatternOpacity,
          backgroundPatternSize: backgroundPatternSize !== undefined ? backgroundPatternSize : p.backgroundPatternSize
        };
      }
      return p;
    });

    setCurrentBook(prev => ({
      ...prev,
      pages: updatedPages
    }));
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-100 overflow-hidden text-slate-800">
      
      {/* Top Header Navbar with Save & Export controls */}
      <BookNavbar
        currentBook={currentBook}
        onUpdateBookTitle={handleUpdateBookTitle}
        onUpdateBookAuthor={handleUpdateBookAuthor}
        onNewBook={handleNewBook}
        onSaveBook={handleSaveBook}
        savedBooks={savedBooks}
        onLoadBook={handleLoadBook}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side Sidebar controls */}
        <aside className="w-80 h-full shrink-0 hidden lg:block">
          <SidebarControls
            page={activePage}
            selectedElementId={selectedElementId}
            onUpdateElement={handleUpdateElement}
            onMoveElementDepth={handleMoveElementDepth}
            onAddElement={handleAddElement}
            onUpdatePageBackground={handleUpdatePageBackground}
            onDeleteElement={handleDeleteElement}
            pageIndex={activePageIndex}
            totalPages={currentBook.pages.length}
            onAddPage={handleAddPage}
            onDeletePage={handleDeletePage}
            onDuplicatePage={handleDuplicatePage}
            onNavigatePage={(idx) => {
              setActivePageIndex(idx);
              setSelectedElementId(null);
            }}
          />
        </aside>

        {/* Center WYSIWYG editor viewport */}
        <main className="flex-1 h-full flex flex-col p-4 md:p-6 overflow-y-auto items-center">
          
          {/* Quick Help Header */}
          <div className="w-full max-w-[800px] bg-white p-3 border border-slate-200/80 rounded-xl flex items-center justify-between gap-3 mb-4 shadow-sm text-xs text-slate-600 leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-base">✨</span>
              <p>
                Trascina, ridimensiona e ruota i testi artistici o gli sticker. Puoi anche 
                <strong className="text-slate-800"> caricare i tuoi sfondi e personaggi personali</strong> dalla scheda Media!
              </p>
            </div>
            {/* Quick guide toggle */}
            <div className="flex items-center gap-2 bg-slate-50 text-[10px] py-1 px-2.5 rounded-lg border border-slate-100 font-bold tracking-wide">
              <span>CANVAS 4:3</span>
            </div>
          </div>

          {/* Interactive Canvas Board */}
          <div className="w-full flex-1 flex items-center justify-center min-h-[300px] max-h-[600px]">
            <InteractiveCanvas
              page={activePage}
              selectedElementId={selectedElementId}
              onSelectElement={setSelectedElementId}
              onUpdateElement={handleUpdateElement}
              onMoveElementDepth={handleMoveElementDepth}
              onDeleteElement={handleDeleteElement}
              onDuplicateElement={handleDuplicateElement}
              pageIndex={activePageIndex}
            />
          </div>

          {/* Canvas page-turn bottom bar (Mobile-friendly layout controls) */}
          <div className="w-full max-w-[800px] mt-6 flex items-center justify-between gap-3 px-2">
            
            {/* Prev page button */}
            <button
              onClick={() => {
                setActivePageIndex(Math.max(0, activePageIndex - 1));
                setSelectedElementId(null);
              }}
              disabled={activePageIndex === 0}
              className="flex items-center gap-1.5 py-2 px-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 text-xs font-bold disabled:opacity-40 transition"
            >
              <ChevronLeft size={16} />
              <span>Prec.</span>
            </button>

            {/* Quick indicators stack */}
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur border border-slate-200 p-1.5 rounded-full shadow-sm">
              {currentBook.pages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActivePageIndex(idx);
                    setSelectedElementId(null);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activePageIndex 
                      ? 'bg-blue-600 w-6' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={`Vai alla pagina ${idx + 1}`}
                />
              ))}
            </div>

            {/* Add inline page fast */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleAddPage}
                className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded-xl shadow-sm transition"
                title="Aggiungi una pagina subito"
              >
                <Plus size={16} />
              </button>

              {/* Next page button */}
              <button
                onClick={() => {
                  setActivePageIndex(Math.min(currentBook.pages.length - 1, activePageIndex + 1));
                  setSelectedElementId(null);
                }}
                disabled={activePageIndex === currentBook.pages.length - 1}
                className="flex items-center gap-1.5 py-2 px-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 text-xs font-bold disabled:opacity-40 transition"
              >
                <span>Succ.</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

          {/* Fallback panel for mobile view sidebar triggers */}
          <div className="w-full max-w-[800px] mt-4 lg:hidden bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
            <span className="text-xs font-bold text-slate-700 block mb-3 uppercase tracking-wider">Pannello Strumenti</span>
            <SidebarControls
              page={activePage}
              selectedElementId={selectedElementId}
              onUpdateElement={handleUpdateElement}
              onMoveElementDepth={handleMoveElementDepth}
              onAddElement={handleAddElement}
              onUpdatePageBackground={handleUpdatePageBackground}
              onDeleteElement={handleDeleteElement}
              pageIndex={activePageIndex}
              totalPages={currentBook.pages.length}
              onAddPage={handleAddPage}
              onDeletePage={handleDeletePage}
              onDuplicatePage={handleDuplicatePage}
              onNavigatePage={(idx) => {
                setActivePageIndex(idx);
                setSelectedElementId(null);
              }}
            />
          </div>

        </main>
      </div>

      {/* Floating Save Draft Success Notification Toast */}
      {showSaveToast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-700 animate-slideUp z-50">
          <CheckCircle className="text-emerald-500 shrink-0" size={18} />
          <div className="text-xs">
            <p className="font-bold">Bozza Salvata Correttamente!</p>
            <p className="text-[10px] text-slate-400">La storia è al sicuro sul tuo dispositivo.</p>
          </div>
        </div>
      )}

      {/* Hidden offscreen container for high fidelity multi-page PDF compilation */}
      <div className="absolute top-0 left-0 -translate-x-[9999px] -translate-y-[9999px] overflow-hidden pointer-events-none">
        {currentBook.pages.map((p, idx) => (
          <div
            key={`export-page-${p.id}`}
            id={`book-page-export-${idx}`}
            className="relative w-[800px] h-[600px] overflow-hidden"
            style={{
              backgroundColor: p.backgroundColor,
              backgroundImage: p.backgroundUrl ? `url("${p.backgroundUrl}")` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Background Pattern overlay */}
            {p.backgroundPattern && p.backgroundPattern !== 'none' && (
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={getPatternStyle(
                  p.backgroundPattern,
                  p.backgroundPatternColor,
                  p.backgroundPatternOpacity,
                  p.backgroundPatternSize
                )} 
              />
            )}

            {p.elements.map((element) => {
              const opacity = element.opacity !== undefined ? element.opacity / 100 : 1;
              const filter = getElementFilter(element);
              const shadowStyles = getElementShadowStyle(element);
              const borderStyles = getElementBorderStyle(element);

              const hasBubble = element.type === 'text' && element.bubbleType && element.bubbleType !== 'none';
              const bubbleBg = element.bubbleColor || '#ffffff';
              const bubbleBorder = element.bubbleBorderColor || '#1e293b';

              return (
                <div
                  key={`export-element-${element.id}`}
                  className="absolute flex items-center justify-center rounded-xl"
                  style={{
                    left: `${element.x}%`,
                    top: `${element.y}%`,
                    width: `${element.width}%`,
                    height: `${element.height}%`,
                    zIndex: element.zIndex,
                    transform: `rotate(${element.rotation}deg)`,
                    opacity: opacity,
                    filter: filter,
                    ...shadowStyles,
                    ...borderStyles,
                  }}
                >
                  {element.type === 'text' ? (
                    hasBubble ? (
                      <div 
                        className="relative w-full h-full flex items-center justify-center px-4 py-2 text-center"
                        style={{
                          backgroundColor: bubbleBg,
                          border: `3px solid ${bubbleBorder}`,
                          borderRadius: element.bubbleType === 'cloud' ? '28px' : '16px',
                          boxShadow: '3px 3px 0px rgba(0,0,0,0.15)',
                        }}
                      >
                        {/* Tail graphics for speech bubble */}
                        {element.bubbleType === 'speech' && (
                          <div className="absolute -bottom-3 left-1/4 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px]" style={{ borderTopColor: bubbleBg }}>
                            <div className="absolute -bottom-1 -left-[12px] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] -z-10" style={{ borderTopColor: bubbleBorder }} />
                          </div>
                        )}
                        {element.bubbleType === 'thought' && (
                          <div className="absolute -bottom-4 left-1/4 flex flex-col gap-0.5 items-center">
                            <div className="w-3.5 h-3.5 rounded-full border-[3px]" style={{ backgroundColor: bubbleBg, borderColor: bubbleBorder }} />
                            <div className="w-2 h-2 rounded-full border-2" style={{ backgroundColor: bubbleBg, borderColor: bubbleBorder }} />
                          </div>
                        )}
                        {element.bubbleType === 'cloud' && (
                          <div className="absolute -bottom-2.5 left-1/3 w-4 h-4 rounded-full border-2" style={{ backgroundColor: bubbleBg, borderColor: bubbleBorder }} />
                        )}
                        {element.bubbleType === 'heart' && (
                          <div className="absolute -bottom-3.5 right-1/4 text-sm drop-shadow-md">❤️</div>
                        )}
                        {element.bubbleType === 'banner' && (
                          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2.5 h-6 border-y-2 border-l-2 rounded-l-md" style={{ borderColor: bubbleBorder, backgroundColor: bubbleBg }} />
                        )}

                        <div 
                          className={getArtisticTextClass(element)}
                          style={{ 
                            fontSize: `${element.fontSize || 24}px`,
                            color: element.color || '#1e293b'
                          }}
                        >
                          {element.text}
                        </div>
                      </div>
                    ) : (
                      <div 
                        className={getArtisticTextClass(element)}
                        style={{ 
                          fontSize: `${element.fontSize || 24}px`,
                          color: element.color || '#1e293b'
                        }}
                      >
                        {element.text}
                      </div>
                    )
                  ) : (
                    <img
                      src={element.url}
                      alt={element.name}
                      referrerPolicy="no-referrer"
                      className={`max-w-full max-h-full object-contain ${
                        element.flipX ? 'scale-x-[-1]' : ''
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

    </div>
  );
}
