import React, { useState, useEffect, useRef } from 'react';
import { X, Minus } from 'lucide-react';

interface WindowProps {
  title: string;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
  zIndex: number;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  isEmergency?: boolean;
}

const Window: React.FC<WindowProps> = ({ 
  title, 
  isActive, 
  onClose, 
  onMinimize,
  onFocus,
  children,
  zIndex,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 600, height: 450 },
  isEmergency = false
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });

  // Visual States
  const mainColor = isEmergency ? 'border-red-500' : 'border-magi-orange';
  const dimColor = isEmergency ? 'border-red-500/30' : 'border-magi-orange/30';
  
  const borderColor = isActive ? mainColor : dimColor;
  const bgColor = 'bg-black/95'; 
  
  const titleBgActive = isEmergency ? 'bg-red-500 text-black' : 'bg-magi-orange text-black';
  const titleBgInactive = isEmergency ? 'bg-magi-dark text-red-500 border-b border-red-500/30' : 'bg-magi-dark text-magi-orange border-b border-magi-orange/30';
  const titleBg = isActive ? titleBgActive : titleBgInactive;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStartPos.current.x,
          y: e.clientY - dragStartPos.current.y
        });
      }
      if (isResizing) {
        const deltaX = e.clientX - resizeStartPos.current.x;
        const deltaY = e.clientY - resizeStartPos.current.y;
        
        setSize({
          width: Math.max(400, startSize.current.width + deltaX),
          height: Math.max(300, startSize.current.height + deltaY)
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);

  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    onFocus(); // Bring to front
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    document.body.style.userSelect = 'none';
  };

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    resizeStartPos.current = { x: e.clientX, y: e.clientY };
    startSize.current = { width: size.width, height: size.height };
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'se-resize';
  };

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose();
    }
  };

  return (
    <div 
      className={`fixed flex flex-col border-2 ${borderColor} ${bgColor} shadow-[0_0_0_1px_rgba(0,0,0,1)] group ${isClosing ? 'animate-window-close' : 'animate-window-open'} transition-colors duration-500`}
      style={{ 
        zIndex, 
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        transformOrigin: 'top left' 
      }}
      onMouseDown={onFocus}
      onAnimationEnd={handleAnimationEnd}
    >
      {/* Tactical Corner Brackets */}
      <div className={`absolute -top-[2px] -left-[2px] w-4 h-4 border-t-4 border-l-4 ${isActive ? (isEmergency ? 'border-red-500' : 'border-magi-orange') : (isEmergency ? 'border-red-500/50' : 'border-magi-orange/50')} z-20 pointer-events-none transition-colors`}></div>
      <div className={`absolute -top-[2px] -right-[2px] w-4 h-4 border-t-4 border-r-4 ${isActive ? (isEmergency ? 'border-red-500' : 'border-magi-orange') : (isEmergency ? 'border-red-500/50' : 'border-magi-orange/50')} z-20 pointer-events-none transition-colors`}></div>
      <div className={`absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-4 border-l-4 ${isActive ? (isEmergency ? 'border-red-500' : 'border-magi-orange') : (isEmergency ? 'border-red-500/50' : 'border-magi-orange/50')} z-20 pointer-events-none transition-colors`}></div>
      <div className={`absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b-4 border-r-4 ${isActive ? (isEmergency ? 'border-red-500' : 'border-magi-orange') : (isEmergency ? 'border-red-500/50' : 'border-magi-orange/50')} z-20 pointer-events-none transition-colors`}></div>

      {/* Title Bar */}
      <div 
        className={`flex justify-between items-center px-3 py-1 ${titleBg} select-none cursor-move shrink-0 relative overflow-hidden transition-colors duration-500`}
        onMouseDown={startDrag}
      >
        {/* Striped pattern overlay for title bar */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjIiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')]"></div>

        <div className="font-bold font-mono text-sm tracking-[0.2em] uppercase truncate max-w-[80%] z-10 flex items-center gap-2">
           <span className="text-[10px] opacity-70">WIN_ID:{zIndex.toString().padStart(3, '0')} //</span>
           {title}
        </div>
        
        <div className="flex gap-1 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }} 
            className={`p-0.5 hover:bg-white hover:text-black border border-current transition-colors ${isActive ? 'border-black' : (isEmergency ? 'border-red-500' : 'border-magi-orange')}`}
          >
            <Minus size={12} strokeWidth={3} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleClose(); }} 
            className={`p-0.5 hover:bg-magi-red hover:text-white hover:border-magi-red border border-current transition-colors ${isActive ? 'border-black' : (isEmergency ? 'border-red-500' : 'border-magi-orange')}`}
          >
            <X size={12} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative flex flex-col min-h-0 bg-black/50 backdrop-blur-sm">
        {/* Inner grid lines */}
        <div className={`absolute inset-0 pointer-events-none opacity-5 bg-[size:20px_20px] ${isEmergency ? 'bg-[linear-gradient(to_right,#ef4444_1px,transparent_1px),linear-gradient(to_bottom,#ef4444_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#ff9900_1px,transparent_1px),linear-gradient(to_bottom,#ff9900_1px,transparent_1px)]'}`}></div>
        
        <div className="relative z-10 w-full h-full flex flex-col">
          {children}
        </div>

        {/* Resize Handle */}
        <div 
            className="absolute bottom-1 right-1 w-6 h-6 cursor-se-resize z-50 flex items-end justify-end group p-1"
            onMouseDown={startResize}
        >
            <div className="w-full h-full flex flex-col items-end justify-end gap-0.5">
                <div className={`w-4 h-0.5 ${isEmergency ? 'bg-red-500/50 group-hover:bg-red-500' : 'bg-magi-orange/50 group-hover:bg-magi-orange'}`}></div>
                <div className={`w-3 h-0.5 ${isEmergency ? 'bg-red-500/50 group-hover:bg-red-500' : 'bg-magi-orange/50 group-hover:bg-magi-orange'}`}></div>
                <div className={`w-2 h-0.5 ${isEmergency ? 'bg-red-500/50 group-hover:bg-red-500' : 'bg-magi-orange/50 group-hover:bg-magi-orange'}`}></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Window;