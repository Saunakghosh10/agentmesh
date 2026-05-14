import React from 'react';
import { Agent } from '@/lib/types';
import styles from './AgentCard.module.css';

interface AgentCardProps {
  agent: Agent;
  isActive: boolean;
  isDone: boolean;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, isActive, isDone }) => {
  return (
    <div 
      className={`${styles.card} ${isActive ? styles.active : ''} ${isDone ? styles.done : ''}`}
      style={{ '--agent-color': agent.hex } as React.CSSProperties}
    >
      <div className={styles.header}>
        <div className={styles.name}>{agent.name}</div>
        <div className={styles.badge}>{agent.id.substring(0, 3).toUpperCase()}</div>
      </div>
      <div className={styles.role}>{agent.role}</div>
      {isActive && (
        <div className={styles.thinking}>
          <div className={styles.dots}>
            <span /> <span /> <span />
          </div>
          <span>Reasoning...</span>
        </div>
      )}
    </div>
  );
};

export default AgentCard;
