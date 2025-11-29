
export enum Vote {
  APPROVE = 'APPROVE',
  DENY = 'DENY',
  CONDITIONAL = 'CONDITIONAL'
}

export interface MagiNodeResult {
  nodeName: string; // MELCHIOR-1, BALTHASAR-2, CASPER-3
  description: string; // "SCIENTIST", "MOTHER", "WOMAN"
  vote: Vote;
  reasoning: string;
}

export interface MagiResponse {
  results: MagiNodeResult[];
  consensus: string;
}

export enum SystemState {
  IDLE = 'IDLE',
  INITIALIZING = 'INITIALIZING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export type Language = 'EN' | 'CN';

export const MAGI_NODES = [
  { id: 'MELCHIOR-1', role: 'SCIENTIST', color: 'text-green-500', border: 'border-green-500', fill: 'fill-green-500' },
  { id: 'BALTHASAR-2', role: 'MOTHER', color: 'text-magi-orange', border: 'border-magi-orange', fill: 'fill-magi-orange' },
  { id: 'CASPER-3', role: 'WOMAN', color: 'text-blue-500', border: 'border-blue-500', fill: 'fill-blue-500' },
];

// --- New OS Types ---

export type FileType = 'FILE' | 'DIR';

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  content?: string;
  children?: FileNode[];
  size?: string;
  date?: string;
  securityLevel?: string;
}

export interface WindowState {
  id: string;
  appId: 'MAGI' | 'FILES' | 'TERMINAL' | 'SETTINGS' | 'PERSONNEL';
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}
