# AgentMesh — Multi-Agent Orchestration Platform

![CI/CD](https://github.com/Saunakghosh10/agentmesh/actions/workflows/ci.yml/badge.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Gemini](https://img.shields.io/badge/AI-Gemini_3.1_Flash--Lite-orange?logo=google)

AgentMesh is a sophisticated, production-ready multi-agent orchestration system. It simulates a high-stakes technical debate between four autonomous AI agents, coordinated via a state-graph architecture inspired by **LangGraph** and task delegation patterns inspired by **CrewAI**.

## 🚀 Key Features

- **Autonomous Multi-Agent Coordination**: Orchestrates 4 specialized agents (Proposer, Opposer, Analyst, Judge) in a structured, sequential workflow.
- **State Graph Architecture**: Implements a strict state machine to manage agent transitions, visualized in real-time with SVG/Framer Motion.
- **Inter-Agent Message Passing**: Features a full shared-memory implementation where agents receive the exact context and outputs of all previous reasoning steps.
- **Real-Time Observability**:
    - **Streaming Output**: Real-time chunked text streaming with cursor tracking.
    - **Eval Metrics**: Live tracking of token usage, hallucination flags, agent call count, and latency.
    - **System Trace**: Structured logs capturing orchestrator decisions and state transitions.

## 🧠 The "Agentic" Architecture

This project implements core agentic patterns critical for enterprise AI systems:

1.  **Task Delegation**: Each agent is initialized with a specific `role`, `goal`, and `backstory` via customized system prompts.
2.  **Shared Memory**: A stateful `sharedMemory` context window allows the **Analyst** to critique previous arguments using exact citations.
3.  **Self-Correction & Evaluation**: The pipeline features built-in hallucination detection, where specific agents are tasked with identifying logical fallacies and surfacing them as measurable metrics.
4.  **Verdict Synthesis**: A final **Judge** agent acts as a human-in-the-loop surrogate to synthesize the debate into actionable recommendations.

## 💻 Tech Stack

Built with modern industry standards:
- **Core**: Next.js 16 (App Router), React 19, TypeScript 5
- **AI SDK**: `@google/generative-ai` (Gemini 3.1 Flash-Lite)
- **Styling & UI**: Vanilla CSS Modules, `clsx`, `tailwind-merge`, Lucide React
- **Animations**: `framer-motion`
- **Tooling**: `pnpm` (Package Manager), ESLint

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+
- `pnpm` v9+
- A Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Saunakghosh10/agentmesh.git
   cd agentmesh
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser. Enter your Gemini API key in the sidebar to begin.

## 🧪 Comprehensive Testing Suite

The project includes a robust testing pyramid, run via GitHub Actions on every push.

| Command | Framework | Purpose |
|---------|-----------|---------|
| `pnpm test` | **Vitest + JSDOM** | Fast, isolated unit tests for core agent configurations and orchestration logic. |
| `pnpm test:e2e` | **Playwright** | Full browser-based end-to-end testing, simulating user workflows. |
| `pnpm test:load` | **k6** | Performance benchmarking simulating multiple concurrent users (requires k6 installed locally). |

## 🚢 Deployment & CI/CD

### Docker
The application is fully containerized using a multi-stage `Dockerfile` optimized for Next.js `standalone` output, ensuring the smallest possible image size and maximum security.
```bash
docker-compose up --build
```

### GitHub Actions Pipeline
The `.github/workflows/ci.yml` pipeline automatically enforces quality standards by running:
1. `pnpm install` (with intelligent caching)
2. `pnpm lint` (ESLint checks)
3. `pnpm test` (Unit testing)
4. `pnpm build` (Production build verification)

## 📂 Project Structure

```text
src/
├── app/              # Next.js Pages & Layouts
├── components/       # React Components
│   ├── features/     # Business logic (AgentCard, MessageBubble)
│   ├── layout/       # Structural UI (Sidebar, RightPanel)
├── lib/              # Core Logic
│   ├── constants.ts  # Agent personalities and System Prompts
│   └── useDebate.ts  # The Orchestrator Brain
├── test/             # Vitest Unit Tests
tests/
├── e2e/              # Playwright E2E Tests
└── load/             # k6 Load Tests
```

---
*Developed by Saunak Ghosh*
