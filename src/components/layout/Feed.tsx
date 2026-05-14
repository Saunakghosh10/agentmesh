import React, { useRef, useEffect } from 'react';
import { Message } from '@/lib/types';
import MessageBubble from '../features/MessageBubble';
import styles from './Feed.module.css';

interface FeedProps {
  messages: Message[];
  isRunning: boolean;
  topic: string;
  hasApiKey: boolean;
  setTopic: (t: string) => void;
  onStart: () => void;
}

const Feed: React.FC<FeedProps> = ({ messages, isRunning, topic, hasApiKey, setTopic, onStart }) => {
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages]);

  const presets = [
    { label: 'REST vs GraphQL', value: 'REST vs GraphQL for microservices at scale' },
    { label: 'LLMs vs SWEs', value: 'LLMs will replace traditional software engineers by 2030' },
    { label: 'K8s for startups', value: 'Kubernetes is over-engineered for startups' },
    { label: 'TS Mandatory?', value: 'TypeScript is mandatory for production codebases' },
    { label: 'Monorepo?', value: 'Monorepo vs polyrepo for large engineering teams' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.topicBar}>
        <input 
          type="text" 
          className={styles.topicInput} 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a technical debate topic..."
        />
        <button 
          className={styles.startBtn} 
          disabled={isRunning || !hasApiKey}
          onClick={onStart}
          title={!hasApiKey ? 'Enter API key to start' : ''}
        >
          ▶ Run Debate
        </button>
      </div>

      <div className={styles.presets}>
        <span className={styles.presetLabel}>TOPICS:</span>
        {presets.map(p => (
          <button 
            key={p.label} 
            className={styles.presetChip}
            onClick={() => setTopic(p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className={styles.feed} ref={feedRef}>
        {messages.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>⬡</div>
            <h3>AgentMesh Ready</h3>
            <p>Enter a technical topic and hit Run Debate. Four autonomous agents will coordinate, argue, and reach a verdict.</p>
            <div className={styles.emptyMeta}>
              LangGraph State Graph → CrewAI Task Delegation → Inter-agent Message Passing → Eval Metrics
            </div>
          </div>
        ) : (
          <div className={styles.messages}>
            {messages.map(msg => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
