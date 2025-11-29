import React, { useState, useEffect } from 'react';
import { consultMagi } from '../../services/magiService';
import { MagiResponse, SystemState, Language } from '../../types';
import Hexagon from '../Hexagon';
import TerminalInput from '../TerminalInput';
import ResultsLog from '../ResultsLog';
import { AlertTriangle } from 'lucide-react';

interface MagiOracleProps {
  language: Language;
  isEmergency?: boolean;
}

const UI_TEXT = {
  EN: {
    connecting: "CONNECTING TO NEURAL NETWORKS...",
    consensus: "CONSENSUS",
    reset: "RESET SYSTEM",
    errorHeader: "SYSTEM ERROR",
    errorMsg: "COMMUNICATION ERROR: UNABLE TO REACH MAGI MAIN BUS.",
    reboot: "REBOOT",
  },
  CN: {
    connecting: "正在连接神经网络...",
    consensus: "最终决议",
    reset: "重置系统",
    errorHeader: "系统错误",
    errorMsg: "通信错误：无法连接 MAGI 主总线。",
    reboot: "重启",
  }
};

const MagiOracle: React.FC<MagiOracleProps> = ({ language, isEmergency = false }) => {
  const [state, setState] = useState<SystemState>(SystemState.INITIALIZING);
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<MagiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const text = UI_TEXT[language];
  const themeColor = isEmergency ? '#ef4444' : '#ff9900';

  useEffect(() => {
    // Quick init simulation
    const timer = setTimeout(() => {
      if (state === SystemState.INITIALIZING) {
        setState(SystemState.IDLE);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleQuery = async (queryText: string) => {
    setQuery(queryText);
    setState(SystemState.PROCESSING);
    setResponse(null);
    setError(null);

    try {
      const result = await consultMagi(queryText, language);
      setResponse(result);
      setState(SystemState.COMPLETED);
    } catch (err) {
      setError(text.errorMsg);
      setState(SystemState.ERROR);
    }
  };

  const resetSystem = () => {
    setState(SystemState.IDLE);
    setQuery("");
    setResponse(null);
    setError(null);
  };

  const getNodeData = (name: string) => response?.results.find(r => r.nodeName.includes(name));

  return (
    <div className={`w-full h-full flex flex-col items-center gap-4 py-4 min-w-[500px] ${isEmergency ? 'text-red-500' : 'text-magi-orange'}`}>
      
      {state === SystemState.INITIALIZING && (
        <div className="flex-1 flex items-center justify-center">
            <div className="text-xl animate-pulse text-center">
                {text.connecting}
            </div>
        </div>
      )}

      {(state === SystemState.IDLE || state === SystemState.PROCESSING || state === SystemState.COMPLETED) && (
        <div className="relative w-full h-[300px] shrink-0 flex items-center justify-center mb-4">
           {/* Connecting Lines */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
               <line x1="50%" y1="20%" x2="30%" y2="70%" stroke={themeColor} strokeWidth="1" className={state === SystemState.PROCESSING ? 'animate-dash-flow' : ''} strokeDasharray="5,5" />
               <line x1="50%" y1="20%" x2="70%" y2="70%" stroke={themeColor} strokeWidth="1" className={state === SystemState.PROCESSING ? 'animate-dash-flow' : ''} strokeDasharray="5,5" />
               <line x1="30%" y1="70%" x2="70%" y2="70%" stroke={themeColor} strokeWidth="1" className={state === SystemState.PROCESSING ? 'animate-dash-flow' : ''} strokeDasharray="5,5" />
            </svg>
            
            {/* Background Data Rain (Only in Processing) */}
            {state === SystemState.PROCESSING && (
                <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                     <div className={`absolute top-0 left-1/4 w-px h-full ${isEmergency ? 'bg-gradient-to-b from-transparent via-red-500 to-transparent' : 'bg-gradient-to-b from-transparent via-magi-orange to-transparent'} animate-pulse`}></div>
                     <div className={`absolute top-0 right-1/4 w-px h-full ${isEmergency ? 'bg-gradient-to-b from-transparent via-red-500 to-transparent' : 'bg-gradient-to-b from-transparent via-magi-orange to-transparent'} animate-pulse delay-75`}></div>
                     <div className={`absolute top-0 left-1/2 w-px h-full ${isEmergency ? 'bg-gradient-to-b from-transparent via-red-500 to-transparent' : 'bg-gradient-to-b from-transparent via-magi-orange to-transparent'} animate-pulse delay-150`}></div>
                </div>
            )}

            <div className="absolute top-0 left-1/2 -translate-x-1/2">
               <Hexagon 
                 label="MELCHIOR" 
                 subLabel="SCIENTIST" 
                 active={true}
                 processing={state === SystemState.PROCESSING}
                 vote={getNodeData('MELCHIOR')?.vote}
                 language={language}
                 scale={0.6}
                 isEmergency={isEmergency}
               />
            </div>

            <div className="absolute bottom-0 left-[20%]">
               <Hexagon 
                 label="BALTHASAR" 
                 subLabel="MOTHER" 
                 active={true}
                 processing={state === SystemState.PROCESSING}
                 vote={getNodeData('BALTHASAR')?.vote}
                 language={language}
                 scale={0.6}
                 isEmergency={isEmergency}
               />
            </div>

            <div className="absolute bottom-0 right-[20%]">
               <Hexagon 
                 label="CASPER" 
                 subLabel="WOMAN" 
                 active={true}
                 processing={state === SystemState.PROCESSING}
                 vote={getNodeData('CASPER')?.vote}
                 language={language}
                 scale={0.6}
                 isEmergency={isEmergency}
               />
            </div>

            {state === SystemState.COMPLETED && response && (
               <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 animate-stamp">
                 <div className={`bg-black border-2 ${isEmergency ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 'border-magi-orange shadow-[0_0_30px_rgba(255,153,0,0.5)]'} p-4 text-center transform rotate-[-5deg]`}>
                    <div className={`text-[10px] ${isEmergency ? 'text-red-500/70' : 'text-magi-orange/70'} mb-1 tracking-widest`}>{text.consensus}</div>
                    <div className="text-2xl font-black text-white">{response.consensus}</div>
                    <button 
                      onClick={resetSystem}
                      className={`mt-2 text-[10px] border ${isEmergency ? 'border-red-500 hover:bg-red-500' : 'border-magi-orange hover:bg-magi-orange'} px-2 py-0.5 hover:text-black transition-colors`}
                    >
                      {text.reset}
                    </button>
                 </div>
               </div>
             )}
        </div>
      )}

      {state !== SystemState.INITIALIZING && (
        <div className="w-full max-w-2xl px-4 shrink-0 z-30">
          <TerminalInput 
             onSubmit={handleQuery} 
             disabled={state === SystemState.PROCESSING}
             language={language}
             isEmergency={isEmergency}
          />
        </div>
      )}

      {state === SystemState.COMPLETED && response && (
        <div className="w-full px-4 flex-1 overflow-y-auto custom-scrollbar min-h-0 z-20">
           <ResultsLog results={response.results} language={language} isEmergency={isEmergency} />
        </div>
      )}
      
       {/* Error State */}
       {state === SystemState.ERROR && (
           <div className="border border-red-500 text-red-500 p-4 text-center bg-black/90">
             <AlertTriangle className="mx-auto w-8 h-8 mb-2" />
             <h3 className="text-lg font-bold">{text.errorHeader}</h3>
             <p className="text-sm">{error}</p>
             <button onClick={resetSystem} className="mt-2 underline hover:text-white text-sm">{text.reboot}</button>
           </div>
        )}
    </div>
  );
};

export default MagiOracle;