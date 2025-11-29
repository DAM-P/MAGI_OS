
import React, { useState, useEffect } from 'react';
import { WindowState, Language } from './types';
import { Globe, Database, Cpu, Activity, Clock, TerminalSquare, AlertCircle, Shield, Users, AlertTriangle } from 'lucide-react';
import Window from './components/Window';
import MagiOracle from './components/apps/MagiOracle';
import FileManager from './components/apps/FileManager';
import PersonnelGraph from './components/apps/PersonnelGraph';
import TerminalApp from './components/apps/TerminalApp';

// UI Dictionary
const UI_TEXT = {
  EN: {
    systemName: "MAGI SYSTEM",
    version: "VER. 7.77",
    internalOnly: "NERV TACTICAL OPERATIONS",
    geofront: "TOKYO-3 GEOFRONT",
    initializing: "INITIALIZING MAGI OS...",
    status: "STATUS: NORMAL",
    statusEmer: "STATUS: EMERGENCY",
    priority: "PRIORITY: AAA",
    apps: {
      magi: "MAGI_SYS",
      archives: "ARCHIVES",
      terminal: "TERMINAL",
      personnel: "PERSONNEL GRAPH"
    }
  },
  CN: {
    systemName: "MAGI 系统",
    version: "版本 7.77",
    internalOnly: "NERV 战术作战部",
    geofront: "第三新东京市地下都市",
    initializing: "正在初始化 MAGI 操作系统...",
    status: "状态：正常",
    statusEmer: "状态：紧急事态",
    priority: "优先级：AAA",
    apps: {
      magi: "MAGI 决策系统",
      archives: "数据档案",
      terminal: "终端",
      personnel: "人员关系拓扑"
    }
  }
};

interface HoneycombBackgroundProps {
    isEmergency?: boolean;
}

