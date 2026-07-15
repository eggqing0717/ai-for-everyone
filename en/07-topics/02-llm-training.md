# Topic 2 LLM Training & Fine-tuning: From Pre-training to RLHF — The Full Pipeline

> If a foundation model is a rough gemstone, then the "training pipeline" is the complete art of gem cutting — from selecting materials (data), rough carving (pre-training), fine detailing (SFT), polishing (RLHF), to final display (deployment optimization). Each step has its own craft.

In Chapter 21, we introduced the basic concepts of pre-training and fine-tuning using the "university → graduate school" analogy. This topic takes you inside the workshop to see the **specific operations, key parameters, and engineering details** of each step.

**This article has five parts, progressively deeper:**

| Your Need | Suggested Reading |
| --- | --- |
| Understand how LLMs are trained | Read Part 1 (Pre-training) |
| Want to fine-tune a model yourself | Focus on Part 2 (SFT + LoRA) |
| Curious why ChatGPT feels so good | Read Part 3 (RLHF) |
| Planning to deploy in production | Read Part 4 (Deployment Optimization) |
| Want to get hands-on right now | Jump to Part 5 (Practice Roadmap) |

## 1. Pre-training: Building the Generalist Brain

Pre-training is the foundation of the entire large model — using massive text to let the model "read all the books in the world," acquiring general language understanding and world knowledge.

Think of pre-training like raising a well-read person: what books you feed them determines who they become. Read enough books across enough topics, and they become a generalist — not yet ready to do specific jobs, but knowledgeable about a little bit of everything.

### 1.1 Training Data: Where Do Trillions of Tokens Come From?

The "textbooks" for large models are staggering in scale. For example, Llama 3 was pre-trained on approximately **15 trillion (15T) tokens**. Where does all this data come from? Here's a table to give you an intuitive sense:

| Data Source | Typical Share | Content | Quality Processing |
| --- | --- | --- | --- |
| Common Crawl | 60-70% | Web page scraping | Deduplication, denoising, toxicity filtering |
| Books | 10-15% | E-books, academic works | High-quality long text for coherent reasoning |
| Code | 5-10% | GitHub repositories | Enhances logical reasoning and coding ability |
| Wikipedia | 3-5% | Encyclopedias | Important source of factual knowledge |
| Academic Papers | 3-5% | ArXiv, PubMed | Scientific knowledge and terminology |
| Conversations | 2-5% | Reddit, forums | Helps model understand dialogue patterns |

> **Key insight: Data quality matters more than quantity.** Google's research shows that training multiple epochs on a cleaned, high-quality subset often outperforms a single pass over larger but lower-quality data.

**A typical data cleaning pipeline includes:**
1. **Deduplication**: Using MinHash and similar algorithms to remove near-duplicate content — reducing memorization in favor of understanding
2. **Quality filtering**: Scoring with classifiers (e.g., trained with Wikipedia articles as positive samples) to filter low-quality pages
3. **Toxicity filtering**: Removing harmful, explicit, and extreme content
4. **Privacy cleaning**: Removing personally identifiable information (PII)
5. **Language identification and routing**: Bucketing by language to control multilingual ratios

### 1.2 Training Objective: Next Token Prediction

The core training objective of large models is surprisingly simple:

> **Given all preceding tokens, predict what the next token will be.** (Next Token Prediction)

This is the so-called **Causal Language Model (Causal LM)** — the model can only "look forward" and cannot peek at what comes later. The GPT series, Llama, and Qwen all belong to this category.

In contrast, **Masked Language Models (Masked LM)** like BERT randomly mask some tokens and ask the model to predict what's hidden. Good for understanding tasks but not suitable for generation.

Don't worry if this feels abstract — this comparison makes it crystal clear:

| | Causal LM (GPT-style) | Masked LM (BERT-style) |
| --- | --- | --- |
| Training | Predict next token | Predict masked tokens |
| Strengths | Text generation, dialogue | Text understanding, classification |
| Examples | GPT-4, Llama, Qwen | BERT, RoBERTa |
| Current trend | The mainstream choice for LLMs | Mainly used for embedding models |

