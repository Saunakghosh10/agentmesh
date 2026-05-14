export type AgentId = 'proposer' | 'opposer' | 'analyst' | 'judge';

export interface Agent {
  id: AgentId;
  name: string;
  emoji: string;
  round: string;
  role: string;
  tools: string[];
  color: string;
  hex: string;
}

export interface Message {
  id: string;
  agentId: AgentId | 'system';
  text: string;
  timestamp: string;
  tools?: string[];
  isStreaming?: boolean;
}

export interface Metric {
  label: string;
  value: string | number;
  percentage: number;
  color: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'ok' | 'err' | 'warn';
}

export interface DebateState {
  isRunning: boolean;
  topic: string;
  messages: Message[];
  logs: LogEntry[];
  metrics: {
    calls: number;
    hallucinations: number;
    tokens: number;
    latency: number | null;
  };
  currentAgent: AgentId | null;
  verdict: string | null;
}