const HoneycombBackground: React.FC<HoneycombBackgroundProps> = ({ isEmergency }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${isEmergency ? 'opacity-30' : 'opacity-20'} z-0 transition-opacity duration-500`}>
    <svg width="100%" height="100%">
      <defs>
        <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
          <path d="M25 0 L50 12.5 L50 37.5 L25 50 L0 37.5 L0 12.5 Z" fill="none" stroke={isEmergency ? "#ef4444" : "#ff9900"} strokeWidth="0.5" className="transition-colors duration-500" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
    {/* Large Background Logo Outline */}
    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] border rounded-full flex items-center justify-center transition-colors duration-500 ${isEmergency ? 'border-red-500/20' : 'border-magi-orange/10'}`}>
        <div className={`w-[60vh] h-[60vh] border rotate-45 transition-colors duration-500 ${isEmergency ? 'border-red-500/20' : 'border-magi-orange/10'}`}></div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [booting, setBooting] = useState(true);
  const [language, setLanguage] = useState<Language>('CN');
  const [isEmergency, setIsEmergency] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [time, setTime] = useState(new Date());

  const text = UI_TEXT[language];

  // Theme constants
  const mainColor = isEmergency ? 'text-red-500' : 'text-magi-orange';
  const borderColor = isEmergency ? 'border-red-500' : 'border-magi-orange';
  const accentBg = isEmergency ? 'bg-red-500' : 'bg-magi-orange';
  const dimBorder = isEmergency ? 'border-red-500/50' : 'border-magi-orange/50';

  // Boot sequence
  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2000);
    const clockTimer = setInterval(() => setTime(new Date()), 1000);
    return () => { clearTimeout(timer); clearInterval(clockTimer); };
  }, []);

  // Window Management
  const openWindow = (appId: WindowState['appId']) => {
    const existingWindow = windows.find(w => w.appId === appId);
    if (existingWindow) {
      focusWindow(existingWindow.id);
      return;
    }

    const offset = windows.length * 40;
    const initialPosition = { x: 300 + offset, y: 100 + offset }; // Start further right due to sidebar
    
    // Determine initial size based on App ID
    let initialSize = { width: 800, height: 600 };
    if (appId === 'MAGI') initialSize = { width: 900, height: 700 };
    if (appId === 'PERSONNEL') initialSize = { width: 850, height: 650 };
    if (appId === 'TERMINAL') initialSize = { width: 700, height: 500 };

    const newWindow: WindowState = {
      id: Date.now().toString(),
      appId,
      title: getWindowTitle(appId),
      isOpen: true,
      isMinimized: false,
      zIndex: maxZIndex + 1,
    };

    (newWindow as any).initialPosition = initialPosition;
    (newWindow as any).initialSize = initialSize;

    setWindows([...windows, newWindow]);
    setActiveWindowId(newWindow.id);
    setMaxZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    setActiveWindowId(null);
  };

  const focusWindow = (id: string) => {
    const w = windows.find(w => w.id === id);
    if (w?.isMinimized) {
        setWindows(windows.map(win => win.id === id ? { ...win, isMinimized: false, zIndex: maxZIndex + 1 } : win));
    } else {
        setWindows(windows.map(win => win.id === id ? { ...win, zIndex: maxZIndex + 1 } : win));
    }
    setActiveWindowId(id);
    setMaxZIndex(prev => prev + 1);
  };

  const getWindowTitle = (appId: string) => {
    switch(appId) {
        case 'MAGI': return text.apps.magi;
        case 'FILES': return text.apps.archives;
        case 'PERSONNEL': return text.apps.personnel;
        case 'TERMINAL': return text.apps.terminal;
        default: return appId;
    }
  };
  
  useEffect(() => {
      setWindows(prev => prev.map(w => ({ ...w, title: getWindowTitle(w.appId) })));
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'CN' : 'EN');
  };

  const toggleEmergency = () => {
    const newState = !isEmergency;
    setIsEmergency(newState);
    if (newState) {
        // Play alert sound logic here if we had sounds
    }
  };

  if (booting) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-magi-orange font-mono relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIi8+CjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiMzMzMiLz4KPC9zdmc+')] opacity-20"></div>
        <div className="text-6xl font-black tracking-tighter mb-4 animate-pulse">MAGI</div>
        <div className="text-xl tracking-[0.5em] animate-pulse">{text.initializing}</div>
        <div className="mt-8 flex gap-2">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-magi-orange animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`h-screen w-screen bg-black ${mainColor} font-mono relative overflow-hidden flex flex-col selection:bg-magi-orange selection:text-black transition-colors duration-1000`}>
      
      {/* --- Emergency Overlay --- */}
      {isEmergency && (
         <div className="absolute inset-0 z-[60] pointer-events-none flex flex-col items-center justify-center overflow-hidden animate-in fade-in duration-300">
             {/* Red Tint */}
             <div className="absolute inset-0 bg-red-900/10 z-0"></div>
             
             {/* Big Text Banner */}
             <div className="bg-black/80 border-y-4 border-red-500 w-full py-8 flex items-center justify-center animate-flash z-10 shadow-[0_0_50px_rgba(239,68,68,0.5)] transform -skew-y-2">
                <div className="text-red-500 font-black text-6xl md:text-9xl tracking-[0.2em] italic flex items-center gap-8">
                     <AlertTriangle size={80} className="hidden md:block" />
                     EMERGENCY
                     <AlertTriangle size={80} className="hidden md:block" />
                </div>
             </div>
             
             {/* Secondary Warning Text */}
             <div className="absolute bottom-20 text-red-500 text-center font-bold tracking-widest animate-pulse">
                <div>PATTERN BLUE DETECTED</div>
                <div>ALL PERSONNEL TO BATTLE STATIONS</div>
             </div>

             {/* Hexagon Pattern Overlay */}
             <div className="absolute inset-0 z-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+PHBhdGggZD0iTTI1IDAgTDUwIDEyLjUgTDUwIDM3LjUgTDI1IDUwIEwwIDM3LjUgTDAgMTIuNSBaIiBmaWxsPSJub25lIiBzdHJva2U9IiNlZjQ0NDQiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] animate-pulse-fast"></div>
         </div>
      )}

      <HoneycombBackground isEmergency={isEmergency} />
      
      {/* HUD Overlay - Corners */}
      <div className={`absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 ${dimBorder} pointer-events-none z-50 m-4 transition-colors`}></div>
      <div className={`absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 ${dimBorder} pointer-events-none z-50 m-4 transition-colors`}></div>
      <div className={`absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 ${dimBorder} pointer-events-none z-50 m-4 transition-colors`}></div>
      <div className={`absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 ${dimBorder} pointer-events-none z-50 m-4 transition-colors`}></div>

      {/* Top Bar */}
      <header className={`relative z-50 bg-black border-b-2 ${borderColor} h-12 flex items-center justify-between px-4 select-none shrink-0 transition-colors duration-500`}>
        <div className="flex items-center gap-6">
          <div className={`${accentBg} text-black font-black px-2 text-xl tracking-tighter skewed-box transition-colors duration-500`}>
             {text.systemName}
          </div>
          <div className={`hidden md:flex flex-col text-[10px] leading-tight opacity-70 border-l ${dimBorder} pl-2`}>
             <span>{text.internalOnly}</span>
             <span className="tracking-widest">{text.geofront}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           {/* Fake Data Readouts */}
           <div className="hidden lg:flex gap-4 text-[10px] font-bold opacity-60">
              <span className="animate-pulse">CPU: {isEmergency ? '99' : Math.floor(Math.random() * 30 + 10)}%</span>
              <span>MEM: 128TB</span>
              <span className={`${isEmergency ? 'text-red-500' : 'text-magi-red'} animate-pulse`}>SYNC: {isEmergency ? '12.8%' : '99.8%'}</span>
           </div>

           <div className={`h-8 w-[1px] ${dimBorder} mx-2`}></div>

           <div className="flex items-center gap-2">
             <div className="text-xl font-bold">{time.toLocaleTimeString([], { hour12: false })}</div>
             <div className="text-[10px] flex flex-col">
                <span>{time.toISOString().split('T')[0]}</span>
                <span className="text-right">JST</span>
             </div>
           </div>
           
           <button 
            onClick={toggleEmergency}
            className={`flex items-center gap-2 text-xs border-2 ${isEmergency ? 'border-red-500 bg-red-500 text-black' : 'border-magi-orange hover:bg-magi-orange hover:text-black'} px-2 py-1 transition-colors font-bold animate-pulse`}
          >
            <AlertCircle size={12} />
            {isEmergency ? 'CLR_EMERGENCY' : 'EMERGENCY'}
          </button>

           <button 
            onClick={toggleLanguage}
            className={`flex items-center gap-2 text-xs border-2 ${borderColor} px-2 py-1 ${isEmergency ? 'hover:bg-red-500' : 'hover:bg-magi-orange'} hover:text-black transition-colors font-bold`}
          >
            <Globe size={12} />
            {language === 'EN' ? 'CN' : 'EN'}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative z-10">
          
          {/* Tactical Sidebar */}
          <aside className={`w-64 bg-black/80 border-r-2 ${dimBorder} flex flex-col p-4 gap-6 shrink-0 relative backdrop-blur-sm z-40 transition-colors duration-500`}>
             {/* Decorative header for sidebar */}
             <div className={`text-[10px] tracking-widest border-b ${dimBorder} pb-2 mb-2 opacity-70`}>
                APPLICATION LAUNCHER
             </div>

             <button 
                onClick={() => openWindow('MAGI')}
                className={`group relative flex items-center gap-4 p-4 border ${dimBorder} ${isEmergency ? 'hover:bg-red-500/10 hover:border-red-500' : 'hover:bg-magi-orange/10 hover:border-magi-orange'} transition-all text-left`}
             >
                <div className={`absolute top-0 left-0 ${accentBg} text-black text-[10px] px-1 font-bold`}>01</div>
                <Cpu className="w-8 h-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                    <span className="font-bold text-lg tracking-wider">{text.apps.magi}</span>
                    <span className="text-[10px] opacity-50">DECISION SUPPORT</span>
                </div>
                {/* Hover bracket effect */}
                <div className={`absolute right-2 top-1/2 -translate-y-1/2 w-1 h-8 ${accentBg} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
             </button>

             <button 
                onClick={() => openWindow('FILES')}
                className={`group relative flex items-center gap-4 p-4 border ${dimBorder} ${isEmergency ? 'hover:bg-red-500/10 hover:border-red-500' : 'hover:bg-magi-orange/10 hover:border-magi-orange'} transition-all text-left`}
             >
                <div className={`absolute top-0 left-0 ${accentBg} text-black text-[10px] px-1 font-bold`}>02</div>
                <Database className="w-8 h-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                    <span className="font-bold text-lg tracking-wider">{text.apps.archives}</span>
                    <span className="text-[10px] opacity-50">DATA BANKS</span>
                </div>
                <div className={`absolute right-2 top-1/2 -translate-y-1/2 w-1 h-8 ${accentBg} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
             </button>

             <button 
                onClick={() => openWindow('PERSONNEL')}
                className={`group relative flex items-center gap-4 p-4 border ${dimBorder} ${isEmergency ? 'hover:bg-red-500/10 hover:border-red-500' : 'hover:bg-magi-orange/10 hover:border-magi-orange'} transition-all text-left`}
             >
                <div className={`absolute top-0 left-0 ${accentBg} text-black text-[10px] px-1 font-bold`}>03</div>
                <Users className="w-8 h-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                    <span className="font-bold text-lg tracking-wider">{text.apps.personnel}</span>
                    <span className="text-[10px] opacity-50">TOPOLOGY</span>
                </div>
                <div className={`absolute right-2 top-1/2 -translate-y-1/2 w-1 h-8 ${accentBg} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
             </button>

             <button 
                onClick={() => openWindow('TERMINAL')}
                className={`group relative flex items-center gap-4 p-4 border ${dimBorder} ${isEmergency ? 'hover:bg-red-500/10 hover:border-red-500' : 'hover:bg-magi-orange/10 hover:border-magi-orange'} transition-all text-left`}
             >
                <div className={`absolute top-0 left-0 ${accentBg} text-black text-[10px] px-1 font-bold`}>04</div>
                <TerminalSquare className="w-8 h-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                    <span className="font-bold text-lg tracking-wider">{text.apps.terminal}</span>
                    <span className="text-[10px] opacity-50">SYS.CONSOLE</span>
                </div>
                <div className={`absolute right-2 top-1/2 -translate-y-1/2 w-1 h-8 ${accentBg} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
             </button>

             {/* Decorative filler */}
             <div className="mt-auto opacity-30 flex flex-col gap-2">
                 <div className={`h-[1px] ${accentBg} w-full`}></div>
                 <div className={`h-[1px] ${accentBg} w-2/3`}></div>
                 <div className={`h-[1px] ${accentBg} w-1/3`}></div>
                 <div className="text-[10px] mt-2 font-mono leading-tight">
                    NO UNAUTHORIZED ACCESS<br/>
                    PUNISHABLE BY LAW<br/>
                    SUB-SECTION 99
                 </div>
             </div>
          </aside>

          {/* Main Desktop Area */}
          <main className="flex-1 relative overflow-hidden">
             
            {/* Windows Rendering */}
            {windows.map(win => !win.isMinimized && (
            <Window
                key={win.id}
                title={win.title}
                isActive={activeWindowId === win.id}
                zIndex={win.zIndex}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onFocus={() => focusWindow(win.id)}
                initialPosition={(win as any).initialPosition}
                initialSize={(win as any).initialSize}
                isEmergency={isEmergency}
            >
                {win.appId === 'MAGI' && <MagiOracle language={language} isEmergency={isEmergency} />}
                {win.appId === 'FILES' && <FileManager language={language} isEmergency={isEmergency} />}
                {win.appId === 'PERSONNEL' && <PersonnelGraph language={language} isEmergency={isEmergency} />}
                {win.appId === 'TERMINAL' && <TerminalApp language={language} isEmergency={isEmergency} onOpenApp={openWindow} />}
            </Window>
            ))}
          </main>
      </div>

      {/* Footer / Taskbar */}
      <footer className={`relative z-50 bg-black border-t-2 ${borderColor} h-10 flex items-center shrink-0 transition-colors duration-500`}>
         <div className={`${accentBg} text-black px-4 h-full flex items-center font-bold text-xs tracking-widest shrink-0 transition-colors duration-500`}>
            {isEmergency ? text.statusEmer : text.status}
         </div>

         {/* Taskbar Items */}
         <div className="flex flex-1 px-2 gap-2 overflow-x-auto h-full items-center">
            {windows.map(win => (
            <button
                key={win.id}
                onClick={() => focusWindow(win.id)}
                className={`
                h-6 px-3 flex items-center gap-2 text-xs border transition-colors uppercase
                ${isEmergency ? 'border-red-500' : 'border-magi-orange'}
                ${activeWindowId === win.id && !win.isMinimized
                    ? (isEmergency ? 'bg-red-500/20 text-white shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-magi-orange/20 text-white shadow-[0_0_10px_rgba(255,153,0,0.3)]') 
                    : (isEmergency ? 'bg-black text-red-500/70 hover:bg-red-500/10' : 'bg-black text-magi-orange/70 hover:bg-magi-orange/10')}
                `}
            >
                <div className={`w-1.5 h-1.5 ${activeWindowId === win.id ? 'bg-green-500 animate-pulse' : (isEmergency ? 'bg-red-500/50' : 'bg-magi-orange/50')}`}></div>
                <span className="truncate max-w-[100px]">{win.title}</span>
            </button>
            ))}
         </div>

         <div className={`px-4 text-[10px] opacity-50 border-l ${dimBorder} h-full flex items-center gap-4`}>
             <div className={`flex items-center gap-1 ${mainColor}`}>
                 <AlertCircle size={10} />
                 <span>{text.priority}</span>
             </div>
             <span>{text.version}</span>
         </div>
      </footer>

    </div>
  );
};

export default App;
