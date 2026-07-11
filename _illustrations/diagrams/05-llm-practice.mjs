import { colors, fonts, viewBoxes } from '../design-system.mjs';
import * as C from '../components.mjs';

export const diagrams = [
  // ─── 1. ch20-prompt-template ───────────────────────────
  {
    filename: 'ch20-prompt-template',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'Prompt Template: Building Blocks', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      // Stacked blocks (bottom to top)
      const blocks = [
        { label: 'Role', desc: '"You are an expert data scientist..."', color: colors.primary, y: 320 },
        { label: 'Task', desc: '"Analyze this dataset and find patterns..."', color: colors.secondary, y: 240 },
        { label: 'Constraints', desc: '"Use bullet points, max 200 words..."', color: colors.accent, y: 160 },
        { label: 'Examples', desc: '"Input: ... Output: ..."', color: '#9F7AEA', y: 80 },
      ];

      const blockX = 120, blockW = 400, blockH = 65;

      for (const b of blocks) {
        // Block body
        parts.push(C.rect(blockX, b.y, blockW, blockH, { fill: b.color, rx: 10, opacity: 0.12 }));
        parts.push(C.rect(blockX, b.y, blockW, blockH, { fill: 'none', stroke: b.color, rx: 10, strokeWidth: 2 }));
        // Left label badge
        parts.push(C.rect(blockX + 10, b.y + 10, 90, 28, { fill: b.color, rx: 14, opacity: 0.2 }));
        parts.push(C.text(blockX + 55, b.y + 24, b.label, { fontSize: 13, fill: b.color, anchor: 'middle', fontWeight: 'bold' }));
        // Description
        parts.push(C.text(blockX + 120, b.y + 45, b.desc, { fontSize: 11, fill: colors.textLight }));
      }

      // Arrow pointing up (assembly direction)
      parts.push(C.arrow(blockX + blockW / 2, 385, blockX + blockW / 2, 75, { stroke: colors.textLight, strokeWidth: 1.5 }));
      parts.push(C.text(blockX + blockW / 2 - 30, 400, 'Build from bottom up', { fontSize: 11, fill: colors.textLight }));

      // AI robot receiving the assembled prompt on the right
      const robotX = 600, robotY = 120;
      parts.push(C.rect(robotX, robotY, 150, 200, { fill: colors.primaryLight, stroke: colors.primary, rx: 16 }));
      parts.push(C.text(robotX + 75, robotY + 30, '🤖', { fontSize: 32, anchor: 'middle' }));
      parts.push(C.text(robotX + 75, robotY + 70, 'AI Model', { fontSize: 14, fill: colors.primary, anchor: 'middle', fontWeight: '600' }));

      // Output lines from AI
      parts.push(C.rect(robotX + 15, robotY + 90, 120, 90, { fill: colors.surface, stroke: colors.border, rx: 6 }));
      parts.push(C.text(robotX + 75, robotY + 110, 'Structured', { fontSize: 11, fill: colors.text, anchor: 'middle' }));
      parts.push(C.text(robotX + 75, robotY + 128, 'High-quality', { fontSize: 11, fill: colors.text, anchor: 'middle' }));
      parts.push(C.text(robotX + 75, robotY + 146, 'Response', { fontSize: 11, fill: colors.text, anchor: 'middle' }));
      parts.push(C.text(robotX + 75, robotY + 165, '✓', { fontSize: 16, fill: '#48BB78', anchor: 'middle' }));

      // Arrow from blocks to AI
      parts.push(C.arrow(blockX + blockW + 15, 200, robotX - 10, 200, { stroke: colors.primary, strokeWidth: 2 }));
      parts.push(C.text(555, 188, 'prompt', { fontSize: 10, fill: colors.primary, anchor: 'middle' }));

      // Bottom tip
      parts.push(C.rect(180, 400, 440, 35, { fill: colors.surface, stroke: colors.border, rx: 8 }));
      parts.push(C.text(400, 420, 'Better structure → Better AI output', { fontSize: 13, fill: colors.textLight, anchor: 'middle' }));

      return parts.join('\n');
    }
  },

  // ─── 2. ch20-prompt-comparison ─────────────────────────
  {
    filename: 'ch20-prompt-comparison',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 30, 'Good Prompt vs. Bad Prompt', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      // Divider
      parts.push(C.line(400, 55, 400, 430, { stroke: colors.border, strokeWidth: 2, strokeDasharray: '6,4' }));

      // ─── Left: Bad prompt (red/gray) ───
      const leftX = 30, leftW = 340;
      parts.push(C.rect(leftX, 60, leftW, 370, { fill: '#FFF5F5', stroke: '#FC8181', rx: 12, strokeWidth: 1.5 }));
      // Header
      parts.push(C.rect(leftX, 60, leftW, 40, { fill: '#FC8181', rx: 12, opacity: 0.15 }));
      parts.push(C.rect(leftX, 90, leftW, 10, { fill: '#FC8181', rx: 0, opacity: 0.15 }));
      parts.push(C.text(leftX + leftW / 2, 84, '✗ Bad Prompt', { fontSize: 15, fill: '#E53E3E', anchor: 'middle', fontWeight: 'bold' }));

      // Bad prompt input
      parts.push(C.rect(leftX + 20, 115, leftW - 40, 50, { fill: colors.surface, stroke: '#CBD5E0', rx: 6 }));
      parts.push(C.text(leftX + 30, 135, '"Write something about AI"', { fontSize: 12, fill: '#718096' }));
      parts.push(C.text(leftX + 30, 155, '(vague, no context)', { fontSize: 10, fill: '#A0AEC0' }));

      // Bad output
      parts.push(C.text(leftX + leftW / 2, 190, '↓ AI Response', { fontSize: 11, fill: '#A0AEC0', anchor: 'middle' }));
      parts.push(C.rect(leftX + 20, 205, leftW - 40, 120, { fill: '#EDF2F7', stroke: '#CBD5E0', rx: 6 }));
      // Messy lines representing poor output
      for (let i = 0; i < 5; i++) {
        const lw = 60 + Math.random() * 180;
        parts.push(C.line(leftX + 35, 225 + i * 20, leftX + 35 + lw, 225 + i * 20, { stroke: '#CBD5E0', strokeWidth: 2 }));
      }
      parts.push(C.text(leftX + leftW / 2, 295, '???', { fontSize: 16, fill: '#A0AEC0', anchor: 'middle' }));

      // Issues list
      parts.push(C.text(leftX + 30, 350, '• No role specified', { fontSize: 11, fill: '#718096' }));
      parts.push(C.text(leftX + 30, 370, '• No clear task', { fontSize: 11, fill: '#718096' }));
      parts.push(C.text(leftX + 30, 390, '• No format constraints', { fontSize: 11, fill: '#718096' }));
      parts.push(C.text(leftX + 30, 410, '• No examples given', { fontSize: 11, fill: '#718096' }));

      // ─── Right: Good prompt (green/blue) ───
      const rightX = 430, rightW = 340;
      parts.push(C.rect(rightX, 60, rightW, 370, { fill: '#F0FFF4', stroke: '#68D391', rx: 12, strokeWidth: 1.5 }));
      // Header
      parts.push(C.rect(rightX, 60, rightW, 40, { fill: '#68D391', rx: 12, opacity: 0.15 }));
      parts.push(C.rect(rightX, 90, rightW, 10, { fill: '#68D391', rx: 0, opacity: 0.15 }));
      parts.push(C.text(rightX + rightW / 2, 84, '✓ Good Prompt', { fontSize: 15, fill: '#276749', anchor: 'middle', fontWeight: 'bold' }));

      // Good prompt input (structured)
      parts.push(C.rect(rightX + 20, 115, rightW - 40, 90, { fill: colors.surface, stroke: '#68D391', rx: 6 }));
      parts.push(C.text(rightX + 30, 133, 'Role: AI researcher', { fontSize: 11, fill: '#276749' }));
      parts.push(C.text(rightX + 30, 150, 'Task: List 3 benefits of transformers', { fontSize: 11, fill: '#276749' }));
      parts.push(C.text(rightX + 30, 167, 'Format: Numbered, one sentence each', { fontSize: 11, fill: '#276749' }));
      parts.push(C.text(rightX + 30, 184, 'Tone: Simple, for beginners', { fontSize: 11, fill: '#276749' }));

      // Good output
      parts.push(C.text(rightX + rightW / 2, 225, '↓ AI Response', { fontSize: 11, fill: '#276749', anchor: 'middle' }));
      parts.push(C.rect(rightX + 20, 240, rightW - 40, 100, { fill: colors.surface, stroke: '#68D391', rx: 6 }));
      parts.push(C.text(rightX + 35, 262, '1. Parallel processing of sequences', { fontSize: 11, fill: colors.text }));
      parts.push(C.text(rightX + 35, 282, '2. Better long-range dependencies', { fontSize: 11, fill: colors.text }));
      parts.push(C.text(rightX + 35, 302, '3. Scalable to massive datasets', { fontSize: 11, fill: colors.text }));
      parts.push(C.text(rightX + rightW / 2, 330, '✓ Clear & Structured', { fontSize: 11, fill: '#276749', anchor: 'middle' }));

      // Benefits list
      parts.push(C.text(rightX + 30, 365, '✓ Defined role & expertise', { fontSize: 11, fill: '#276749' }));
      parts.push(C.text(rightX + 30, 385, '✓ Specific task', { fontSize: 11, fill: '#276749' }));
      parts.push(C.text(rightX + 30, 405, '✓ Clear format & constraints', { fontSize: 11, fill: '#276749' }));

      return parts.join('\n');
    }
  },

  // ─── 3. ch21-finetune-comparison ───────────────────────
  {
    filename: 'ch21-finetune-comparison',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 30, 'Pretrain vs. Fine-tune vs. RAG', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      // Three columns
      const columns = [
        { x: 30, label: 'Pretraining', desc: 'Learn general knowledge', icon: '📚', color: colors.primary },
        { x: 285, label: 'Fine-tuning', desc: 'Specialize for a task', icon: '🎯', color: colors.accent },
        { x: 540, label: 'RAG', desc: 'Retrieve & generate', icon: '🔍', color: colors.secondary },
      ];

      const colW = 230, colH = 340;

      for (const col of columns) {
        // Column background
        parts.push(C.rect(col.x, 55, colW, colH, { fill: colors.surface, stroke: col.color, rx: 12, strokeWidth: 2 }));
        // Header
        parts.push(C.rect(col.x, 55, colW, 50, { fill: col.color, rx: 12, opacity: 0.1 }));
        parts.push(C.rect(col.x, 95, colW, 10, { fill: col.color, rx: 0, opacity: 0.1 }));
        parts.push(C.text(col.x + colW / 2, 75, col.icon, { fontSize: 20, anchor: 'middle' }));
        parts.push(C.text(col.x + colW / 2, 95, col.label, { fontSize: 14, fill: col.color, anchor: 'middle', fontWeight: 'bold' }));
      }

      // Pretraining content
      const px = 30;
      parts.push(C.rect(px + 20, 120, colW - 40, 40, { fill: colors.primaryLight, rx: 6 }));
      parts.push(C.text(px + colW / 2, 142, 'Massive text corpus', { fontSize: 11, fill: colors.primary, anchor: 'middle' }));
      parts.push(C.arrow(px + colW / 2, 165, px + colW / 2, 185, { stroke: colors.text, strokeWidth: 1.5 }));
      parts.push(C.rect(px + 20, 190, colW - 40, 45, { fill: colors.primary, rx: 6, opacity: 0.1 }));
      parts.push(C.text(px + colW / 2, 208, 'Train from scratch', { fontSize: 11, fill: colors.primary, anchor: 'middle' }));
      parts.push(C.text(px + colW / 2, 225, '(weeks on GPUs)', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));
      parts.push(C.arrow(px + colW / 2, 240, px + colW / 2, 260, { stroke: colors.text, strokeWidth: 1.5 }));
      parts.push(C.rect(px + 20, 265, colW - 40, 40, { fill: colors.primaryLight, rx: 6 }));
      parts.push(C.text(px + colW / 2, 287, 'Base Model (general)', { fontSize: 11, fill: colors.primary, anchor: 'middle', fontWeight: '500' }));
      parts.push(C.text(px + colW / 2, 330, 'Cost: $$$$$', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));
      parts.push(C.text(px + colW / 2, 350, 'Data: Trillions of tokens', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));

      // Fine-tuning content
      const fx = 285;
      parts.push(C.rect(fx + 20, 120, colW - 40, 40, { fill: colors.accentLight, rx: 6 }));
      parts.push(C.text(fx + colW / 2, 142, 'Task-specific data', { fontSize: 11, fill: colors.accent, anchor: 'middle' }));
      parts.push(C.arrow(fx + colW / 2, 165, fx + colW / 2, 185, { stroke: colors.text, strokeWidth: 1.5 }));
      parts.push(C.rect(fx + 20, 190, colW - 40, 45, { fill: colors.accent, rx: 6, opacity: 0.1 }));
      parts.push(C.text(fx + colW / 2, 208, 'Adjust base model', { fontSize: 11, fill: colors.accent, anchor: 'middle' }));
      parts.push(C.text(fx + colW / 2, 225, '(hours/days)', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));
      parts.push(C.arrow(fx + colW / 2, 240, fx + colW / 2, 260, { stroke: colors.text, strokeWidth: 1.5 }));
      parts.push(C.rect(fx + 20, 265, colW - 40, 40, { fill: colors.accentLight, rx: 6 }));
      parts.push(C.text(fx + colW / 2, 287, 'Specialist Model', { fontSize: 11, fill: colors.accent, anchor: 'middle', fontWeight: '500' }));
      parts.push(C.text(fx + colW / 2, 330, 'Cost: $$', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));
      parts.push(C.text(fx + colW / 2, 350, 'Data: 1K-100K samples', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));

      // RAG content
      const rx = 540;
      parts.push(C.rect(rx + 20, 120, colW - 40, 40, { fill: colors.secondaryLight, rx: 6 }));
      parts.push(C.text(rx + colW / 2, 142, 'External knowledge base', { fontSize: 11, fill: colors.secondary, anchor: 'middle' }));
      parts.push(C.arrow(rx + colW / 2, 165, rx + colW / 2, 185, { stroke: colors.text, strokeWidth: 1.5 }));
      parts.push(C.rect(rx + 20, 190, colW - 40, 45, { fill: colors.secondary, rx: 6, opacity: 0.1 }));
      parts.push(C.text(rx + colW / 2, 208, 'Retrieve + Generate', { fontSize: 11, fill: colors.secondary, anchor: 'middle' }));
      parts.push(C.text(rx + colW / 2, 225, '(real-time)', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));
      parts.push(C.arrow(rx + colW / 2, 240, rx + colW / 2, 260, { stroke: colors.text, strokeWidth: 1.5 }));
      parts.push(C.rect(rx + 20, 265, colW - 40, 40, { fill: colors.secondaryLight, rx: 6 }));
      parts.push(C.text(rx + colW / 2, 287, 'Grounded answers', { fontSize: 11, fill: colors.secondary, anchor: 'middle', fontWeight: '500' }));
      parts.push(C.text(rx + colW / 2, 330, 'Cost: $', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));
      parts.push(C.text(rx + colW / 2, 350, 'No model change needed', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));

      // Bottom comparison
      parts.push(C.rect(100, 410, 600, 30, { fill: colors.surface, stroke: colors.border, rx: 6 }));
      parts.push(C.text(400, 428, 'Effort & Cost:  High ←――――――→ Low  |  Flexibility:  Low ←――――――→ High', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));

      return parts.join('\n');
    }
  },

  // ─── 4. ch22-rag-flow ──────────────────────────────────
  {
    filename: 'ch22-rag-flow',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 30, 'RAG (Retrieval-Augmented Generation) Flow', { fontSize: 20, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      // Top flow: Document preparation (offline)
      parts.push(C.text(400, 65, 'Offline: Index Documents', { fontSize: 13, fill: colors.textLight, anchor: 'middle' }));
      const topY = 85;
      const topSteps = [
        { x: 50, w: 120, label: 'Documents', color: colors.secondary },
        { x: 220, w: 120, label: 'Chunk &\nSplit', color: colors.secondary },
        { x: 390, w: 130, label: 'Embed\n(Vectorize)', color: colors.secondary },
        { x: 580, w: 150, label: 'Vector Database', color: colors.secondary },
      ];

      for (let i = 0; i < topSteps.length; i++) {
        const s = topSteps[i];
        parts.push(C.rect(s.x, topY, s.w, 55, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 8 }));
        const lines = s.label.split('\n');
        for (let l = 0; l < lines.length; l++) {
          parts.push(C.text(s.x + s.w / 2, topY + 22 + l * 16, lines[l], { fontSize: 12, fill: colors.secondary, anchor: 'middle', fontWeight: '500' }));
        }
        if (i < topSteps.length - 1) {
          parts.push(C.arrow(s.x + s.w + 8, topY + 27, topSteps[i + 1].x - 8, topY + 27, { stroke: colors.secondary, strokeWidth: 1.5 }));
        }
      }

      // Divider
      parts.push(C.line(30, 165, 770, 165, { stroke: colors.border, strokeWidth: 1, strokeDasharray: '5,4' }));

      // Bottom flow: Query time (online)
      parts.push(C.text(400, 185, 'Online: Answer Query', { fontSize: 13, fill: colors.textLight, anchor: 'middle' }));
      const botY = 205;

      // User query
      parts.push(C.rect(30, botY, 130, 80, { fill: colors.primaryLight, stroke: colors.primary, rx: 10 }));
      parts.push(C.text(95, botY + 25, '👤 User', { fontSize: 13, fill: colors.primary, anchor: 'middle', fontWeight: '600' }));
      parts.push(C.text(95, botY + 50, '"What is', { fontSize: 11, fill: colors.text, anchor: 'middle' }));
      parts.push(C.text(95, botY + 65, 'attention?"', { fontSize: 11, fill: colors.text, anchor: 'middle' }));

      // Embed query
      parts.push(C.arrow(165, botY + 40, 200, botY + 40, { stroke: colors.text, strokeWidth: 1.5 }));
      parts.push(C.rect(205, botY + 10, 100, 60, { fill: colors.accentLight, stroke: colors.accent, rx: 8 }));
      parts.push(C.text(255, botY + 32, 'Embed', { fontSize: 12, fill: colors.accent, anchor: 'middle', fontWeight: '500' }));
      parts.push(C.text(255, botY + 50, 'Query', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));

      // Search vector DB
      parts.push(C.arrow(310, botY + 40, 345, botY + 40, { stroke: colors.text, strokeWidth: 1.5 }));
      parts.push(C.rect(350, botY + 5, 120, 70, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 8 }));
      parts.push(C.text(410, botY + 30, 'Search', { fontSize: 12, fill: colors.secondary, anchor: 'middle', fontWeight: '500' }));
      parts.push(C.text(410, botY + 48, 'Vector DB', { fontSize: 11, fill: colors.secondary, anchor: 'middle' }));
      parts.push(C.text(410, botY + 63, '(top-k)', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));

      // Retrieved docs
      parts.push(C.arrow(475, botY + 40, 510, botY + 40, { stroke: colors.text, strokeWidth: 1.5 }));
      parts.push(C.rect(515, botY + 5, 110, 70, { fill: colors.primaryLight, stroke: colors.primary, rx: 8 }));
      parts.push(C.text(570, botY + 28, 'Retrieved', { fontSize: 12, fill: colors.primary, anchor: 'middle', fontWeight: '500' }));
      parts.push(C.text(570, botY + 46, 'Context', { fontSize: 11, fill: colors.primary, anchor: 'middle' }));
      parts.push(C.text(570, botY + 62, '(relevant docs)', { fontSize: 9, fill: colors.textLight, anchor: 'middle' }));

      // LLM Generation
      parts.push(C.arrow(630, botY + 40, 660, botY + 40, { stroke: colors.text, strokeWidth: 1.5 }));
      parts.push(C.rect(665, botY + 0, 110, 80, { fill: colors.accentLight, stroke: colors.accent, rx: 10 }));
      parts.push(C.text(720, botY + 22, '🤖 LLM', { fontSize: 13, fill: colors.accent, anchor: 'middle', fontWeight: '600' }));
      parts.push(C.text(720, botY + 44, 'Generate', { fontSize: 11, fill: colors.accent, anchor: 'middle' }));
      parts.push(C.text(720, botY + 60, 'Answer', { fontSize: 11, fill: colors.accent, anchor: 'middle' }));

      // Final output
      parts.push(C.arrow(720, botY + 85, 720, botY + 110, { stroke: colors.text, strokeWidth: 1.5 }));
      parts.push(C.rect(630, botY + 115, 180, 70, { fill: '#F0FFF4', stroke: '#48BB78', rx: 10 }));
      parts.push(C.text(720, botY + 140, 'Grounded Answer', { fontSize: 12, fill: '#276749', anchor: 'middle', fontWeight: '600' }));
      parts.push(C.text(720, botY + 160, 'with citations', { fontSize: 11, fill: '#48BB78', anchor: 'middle' }));
      parts.push(C.text(720, botY + 177, '[source: doc #3]', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));

      // Connection from Vector DB to Search (vertical from top)
      parts.push(C.line(655, topY + 55, 655, botY + 5, { stroke: colors.secondary, strokeWidth: 1.5, strokeDasharray: '4,3' }));
      parts.push(C.arrow(655, botY - 15, 460, botY + 5, { stroke: colors.secondary, strokeWidth: 1 }));

      // Legend
      parts.push(C.rect(50, 400, 700, 35, { fill: colors.surface, stroke: colors.border, rx: 8 }));
      parts.push(C.text(400, 420, 'RAG = User Query → Embed → Retrieve Relevant Docs → Augment Prompt → LLM Generates Grounded Answer', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));

      return parts.join('\n');
    }
  },

  // ─── 5. Vector Database Similarity Retrieval ───────────
  {
    filename: 'ch22-vector-db',
    viewBox: viewBoxes.wide,
    render() {
      return [
        // Background
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),

        // Title
        C.text(400, 35, 'Vector Database: Similarity Retrieval', {
          fontSize: 20, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),

        // ─── Left: Documents → Vectors ─────
        C.text(130, 75, 'Documents', { fontSize: 13, fill: colors.text, anchor: 'middle', fontWeight: '600' }),

        // Document icons
        C.rect(60, 90, 140, 35, { fill: colors.surface, stroke: colors.border, rx: 6 }),
        C.text(130, 108, 'Doc 1: "Neural nets..."', { fontSize: 9, fill: colors.text, anchor: 'middle' }),
        C.rect(60, 132, 140, 35, { fill: colors.surface, stroke: colors.border, rx: 6 }),
        C.text(130, 150, 'Doc 2: "Gradient..."', { fontSize: 9, fill: colors.text, anchor: 'middle' }),
        C.rect(60, 174, 140, 35, { fill: colors.surface, stroke: colors.border, rx: 6 }),
        C.text(130, 192, 'Doc 3: "Attention..."', { fontSize: 9, fill: colors.text, anchor: 'middle' }),
        C.rect(60, 216, 140, 35, { fill: colors.surface, stroke: colors.border, rx: 6 }),
        C.text(130, 234, 'Doc 4: "Backprop..."', { fontSize: 9, fill: colors.text, anchor: 'middle' }),

        // Embedding arrow
        C.arrow(205, 160, 260, 160, { stroke: colors.primary, strokeWidth: 2 }),
        C.text(232, 145, 'Embed', { fontSize: 10, fill: colors.primary, anchor: 'middle' }),

        // ─── Middle: Vector space (2D projection) ─────
        C.rect(270, 70, 260, 230, { fill: colors.surface, stroke: colors.border, rx: 12, shadow: true }),
        C.text(400, 93, 'Vector Space', { fontSize: 13, fill: colors.text, anchor: 'middle', fontWeight: '600' }),

        // Vector dots (documents)
        C.circle(320, 140, 8, { fill: colors.primary, opacity: 0.7 }),
        C.text(320, 125, 'D1', { fontSize: 9, fill: colors.primary, anchor: 'middle' }),
        C.circle(380, 200, 8, { fill: colors.primary, opacity: 0.7 }),
        C.text(380, 185, 'D2', { fontSize: 9, fill: colors.primary, anchor: 'middle' }),
        C.circle(450, 150, 8, { fill: colors.primary, opacity: 0.7 }),
        C.text(450, 135, 'D3', { fontSize: 9, fill: colors.primary, anchor: 'middle' }),
        C.circle(340, 250, 8, { fill: colors.primary, opacity: 0.7 }),
        C.text(340, 265, 'D4', { fontSize: 9, fill: colors.primary, anchor: 'middle' }),

        // Query vector (highlighted)
        C.circle(400, 155, 10, { fill: colors.accent, opacity: 0.9 }),
        C.text(415, 145, 'Q', { fontSize: 11, fill: colors.accent, fontWeight: 'bold' }),

        // Similarity circles
        C.circle(400, 155, 55, { fill: 'none', stroke: colors.secondary, strokeWidth: 1.5 }),
        C.text(460, 175, 'nearest', { fontSize: 9, fill: colors.secondary }),

        // Distance lines to nearest
        C.line(400, 155, 450, 150, { stroke: colors.secondary, strokeWidth: 1 }),
        C.line(400, 155, 380, 200, { stroke: colors.secondary, strokeWidth: 1 }),

        // ─── Right: Retrieved results ─────
        C.arrow(535, 165, 580, 165, { stroke: colors.secondary, strokeWidth: 2 }),
        C.text(558, 150, 'Top-K', { fontSize: 10, fill: colors.secondary, anchor: 'middle' }),

        C.text(680, 75, 'Retrieved', { fontSize: 13, fill: colors.text, anchor: 'middle', fontWeight: '600' }),
        C.rect(600, 95, 170, 40, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 6 }),
        C.text(685, 110, '1. "Attention mech..."', { fontSize: 9, fill: colors.text, anchor: 'middle' }),
        C.text(685, 125, 'Score: 0.95', { fontSize: 9, fill: colors.secondary, anchor: 'middle', fontWeight: '600' }),

        C.rect(600, 142, 170, 40, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 6, opacity: 0.7 }),
        C.text(685, 157, '2. "Gradient desc..."', { fontSize: 9, fill: colors.text, anchor: 'middle' }),
        C.text(685, 172, 'Score: 0.87', { fontSize: 9, fill: colors.secondary, anchor: 'middle', fontWeight: '600' }),

        C.rect(600, 189, 170, 40, { fill: colors.primaryLight, stroke: colors.primary, rx: 6, opacity: 0.5 }),
        C.text(685, 204, '3. "Neural net..."', { fontSize: 9, fill: colors.text, anchor: 'middle' }),
        C.text(685, 219, 'Score: 0.72', { fontSize: 9, fill: colors.primary, anchor: 'middle', fontWeight: '600' }),

        // ─── Bottom: Full pipeline flow ─────
        C.rect(40, 320, 720, 110, { fill: colors.surface, stroke: colors.border, rx: 10, shadow: true }),
        C.text(400, 345, 'RAG Retrieval Pipeline', { fontSize: 13, fill: colors.text, anchor: 'middle', fontWeight: '600' }),

        C.flowRow(60, 365, [
          { label: 'User Query', color: colors.accent },
          { label: 'Embed', color: colors.primary },
          { label: 'Search DB', color: colors.secondary },
          { label: 'Top-K Docs', color: colors.secondary },
        ], { boxW: 120, boxH: 38, gap: 50 }),
      ].join('\n');
    }
  },

  // ─── 6. Future Trends ─────────────────────────────────
  {
    filename: 'ch23-future-trends',
    viewBox: viewBoxes.wide,
    render() {
      return [
        // Background
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.circle(400, 450, 300, { fill: colors.primaryLight, opacity: 0.15 }),

        // Title
        C.text(400, 35, 'AI Future Trends', {
          fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),

        // ─── Central AI node ─────
        C.circle(400, 200, 50, { fill: colors.primary, opacity: 0.15 }),
        C.circle(400, 200, 50, { fill: 'none', stroke: colors.primary, strokeWidth: 2.5 }),
        C.text(400, 193, 'AI', { fontSize: 22, fill: colors.primary, anchor: 'middle', fontWeight: 'bold' }),
        C.text(400, 213, 'Future', { fontSize: 11, fill: colors.primary, anchor: 'middle' }),

        // ─── Branch 1: Multimodal (top-left) ─────
        C.arrow(355, 168, 210, 110, { stroke: colors.primary, strokeWidth: 2 }),
        C.rect(80, 70, 200, 100, { fill: colors.primaryLight, stroke: colors.primary, rx: 12, opacity: 0.3 }),
        C.rect(80, 70, 200, 100, { fill: 'none', stroke: colors.primary, rx: 12, strokeWidth: 1.5 }),
        C.text(180, 98, 'Multimodal AI', { fontSize: 14, fill: colors.primary, anchor: 'middle', fontWeight: '700' }),
        C.text(180, 120, 'Text + Image + Audio', { fontSize: 11, fill: colors.text, anchor: 'middle' }),
        C.text(180, 140, 'Unified understanding', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),
        C.text(180, 155, '& generation', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),
        C.icon('chat', 100, 82, 16),
        C.icon('code', 248, 82, 16),

        // ─── Branch 2: AI Agents (top-right) ─────
        C.arrow(445, 168, 580, 110, { stroke: colors.secondary, strokeWidth: 2 }),
        C.rect(520, 70, 200, 100, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 12, opacity: 0.3 }),
        C.rect(520, 70, 200, 100, { fill: 'none', stroke: colors.secondary, rx: 12, strokeWidth: 1.5 }),
        C.text(620, 98, 'AI Agents', { fontSize: 14, fill: colors.secondary, anchor: 'middle', fontWeight: '700' }),
        C.text(620, 120, 'Autonomous planning', { fontSize: 11, fill: colors.text, anchor: 'middle' }),
        C.text(620, 140, 'Tool use & reasoning', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),
        C.text(620, 155, 'Multi-step tasks', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),
        C.icon('robot', 540, 82, 16),
        C.icon('gear', 688, 82, 16),

        // ─── Branch 3: Embodied Intelligence (bottom) ─────
        C.arrow(400, 252, 400, 310, { stroke: colors.accent, strokeWidth: 2 }),
        C.rect(280, 315, 240, 100, { fill: colors.accentLight, stroke: colors.accent, rx: 12, opacity: 0.3 }),
        C.rect(280, 315, 240, 100, { fill: 'none', stroke: colors.accent, rx: 12, strokeWidth: 1.5 }),
        C.text(400, 343, 'Embodied Intelligence', { fontSize: 14, fill: colors.accent, anchor: 'middle', fontWeight: '700' }),
        C.text(400, 365, 'Robots & physical world', { fontSize: 11, fill: colors.text, anchor: 'middle' }),
        C.text(400, 385, 'Perception + Action', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),
        C.text(400, 400, 'Real-world interaction', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),
        C.icon('cpu', 300, 327, 16),
        C.icon('layers', 488, 327, 16),

        // ─── Decorative connections ─────
        C.path('M180,170 Q180,250 280,330', { stroke: colors.border, strokeWidth: 1, fill: 'none' }),
        C.path('M620,170 Q620,250 520,330', { stroke: colors.border, strokeWidth: 1, fill: 'none' }),

        // Bottom tagline
        C.text(400, 440, 'Convergence of intelligence across modalities, tasks, and physical space', {
          fontSize: 12, fill: colors.textLight, anchor: 'middle'
        }),
      ].join('\n');
    }
  },

  // ─── ch23-ai-limitations ─────────────────────────────────
  {
    filename: 'ch23-ai-limitations',
    viewBox: viewBoxes.wide,
    render() {
      return [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 40, "AI's Three Major Limitations", {
          fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),
        C.text(400, 65, 'Understanding the boundaries helps us use AI wisely', {
          fontSize: 12, fill: colors.textLight, anchor: 'middle'
        }),

        // Card 1: Hallucination
        C.rect(50, 100, 220, 300, { fill: colors.surface, stroke: colors.accent, rx: 16, shadow: true }),
        C.circle(160, 165, 40, { fill: colors.accentLight }),
        C.text(160, 160, '\u2753', { fontSize: 28, anchor: 'middle' }),
        C.text(160, 175, '\u{1F916}', { fontSize: 20, anchor: 'middle' }),
        C.text(160, 225, 'Hallucination', { fontSize: 16, fontWeight: 'bold', fill: colors.accent, anchor: 'middle' }),
        C.text(160, 252, 'Confidently outputs', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.text(160, 270, 'wrong or fabricated', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.text(160, 288, 'information', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.rect(80, 310, 160, 30, { fill: colors.accentLight, rx: 6 }),
        C.text(160, 325, '"Makes stuff up"', { fontSize: 11, fill: colors.accent, anchor: 'middle', fontWeight: '500' }),

        // Card 2: Knowledge Cutoff
        C.rect(290, 100, 220, 300, { fill: colors.surface, stroke: colors.primary, rx: 16, shadow: true }),
        C.circle(400, 165, 40, { fill: colors.primaryLight }),
        C.text(400, 165, '\u{1F4C5}', { fontSize: 28, anchor: 'middle' }),
        C.text(400, 225, 'Knowledge Cutoff', { fontSize: 16, fontWeight: 'bold', fill: colors.primary, anchor: 'middle' }),
        C.text(400, 252, "Doesn't know about", { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.text(400, 270, 'events after its', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.text(400, 288, 'training date', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.rect(320, 310, 160, 30, { fill: colors.primaryLight, rx: 6 }),
        C.text(400, 325, '"Stuck in the past"', { fontSize: 11, fill: colors.primary, anchor: 'middle', fontWeight: '500' }),

        // Card 3: Black Box
        C.rect(530, 100, 220, 300, { fill: colors.surface, stroke: colors.secondary, rx: 16, shadow: true }),
        C.circle(640, 165, 40, { fill: colors.secondaryLight }),
        C.text(640, 165, '\u{1F4E6}', { fontSize: 28, anchor: 'middle' }),
        C.text(640, 225, 'Black Box', { fontSize: 16, fontWeight: 'bold', fill: colors.secondary, anchor: 'middle' }),
        C.text(640, 252, "Can't explain why", { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.text(640, 270, 'it made a specific', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.text(640, 288, 'decision or output', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.rect(560, 310, 160, 30, { fill: colors.secondaryLight, rx: 6 }),
        C.text(640, 325, '"Can\'t explain itself"', { fontSize: 11, fill: colors.secondary, anchor: 'middle', fontWeight: '500' }),

        // Footer
        C.text(400, 430, 'Knowing these limits helps you use AI more effectively and avoid pitfalls', {
          fontSize: 12, fill: colors.textLight, anchor: 'middle'
        }),
      ].join('\n');
    }
  },
];
