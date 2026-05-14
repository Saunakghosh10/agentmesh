import { useState, useCallback } from 'react';
import { DebateState, LogEntry } from './types';
import { AGENTS, SYSTEM_PROMPTS } from './constants';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const useDebate = () => {
  const [state, setState] = useState<DebateState>({
    isRunning: false,
    topic: 'React vs Vue: which framework should teams adopt in 2025?',
    messages: [],
    logs: [],
    metrics: {
      calls: 0,
      hallucinations: 0,
      tokens: 0,
      latency: null,
    },
    currentAgent: null,
    verdict: null,
  });

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setState(prev => ({
      ...prev,
      logs: [...prev.logs, {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        message,
        type,
      }],
    }));
  }, []);

  const runDebate = useCallback(async (apiKey: string, topic: string) => {
    if (!apiKey) {
      addLog('API key required', 'err');
      return;
    }

    if (!topic) return;

    setState(prev => ({
      ...prev,
      isRunning: true,
      messages: [],
      logs: [],
      metrics: { calls: 0, hallucinations: 0, tokens: 0, latency: null },
      currentAgent: null,
      verdict: null,
    }));

    addLog('AgentMesh orchestrator started', 'ok');
    addLog(`Topic: "${topic}"`, 'info');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite' });
    const sharedMemory: string[] = [];

    try {
      for (let i = 0; i < AGENTS.length; i++) {
        const agent = AGENTS[i];
        setState(prev => ({ ...prev, currentAgent: agent.id }));
        addLog(`Delegating to ${agent.name}`, 'info');

        const systemPrompt = i === 0 
          ? SYSTEM_PROMPTS.proposer(topic)
          : i === 1 
            ? SYSTEM_PROMPTS.opposer(topic, sharedMemory)
            : i === 2
              ? SYSTEM_PROMPTS.analyst(topic, sharedMemory)
              : SYSTEM_PROMPTS.judge(topic, sharedMemory);

        const startTime = Date.now();
        
        // Add streaming placeholder
        const messageId = Math.random().toString(36).substr(2, 9);
        setState(prev => ({
          ...prev,
          messages: [...prev.messages, {
            id: messageId,
            agentId: agent.id,
            text: '',
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            tools: agent.tools,
            isStreaming: true,
          }]
        }));

        const result = await model.generateContentStream({
          contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
          generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
        });

        let fullText = '';
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          fullText += chunkText;
          setState(prev => ({
            ...prev,
            messages: prev.messages.map(m => m.id === messageId ? { ...m, text: fullText } : m),
          }));
        }

        const response = await result.response;
        const latency = Date.now() - startTime;
        
        sharedMemory.push(fullText);

        // Final update for this message
        setState(prev => ({
          ...prev,
          messages: prev.messages.map(m => m.id === messageId ? { ...m, text: fullText, isStreaming: false } : m),
          metrics: {
            ...prev.metrics,
            calls: prev.metrics.calls + 1,
            tokens: prev.metrics.tokens + (response.usageMetadata?.totalTokenCount || 0),
            hallucinations: prev.metrics.hallucinations + (fullText.match(/\[HALLUC\?\]/g) || []).length,
            latency,
          }
        }));

        addLog(`[${agent.name}] OK — ${latency}ms`, 'ok');

        if (i === 3) {
          const verdictMatch = fullText.match(/VERDICT:\s*(.+)/i);
          const recMatch = fullText.match(/RECOMMENDATION:\s*(.+)/i);
          if (verdictMatch || recMatch) {
            setState(prev => ({ 
              ...prev, 
              verdict: (verdictMatch ? verdictMatch[1] : '') + (recMatch ? '\n\n' + recMatch[1] : '') 
            }));
          }
        }

        // Small delay between agents
        if (i < AGENTS.length - 1) {
          await new Promise(r => setTimeout(r, 1000));
        }
      }

      addLog('Debate complete!', 'ok');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addLog(`FATAL: ${errorMessage}`, 'err');
    } finally {
      setState(prev => ({ ...prev, isRunning: false, currentAgent: null }));
    }
  }, [addLog]);

  const setTopic = (topic: string) => setState(prev => ({ ...prev, topic }));

  return { state, runDebate, setTopic };
};
