import React from 'react';
import { Vote, Language } from '../types';

interface HexagonProps {
  label: string;
  subLabel: string;
  active?: boolean;
  processing?: boolean;
  vote?: Vote | null;
  className?: string;
  scale?: number;
  language: Language;
  isEmergency?: boolean;
}

const Hexagon: React.FC<HexagonProps> = ({ 
  label, 
  subLabel, 
  active = false, 
  processing = false, 
  vote = null,
  className = "",
  scale = 1,
  language,
  isEmergency = false
}) => {
  
  // Determine color based on state
  let strokeColor = "#333";
  let fillColor = "#000";
  let textColor = "#555";
  let glowClass = "";

  const themeColor = isEmergency ? "#ef4444" : "#ff9900";

  if (active || processing) {
    strokeColor = themeColor;
    textColor = themeColor;
    if (processing) glowClass = "animate-pulse-fast";
  }

  if (vote) {
    if (vote === Vote.APPROVE) {
      strokeColor = "#22c55e"; // Green
      textColor = "#22c55e";
      fillColor = "rgba(34, 197, 94, 0.1)";
    } else if (vote === Vote.DENY) {
      strokeColor = "#ef4444"; // Red
      textColor = "#ef4444";
      fillColor = "rgba(239, 68, 68, 0.1)";
    } else {
      strokeColor = "#3b82f6"; // Blue (Conditional/Neutral)
      textColor = "#3b82f6";
      fillColor = "rgba(59, 130, 246, 0.1)";
    }
  } else if (isEmergency && (active || processing)) {
      // In emergency mode without a vote, override fill
      fillColor = "rgba(239, 68, 68, 0.2)";
  }

  // Localization helper
  const getLocalizedSubLabel = (role: string) => {
    if (language === 'EN') return role;
    const map: Record<string, string> = {
      'SCIENTIST': '科学家',
      'MOTHER': '母亲',
      'WOMAN': '女性'
    };
    return map[role] || role;
  };

  const getLocalizedVote = (v: Vote) => {
    if (language === 'EN') return v;
    const map: Record<string, string> = {
      [Vote.APPROVE]: '可决', // Or 批准
      [Vote.DENY]: '否决',
      [Vote.CONDITIONAL]: '保留'
    };
    return map[v] || v;
  };

  const analyzingText = language === 'CN' ? '解析中...' : 'ANALYZING...';

  return (
    <div className={`relative flex items-center justify-center ${className} ${glowClass}`} style={{ width: `${300 * scale}px`, height: `${260 * scale}px` }}>
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M25 0 L75 0 L100 50 L75 100 L25 100 L0 50 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {/* Inner decorative lines typical of MAGI UI */}
        <path 
          d="M10 50 L90 50" 
          stroke={strokeColor} 
          strokeWidth="0.5" 
          opacity="0.3"
        />
        <path 
           d="M25 0 L25 100"
           stroke={strokeColor} 
           strokeWidth="0.5" 
           opacity="0.3"
        />
         <path 
           d="M75 0 L75 100"
           stroke={strokeColor} 
           strokeWidth="0.5" 
           opacity="0.3"
        />
        {isEmergency && processing && (
             <path d="M25 0 L75 0 L100 50 L75 100 L25 100 L0 50 Z" fill="none" stroke="#ef4444" strokeWidth="4" opacity="0.5" className="animate-ping" vectorEffect="non-scaling-stroke"/>
        )}
      </svg>
      
      <div className="z-10 flex flex-col items-center justify-center text-center p-4">
        <span className="text-xs tracking-widest opacity-80 mb-1" style={{ color: textColor }}>{getLocalizedSubLabel(subLabel)}</span>
        <h2 className="text-2xl font-bold tracking-tight mb-2" style={{ color: textColor }}>{label}</h2>
        
        {vote && (
          <div className="bg-black/80 px-2 py-1 border border-current mt-2" style={{ color: textColor, borderColor: textColor }}>
            <span className="text-xl font-bold">{getLocalizedVote(vote)}</span>
          </div>
        )}
        
        {processing && (
          <div className="mt-2 text-xs animate-pulse" style={{ color: textColor }}>
            {analyzingText}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hexagon;