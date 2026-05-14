import React from 'react';
import { Network } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  isRunning: boolean;
}

const Header: React.FC<HeaderProps> = ({ isRunning }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Network size={20} color="var(--accent)" />
        </div>
        <div className={styles.logoText}>
          Agent<span>Mesh</span>
        </div>
      </div>
      
      <div className={styles.meta}>
        <div className={styles.status}>
          <div className={`${styles.statusDot} ${isRunning ? styles.statusDotActive : ''}`} />
          <span>{isRunning ? 'RUNNING' : 'IDLE'}</span>
        </div>
        <span>4 AGENTS</span>
        <span>LANGGRAPH STATE GRAPH</span>
        <span className={styles.accent}>GEMINI 3.1 FLASH-LITE</span>
      </div>
    </header>
  );
};

export default Header;