### 1.3 Scaling Law: How Big Is "Big Enough"?

It's like cooking — too big a pot with too few ingredients means no flavor (underfitting); too many ingredients for a small pot and it overflows (wasted compute). Large models also have an optimal ratio between "pot" and "ingredients."

DeepMind's **Chinchilla paper** (2022) provided a crucial conclusion:

> **Optimal training ratio: Number of tokens ≈ Parameter count × 20**

This means a 70B (70 billion parameter) model should optimally be trained on about 1.4T tokens. Too little data ("underfed") or too large a model ("can't digest") are both suboptimal.

**The three pillars of Scaling Law:**

| Factor | Meaning | Typical Scale |
| --- | --- | --- |
| Parameters (N) | How many learnable parameters | 7B → 70B → 405B |
| Data (D) | How many tokens used for training | 1T → 15T |
| Compute (C) | How much compute (FLOPs) | 10²³ → 10²⁵ |

Their relationship is approximately: `C ≈ 6 × N × D` (each token requires ~6N FLOPs for forward + backward pass)

### 1.4 Training Infrastructure: GPU Clusters and Distributed Strategies

One person moving bricks is too slow, so you get ten thousand people to help — but coordinating them so nobody collides, slacks off, or duplicates work is a massive challenge. That's exactly the problem large model training faces.

Training a large model is not a single-GPU job. For Llama 3 405B, Meta used **16,384 H100 GPUs**.

**Three distributed training parallelism strategies:**

| Parallelism | Principle | Analogy |
| --- | --- | --- |
| **Data Parallel (DP)** | Each GPU gets the full model, processes different data | Multiple copy machines working simultaneously |
| **Tensor Parallel (TP)** | Split one layer's matrices across GPUs | One dish divided among multiple chefs |
| **Pipeline Parallel (PP)** | Different layers on different GPUs | Assembly line: each person handles one step |

In practice, all three are typically **used together**. For example, Llama 3 used TP=8 × PP=16 × DP=128 = 16,384 GPUs.

### 1.5 Training Cost: How Much Does It Cost?

You might be wondering: a cluster this big running for this long — what's the price tag? This table will give you a sense:

| Model | Parameters | GPUs | Training Time | Estimated Cost |
| --- | --- | --- | --- | --- |
| Llama 2 70B | 70B | 2,048×A100 | ~34 days | ~$3M |
| Llama 3 405B | 405B | 16,384×H100 | ~54 days | ~$60M |
| GPT-4 (estimated) | ~1.8T MoE | ~25,000×A100 | ~90 days | ~$100M+ |

> **Can ordinary people do pre-training?** Basically no. But the good news: you don't need to. The open-source community (Meta, Alibaba, Mistral) has already completed the most expensive step for you — you just need to fine-tune on their foundation models.

![LLM Training Full Pipeline](../assets/images/llm-training-pipeline.svg)

> **One-line summary:** Pre-training = massive data + massive compute + the simple goal of "guess the next word" → generalist brain. This step is extremely expensive, but you don't have to do it yourself.

## 2. Supervised Fine-Tuning (SFT): From "Completion Machine" to "Helpful Assistant"

A pre-trained model is a "super-completer" — you give it a beginning, it continues writing. But it doesn't understand "instructions." SFT's purpose is to teach the model to understand and follow human instructions.

Here's an analogy: a pre-trained model is like a bookworm who's read millions of books — incredibly knowledgeable but socially clueless. You tell them "help me write an email," and they might start writing an academic paper instead. SFT teaches this bookworm to "listen to people and get things done."

### 2.1 Why Isn't Pre-training Enough?

| Behavior | Pre-trained Model | After SFT |
| --- | --- | --- |
| "Translate to English: 今天天气好" | Might continue writing more Chinese | Outputs "The weather is nice today" |
| "Summarize this article in 3 sentences" | Might continue writing a new article | Gives a 3-sentence summary |
| "Write a poem" | Might continue in web page format | Outputs a properly formatted poem |

### 2.2 SFT Data Format

