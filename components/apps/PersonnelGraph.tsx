
import React, { useState } from 'react';
import { Language } from '../../types';
import { User, Activity, AlertCircle, Heart, Zap, Shield, Skull, Crosshair } from 'lucide-react';

interface PersonnelGraphProps {
  language: Language;
  isEmergency?: boolean;
}

// --- Data Definitions ---

interface Node {
  id: string;
  x: number;
  y: number;
  role: 'COMMAND' | 'PILOT' | 'TACTICAL' | 'SCIENTIFIC' | 'OTHER';
  icon: React.ElementType;
}

interface Link {
  source: string;
  target: string;
  type: 'BLOOD' | 'COMMAND' | 'LOVE' | 'CONFLICT' | 'FRIEND' | 'CLONE';
}

const NODES: Node[] = [
  { id: 'GENDO', x: 400, y: 80, role: 'COMMAND', icon: Shield },
  { id: 'FUYUTSUKI', x: 550, y: 80, role: 'COMMAND', icon: Shield },
  { id: 'YUI', x: 400, y: 180, role: 'SCIENTIFIC', icon: Skull }, // Center Ghost
  { id: 'SHINJI', x: 400, y: 300, role: 'PILOT', icon: Zap },
  { id: 'REI', x: 250, y: 300, role: 'PILOT', icon: Zap },
  { id: 'ASUKA', x: 550, y: 300, role: 'PILOT', icon: Zap },
  { id: 'MISATO', x: 400, y: 450, role: 'TACTICAL', icon: Activity },
  { id: 'RITSUKO', x: 550, y: 450, role: 'SCIENTIFIC', icon: Activity },
  { id: 'KAJI', x: 400, y: 550, role: 'OTHER', icon: User },
  { id: 'KAWORU', x: 250, y: 450, role: 'PILOT', icon: Zap },
];

const LINKS: Link[] = [
  { source: 'GENDO', target: 'SHINJI', type: 'BLOOD' }, // Father/Son (Strained)
  { source: 'GENDO', target: 'REI', type: 'COMMAND' }, // Special bond
  { source: 'GENDO', target: 'FUYUTSUKI', type: 'FRIEND' }, // Trusted
  { source: 'GENDO', target: 'YUI', type: 'LOVE' }, // Obsession
  { source: 'YUI', target: 'SHINJI', type: 'BLOOD' }, // Mother
  { source: 'MISATO', target: 'SHINJI', type: 'COMMAND' }, // Guardian
  { source: 'MISATO', target: 'ASUKA', type: 'COMMAND' }, // Guardian
  { source: 'MISATO', target: 'KAJI', type: 'LOVE' }, // Ex-Lovers
  { source: 'MISATO', target: 'RITSUKO', type: 'FRIEND' }, // Friends/Conflict
  { source: 'RITSUKO', target: 'GENDO', type: 'LOVE' }, // Affair/Obsession
  { source: 'ASUKA', target: 'SHINJI', type: 'CONFLICT' }, // Love/Hate
  { source: 'ASUKA', target: 'KAJI', type: 'LOVE' }, // Crush
  { source: 'REI', target: 'SHINJI', type: 'FRIEND' }, // Bond
  { source: 'KAWORU', target: 'SHINJI', type: 'LOVE' }, // Love
  { source: 'REI', target: 'YUI', type: 'CLONE' }, // Clone
];

