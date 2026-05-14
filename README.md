# AgentMesh — Multi-Agent Orchestration Platform

AgentMesh is a sophisticated multi-agent orchestration system built with **Next.js 15**, **TypeScript**, and **Gemini 3.1 Flash-Lite**. It simulates a high-stakes technical debate between four autonomous agents, coordinated via a state-graph architecture inspired by **LangGraph**.

## 🚀 Key Features (Industry Standard)

- **Autonomous Multi-Agent Coordination**: Orchestrates 4 specialized agents (Proposer, Opposer, Analyst, Judge) in a collaborative workflow.
- **State Graph Architecture**: Implements a structured state machine (similar to **LangGraph**) to manage agent transitions and data flow.
- **Inter-Agent Message Passing**: Full shared-memory implementation where agents receive the context of all previous reasoning steps.
- **Real-Time Observability**:
    - **Streaming Output**: Real-time text streaming with cursor tracking.
    - **Eval Metrics**: Live tracking of token usage, hallucination flags, agent call count, and latency.
    - **System Trace**: Structured logs capturing orchestrator decisions and state transitions.
- **Modern Tech Stack**:
    - **Framework**: Next.js 15 (App Router)
    - **Package Manager**: pnpm
    - **Animations**: Framer Motion for live graph node/edge activation.
    - **SDK**: Official Google Generative AI SDK for Gemini 3.1 Flash-Lite.

## 🧠 Architecture: The "Agentic" Part

This project implements the following core agentic patterns which are key for production-grade AI systems:

1.  **Task Delegation (CrewAI Pattern)**: Each agent has a specific `role`, `goal`, and `backstory` defined in the system prompt, ensuring focused outputs.
2.  **Shared Memory**: A stateful `sharedMemory` array acts as the global context window, allowing the **Analyst** to critique the **Proposer** and **Opposer** based on their exact words.
3.  **Self-Correction & Evaluation**: The **Analyst** agent is specifically tasked with detecting logical fallacies and potential hallucinations, which are surfaced as measurable metrics.
4.  **Verdict Synthesis**: The **Judge** agent performs final reasoning to reach a nuanced verdict, simulating a human-in-the-loop or supervisor agent pattern.

## 📂 Project Structure

```text
src/
├── app/              # Next.js App Router (Layouts & Pages)
├── components/
│   ├── features/      # Agent-specific UI (AgentCard, MessageBubble)
│   ├── layout/        # Structural UI (Header, Sidebar, Feed, RightPanel)
│   └── ui/            # Atomic components
├── lib/
│   ├── constants.ts   # Agent personalities and Prompts
│   ├── types.ts       # TypeScript Interfaces
│   └── useDebate.ts   # Orchestration Logic (The "Brain")
```

## 🛠️ CI/CD

The project includes an industry-standard **GitHub Actions** workflow (`.github/workflows/ci.yml`) that automatically:
- Installs dependencies with pnpm caching.
- Runs Linting to ensure code quality.
- Validates the build for production readiness.

## 📝 Interview Talking Points

If asked about this project in an interview, here is how you can explain it:
- "I built a **Multi-Agent Orchestrator** using a **State Graph** pattern similar to LangGraph. It manages 4 autonomous agents through a specific reasoning lifecycle."
- "The core technical challenge was managing **Shared Memory** across agents. I implemented a system where each agent's output is contextually injected into the next agent's prompt, allowing for collaborative synthesis."
- "I instrumented the pipeline with **Real-time Eval Metrics**. We track hallucination rates by having an Analyst agent perform self-correction, and we monitor production metrics like token cost and latency."
- "The UI isn't just a chat; it's a **Real-time Debugger** for agentic workflows, visualizing state transitions and structured logs."

---

Created by Saunak Ghosh.