SFT uses **instruction-input-output triplets**:

```json
{
  "instruction": "Translate the following Chinese to English",
  "input": "Machine learning is a branch of AI",
  "output": "Machine learning is a branch of artificial intelligence"
}
```

High-quality SFT datasets typically contain **10K to 100K** carefully annotated examples covering multiple task types (translation, summarization, Q&A, coding, math, etc.).

### 2.3 Full Fine-tuning vs Parameter-Efficient Fine-Tuning (PEFT)

You might be wondering: which fine-tuning approach should I choose?

| | Full Fine-tuning | PEFT (e.g., LoRA) |
| --- | --- | --- |
| Scope | All model parameters | Only added parameters (<1%) |
| Memory Required | Very high (70B needs ~280GB) | Much lower (70B can drop to ~40GB) |
| Training Speed | Slow | Fast |
| Performance | Theoretical upper bound highest | Close to full fine-tuning, excellent ROI |
| Use Case | Large companies, abundant compute | Most practical scenarios |

### 2.4 LoRA Deep Dive: The Magic of Low-Rank Decomposition

Instead of renovating an entire building (full fine-tuning), why not just redecorate the room you live in (LoRA) — similar results, but 99% less work. That's the core philosophy of LoRA.

**LoRA (Low-Rank Adaptation)** is the most popular PEFT method today. Its core idea is elegantly simple:

> The change in weights ΔW during fine-tuning is "low-rank" — meaning that although it appears to be a huge matrix, its effective information can be represented by the product of two small matrices.

**How it works:**

For an original weight matrix W (dimension d×d), LoRA doesn't modify W directly. Instead, it adds a "bypass" alongside it:

```
output = W·x + (α/r) · B·A·x
```

Where:
- **A** is a d×r matrix (r is much smaller than d, typically r=8~64)
- **B** is an r×d matrix
- **W is frozen** (not trained), only A and B are trained
- **r** is the "rank," controlling bypass capacity
- **α** is the scaling factor (usually set to 1~2× of r)

![LoRA Architecture Diagram](../assets/images/lora-architecture.svg)

**Parameter comparison:** The original W has d² parameters (e.g., 4096² = 16M), while LoRA only needs to train 2×d×r parameters (e.g., 2×4096×16 = 131K) — **only 0.8% of the original**.

### 2.5 QLoRA: Fine-tuning Large Models on Consumer GPUs

**QLoRA = 4-bit Quantization + LoRA**, a major breakthrough in 2023:

1. Quantize original model weights to **4-bit** (NF4 format), reducing memory by 4×
2. Apply LoRA on top of the 4-bit model, training in BF16 precision
3. Use Paged Optimizer to handle memory spikes

**Practical result:** A single 24GB RTX 4090 can fine-tune a 70B parameter model!

### 2.6 Practical Recommendations

| Parameter | Recommended Value | Notes |
| --- | --- | --- |
| Learning Rate | 1e-4 ~ 2e-4 | Can be slightly higher for LoRA |
| Epochs | 2~3 | More risks overfitting |
| Batch Size | 4~8 (with gradient accumulation) | Limited by GPU memory |
| LoRA r | 16~64 | More complex tasks need larger r |
| LoRA alpha | 16~128 (usually = 2r) | Works in conjunction with r |
| LoRA target layers | q_proj, v_proj (minimum); all linear (best) | More layers = better results but more memory |
| Data size | 1K~100K samples | Quality far more important than quantity |
| Memory estimate | ~model_params_GB × 1.2 (QLoRA) | 70B model needs about 24-48GB |

Don't panic if these parameters look overwhelming — if this is your first fine-tuning run, just use this "no-brainer config": **LoRA r=16, alpha=32, learning rate 2e-4, train for 3 epochs**. It works well enough for the vast majority of cases. Once you've got your first experiment running, come back and fine-tune the hyperparameters.

> **One-line summary:** SFT = using carefully crafted instruction-response pairs to teach the generalist brain to "understand and follow orders." LoRA lets you do this on a single GPU.

## 3. RLHF: Making the Model Not Just Correct, But "Good to Use"

