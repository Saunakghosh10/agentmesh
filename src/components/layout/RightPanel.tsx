import React from 'react';
import { DebateState } from '@/lib/types';
import { AGENTS } from '@/lib/constants';
import { motion } from 'framer-motion';
import styles from './RightPanel.module.css';

interface RightPanelProps {
  state: DebateState;
}

const RightPanel: React.FC<RightPanelProps> = ({ state }) => {
  const { metrics, logs, verdict, currentAgent } = state;

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.icon}>◈</span>
        State Graph
        {state.isRunning && <span className={styles.liveBadge}>LIVE</span>}
      </div>

      <div className={styles.graphPanel}>
        <div className={styles.graphViz}>
          <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Base Edges */}
            <line x1="60" y1="30" x2="180" y2="30" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 3"/>
            <line x1="180" y1="30" x2="180" y2="90" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 3"/>
            <line x1="180" y1="90" x2="60" y2="90" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 3"/>
            <line x1="60" y1="90" x2="60" y2="30" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 3"/>
            
            {/* Active Flowing Edges */}
            <motion.line 
              x1="60" y1="30" x2="180" y2="30" 
              stroke="var(--agent-proposer)" strokeWidth="2" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: currentAgent === 'opposer' || state.messages.some(m => m.agentId === 'opposer') ? 1 : 0,
                opacity: currentAgent === 'opposer' || state.messages.some(m => m.agentId === 'opposer') ? 1 : 0 
              }}
              transition={{ duration: 0.8 }}
            />
            <motion.line 
              x1="180" y1="30" x2="180" y2="90" 
              stroke="var(--agent-opposer)" strokeWidth="2" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: currentAgent === 'analyst' || state.messages.some(m => m.agentId === 'analyst') ? 1 : 0,
                opacity: currentAgent === 'analyst' || state.messages.some(m => m.agentId === 'analyst') ? 1 : 0 
              }}
              transition={{ duration: 0.8 }}
            />
            <motion.line 
              x1="180" y1="90" x2="60" y2="90" 
              stroke="var(--agent-analyst)" strokeWidth="2" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: currentAgent === 'judge' || state.messages.some(m => m.agentId === 'judge') ? 1 : 0,
                opacity: currentAgent === 'judge' || state.messages.some(m => m.agentId === 'judge') ? 1 : 0 
              }}
              transition={{ duration: 0.8 }}
            />
            
            {/* Nodes */}
            {AGENTS.map((agent, i) => {
              const coords = [{x:60,y:30}, {x:180,y:30}, {x:180,y:90}, {x:60,y:90}][i];
              const isActive = currentAgent === agent.id;
              const isDone = state.messages.some(m => m.agentId === agent.id && !m.isStreaming);
              
              return (
                <g key={agent.id}>
                  <motion.circle 
                    cx={coords.x} cy={coords.y} r="12" 
                    fill="var(--surface)" 
                    stroke={isActive ? agent.hex : isDone ? agent.hex : 'var(--border)'} 
                    strokeWidth="2" 
                    animate={{ 
                      scale: isActive ? 1.25 : 1,
                      filter: isActive ? `drop-shadow(0 0 8px ${agent.hex})` : 'none',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                  <text 
                    x={coords.x} y={coords.y + 2} 
                    textAnchor="middle" 
                    fill={isActive || isDone ? '#fff' : 'var(--muted)'} 
                    fontSize="7" 
                    fontWeight="700"
                    fontFamily="Space Mono"
                    style={{ pointerEvents: 'none' }}
                  >
                    {agent.id.substring(0, 3).toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className={styles.header} style={{ paddingTop: '12px' }}>
        <span className={styles.icon}>▣</span>
        Eval Metrics
      </div>

      <div className={styles.metricsList}>
        <MetricCard label="Agent Calls" value={metrics.calls} color="var(--accent)" percentage={(metrics.calls / 4) * 100} />
        <MetricCard label="Hallucinations" value={metrics.hallucinations} color="var(--accent2)" percentage={metrics.hallucinations * 25} />
        <MetricCard label="Tokens" value={metrics.tokens.toLocaleString()} color="var(--accent3)" percentage={Math.min((metrics.tokens / 2000) * 100, 100)} />
        <MetricCard label="Latency" value={metrics.latency ? `${metrics.latency}ms` : '—'} color="var(--accent4)" percentage={Math.min(((metrics.latency || 0) / 5000) * 100, 100)} />
      </div>

      <div className={styles.header}>
        <span className={styles.icon}>≡</span>
        System Log
      </div>
      <div className={styles.logPanel}>
        {logs.map(log => (
          <div key={log.id} className={styles.logEntry}>
            <span className={styles.logTime}>{log.timestamp}</span>
            <span className={styles[log.type]}>{log.message}</span>
          </div>
        ))}
      </div>

      {verdict && (
        <div className={styles.verdictSection}>
          <div className={styles.verdictCard}>
            <div className={styles.verdictTitle}>⚖ Judge&apos;s Verdict</div>
            <div className={styles.verdictText}>{verdict}</div>
          </div>
        </div>
      )}
    </aside>
  );
};

const MetricCard = ({ label, value, color, percentage }: { label: string, value: string | number, color: string, percentage: number }) => (
  <div className={styles.metricCard}>
    <div className={styles.metricLabel}>{label}</div>
    <div className={styles.metricValue} style={{ color }}>{value}</div>
    <div className={styles.metricBar}>
      <div className={styles.metricBarFill} style={{ width: `${percentage}%`, background: color }} />
    </div>
  </div>
);

export default RightPanel;
