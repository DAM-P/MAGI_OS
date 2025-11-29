
import React, { useState, useEffect, useRef } from 'react';
import { Language, FileNode } from '../../types';
import { MOCK_FILE_SYSTEM } from '../../services/fileSystem';
import { TerminalSquare } from 'lucide-react';

interface TerminalAppProps {
  language: Language;
  isEmergency?: boolean;
  onOpenApp: (appId: any) => void;
}

interface LogEntry {
  type: 'COMMAND' | 'OUTPUT' | 'ERROR' | 'SYSTEM';
  content: string;
}

const TerminalApp: React.FC<TerminalAppProps> = ({ language, isEmergency = false, onOpenApp }) => {
  const [history, setHistory] = useState<LogEntry[]>([
    { type: 'SYSTEM', content: 'MAGI OS [Version 7.77] (c) 2015 NERV.' },
    { type: 'SYSTEM', content: 'Type "help" for a list of commands.' }
  ]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState<FileNode>(MOCK_FILE_SYSTEM); // Current Working Directory
  const [cwdPath, setCwdPath] = useState<string>('/ROOT');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input on click
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Helper: Find node by path/name relative to current directory
  const resolveNode = (name: string): FileNode | undefined => {
    if (name === '..') {
      // Simple parent handling: this is a mock, so we cheat slightly by not strictly tracking parent pointers in the tree
      // but for "cd ..", we can just assume user wants to go up. 
      // Since tracking parents in this mock tree is hard without modification, 
      // we will implement a "find parent" search from root if needed, or simple path string manipulation.
      // For this simplified version, let's just allow navigating DOWN. 
      // To support ".." we would need a parent reference or path traversal.
      // Let's implement a path traversal from Root.
      return undefined; // TODO: Implement full path resolution
    }
    return cwd.children?.find(child => child.name === name);
  };

  // Helper: Get full path from Root to a specific node (for "cd ..")
  // Since our mock FS is static, we can just search from root.
  const findParent = (nodeId: string, current: FileNode): FileNode | null => {
     if (current.children) {
         for (const child of current.children) {
             if (child.id === nodeId) return current;
             const found = findParent(nodeId, child);
             if (found) return found;
         }
     }
     return null;
  };

  const executeCommand = (cmdStr: string) => {
    const parts = cmdStr.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output: LogEntry[] = [];

    switch (cmd) {
      case 'help':
        output.push({ type: 'OUTPUT', content: 'AVAILABLE COMMANDS:' });
        output.push({ type: 'OUTPUT', content: '  ls             List directory contents' });
        output.push({ type: 'OUTPUT', content: '  cd [dir]       Change directory (use ".." to go up)' });
        output.push({ type: 'OUTPUT', content: '  cat [file]     Read file content' });
        output.push({ type: 'OUTPUT', content: '  open [app]     Launch application (MAGI, FILES, PERSONNEL)' });
        output.push({ type: 'OUTPUT', content: '  whoami         Display current user' });
        output.push({ type: 'OUTPUT', content: '  clear          Clear terminal' });
        output.push({ type: 'OUTPUT', content: '  date           Display system time' });
        break;

      case 'ls':
        if (cwd.children && cwd.children.length > 0) {
           const items = cwd.children.map(c => {
               const type = c.type === 'DIR' ? '<DIR>' : '     ';
               return `${type}  ${c.name.padEnd(20)}  ${c.securityLevel || ''}`;
           }).join('\n');
           output.push({ type: 'OUTPUT', content: items });
        } else {
           output.push({ type: 'OUTPUT', content: '(empty)' });
        }
        break;

      case 'cd':
        if (!args[0]) {
             output.push({ type: 'OUTPUT', content: cwdPath });
             break;
        }
        if (args[0] === '..') {
            if (cwd.id === 'root') {
                output.push({ type: 'ERROR', content: 'Already at root.' });
            } else {
                const parent = findParent(cwd.id, MOCK_FILE_SYSTEM);
                if (parent) {
                    setCwd(parent);
                    setCwdPath(cwdPath.substring(0, cwdPath.lastIndexOf('/')));
                } else {
                    output.push({ type: 'ERROR', content: 'System Error: Parent directory lost.' });
                }
            }
        } else {
            const target = cwd.children?.find(c => c.name === args[0] && c.type === 'DIR');
            if (target) {
                setCwd(target);
                setCwdPath(`${cwdPath}/${target.name}`);
            } else {
                output.push({ type: 'ERROR', content: `Directory not found: ${args[0]}` });
            }
        }
        break;

      case 'cat':
        if (!args[0]) {
            output.push({ type: 'ERROR', content: 'Usage: cat [filename]' });
            break;
        }
        const file = cwd.children?.find(c => c.name === args[0] && c.type === 'FILE');
        if (file) {
            output.push({ type: 'OUTPUT', content: '--- BEGIN FILE ---' });
            output.push({ type: 'OUTPUT', content: file.content || '' });
            output.push({ type: 'OUTPUT', content: '--- END OF FILE ---' });
        } else {
            output.push({ type: 'ERROR', content: `File not found: ${args[0]}` });
        }
        break;

      case 'open':
        const appMap: Record<string, string> = {
            'magi': 'MAGI',
            'files': 'FILES',
            'archives': 'FILES',
            'personnel': 'PERSONNEL',
            'graph': 'PERSONNEL'
        };
        const appKey = args[0]?.toLowerCase();
        if (appMap[appKey]) {
            onOpenApp(appMap[appKey]);
            output.push({ type: 'OUTPUT', content: `Launching process: ${appMap[appKey]}...` });
        } else {
            output.push({ type: 'ERROR', content: `Unknown application: ${args[0]}` });
        }
        break;

      case 'clear':
        setHistory([]);
        return; // Early return to avoid adding the command itself to history if we want a clean slate (optional)

      case 'whoami':
        output.push({ type: 'OUTPUT', content: 'NERV_OPERATOR_772' });
        output.push({ type: 'OUTPUT', content: 'CLEARANCE: LEVEL 3' });
        break;

      case 'date':
        output.push({ type: 'OUTPUT', content: new Date().toString() });
        break;

      // Easter Eggs
      case 'sudo':
        if (args[0] === 'override' && args[1] === 'system') {
            output.push({ type: 'ERROR', content: 'ACCESS DENIED. SECURITY CLEARANCE REJECTED.' });
            output.push({ type: 'SYSTEM', content: '*** ALERT: UNAUTHORIZED ACCESS ATTEMPT DETECTED ***' });
            output.push({ type: 'SYSTEM', content: 'INITIATING TRACING PROTOCOL...' });
            output.push({ type: 'SYSTEM', content: 'YOU HAVE 20 SECONDS TO DISCONNECT.' });
        } else {
             output.push({ type: 'ERROR', content: 'sudo: command not found (permissions locked)' });
        }
        break;

      case 'human_instrumentality_project':
        output.push({ type: 'SYSTEM', content: 'TOP SECRET // LEVEL 5 // SEELE EYES ONLY' });
        output.push({ type: 'OUTPUT', content: 'THE FATE OF DESTRUCTION IS ALSO THE JOY OF REBIRTH.' });
        output.push({ type: 'OUTPUT', content: 'Through the union of Adam and Lilith, all souls shall become one.' });
        output.push({ type: 'SYSTEM', content: 'Connection terminated by remote host.' });
        break;

      default:
        output.push({ type: 'ERROR', content: `Command not found: ${cmd}` });
    }

    setHistory(prev => [...prev, { type: 'COMMAND', content: cmdStr }, ...output]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        if (!input.trim()) return;
        executeCommand(input);
        setInput('');
    }
  };

  const mainColor = isEmergency ? 'text-red-500' : 'text-magi-orange';
  const promptColor = isEmergency ? 'text-red-400' : 'text-green-500';

  return (
    <div 
        className={`w-full h-full bg-black font-mono text-sm p-4 overflow-hidden flex flex-col ${mainColor}`}
        onClick={focusInput}
    >
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {history.map((entry, idx) => (
                <div key={idx} className={`mb-1 break-words ${
                    entry.type === 'COMMAND' ? 'font-bold opacity-100' : 
                    entry.type === 'ERROR' ? 'text-red-500 font-bold' : 
                    entry.type === 'SYSTEM' ? 'opacity-50 italic' : 'opacity-80'
                }`}>
                    {entry.type === 'COMMAND' && <span className={`${promptColor} mr-2`}>{`NERV@MAGI:${cwdPath}$`}</span>}
                    <span className="whitespace-pre-wrap">{entry.content}</span>
                </div>
            ))}
            <div ref={bottomRef}></div>
        </div>

        <div className="flex items-center mt-2 shrink-0">
            <span className={`${promptColor} mr-2 font-bold whitespace-nowrap`}>{`NERV@MAGI:${cwdPath}$`}</span>
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`flex-1 bg-transparent border-none outline-none ${mainColor} font-bold`}
                autoFocus
                spellCheck={false}
                autoComplete="off"
            />
        </div>
    </div>
  );
};

export default TerminalApp;