const TEXT = {
  EN: {
    title: "PERSONNEL TOPOLOGY",
    selectNode: "SELECT TARGET FOR DATA",
    status: "STATUS: ACTIVE",
    roles: {
      COMMAND: "COMMANDER",
      PILOT: "EVA PILOT",
      TACTICAL: "TACTICAL OPS",
      SCIENTIFIC: "SCIENTIFIC DIV",
      OTHER: "SPECIAL INSPECTOR"
    },
    rels: {
      BLOOD: "BLOOD RELATIVE",
      COMMAND: "CHAIN OF COMMAND",
      LOVE: "AFFECTION / OBSESSION",
      CONFLICT: "HOSTILITY / RIVALRY",
      FRIEND: "ASSOCIATE",
      CLONE: "CLONE / VESSEL"
    },
    details: {
      GENDO: "SUPREME COMMANDER. COLD, CALCULATING. GOAL: HUMAN INSTRUMENTALITY.",
      SHINJI: "THIRD CHILD. UNIT-01 PILOT. CHRONIC DEPRESSION & ABANDONMENT ISSUES.",
      REI: "FIRST CHILD. UNIT-00 PILOT. ENIGMATIC. PASTE-LIKE HISTORY.",
      ASUKA: "SECOND CHILD. UNIT-02 PILOT. HIGH PRIDE, FRAGILE EGO.",
      MISATO: "OPERATIONS DIRECTOR. GUARDIAN. SEEKS REVENGE ON ANGELS.",
      RITSUKO: "HEAD SCIENTIST. MAINTAINS MAGI. MOTHER COMPLEX.",
      KAJI: "SPECIAL INSPECTOR. DOUBLE AGENT. SEEKS THE TRUTH.",
      YUI: "DECEASED. SOUL RESIDES IN UNIT-01. THE CATALYST.",
      FUYUTSUKI: "DEPUTY COMMANDER. THE ONLY ONE WHO UNDERSTANDS GENDO.",
      KAWORU: "FIFTH CHILD. ANGEL. UNCONDITIONAL LOVE."
    }
  },
  CN: {
    title: "人员关系拓扑图",
    selectNode: "选择目标读取数据",
    status: "状态：活跃",
    roles: {
      COMMAND: "最高指挥",
      PILOT: "EVA 驾驶员",
      TACTICAL: "战术作战部",
      SCIENTIFIC: "技术开发部",
      OTHER: "特务监察"
    },
    rels: {
      BLOOD: "血缘关系",
      COMMAND: "指挥/监护",
      LOVE: "情感/执念",
      CONFLICT: "敌对/竞争",
      FRIEND: "同僚/旧识",
      CLONE: "复制体/容器"
    },
    details: {
      GENDO: "碇源堂 - 最高司令。冷酷、计算精密。目标：人类补完计划。",
      SHINJI: "碇真嗣 - 第三适格者。初号机驾驶员。由于被父亲抛弃而产生心理隔阂。",
      REI: "绫波丽 - 第一适格者。零号机驾驶员。身世成谜，缺乏情感表达。",
      ASUKA: "明日香 - 第二适格者。二号机驾驶员。自尊心极强，渴望被认可。",
      MISATO: "葛城美里 - 作战部长。真嗣的监护人。誓要向使徒复仇。",
      RITSUKO: "赤木律子 - 首席科学家。MAGI 维护者。与母亲有着复杂的情感纠葛。",
      KAJI: "加持良治 - 特务监察。双面间谍。追寻第二次冲击的真相。",
      YUI: "碇唯 - 已故。灵魂寄宿于初号机中。一切的起因。",
      FUYUTSUKI: "冬月耕造 - 副司令。最了解源堂过去的人。",
      KAWORU: "渚薰 - 第五适格者。第十七使徒。给予真嗣无条件的爱。"
    }
  }
};

