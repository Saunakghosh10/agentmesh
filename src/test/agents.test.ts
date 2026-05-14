import { describe, it, expect } from 'vitest';
import { AGENTS } from '@/lib/constants';

describe('Agent Configuration', () => {
  it('should have exactly 4 agents', () => {
    expect(AGENTS.length).toBe(4);
  });

  it('should have unique IDs for each agent', () => {
    const ids = AGENTS.map(a => a.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have essential properties for each agent', () => {
    AGENTS.forEach(agent => {
      expect(agent).toHaveProperty('id');
      expect(agent).toHaveProperty('name');
      expect(agent).toHaveProperty('emoji');
      expect(agent).toHaveProperty('hex');
    });
  });
});
