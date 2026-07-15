# Topic 1 AI Agents: Teaching AI to Use Tools

> If a large language model is a super-brain, then an AI Agent is that brain equipped with hands, feet, and eyes — it no longer just "talks," it can actually **get things done**.

## A Real-Life Analogy

Imagine you have a brilliantly smart friend who has read every encyclopedia ever written. But there's a catch: he can **only sit in a chair and chat with you**.

You ask him "What's the weather like today?" and he can only guess from memory (and might get it wrong). You ask him to "book me a flight" and he can only describe the steps — he can't actually do it.

**AI Agents change everything.** It's like giving that brilliant friend a computer, a phone, and all sorts of tools — now he can open a weather app for real-time forecasts, log into a travel site to book your ticket, and even send emails to notify your colleagues about itinerary changes.

**In one sentence: Agent = LLM + Autonomous Planning + Tool Use.**

## What Is an AI Agent?

The word "Agent" means "someone who acts on your behalf." In the AI world, it specifically refers to:

> **An intelligent system that uses a large language model (LLM) as its "brain," can autonomously plan steps, call external tools, and adjust its actions based on feedback.**

Compared to regular AI chat (the typical ChatGPT Q&A style), the biggest difference with an Agent is:

| | Regular Chat AI | AI Agent |
| --- | --- | --- |
| Interaction | You ask, it answers | You give a goal, it breaks it down and executes |
| Capabilities | Can only generate text | Can call tools, search the web, run code |
| Thinking | Single-turn reaction | Multi-step: Plan → Execute → Observe → Adjust |
| Memory | Only remembers current chat | Has long-term and working memory |

![AI Agent vs Regular Chat](../assets/images/ai-agent-vs-chat.svg)

## The Three Core Capabilities of an Agent

A competent Agent typically has three key abilities:

### 1. Planning — Breaking Down Tasks

Like a reliable project manager, when an Agent receives a complex task, it doesn't rush in headfirst. Instead, it first **breaks the big task into smaller steps**.

For example, if you say "Write me an analysis of Tesla's latest earnings report," the Agent plans internally:

1. Search for Tesla's latest financial data
2. Organize key figures (revenue, profit, deliveries)
3. Compare with last quarter to find trends
4. Write the analysis article
5. Verify factual accuracy

This "think before you act" process is technically called **ReAct** (Reasoning + Acting, alternating between thinking and doing).

### 2. Tool Use — Connecting to the Real World

An Agent's most revolutionary capability is **using tools**. Just as humans use calculators for math and search engines for research, Agents can call various external tools:

- **Search engines**: Get real-time information
- **Code executors**: Run Python for calculations or visualizations
- **APIs**: Check weather, book flights, send emails
- **Databases**: Query internal company knowledge
- **File systems**: Read and write documents

> This is why Agents can do things regular chat AI cannot — they don't "make up" answers, they actually **look things up, compute, and take action**.

### 3. Memory — No More Goldfish Brain

Regular chat AI has the memory of a goldfish — it forgets after each conversation. Agents, however, have two types of memory:

- **Short-term memory (working memory)**: What steps have been completed in the current task and what results were obtained. Like sticky notes spread across your desk.
- **Long-term memory**: Past experiences, user preferences, and conversation summaries. Like your personal notebook.

With memory, an Agent gets "smarter the more you use it" — it remembers your preferred style, what you searched for last time, and avoids redundant work.

## How an Agent Works

Let's visualize how an Agent completes a task — it's a loop:

![AI Agent Workflow](../assets/images/ai-agent-workflow.svg)

The entire process can be summarized in four words: **Think-Act-Observe-Repeat**.

```
User provides a goal
    ↓
┌─→ [Think] LLM analyzes current situation, decides next step
│       ↓
│   [Act] Call a tool or generate content
│       ↓
│   [Observe] Check the tool's returned result
│       ↓
│   Judge: Is the task complete?
│       ↓
└── Not done → Back to "Think"
        ↓
    Done → Output final result to user
```

This loop might run once (simple tasks) or dozens of times (complex tasks). The key point: **the Agent flexibly adjusts its plan based on each step's results** — like a real person who takes a different route when one road is blocked.

## Typical Use Cases

Agents aren't a distant future — many products already use them:

| Scenario | What It Does | Examples |
| --- | --- | --- |
| Coding Assistant | Auto-write code, run tests, fix bugs | GitHub Copilot Agent, Cursor |
| Data Analysis | Read spreadsheets, compute statistics, generate charts | Code Interpreter |
| Personal Assistant | Manage schedules, send emails, book services | AI assistants from major tech companies |
| Customer Service | Look up orders, process refunds, escalate to humans | Enterprise AI support |
| Research Assistant | Search papers, summarize literature, write reviews | Perplexity, academic AI tools |

## Limitations of Agents

Agents are powerful, but far from perfect. Current Agents face several key challenges:

- **Prone to going off-track**: When planning goes wrong, all subsequent steps follow suit — like dominoes falling. The LLM's "hallucination" problem gets amplified in Agents because errors cascade through each step.
- **Efficiency issues**: Every step requires an LLM call for reasoning. Complex tasks might need dozens of calls, costing time and money.
- **Safety concerns**: Letting AI autonomously operate tools — what if it accidentally deletes a file or sends the wrong email? Most Agents still require human confirmation at critical checkpoints.
- **Capability ceiling**: An Agent's upper limit depends on its underlying LLM's capabilities. When the model's reasoning isn't strong enough, the Agent's planning suffers.

> Think of it this way: an Agent is like a highly capable but relatively inexperienced new hire — reliable most of the time, but occasionally makes rookie mistakes, so the "boss" (human) still needs to check in now and then.

## Chapter Summary

- **AI Agent = LLM + Autonomous Planning + Tool Use + Memory** — the key evolution from AI that "only talks" to AI that "gets things done."
- Three core capabilities: **Planning** (decomposing tasks), **Tool Use** (connecting to the real world), **Memory** (accumulating experience).
- The workflow is a loop: **Think → Act → Observe → Judge → Continue or Finish**.
- Agents are already deployed in coding, data analysis, personal assistants, and more.
- Current limitations: Planning errors, efficiency challenges, and safety concerns.

## Discussion Questions

1. What tasks in your daily work could be described as "give a goal, then break it down and execute"? What tools would an Agent need to call?
2. Why does an Agent need the "Observe" step? What might go wrong if it skipped observation and executed all steps in one go?
3. If you were designing a "Travel Planning Agent," what tools would it need? What information should it store in memory?
