import React, { useRef, useState, useEffect } from 'react';
import { BookPage, BookElement } from '../types';
import { Trash2, RotateCw, Maximize2, Move, Copy, ArrowUp, ArrowDown, FlipHorizontal, ChevronsUp, ChevronsDown } from 'lucide-react';
import { 
  getArtisticTextClass, 
  getElementFilter, 
  getElementBorderStyle, 
  getElementShadowStyle, 
  getPatternStyle 
} from '../utils';

interface InteractiveCanvasProps {
  page: BookPage;
  selectedElementId: string | null;
  onSelectElement: (elementId: string | null) => void;
  onUpdateElement: (elementId: string, updates: Partial<BookElement>) => void;
  onMoveElementDepth: (elementId: string, action: 'forward' | 'backward' | 'front' | 'back') => void;
  onDeleteElement: (elementId: string) => void;
  onDuplicateElement: (element: BookElement) => void;
  pageIndex: number;
}

export default function InteractiveCanvas({
  page,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
  onMoveElementDepth,
  onDeleteElement,
  onDuplicateElement,
  pageIndex
}: InteractiveCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [dragStart, setDragStart] = useState({ mouseX: 0, mouseY: 0, elemX: 0, elemY: 0 });
  const [resizeStart, setResizeStart] = useState({ mouseX: 0, mouseY: 0, elemW: 0, elemH: 0 });
  const [rotateStart, setRotateStart] = useState({ centerX: 0, centerY: 0, startAngle: 0, elemRot: 0 });

  // Deselect when clicking the canvas background
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).classList.contains('canvas-background')) {
      onSelectElement(null);
    }
  };

  // Convert pixel drag offsets into canvas percentage offsets
  const handleElementMouseDown = (e: React.MouseEvent, element: BookElement) => {
    e.stopPropagation();
    onSelectElement(element.id);
    
    setIsDragging(true);
    setDragStart({
      mouseX: e.clientX,
      mouseY: e.clientY,
      elemX: element.x,
      elemY: element.y
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent, element: BookElement) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      mouseX: e.clientX,
      mouseY: e.clientY,
      elemW: element.width,
      elemH: element.height
    });
  };

  const handleRotateMouseDown = (e: React.MouseEvent, element: BookElement) => {
    e.stopPropagation();
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    // Element's center in screen coordinates
    const elemLeft = rect.left + (element.x + element.width / 2) * (rect.width / 100);
    const elemTop = rect.top + (element.y + element.height / 2) * (rect.height / 100);

    const angle = Math.atan2(e.clientY - elemTop, e.clientX - elemLeft);
    
    setIsRotating(true);
    setRotateStart({
      centerX: elemLeft,
      centerY: elemTop,
      startAngle: angle,
      elemRot: element.rotation
    });
  };

  // Global mouse handlers for Dragging, Resizing, and Rotating
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current || !selectedElementId) return;
      const element = page.elements.find(el => el.id === selectedElementId);
      if (!element) return;

      const rect = canvasRef.current.getBoundingClientRect();

      if (isDragging) {
        const deltaX = e.clientX - dragStart.mouseX;
        const deltaY = e.clientY - dragStart.mouseY;
        
        const pctX = (deltaX / rect.width) * 100;
        const pctY = (deltaY / rect.height) * 100;

        let newX = Math.max(-20, Math.min(100, dragStart.elemX + pctX));
        let newY = Math.max(-20, Math.min(100, dragStart.elemY + pctY));

        onUpdateElement(selectedElementId, { x: parseFloat(newX.toFixed(2)), y: parseFloat(newY.toFixed(2)) });
      }

      if (isResizing) {
        const deltaX = e.clientX - resizeStart.mouseX;
        const deltaY = e.clientY - resizeStart.mouseY;

        const pctW = (deltaX / rect.width) * 100;
        const pctH = (deltaY / rect.height) * 100;

        let newW = Math.max(5, Math.min(100, resizeStart.elemW + pctW));
        let newH = Math.max(5, Math.min(100, resizeStart.elemH + pctH));

        onUpdateElement(selectedElementId, { 
          width: parseFloat(newW.toFixed(2)), 
          height: parseFloat(newH.toFixed(2)) 
        });
      }

      if (isRotating) {
        const currentAngle = Math.atan2(e.clientY - rotateStart.centerY, e.clientX - rotateStart.centerX);
        const deltaAngle = currentAngle - rotateStart.startAngle;
        
        let deg = rotateStart.elemRot + (deltaAngle * 180) / Math.PI;
        deg = (deg + 360) % 360;

        onUpdateElement(selectedElementId, { rotation: Math.round(deg) });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setIsRotating(false);
    };

    if (isDragging || isResizing || isRotating) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, isRotating, selectedElementId, page, dragStart, resizeStart, rotateStart]);

  const getStyleObject = (element: BookElement) => {
    const isSelected = selectedElementId === element.id;
    const opacity = element.opacity !== undefined ? element.opacity / 100 : 1;
    const filter = getElementFilter(element);
    const shadowStyles = getElementShadowStyle(element);
    const borderStyles = getElementBorderStyle(element);

    return {
      left: `${element.x}%`,
      top: `${element.y}%`,
      width: `${element.width}%`,
      height: `${element.height}%`,
      zIndex: element.zIndex,
      transform: `rotate(${element.rotation}deg)`,
      outline: isSelected ? '2px dashed #2563eb' : 'none',
      opacity: opacity,
      filter: filter,
      ...shadowStyles,
      ...borderStyles,
    };
  };

  const sortedElements = [...page.elements].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Current selection label */}
      <div className="mb-2 flex items-center justify-between w-full max-w-[800px] px-2 text-xs text-slate-500 font-medium">
        <span>Pagina {pageIndex + 1} ({page.elements.length} elementi)</span>
        {selectedElementId && (
          <div className="flex items-center gap-1.5 bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200 text-[10px] font-bold uppercase tracking-wider animate-pulse">
            ✨ Modifica in corso
          </div>
        )}
      </div>

      {/* 4:3 Locked aspect-ratio canvas stage container */}
      <div 
        id={`book-page-render-${pageIndex}`}
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="relative w-full max-w-[800px] aspect-[4/3] bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-slate-700 select-none cursor-default transition-all duration-300"
        style={{
          backgroundColor: page.backgroundColor,
          backgroundImage: page.backgroundUrl ? `url("${page.backgroundUrl}")` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Layer 0: Cute repeating pattern overlays */}
        {page.backgroundPattern && page.backgroundPattern !== 'none' && (
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={getPatternStyle(
              page.backgroundPattern,
              page.backgroundPatternColor,
              page.backgroundPatternOpacity,
              page.backgroundPatternSize
            )} 
          />
        )}

        {/* Help prompt on empty canvas */}
        {page.elements.length === 0 && !page.backgroundUrl && (
          <div className="canvas-background absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-slate-400 pointer-events-none">
            <span className="text-5xl mb-3">🎨</span>
            <p className="font-fredoka text-lg font-bold text-slate-600">La pagina è una tela bianca!</p>
            <p className="text-xs max-w-sm mt-1 text-slate-400 leading-relaxed font-medium">
              Scegli un bellissimo colore pastello, aggiungi un pattern a stelline o cuori e trascina i simpatici sticker vettoriali per inventare la tua storia!
            </p>
          </div>
        )}

        {/* Dynamic elements layer */}
        {sortedElements.map((element) => {
          const isSelected = selectedElementId === element.id;
          
          // Render variables for speech bubbles
          const hasBubble = element.type === 'text' && element.bubbleType && element.bubbleType !== 'none';
          const bubbleBg = element.bubbleColor || '#ffffff';
          const bubbleBorder = element.bubbleBorderColor || '#1e293b';

          return (
            <div
              key={element.id}
              style={getStyleObject(element)}
              className={`absolute group cursor-move select-none rounded-xl`}
              onMouseDown={(e) => handleElementMouseDown(e, element)}
            >
              {/* Element rendering */}
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* 1. TEXT ELEMENT (Normal or speech bubble) */}
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
                  /* 2. CHARACTER STICKER ELEMENT */
                  <img
                    src={element.url}
                    alt={element.name || 'Sticker'}
                    referrerPolicy="no-referrer"
                    className={`max-w-full max-h-full object-contain select-none pointer-events-none ${
                      element.flipX ? 'scale-x-[-1]' : ''
                    }`}
                  />
                )}

                {/* Selected Element Controls Frame (Handles) */}
                {isSelected && (
                  <>
                    {/* Bounding box outline */}
                    <div className="absolute inset-0 border-2 border-blue-600 pointer-events-none rounded-xl" />

                    {/* Hover tooltip bar */}
                    <div 
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      className="absolute -top-14 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-slate-950 text-white p-1.5 rounded-2xl shadow-2xl z-50 border border-slate-700 max-w-max shrink-0"
                    >
                      {/* Primo Piano */}
                      <button
                        title="Porta in Primo Piano"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMoveElementDepth(element.id, 'front');
                        }}
                        className="p-2 hover:bg-slate-800 rounded-xl transition flex items-center justify-center text-indigo-400 hover:text-indigo-300"
                      >
                        <ChevronsUp size={15} />
                      </button>

                      {/* Porta Sopra (Avanti) */}
                      <button
                        title="Porta Avanti"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMoveElementDepth(element.id, 'forward');
                        }}
                        className="p-2 hover:bg-slate-800 rounded-xl transition flex items-center justify-center text-blue-400 hover:text-blue-300"
                      >
                        <ArrowUp size={15} />
                      </button>

                      {/* Invia Sotto (Dietro) */}
                      <button
                        title="Invia Dietro"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMoveElementDepth(element.id, 'backward');
                        }}
                        className="p-2 hover:bg-slate-800 rounded-xl transition flex items-center justify-center text-blue-400 hover:text-blue-300"
                      >
                        <ArrowDown size={15} />
                      </button>

                      {/* Invia in Fondo */}
                      <button
                        title="Invia in Fondo"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMoveElementDepth(element.id, 'back');
                        }}
                        className="p-2 hover:bg-slate-800 rounded-xl transition flex items-center justify-center text-indigo-400 hover:text-indigo-300"
                      >
                        <ChevronsDown size={15} />
                      </button>

                      <div className="w-[1px] h-5 bg-slate-700 mx-0.5" />

                      {element.type === 'character' && (
                        <button
                          title="Rifletti / Specchia"
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateElement(element.id, { flipX: !element.flipX });
                          }}
                          className="p-2 hover:bg-slate-800 rounded-xl transition flex items-center justify-center text-emerald-400 hover:text-emerald-300"
                        >
                          <FlipHorizontal size={15} />
                        </button>
                      )}

                      <button
                        title="Duplica"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDuplicateElement(element);
                        }}
                        className="p-2 hover:bg-slate-800 rounded-xl transition flex items-center justify-center text-amber-400 hover:text-amber-300"
                      >
                        <Copy size={15} />
                      </button>

                      <button
                        title="Elimina"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteElement(element.id);
                        }}
                        className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-xl transition flex items-center justify-center"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Drag Handle Top Left Icon */}
                    <div className="absolute -top-3 -left-3 p-1.5 bg-blue-600 rounded-full text-white pointer-events-none shadow-lg">
                      <Move size={10} />
                    </div>

                    {/* Rotate Handle */}
                    <div
                      onMouseDown={(e) => handleRotateMouseDown(e, element)}
                      className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-400 text-slate-900 border-2 border-yellow-500 rounded-full flex items-center justify-center cursor-alias shadow-md hover:scale-110 transition"
                    >
                      <RotateCw size={11} />
                    </div>

                    {/* Resize Handle (Bottom-Right) */}
                    <div
                      onMouseDown={(e) => handleResizeMouseDown(e, element)}
                      className="absolute -bottom-3 -right-3 w-6 h-6 bg-blue-600 text-white border-2 border-blue-700 rounded-full flex items-center justify-center cursor-se-resize shadow-md hover:scale-110 transition"
                    >
                      <Maximize2 size={11} />
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
