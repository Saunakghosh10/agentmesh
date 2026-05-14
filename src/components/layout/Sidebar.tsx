import React from 'react';
import { AGENTS } from '@/lib/constants';
import AgentCard from '../features/AgentCard';
import styles from './Sidebar.module.css';

interface SidebarProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  currentAgent: string | null;
  completedAgents: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ apiKey, setApiKey, currentAgent, completedAgents }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <div className={styles.label}>Gemini API Key</div>
        <div className={styles.inputWrapper}>
          <input 
            type="password" 
            className={styles.input} 
            placeholder="AIza..." 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <div className={styles.hint}>Key stays in browser. Never sent anywhere else.</div>
        </div>
      </div>

      <div className={`${styles.section} ${styles.scrollSection}`}>
        <div className={styles.label}>Agent Roster</div>
        <div className={styles.agentList}>
          {AGENTS.map((agent) => (
            <AgentCard 
              key={agent.id} 
              agent={agent} 
              isActive={currentAgent === agent.id}
              isDone={completedAgents.includes(agent.id)}
            />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.label}>Orchestration Mode</div>
        <div className={styles.modes}>
          <div>▸ <span>State Graph</span> — LangGraph pattern</div>
          <div>▸ <span>Sequential</span> — Task delegation</div>
          <div>▸ <span>Shared Memory</span> — Context passing</div>
          <div>▸ <span>Role-based</span> — Tool assignment</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