const PersonnelGraph: React.FC<PersonnelGraphProps> = ({ language, isEmergency = false }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const t = TEXT[language];
  const selectedNode = NODES.find(n => n.id === selectedId);

  // Theme colors
  const mainColor = isEmergency ? '#ef4444' : '#ff9900';
  const dimColor = isEmergency ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 153, 0, 0.3)';
  const hoverBg = isEmergency ? 'bg-red-500/5' : 'bg-magi-orange/5';
  const dimBorder = isEmergency ? 'border-red-500/30' : 'border-magi-orange/30';

  const getLinkColor = (type: Link['type']) => {
    switch(type) {
      case 'BLOOD': return '#ef4444'; // Red
      case 'LOVE': return '#ec4899'; // Pink
      case 'CONFLICT': return '#f59e0b'; // Orange
      case 'CLONE': return '#3b82f6'; // Blue
      default: return '#555'; // Grey
    }
  };

  return (
    <div className={`w-full h-full flex bg-black ${isEmergency ? 'text-red-500' : 'text-magi-orange'} font-mono overflow-hidden relative select-none`}>
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `radial-gradient(circle, ${mainColor} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>

      {/* --- Main Graph Area --- */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
         <div className={`absolute top-4 left-4 border-l-2 ${isEmergency ? 'border-red-500' : 'border-magi-orange'} pl-2 opacity-70`}>
            <h2 className="font-bold text-lg">{t.title}</h2>
            <p className="text-xs">{t.status}</p>
         </div>

         {/* SVG Graph */}
         <svg className="w-full h-full max-w-[800px] max-h-[600px]" viewBox="0 0 800 600">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#555" />
              </marker>
            </defs>

            {/* Links */}
            {LINKS.map((link, idx) => {
               const source = NODES.find(n => n.id === link.source)!;
               const target = NODES.find(n => n.id === link.target)!;
               const isSelected = selectedId === link.source || selectedId === link.target;
               
               return (
                 <g key={idx} className="transition-opacity duration-300" style={{ opacity: selectedId ? (isSelected ? 1 : 0.1) : 0.6 }}>
                    <line 
                      x1={source.x} y1={source.y} 
                      x2={target.x} y2={target.y} 
                      stroke={getLinkColor(link.type)} 
                      strokeWidth={isSelected ? 2 : 1}
                      strokeDasharray={link.type === 'CLONE' ? "5,5" : "0"}
                      markerEnd="url(#arrowhead)"
                    />
                 </g>
               );
            })}

            {/* Nodes */}
            {NODES.map((node) => {
               const Icon = node.icon;
               const isSelected = selectedId === node.id;
               
               return (
                 <g 
                    key={node.id} 
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedId(node.id)}
                    className="cursor-pointer hover:opacity-100 transition-all duration-300 group"
                    style={{ opacity: selectedId && !isSelected ? 0.3 : 1 }}
                 >
                    {/* Pulsing effect for selected */}
                    {isSelected && (
                       <circle r="40" fill="none" stroke={mainColor} strokeWidth="1" className="animate-ping opacity-50" />
                    )}
                    
                    {/* Node Shape */}
                    <circle r="25" fill="#000" stroke={isSelected ? mainColor : "#333"} strokeWidth="2" className={`transition-colors ${isEmergency ? 'group-hover:stroke-red-500' : 'group-hover:stroke-magi-orange'}`} />
                    
                    {/* Icon */}
                    <foreignObject x="-12" y="-12" width="24" height="24" className={`pointer-events-none ${isEmergency ? 'text-red-500' : 'text-magi-orange'}`}>
                       <Icon size={24} />
                    </foreignObject>

                    {/* Label */}
                    <text y="40" textAnchor="middle" fill={mainColor} fontSize="12" fontWeight="bold" className="tracking-widest">{node.id}</text>
                    
                    {/* Role Label (Small) */}
                    <text y="52" textAnchor="middle" fill={mainColor} fontSize="8" opacity="0.7">{t.roles[node.role]}</text>
                 </g>
               );
            })}
         </svg>
      </div>

      {/* --- Side Panel for Details --- */}
      <div className={`w-80 border-l ${dimBorder} bg-black/90 p-6 flex flex-col shrink-0 transition-all duration-300 absolute right-0 top-0 bottom-0 z-10 backdrop-blur-sm`}
           style={{ transform: selectedId ? 'translateX(0)' : 'translateX(100%)' }}>
         
         {selectedNode && (
             <>
               <div className={`flex items-center gap-4 mb-6 border-b ${dimBorder} pb-4`}>
                  <div className={`p-3 border-2 ${isEmergency ? 'border-red-500 bg-red-500/10' : 'border-magi-orange bg-magi-orange/10'} rounded-full`}>
                     <selectedNode.icon size={32} />
                  </div>
                  <div>
                      <h2 className="text-2xl font-black italic">{selectedNode.id}</h2>
                      <div className="text-xs opacity-70 tracking-widest">{t.roles[selectedNode.role]}</div>
                  </div>
               </div>

               <div className="mb-6">
                  <h3 className={`text-xs border-b ${dimBorder} mb-2 opacity-50`}>PROFILE DATA</h3>
                  <p className="text-sm leading-relaxed text-white/90">
                      {(t.details as any)[selectedNode.id]}
                  </p>
               </div>

               <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <h3 className={`text-xs border-b ${dimBorder} mb-2 opacity-50`}>RELATIONSHIPS</h3>
                  <div className="flex flex-col gap-2">
                      {LINKS.filter(l => l.source === selectedId || l.target === selectedId).map((link, i) => {
                          const isSource = link.source === selectedId;
                          const otherId = isSource ? link.target : link.source;
                          return (
                              <div key={i} className={`flex items-center justify-between text-xs border ${dimBorder} p-2 ${hoverBg}`}>
                                  <span className="font-bold">{otherId}</span>
                                  <div className="flex items-center gap-2">
                                     <span style={{ color: getLinkColor(link.type) }} className="opacity-80">
                                         {t.rels[link.type]}
                                     </span>
                                     <span className="opacity-30">{isSource ? '→' : '←'}</span>
                                  </div>
                              </div>
                          );
                      })}
                  </div>
               </div>
               
               <button 
                  onClick={() => setSelectedId(null)}
                  className={`mt-4 w-full border ${isEmergency ? 'border-red-500 text-red-500 hover:bg-red-500' : 'border-magi-orange text-magi-orange hover:bg-magi-orange'} py-2 hover:text-black transition-colors font-bold text-xs`}
               >
                  CLOSE ENTRY
               </button>
             </>
         )}
      </div>
      
      {/* Empty State Overlay */}
      {!selectedId && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50 flex flex-col items-center gap-2">
              <Crosshair className="animate-spin-slow w-16 h-16 opacity-20" />
              <span className="text-xs tracking-[0.5em] animate-pulse">{t.selectNode}</span>
          </div>
      )}

    </div>
  );
};

export default PersonnelGraph;
