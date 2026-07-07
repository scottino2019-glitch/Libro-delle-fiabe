import React, { useState } from 'react';
import { Book } from '../types';
import { Download, Save, Plus, FolderOpen, Loader2, Sparkles, User, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface BookNavbarProps {
  currentBook: Book;
  onUpdateBookTitle: (title: string) => void;
  onUpdateBookAuthor: (author: string) => void;
  onNewBook: () => void;
  onSaveBook: () => void;
  savedBooks: Book[];
  onLoadBook: (bookId: string) => void;
}

export default function BookNavbar({
  currentBook,
  onUpdateBookTitle,
  onUpdateBookAuthor,
  onNewBook,
  onSaveBook,
  savedBooks,
  onLoadBook
}: BookNavbarProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [showCatalog, setShowCatalog] = useState(false);

  // High quality multi-page PDF generation engine
  const handleExportToPDF = async () => {
    setIsExporting(true);
    setExportProgress(10);

    try {
      // PDF standard landscape format 4:3 ratio (800 x 600 px)
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [800, 600]
      });

      const pages = currentBook.pages;
      
      for (let i = 0; i < pages.length; i++) {
        setExportProgress(Math.round(10 + (i / pages.length) * 80));
        
        // Target each page in the export render zone
        const element = document.getElementById(`book-page-export-${i}`);
        if (!element) {
          console.warn(`Export DOM element not found for page ${i}`);
          continue;
        }

        // Render target page container using html2canvas
        const canvas = await html2canvas(element, {
          scale: 2, // High resolution double-sampling
          useCORS: true, // Allow cross-origin images (Unsplash)
          allowTaint: false,
          backgroundColor: pages[i].backgroundColor || '#ffffff',
          logging: false
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        
        // If not first page, add a new blank landscape page to PDF
        if (i > 0) {
          doc.addPage([800, 600], 'landscape');
        }

        // Add page canvas capture directly into PDF spanning full page
        doc.addImage(imgData, 'JPEG', 0, 0, 800, 600);
      }

      setExportProgress(95);
      
      // Clean up title for filename
      const filename = currentBook.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'mio-libro-illustrato';
      doc.save(`${filename}.pdf`);
      
    } catch (err) {
      console.error('Errore durante l\'esportazione PDF:', err);
      alert('Impossibile generare il PDF. Verifica se le immagini sono state caricate correttamente.');
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  return (
    <header className="w-full bg-slate-900 text-white shadow-md z-40 select-none">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* App Branding logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-lg shadow-lg">
            📖
          </div>
          <div className="hidden sm:block">
            <h1 className="font-fredoka font-bold text-sm leading-tight tracking-wide text-white flex items-center gap-1">
              Fiabe Illustrate 📖
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">Disegna & Scrivi Storie per Bambini</p>
          </div>
        </div>

        {/* Book Title & Author Editable Fields */}
        <div className="flex-1 max-w-xl flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 rounded-xl transition">
          <FileText size={14} className="text-slate-400 shrink-0" />
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 min-w-0">
            <input
              type="text"
              value={currentBook.title}
              onChange={(e) => onUpdateBookTitle(e.target.value)}
              placeholder="Titolo del tuo libro..."
              className="text-xs sm:text-sm font-bold text-slate-100 placeholder-slate-500 bg-transparent border-none p-0 focus:ring-0 focus:outline-none truncate w-full"
            />
            <span className="hidden sm:inline text-xs text-slate-500 font-bold">|</span>
            <div className="flex items-center gap-1 shrink-0">
              <User size={11} className="text-slate-500" />
              <input
                type="text"
                value={currentBook.author}
                onChange={(e) => onUpdateBookAuthor(e.target.value)}
                placeholder="Autore..."
                className="text-[11px] font-medium text-slate-300 placeholder-slate-600 bg-transparent border-none p-0 focus:ring-0 focus:outline-none truncate max-w-[120px]"
              />
            </div>
          </div>
        </div>

        {/* Global Toolbar Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Catalog open toggle */}
          <div className="relative">
            <button
              onClick={() => setShowCatalog(!showCatalog)}
              className="flex items-center gap-1.5 py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition border border-slate-700 shadow-sm"
            >
              <FolderOpen size={13} />
              <span className="hidden md:inline">I Miei Libri ({savedBooks.length})</span>
            </button>

            {showCatalog && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden text-slate-800 z-50 animate-fadeIn">
                <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">I Miei Progetti Salvati</span>
                  <button 
                    onClick={onNewBook}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded-full transition"
                    title="Nuovo Libro"
                  >
                    <Plus size={15} />
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                  {savedBooks.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      Nessun libro salvato nel browser. Clicca su "Salva" per iniziare!
                    </div>
                  ) : (
                    savedBooks.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => {
                          onLoadBook(b.id);
                          setShowCatalog(false);
                        }}
                        className={`w-full text-left p-3 hover:bg-slate-50 flex items-center justify-between gap-3 transition ${currentBook.id === b.id ? 'bg-blue-50/40' : ''}`}
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">{b.title || 'Senza Titolo'}</p>
                          <p className="text-[10px] text-slate-400">Scritto da: {b.author || 'Anonimo'}</p>
                          <p className="text-[9px] text-slate-400 mt-0.5">{b.pages.length} pagine • {new Date(b.updatedAt).toLocaleDateString()}</p>
                        </div>
                        {currentBook.id === b.id && (
                          <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-bold">Attivo</span>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* New Book button */}
          <button
            onClick={onNewBook}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition border border-slate-700 shadow-sm"
            title="Nuovo Libro"
          >
            <Plus size={14} />
          </button>

          {/* Save locally button */}
          <button
            onClick={onSaveBook}
            className="flex items-center gap-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow transition"
            title="Salva bozza"
          >
            <Save size={13} />
            <span className="hidden sm:inline">Salva Bozza</span>
          </button>

          {/* Export PDF trigger */}
          <button
            onClick={handleExportToPDF}
            disabled={isExporting}
            className="flex items-center gap-1.5 py-1.5 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-bold shadow-lg disabled:opacity-50 transition"
          >
            {isExporting ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                <span className="hidden sm:inline">Esportazione ({exportProgress}%)</span>
              </>
            ) : (
              <>
                <Download size={13} />
                <span>Esporta PDF</span>
              </>
            )}
          </button>

        </div>
      </div>

      {/* Modern exporting progress overlay */}
      {isExporting && (
        <div className="fixed inset-0 bg-slate-900/70 flex flex-col items-center justify-center gap-4 z-50 select-none animate-fadeIn">
          <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm w-[90%] border border-slate-200">
            <div className="relative">
              <Loader2 size={48} className="text-blue-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center font-bold text-xs">
                🎨
              </div>
            </div>
            <div>
              <h3 className="font-fredoka font-bold text-slate-800">Compilazione PDF in corso</h3>
              <p className="text-xs text-slate-500 mt-1">Stiamo fotografando ad alta definizione e impaginando le pagine del tuo libro...</p>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-slate-600">{exportProgress}%</span>
          </div>
        </div>
      )}
    </header>
  );
}
