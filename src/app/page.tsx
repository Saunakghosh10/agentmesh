'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Feed from '@/components/layout/Feed';
import RightPanel from '@/components/layout/RightPanel';
import { useDebate } from '@/lib/useDebate';
import styles from './page.module.css';

export default function Home() {
  const [apiKey, setApiKey] = useState('');
  const { state, runDebate, setTopic } = useDebate();

  const completedAgents = state.messages.map(m => m.agentId).filter(id => id !== 'system') as string[];

  return (
    <main className={styles.main}>
      <Header isRunning={state.isRunning} />
      
      <div className={styles.container}>
        <Sidebar 
          apiKey={apiKey} 
          setApiKey={setApiKey} 
          currentAgent={state.currentAgent}
          completedAgents={completedAgents}
        />
        
        <div className={styles.feedWrapper}>
          <Feed 
            messages={state.messages} 
            isRunning={state.isRunning}
            topic={state.topic}
            hasApiKey={!!apiKey}
            setTopic={setTopic}
            onStart={() => runDebate(apiKey, state.topic)}
          />
        </div>
        
        <RightPanel state={state} />
      </div>

      {state.isRunning && (
        <div className={styles.progressBar}>
          <div className={styles.progressFill} />
        </div>
      )}
    </main>
  );
}