SFT teaches the model to follow instructions, but it might produce answers that are **correct but not great** — too verbose, unfriendly tone, poor logical ordering. RLHF solves the "alignment" problem: making model outputs better match human preferences.

If SFT teaches a student to write "correct answers," RLHF teaches them to write "answers that people enjoy reading" — both are right, but one is dry and the other has warmth.

### 3.1 Why Isn't SFT Enough?

SFT can only teach the model "what correct answers look like," but many questions have **no single correct answer** — some answers, while correct, simply feel more comfortable and helpful.

> Why is ChatGPT so much better to use than GPT-3? The core difference isn't knowledge — it's the "alignment" brought by RLHF. It learned to communicate in ways humans prefer.

### 3.2 The Three Steps of RLHF

**Step 1: Collect Human Preference Data**

Give the model the same question, have it generate two different answers (A and B), then have human annotators choose "which is better." Collect tens of thousands of such comparison pairs.

**Step 2: Train the Reward Model**

Use preference data to train a "scorer" — input a (question, answer) pair, output a score. Higher scores mean better alignment with human preferences.

**Step 3: Optimize with PPO**

Treat the language model as an "RL Agent":
- **State**: Current conversation context
- **Action**: Generate next token
- **Reward**: Score from the reward model

Use PPO (Proximal Policy Optimization) to adjust the model toward generating higher-scoring responses. A KL divergence penalty prevents the model from drifting too far.

### 3.3 DPO: A Simpler Alternative

PPO is complex to implement and unstable to train. **DPO (Direct Preference Optimization)**, proposed in 2023, offers a mathematically equivalent but engineering-simpler approach:

You might be wondering: so should I pick PPO or DPO? This comparison will help you decide:

| | PPO (Traditional RLHF) | DPO |
| --- | --- | --- |
| Needs reward model? | Yes, trained separately | No |
| Training complexity | High (4 models in memory) | Low (similar to SFT training) |
| Stability | Can be unstable | Relatively stable |
| Performance | Proven benchmark | Comparable, sometimes better |
| Implementation difficulty | Requires RL engineering expertise | SFT experience is sufficient |

DPO's core insight: Preference optimization can be directly converted into a classification loss function without explicitly training a reward model.

### 3.4 The Impact of RLHF

The before-and-after comparison is dramatic:

- **Safety**: Model learns to refuse harmful requests
- **Helpfulness**: Answers become more detailed and structured
- **Honesty**: Says "I'm not sure" when uncertain instead of fabricating
- **Tone and style**: More friendly and professional

> **One-line summary:** RLHF/DPO = using "which answer do humans prefer?" signals to fine-tune the model, upgrading it from "can answer correctly" to "answers beautifully." Small teams should default to DPO — simpler and good enough.

## 4. Deployment Optimization: Making Models Fast and Efficient

Trained models are typically very large. Deployment requires a series of optimizations to serve within acceptable costs.

Think of this step as "fitting a rocket engine from the lab into a production car" — performance can't drop too much, but costs must come down, and it needs to scale.

### 4.1 Quantization

Compressing model weights from high precision to low precision — like compressing a raw photo into JPEG: several times smaller, nearly indistinguishable to the eye:

| Precision | Per-Parameter Size | 70B Model Size | Inference Speed | Quality Loss |
| --- | --- | --- | --- | --- |
| FP32 | 4 bytes | 280 GB | Baseline | None |
| FP16/BF16 | 2 bytes | 140 GB | ~2× | Minimal |
| INT8 | 1 byte | 70 GB | ~3× | Very small |
| INT4 | 0.5 bytes | 35 GB | ~4× | Small to moderate |

> The current mainstream approach is **4-bit quantization** (GPTQ, AWQ formats), enabling 70B models to run inference on a single 48GB GPU.

### 4.2 Inference Optimization Techniques

Beyond quantization, there's a whole arsenal of "acceleration tricks" that are essential in production:

