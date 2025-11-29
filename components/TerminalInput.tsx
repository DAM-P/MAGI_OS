import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal } from 'lucide-react';
import { Language } from '../types';

interface TerminalInputProps {
  onSubmit: (text: string) => void;
  disabled: boolean;
  language: Language;
  isEmergency?: boolean;
}

const TerminalInput: React.FC<TerminalInputProps> = ({ onSubmit, disabled, language, isEmergency = false }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSubmit(input);
      setInput('');
    }
  };

  const placeholderText = language === 'CN' 
    ? (disabled ? "系统处理中..." : "输入指令 / 询问")
    : (disabled ? "SYSTEM PROCESSING..." : "ENTER COMMAND / QUERY");

  const statusBusy = language === 'CN' ? "状态: 忙碌" : "STATUS: BUSY";
  const statusReady = language === 'CN' ? "状态: 就绪" : "STATUS: READY";
  const statusText = disabled ? statusBusy : statusReady;

  const baseColor = isEmergency ? 'text-red-500' : 'text-magi-orange';
  const borderColor = isEmergency ? 'border-red-500' : 'border-magi-orange';
  const bgAccent = isEmergency ? 'bg-red-500' : 'bg-magi-orange';
  const shadowColor = isEmergency ? 'shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'shadow-[0_0_15px_rgba(255,153,0,0.3)]';
  const placeholderColor = isEmergency ? 'placeholder-red-500/30' : 'placeholder-magi-orange/30';

  return (
    <div className={`w-full max-w-2xl mx-auto border-2 ${borderColor} bg-magi-dark/90 p-1 relative ${shadowColor} transition-colors duration-500`}>
      {/* Corner decorations */}
      <div className={`absolute top-0 left-0 w-2 h-2 ${bgAccent}`}></div>
      <div className={`absolute top-0 right-0 w-2 h-2 ${bgAccent}`}></div>
      <div className={`absolute bottom-0 left-0 w-2 h-2 ${bgAccent}`}></div>
      <div className={`absolute bottom-0 right-0 w-2 h-2 ${bgAccent}`}></div>

      <div className={`flex items-center gap-2 bg-black p-4 border ${isEmergency ? 'border-red-500/30' : 'border-magi-orange/30'}`}>
        <Terminal className={`${baseColor} w-5 h-5 animate-pulse`} />
        <span className={`${baseColor} font-bold text-lg select-none mr-2`}>{`>`}</span>
        <form onSubmit={handleSubmit} className="flex-1 flex">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={disabled}
            className={`flex-1 bg-transparent border-none outline-none ${baseColor} font-mono text-lg ${placeholderColor} uppercase`}
            placeholder={placeholderText}
            autoComplete="off"
            spellCheck="false"
          />
          <button 
            type="submit" 
            disabled={disabled || !input.trim()}
            className={`${baseColor} hover:text-white disabled:opacity-30 transition-colors`}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
      
      {/* Decorative status bar */}
      <div className={`flex justify-between items-center px-2 py-1 text-[10px] ${isEmergency ? 'text-red-500/60 border-red-500/20' : 'text-magi-orange/60 border-magi-orange/20'} bg-magi-dark border-t mt-1`}>
        <span>MAGI SYS // TERMINAL_01</span>
        <span className={isEmergency ? 'animate-pulse font-bold' : ''}>{statusText}</span>
      </div>
    </div>
  );
};

export default TerminalInput;