
import React from 'react';
import { MagiNodeResult, Vote, Language } from '../types';

interface ResultsLogProps {
  results: MagiNodeResult[];
  language: Language;
  isEmergency?: boolean;
}

const ResultsLog: React.FC<ResultsLogProps> = ({ results, language, isEmergency = false }) => {
  
  const getLocalizedRole = (role: string) => {
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
      [Vote.APPROVE]: '可决',
      [Vote.DENY]: '否决',
      [Vote.CONDITIONAL]: '保留'
    };
    return map[v] || v;
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {results.map((result, idx) => {
        let borderColor = 'border-magi-orange';
        let textColor = 'text-magi-orange';
        
        if (result.vote === Vote.APPROVE) {
            borderColor = 'border-green-500';
            textColor = 'text-green-500';
        } else if (result.vote === Vote.DENY) {
            borderColor = 'border-red-500';
            textColor = 'text-red-500';
        } else {
            borderColor = 'border-blue-500';
            textColor = 'text-blue-500';
        }

        return (
          <div 
            key={idx} 
            className={`bg-black/80 border-l-4 ${borderColor} p-4 font-mono text-sm relative overflow-hidden`}
          >
            {/* Background scanline effect specific to card */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-full w-full pointer-events-none animate-scanline opacity-10"></div>
            
            <div className={`flex justify-between items-end mb-2 border-b ${borderColor} pb-1 opacity-80`}>
              <span className={`font-bold ${textColor}`}>{result.nodeName}</span>
              <span className="text-[10px] uppercase tracking-widest">{getLocalizedRole(result.description)}</span>
            </div>
            
            <div className="mb-4 text-white/90 uppercase leading-relaxed text-base">
              "{result.reasoning}"
            </div>

            <div className={`text-right font-bold text-xl ${textColor}`}>
              {getLocalizedVote(result.vote)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResultsLog;