| Technique | Problem Solved | Effect |
| --- | --- | --- |
| **KV Cache** | Avoids recomputing attention for already-generated tokens | Inference speed up by 10-100× |
| **Flash Attention** | Optimizes memory access patterns for attention | 2-4× speedup, supports longer context |
| **Continuous Batching** | Dynamic request batching | Throughput improved several times |
| **Speculative Decoding** | Small model drafts, large model verifies | 2-3× speedup |
| **PagedAttention** | Virtual memory-style KV Cache management | Higher concurrency, less memory |

### 4.3 Practical Tool Chain

Too many tools and not sure which to pick? Here's a breakdown by use case:

| Tool | Purpose | Best For |
| --- | --- | --- |
| **Hugging Face Transformers** | All-purpose framework | Research, prototyping |
| **vLLM** | High-performance inference engine | Production deployment, high concurrency |
| **Ollama** | One-click local running | Personal use, development |
| **llama.cpp** | CPU/hybrid inference | Low-resource, edge devices |
| **TGI** | HF Inference Service | Cloud API deployment |
| **TRL** | RLHF/DPO training framework | SFT + alignment training |

> **One-line summary:** Deployment optimization = quantization + inference acceleration + the right tools. 4-bit quantization + vLLM is currently the best production setup for the money.

## 5. Hands-on Practice Roadmap

If you want to fine-tune a model yourself, here's the recommended path:

### Step 1: Choose a Base Model

| Model | Parameters | Strengths | Recommended For |
| --- | --- | --- | --- |
| Qwen 2.5 | 0.5B~72B | Strong Chinese capabilities | Chinese-focused scenarios |
| Llama 3.1 | 8B~405B | Best community ecosystem | General English scenarios |
| Mistral/Mixtral | 7B~8x22B | High cost-efficiency MoE | Multi-task, long context |

### Step 2: Prepare Your Data

- Format: Alpaca format (instruction/input/output) or ShareGPT format (multi-turn dialogue)
- Quantity: 1,000 samples is enough to see initial results; production-grade suggests 10K~100K
- Quality: **One high-quality sample is worth a hundred low-quality ones**

### Step 3: Choose Training Tools

Recommended: **Unsloth** (fastest) or **LLaMA-Factory** (most features):

```bash
# Quick fine-tuning with Unsloth
pip install unsloth
# Supports Llama, Qwen, Mistral and other mainstream models
# 4-bit QLoRA can run on 16GB GPUs
```

### Step 4: Train and Evaluate

- Use **Weights & Biases** or TensorBoard to monitor loss curves
- Prepare a set of manual test questions; check output quality periodically
- Stop when loss stabilizes to avoid overfitting

### Step 5: Deploy

- Local experience: Ollama (one command to run)
- API service: vLLM + FastAPI
- Cloud: Hugging Face Inference Endpoints

> **One-line summary:** Practice roadmap = pick a model → gather data → QLoRA fine-tune → quantize and deploy. The barrier is lower than you think — a single 4090 is enough to start.

## Chapter Summary

- **Pre-training** is the most expensive step: trillions of tokens, tens of thousands of GPUs, tens of millions of dollars — producing a general foundation model. Scaling Law tells us to balance parameters, data, and compute.
- **SFT (Supervised Fine-Tuning)** teaches the model to follow instructions. LoRA/QLoRA offers the best ROI, enabling consumer GPUs to participate.
- **RLHF/DPO** solves the "alignment" problem, making models not just correct but pleasant to use. DPO is a simpler alternative.
- **Deployment optimization** (quantization, KV Cache, Flash Attention) makes large models practical.
- **Best path for individual developers**: Choose an open-source model → Prepare high-quality data → QLoRA fine-tune → Quantize and deploy.

## Discussion Questions

1. Why does Scaling Law suggest "token count ≈ parameter count × 20"? If you only have a budget of 1T tokens, how large a model should you train?
2. Is a larger LoRA rank r always better for fine-tuning? Think about this from the perspective of "overfitting."
3. What's the core difference between RLHF and DPO? If you're a small team with limited GPUs, which approach would you choose?
4. Suppose you're fine-tuning a specialized model for a law firm. How would you design the data collection plan? What task types should the SFT data include?
