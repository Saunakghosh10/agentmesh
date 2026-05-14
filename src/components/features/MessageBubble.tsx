import React from 'react';
import { Message } from '@/lib/types';
import { AGENTS } from '@/lib/constants';
import styles from './MessageBubble.module.css';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const agent = AGENTS.find(a => a.id === message.agentId);
  
  return (
    <div className={styles.container}>
      <div 
        className={styles.avatar} 
        style={{ '--agent-color': agent?.hex || 'var(--muted)' } as React.CSSProperties}
      >
        {agent?.emoji || '⬡'}
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.name} style={{ color: agent?.hex }}>{agent?.name || 'SYSTEM'}</div>
          <div className={styles.round}>{agent?.round || 'LOG'}</div>
          <div className={styles.time}>{message.timestamp}</div>
        </div>
        <div 
          className={styles.content}
          style={{ '--agent-color': agent?.hex || 'var(--border)' } as React.CSSProperties}
        >
          {message.text}
          {message.isStreaming && <span className={styles.cursor} />}
        </div>
        {message.tools && message.tools.length > 0 && (
          <div className={styles.tools}>
            {message.tools.map(tool => (
              <span key={tool} className={styles.toolTag}>⚙ {tool}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
