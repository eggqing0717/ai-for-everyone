import { colors, fonts, viewBoxes } from '../design-system.mjs';
import * as C from '../components.mjs';

export const diagrams = [
  // ─── 1. King-Queen Word Vector Analogy ─────────────────
  {
    filename: 'ch16-king-queen-analogy',
    viewBox: viewBoxes.wide,
    render() {
      return [
        // Background
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),

        // Title
        C.text(400, 35, 'Word Vector Analogy: King − Man + Woman ≈ Queen', {
          fontSize: 18, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),

        // ─── Coordinate system ─────
        // Axes
        C.line(80, 400, 550, 400, { stroke: colors.text, strokeWidth: 1.5 }),
        C.line(80, 400, 80, 70, { stroke: colors.text, strokeWidth: 1.5 }),
        C.arrow(80, 70, 80, 55, { stroke: colors.text, strokeWidth: 1.5 }),
        C.arrow(550, 400, 565, 400, { stroke: colors.text, strokeWidth: 1.5 }),
        C.text(310, 430, 'Dimension 1', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.text(50, 230, 'Dim 2', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),

        // ─── Four word points ─────
        // Man (bottom-left area)
        C.circle(180, 340, 10, { fill: colors.primary, opacity: 0.9 }),
        C.text(180, 365, 'Man', { fontSize: 13, fill: colors.primary, anchor: 'middle', fontWeight: '600' }),

        // Woman (bottom-right area)
        C.circle(380, 340, 10, { fill: colors.accent, opacity: 0.9 }),
        C.text(380, 365, 'Woman', { fontSize: 13, fill: colors.accent, anchor: 'middle', fontWeight: '600' }),

        // King (top-left area)
        C.circle(180, 140, 10, { fill: colors.primary, opacity: 0.9 }),
        C.text(180, 120, 'King', { fontSize: 13, fill: colors.primary, anchor: 'middle', fontWeight: '600' }),

        // Queen (top-right area)
        C.circle(380, 140, 10, { fill: colors.accent, opacity: 0.9 }),
        C.text(380, 120, 'Queen', { fontSize: 13, fill: colors.accent, anchor: 'middle', fontWeight: '600' }),

        // ─── Arrows showing relationships ─────
        // Man → Woman (gender direction, horizontal)
        C.arrow(195, 340, 365, 340, { stroke: colors.secondary, strokeWidth: 2.5 }),
        C.text(280, 325, 'Gender', { fontSize: 11, fill: colors.secondary, anchor: 'middle', fontWeight: '600' }),

        // King → Queen (gender direction, horizontal, parallel)
        C.arrow(195, 140, 365, 140, { stroke: colors.secondary, strokeWidth: 2.5 }),
        C.text(280, 155, 'Gender', { fontSize: 11, fill: colors.secondary, anchor: 'middle', fontWeight: '600' }),

        // Man → King (royalty direction, vertical)
        C.arrow(180, 325, 180, 155, { stroke: colors.primary, strokeWidth: 2 }),
        C.text(155, 240, 'Royalty', { fontSize: 11, fill: colors.primary, anchor: 'middle', fontWeight: '600' }),

        // Woman → Queen (royalty direction, vertical, parallel)
        C.arrow(380, 325, 380, 155, { stroke: colors.primary, strokeWidth: 2 }),
        C.text(410, 240, 'Royalty', { fontSize: 11, fill: colors.primary, anchor: 'middle', fontWeight: '600' }),

        // Dashed parallelogram
        C.path('M180,340 L380,340 L380,140 L180,140 Z', {
          fill: 'none', stroke: colors.border, strokeWidth: 1.5
        }),

        // ─── Formula on the right ─────
        C.rect(590, 90, 190, 180, { fill: colors.surface, stroke: colors.border, rx: 12, shadow: true }),
        C.text(685, 120, 'Vector Arithmetic', { fontSize: 13, fill: colors.text, anchor: 'middle', fontWeight: '700' }),
        C.line(610, 135, 760, 135, { stroke: colors.border }),

        C.text(685, 165, 'King − Man', { fontSize: 13, fill: colors.primary, anchor: 'middle' }),
        C.text(685, 190, '= Royalty direction', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }),
        C.text(685, 220, 'Royalty + Woman', { fontSize: 13, fill: colors.accent, anchor: 'middle' }),
        C.text(685, 245, '≈ Queen', { fontSize: 15, fill: colors.secondary, anchor: 'middle', fontWeight: 'bold' }),

        // ─── Bottom insight ─────
        C.rect(150, 395, 500, 40, { fill: colors.secondaryLight, rx: 20, opacity: 0.5 }),
        C.text(400, 415, 'Parallel arrows = same relationship encoded in vector space', {
          fontSize: 12, fill: colors.secondary, anchor: 'middle', fontWeight: '500'
        }),
      ].join('\n');
    }
  },

  // ─── 2. Q/K/V Matrix Computation ──────────────────────
  {
    filename: 'ch17-qkv-computation',
    viewBox: viewBoxes.wide,
    render() {
      return [
        // Background
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),

        // Title
        C.text(400, 30, 'Q/K/V Attention Computation', {
          fontSize: 20, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),
        C.text(400, 52, 'Attention(Q,K,V) = softmax(QK^T / √d_k) × V', {
          fontSize: 12, fill: colors.textLight, anchor: 'middle'
        }),

        // ─── Step 1: Input embeddings → Q, K, V ─────
        C.text(80, 85, 'Step 1: Linear Projections', { fontSize: 12, fill: colors.text, fontWeight: '600' }),

        // Input matrix X
        C.rect(40, 100, 80, 100, { fill: colors.primaryLight, stroke: colors.primary, rx: 6 }),
        C.text(80, 130, 'X', { fontSize: 16, fill: colors.primary, anchor: 'middle', fontWeight: 'bold' }),
        C.text(80, 155, '(n × d)', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),
        C.text(80, 175, 'Input', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),

        // Multiply arrows to Q, K, V
        C.arrow(125, 120, 175, 105, { stroke: colors.text, strokeWidth: 1.5 }),
        C.arrow(125, 150, 175, 150, { stroke: colors.text, strokeWidth: 1.5 }),
        C.arrow(125, 180, 175, 195, { stroke: colors.text, strokeWidth: 1.5 }),

        // Weight matrices
        C.text(155, 95, 'W_Q', { fontSize: 10, fill: colors.primary, anchor: 'middle' }),
        C.text(155, 143, 'W_K', { fontSize: 10, fill: colors.secondary, anchor: 'middle' }),
        C.text(155, 192, 'W_V', { fontSize: 10, fill: colors.accent, anchor: 'middle' }),

        // Q matrix
        C.rect(180, 85, 65, 40, { fill: colors.primary, rx: 6, opacity: 0.2 }),
        C.rect(180, 85, 65, 40, { fill: 'none', stroke: colors.primary, rx: 6, strokeWidth: 2 }),
        C.text(212, 108, 'Q', { fontSize: 14, fill: colors.primary, anchor: 'middle', fontWeight: 'bold' }),

        // K matrix
        C.rect(180, 133, 65, 40, { fill: colors.secondary, rx: 6, opacity: 0.2 }),
        C.rect(180, 133, 65, 40, { fill: 'none', stroke: colors.secondary, rx: 6, strokeWidth: 2 }),
        C.text(212, 156, 'K', { fontSize: 14, fill: colors.secondary, anchor: 'middle', fontWeight: 'bold' }),

        // V matrix
        C.rect(180, 180, 65, 40, { fill: colors.accent, rx: 6, opacity: 0.2 }),
        C.rect(180, 180, 65, 40, { fill: 'none', stroke: colors.accent, rx: 6, strokeWidth: 2 }),
        C.text(212, 203, 'V', { fontSize: 14, fill: colors.accent, anchor: 'middle', fontWeight: 'bold' }),

        // ─── Step 2: QK^T matmul ─────
        C.text(320, 85, 'Step 2: Attention Scores', { fontSize: 12, fill: colors.text, fontWeight: '600' }),

        C.arrow(250, 105, 310, 140, { stroke: colors.primary, strokeWidth: 1.5 }),
        C.arrow(250, 153, 310, 150, { stroke: colors.secondary, strokeWidth: 1.5 }),

        // QK^T result
        C.rect(315, 110, 90, 90, { fill: colors.primaryLight, stroke: colors.primary, rx: 6, opacity: 0.5 }),
        C.text(360, 140, 'Q × K^T', { fontSize: 12, fill: colors.primary, anchor: 'middle', fontWeight: '600' }),
        C.text(360, 162, '(n × n)', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),
        C.text(360, 182, 'scores', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),

        // Scale
        C.arrow(410, 155, 450, 155, { stroke: colors.text, strokeWidth: 1.5 }),
        C.text(430, 143, '÷√d_k', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),

        // ─── Step 3: Softmax ─────
        C.text(470, 85, 'Step 3: Softmax', { fontSize: 12, fill: colors.text, fontWeight: '600' }),

        C.rect(455, 120, 90, 70, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 6 }),
        C.text(500, 148, 'Softmax', { fontSize: 12, fill: colors.secondary, anchor: 'middle', fontWeight: '600' }),
        C.text(500, 170, '(weights)', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),

        // ─── Step 4: Multiply by V ─────
        C.text(600, 85, 'Step 4: Output', { fontSize: 12, fill: colors.text, fontWeight: '600' }),

        C.arrow(550, 155, 590, 155, { stroke: colors.text, strokeWidth: 1.5 }),
        C.text(570, 143, '× V', { fontSize: 10, fill: colors.accent, anchor: 'middle' }),

        // V path
        C.arrow(250, 200, 600, 200, { stroke: colors.accent, strokeWidth: 1.5 }),

        // Output
        C.rect(600, 120, 80, 100, { fill: colors.accentLight, stroke: colors.accent, rx: 6 }),
        C.text(640, 155, 'Output', { fontSize: 13, fill: colors.accent, anchor: 'middle', fontWeight: '600' }),
        C.text(640, 178, '(n × d_v)', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),
        C.text(640, 200, 'Context', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),

        // ─── Bottom: Visual heatmap example ─────
        C.rect(40, 260, 720, 170, { fill: colors.surface, stroke: colors.border, rx: 10, shadow: true }),
        C.text(400, 285, 'Example: "The cat sat on the mat"', {
          fontSize: 13, fill: colors.text, anchor: 'middle', fontWeight: '600'
        }),

        // Words
        ...['The','cat','sat','on','the','mat'].map((w, i) => 
          C.text(100 + i * 110, 315, w, { fontSize: 12, fill: colors.text, anchor: 'middle' })
        ),

        // Attention weight visualization (simplified heatmap row for "cat")
        C.text(60, 345, '"cat"→', { fontSize: 11, fill: colors.primary, anchor: 'end' }),
        // Weights: The=0.1, cat=0.3, sat=0.3, on=0.05, the=0.05, mat=0.2
        ...[0.1, 0.3, 0.3, 0.05, 0.05, 0.2].map((w, i) => [
          C.rect(70 + i * 110, 330, 60, 30, {
            fill: colors.primary, rx: 4, opacity: w + 0.1
          }),
          C.text(100 + i * 110, 345, w.toFixed(2), {
            fontSize: 10, fill: w > 0.2 ? colors.surface : colors.text, anchor: 'middle'
          }),
        ]).flat(),

        C.text(400, 390, 'Attention weights sum to 1.0 (probability distribution)', {
          fontSize: 11, fill: colors.textLight, anchor: 'middle'
        }),

        // Arrow indicating high attention
        C.text(210, 410, '↑ High attention to related words', {
          fontSize: 11, fill: colors.primary, anchor: 'middle'
        }),
      ].join('\n');
    }
  },

  // ─── 1. ch15-nlp-tasks ─────────────────────────────────
  {
    filename: 'ch15-nlp-tasks',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'NLP Tasks Overview', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      // Four quadrants
      const quadrants = [
        { x: 60, y: 70, label: 'Classification', desc: 'Spam? / Sentiment?', icon: '📋', color: colors.primary },
        { x: 420, y: 70, label: 'Translation', desc: 'EN → FR / ZH → EN', icon: '🌍', color: colors.secondary },
        { x: 60, y: 260, label: 'Question Answering', desc: 'Context → Answer', icon: '❓', color: colors.accent },
        { x: 420, y: 260, label: 'Generation', desc: 'Write / Summarize', icon: '✍️', color: '#9F7AEA' },
      ];

      const qw = 310, qh = 160;
      for (const q of quadrants) {
        parts.push(C.rect(q.x, q.y, qw, qh, { fill: colors.surface, stroke: q.color, rx: 12, strokeWidth: 2 }));
        parts.push(C.rect(q.x, q.y, qw, 40, { fill: q.color, rx: 12, opacity: 0.12 }));
        parts.push(C.rect(q.x, q.y + 30, qw, 10, { fill: q.color, rx: 0, opacity: 0.12 }));
        parts.push(C.text(q.x + 50, q.y + 24, q.label, { fontSize: 15, fill: q.color, fontWeight: 'bold' }));
        parts.push(C.text(q.x + qw / 2, q.y + 80, q.icon, { fontSize: 32, anchor: 'middle' }));
        parts.push(C.text(q.x + qw / 2, q.y + 130, q.desc, { fontSize: 13, fill: colors.textLight, anchor: 'middle' }));
      }

      // Center connecting icon
      parts.push(C.circle(400, 245, 24, { fill: colors.primaryLight, stroke: colors.primary, strokeWidth: 2 }));
      parts.push(C.text(400, 245, 'NLP', { fontSize: 11, fill: colors.primary, anchor: 'middle', fontWeight: 'bold' }));

      return parts.join('\n');
    }
  },

  // ─── 2. ch15-rule-vs-learning ──────────────────────────
  {
    filename: 'ch15-rule-vs-learning',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'Rule-Based vs. Learning-Based', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      // Divider
      parts.push(C.line(400, 70, 400, 420, { stroke: colors.border, strokeWidth: 2, strokeDasharray: '6,4' }));

      // Left: Rule-based (gray tone)
      parts.push(C.rect(40, 80, 320, 310, { fill: '#F7FAFC', stroke: '#CBD5E0', rx: 12, strokeWidth: 1.5 }));
      parts.push(C.text(200, 110, 'Hard-Coded Rules', { fontSize: 16, fill: '#4A5568', anchor: 'middle', fontWeight: 'bold' }));

      // Rule book
      parts.push(C.rect(140, 140, 120, 150, { fill: colors.surface, stroke: '#CBD5E0', rx: 6 }));
      parts.push(C.text(200, 160, 'Rule Book', { fontSize: 12, fill: '#4A5568', anchor: 'middle', fontWeight: '600' }));
      // Rule lines
      for (let i = 0; i < 6; i++) {
        parts.push(C.line(155, 180 + i * 16, 245, 180 + i * 16, { stroke: '#CBD5E0', strokeWidth: 1.5 }));
      }
      // Frustrated engineer
      parts.push(C.circle(200, 330, 20, { fill: '#EDF2F7', stroke: '#A0AEC0', strokeWidth: 2 }));
      parts.push(C.text(200, 330, '😓', { fontSize: 16, anchor: 'middle' }));
      parts.push(C.text(200, 365, 'Manual & Brittle', { fontSize: 11, fill: '#718096', anchor: 'middle' }));

      // Right: Learning-based (blue tone)
      parts.push(C.rect(440, 80, 320, 310, { fill: colors.primaryLight, stroke: colors.primary, rx: 12, strokeWidth: 1.5 }));
      parts.push(C.text(600, 110, 'Automatic Learning', { fontSize: 16, fill: colors.primary, anchor: 'middle', fontWeight: 'bold' }));

      // Data streams
      for (let i = 0; i < 4; i++) {
        parts.push(C.rect(470, 140 + i * 35, 260, 25, { fill: colors.primary, rx: 4, opacity: 0.08 + i * 0.04 }));
        parts.push(C.line(480, 152 + i * 35, 580 + i * 20, 152 + i * 35, { stroke: colors.primary, strokeWidth: 1, }));
      }
      parts.push(C.text(600, 295, 'Data', { fontSize: 13, fill: colors.primary, anchor: 'middle', fontWeight: '500' }));

      // Happy robot
      parts.push(C.circle(600, 330, 20, { fill: colors.primaryLight, stroke: colors.primary, strokeWidth: 2 }));
      parts.push(C.text(600, 330, '💡', { fontSize: 16, anchor: 'middle' }));
      parts.push(C.text(600, 365, 'Adaptive & Scalable', { fontSize: 11, fill: colors.primary, anchor: 'middle' }));

      // VS badge
      parts.push(C.circle(400, 245, 22, { fill: colors.surface, stroke: colors.border, strokeWidth: 2 }));
      parts.push(C.text(400, 245, 'VS', { fontSize: 12, fill: colors.text, anchor: 'middle', fontWeight: 'bold' }));

      return parts.join('\n');
    }
  },

  // ─── 3. ch16-word-embedding ────────────────────────────
  {
    filename: 'ch16-word-embedding',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 30, 'Word Embedding: 2D Visualization', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      // Coordinate system
      const ox = 120, oy = 380, axisW = 600, axisH = 300;
      parts.push(C.arrow(ox, oy, ox + axisW, oy, { stroke: colors.text, strokeWidth: 2 }));
      parts.push(C.arrow(ox, oy, ox, oy - axisH, { stroke: colors.text, strokeWidth: 2 }));
      parts.push(C.text(ox + axisW + 10, oy + 5, 'Dim 1', { fontSize: 12, fill: colors.textLight }));
      parts.push(C.text(ox - 10, oy - axisH - 10, 'Dim 2', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }));

      // Food cluster (bottom-right area)
      const foods = [
        { label: 'apple', x: 480, y: 330 },
        { label: 'banana', x: 530, y: 300 },
        { label: 'orange', x: 510, y: 360 },
        { label: 'grape', x: 560, y: 330 },
      ];
      // Cluster circle
      parts.push(C.circle(520, 330, 65, { fill: colors.accent, opacity: 0.08, stroke: colors.accent, strokeWidth: 1.5 }));
      parts.push(C.text(520, 395, 'Fruits', { fontSize: 12, fill: colors.accent, anchor: 'middle', fontWeight: '600' }));
      for (const f of foods) {
        parts.push(C.circle(f.x, f.y, 6, { fill: colors.accent }));
        parts.push(C.text(f.x + 10, f.y - 10, f.label, { fontSize: 11, fill: colors.text }));
      }

      // Animal cluster (top-left area)
      const animals = [
        { label: 'cat', x: 200, y: 140 },
        { label: 'dog', x: 240, y: 120 },
        { label: 'tiger', x: 220, y: 170 },
        { label: 'lion', x: 260, y: 155 },
      ];
      parts.push(C.circle(230, 145, 60, { fill: colors.primary, opacity: 0.08, stroke: colors.primary, strokeWidth: 1.5 }));
      parts.push(C.text(230, 85, 'Animals', { fontSize: 12, fill: colors.primary, anchor: 'middle', fontWeight: '600' }));
      for (const a of animals) {
        parts.push(C.circle(a.x, a.y, 6, { fill: colors.primary }));
        parts.push(C.text(a.x + 10, a.y - 10, a.label, { fontSize: 11, fill: colors.text }));
      }

      // Tech cluster (middle area)
      const tech = [
        { label: 'computer', x: 400, y: 200 },
        { label: 'phone', x: 440, y: 220 },
        { label: 'tablet', x: 380, y: 235 },
      ];
      parts.push(C.circle(405, 218, 55, { fill: colors.secondary, opacity: 0.08, stroke: colors.secondary, strokeWidth: 1.5 }));
      parts.push(C.text(405, 275, 'Tech', { fontSize: 12, fill: colors.secondary, anchor: 'middle', fontWeight: '600' }));
      for (const t of tech) {
        parts.push(C.circle(t.x, t.y, 6, { fill: colors.secondary }));
        parts.push(C.text(t.x + 10, t.y - 10, t.label, { fontSize: 11, fill: colors.text }));
      }

      // Legend
      parts.push(C.rect(600, 80, 170, 100, { fill: colors.surface, stroke: colors.border, rx: 8 }));
      parts.push(C.text(685, 100, 'Similar words', { fontSize: 12, fill: colors.text, anchor: 'middle', fontWeight: '600' }));
      parts.push(C.text(685, 120, 'cluster together', { fontSize: 12, fill: colors.text, anchor: 'middle', fontWeight: '600' }));
      parts.push(C.circle(625, 145, 5, { fill: colors.primary }));
      parts.push(C.text(640, 145, 'Animals', { fontSize: 11, fill: colors.textLight }));
      parts.push(C.circle(625, 165, 5, { fill: colors.accent }));
      parts.push(C.text(640, 165, 'Fruits', { fontSize: 11, fill: colors.textLight }));

      return parts.join('\n');
    }
  },

  // ─── 4. ch16-word-vector-space ─────────────────────────
  {
    filename: 'ch16-word-vector-space',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 30, 'Word Vector Analogy: King − Man + Woman ≈ Queen', { fontSize: 20, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      // Points in vector space
      const points = {
        king: { x: 480, y: 100, color: colors.primary },
        queen: { x: 620, y: 100, color: '#9F7AEA' },
        man: { x: 480, y: 280, color: colors.secondary },
        woman: { x: 620, y: 280, color: colors.accent },
      };

      // Background grid
      for (let gx = 150; gx <= 750; gx += 50) {
        parts.push(C.line(gx, 70, gx, 360, { stroke: colors.border, strokeWidth: 0.5 }));
      }
      for (let gy = 70; gy <= 360; gy += 50) {
        parts.push(C.line(150, gy, 750, gy, { stroke: colors.border, strokeWidth: 0.5 }));
      }

      // Arrows showing relationships
      // Man → Woman (horizontal, "gender")
      parts.push(C.arrow(points.man.x + 20, points.man.y, points.woman.x - 20, points.woman.y, { stroke: colors.accent, strokeWidth: 2.5 }));
      parts.push(C.text(550, points.man.y + 20, 'gender direction', { fontSize: 11, fill: colors.accent, anchor: 'middle' }));

      // King → Queen (horizontal, same direction)
      parts.push(C.arrow(points.king.x + 20, points.king.y, points.queen.x - 20, points.queen.y, { stroke: colors.accent, strokeWidth: 2.5 }));
      parts.push(C.text(550, points.king.y - 18, 'gender direction', { fontSize: 11, fill: colors.accent, anchor: 'middle' }));

      // King → Man (vertical, "royalty")
      parts.push(C.arrow(points.king.x, points.king.y + 20, points.man.x, points.man.y - 20, { stroke: colors.primary, strokeWidth: 2 }));
      parts.push(C.text(points.king.x - 30, 190, 'royalty', { fontSize: 11, fill: colors.primary, anchor: 'middle' }));

      // Queen → Woman (vertical, "royalty")
      parts.push(C.arrow(points.queen.x, points.queen.y + 20, points.woman.x, points.woman.y - 20, { stroke: colors.primary, strokeWidth: 2 }));
      parts.push(C.text(points.queen.x + 30, 190, 'royalty', { fontSize: 11, fill: colors.primary, anchor: 'middle' }));

      // Points
      for (const [name, p] of Object.entries(points)) {
        parts.push(C.circle(p.x, p.y, 20, { fill: p.color, opacity: 0.15 }));
        parts.push(C.circle(p.x, p.y, 20, { fill: 'none', stroke: p.color, strokeWidth: 2.5 }));
        parts.push(C.text(p.x, p.y, name.charAt(0).toUpperCase() + name.slice(1), { fontSize: 12, fill: p.color, anchor: 'middle', fontWeight: 'bold' }));
      }

      // Formula at bottom
      parts.push(C.rect(180, 385, 440, 45, { fill: colors.surface, stroke: colors.border, rx: 10 }));
      parts.push(C.text(400, 412, 'King − Man + Woman ≈ Queen', { fontSize: 16, fill: colors.text, anchor: 'middle', fontWeight: '600', fontFamily: fonts.mono }));

      return parts.join('\n');
    }
  },

  // ─── 5. ch17-self-attention ────────────────────────────
  {
    filename: 'ch17-self-attention',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 30, 'Self-Attention: Q / K / V Mechanism', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      // Input tokens
      const tokens = ['The', 'cat', 'sat', 'on', 'mat'];
      const tokenY = 90, tokenW = 70, tokenH = 35, startX = 185;
      const gap = 90;

      for (let i = 0; i < tokens.length; i++) {
        const tx = startX + i * gap;
        parts.push(C.rect(tx, tokenY, tokenW, tokenH, { fill: colors.primaryLight, stroke: colors.primary, rx: 6 }));
        parts.push(C.text(tx + tokenW / 2, tokenY + tokenH / 2, tokens[i], { fontSize: 13, fill: colors.text, anchor: 'middle', fontWeight: '500' }));
      }
      parts.push(C.text(130, tokenY + tokenH / 2, 'Input:', { fontSize: 12, fill: colors.textLight, anchor: 'end' }));

      // Q, K, V matrices
      const matY = 170, matH = 55, matW = 350;
      const matrices = [
        { label: 'Q (Query)', color: colors.primary, y: matY },
        { label: 'K (Key)', color: colors.secondary, y: matY + 70 },
        { label: 'V (Value)', color: colors.accent, y: matY + 140 },
      ];

      for (const m of matrices) {
        parts.push(C.rect(200, m.y, matW, matH, { fill: m.color, rx: 6, opacity: 0.1 }));
        parts.push(C.rect(200, m.y, matW, matH, { fill: 'none', stroke: m.color, rx: 6, strokeWidth: 1.5 }));
        parts.push(C.text(185, m.y + matH / 2, m.label, { fontSize: 12, fill: m.color, anchor: 'end', fontWeight: '600' }));
        // Matrix grid lines
        for (let i = 1; i < 5; i++) {
          parts.push(C.line(200 + i * 70, m.y + 5, 200 + i * 70, m.y + matH - 5, { stroke: m.color, strokeWidth: 0.5 }));
        }
      }

      // Arrows from input to matrices
      for (let i = 0; i < tokens.length; i++) {
        const tx = startX + i * gap + tokenW / 2;
        parts.push(C.line(tx, tokenY + tokenH, tx, matY - 5, { stroke: colors.border, strokeWidth: 1, strokeDasharray: '3,2' }));
      }

      // Score computation box
      const scoreX = 610, scoreY = 175;
      parts.push(C.rect(scoreX, scoreY, 160, 60, { fill: colors.primaryLight, stroke: colors.primary, rx: 8 }));
      parts.push(C.text(scoreX + 80, scoreY + 20, 'Score = Q × Kᵀ', { fontSize: 12, fill: colors.primary, anchor: 'middle', fontWeight: '600' }));
      parts.push(C.text(scoreX + 80, scoreY + 42, '÷ √d', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));

      // Softmax box
      parts.push(C.rect(scoreX, scoreY + 80, 160, 40, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 8 }));
      parts.push(C.text(scoreX + 80, scoreY + 100, 'Softmax', { fontSize: 12, fill: colors.secondary, anchor: 'middle', fontWeight: '600' }));

      // Output box
      parts.push(C.rect(scoreX, scoreY + 140, 160, 40, { fill: colors.accentLight, stroke: colors.accent, rx: 8 }));
      parts.push(C.text(scoreX + 80, scoreY + 160, 'Attention × V', { fontSize: 12, fill: colors.accent, anchor: 'middle', fontWeight: '600' }));

      // Arrows connecting computation steps
      parts.push(C.arrow(scoreX + 80, scoreY + 60, scoreX + 80, scoreY + 78, { stroke: colors.text, strokeWidth: 1.5 }));
      parts.push(C.arrow(scoreX + 80, scoreY + 120, scoreX + 80, scoreY + 138, { stroke: colors.text, strokeWidth: 1.5 }));

      // Connection arrows from matrices to score
      parts.push(C.arrow(550, matY + 28, scoreX, scoreY + 15, { stroke: colors.primary, strokeWidth: 1.2 }));
      parts.push(C.arrow(550, matY + 98, scoreX, scoreY + 40, { stroke: colors.secondary, strokeWidth: 1.2 }));
      parts.push(C.arrow(550, matY + 168, scoreX, scoreY + 155, { stroke: colors.accent, strokeWidth: 1.2 }));

      // Output
      parts.push(C.text(scoreX + 80, scoreY + 200, 'Contextual Output', { fontSize: 12, fill: colors.text, anchor: 'middle', fontWeight: '500' }));

      return parts.join('\n');
    }
  },

  // ─── 6. ch18-attention-heatmap ─────────────────────────
  {
    filename: 'ch18-attention-heatmap',
    viewBox: viewBoxes.square,
    render() {
      const parts = [
        C.rect(0, 0, 600, 600, { fill: colors.background, rx: 0 }),
        C.text(300, 30, 'Attention Heatmap', { fontSize: 20, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      const words = ['The', 'cat', 'sat', 'on', 'the', 'mat'];
      const n = words.length;
      const gridX = 120, gridY = 100;
      const cellSize = 65;

      // Attention weights (simulated - higher for semantically related)
      const weights = [
        [0.9, 0.1, 0.0, 0.0, 0.0, 0.0],  // The
        [0.1, 0.8, 0.2, 0.0, 0.0, 0.3],  // cat
        [0.0, 0.3, 0.7, 0.1, 0.0, 0.2],  // sat
        [0.0, 0.0, 0.2, 0.6, 0.1, 0.4],  // on
        [0.0, 0.0, 0.0, 0.1, 0.5, 0.3],  // the
        [0.0, 0.4, 0.2, 0.3, 0.2, 0.8],  // mat
      ];

      // Column headers (target words)
      for (let i = 0; i < n; i++) {
        parts.push(C.text(gridX + i * cellSize + cellSize / 2, gridY - 10, words[i], {
          fontSize: 13, fill: colors.text, anchor: 'middle', fontWeight: '500'
        }));
      }

      // Row headers (source words)
      for (let i = 0; i < n; i++) {
        parts.push(C.text(gridX - 10, gridY + i * cellSize + cellSize / 2, words[i], {
          fontSize: 13, fill: colors.text, anchor: 'end', fontWeight: '500'
        }));
      }

      // Heatmap cells
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          const w = weights[r][c];
          const opacity = w * 0.85 + 0.05;
          const cx = gridX + c * cellSize;
          const cy = gridY + r * cellSize;
          // Color interpolation: low=light blue, high=deep blue
          parts.push(C.rect(cx, cy, cellSize - 2, cellSize - 2, {
            fill: colors.primary, rx: 4, opacity
          }));
          // Show weight value
          const textColor = w > 0.5 ? colors.surface : colors.text;
          parts.push(C.text(cx + cellSize / 2 - 1, cy + cellSize / 2 - 1, w.toFixed(1), {
            fontSize: 12, fill: textColor, anchor: 'middle', fontWeight: '500'
          }));
        }
      }

      // Legend
      parts.push(C.text(300, 530, 'Attention Score', { fontSize: 13, fill: colors.text, anchor: 'middle', fontWeight: '600' }));
      // Gradient bar
      const legendX = 180, legendY = 548, legendW = 240;
      for (let i = 0; i <= 10; i++) {
        parts.push(C.rect(legendX + i * (legendW / 11), legendY, legendW / 11, 18, {
          fill: colors.primary, rx: 0, opacity: i * 0.085 + 0.05
        }));
      }
      parts.push(C.text(legendX - 5, legendY + 9, 'Low', { fontSize: 10, fill: colors.textLight, anchor: 'end' }));
      parts.push(C.text(legendX + legendW + 5, legendY + 9, 'High', { fontSize: 10, fill: colors.textLight }));

      // Axis labels
      parts.push(C.text(gridX + n * cellSize / 2, gridY - 35, 'Target Token (Key)', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }));
      parts.push(C.group([
        C.text(0, 0, 'Source Token (Query)', { fontSize: 12, fill: colors.textLight, anchor: 'middle' })
      ], { transform: `translate(55, ${gridY + n * cellSize / 2}) rotate(-90)` }));

      return parts.join('\n');
    }
  },

  // ─── 7. ch18-positional-encoding ───────────────────────
  {
    filename: 'ch18-positional-encoding',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'Positional Encoding: Giving Words Their Position', { fontSize: 20, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      const words = ['I', 'love', 'deep', 'learning'];
      const startX = 140, wordY = 100, gap = 150;

      // Word embedding blocks
      for (let i = 0; i < words.length; i++) {
        const wx = startX + i * gap;
        // Word vector
        parts.push(C.rect(wx, wordY, 100, 45, { fill: colors.primaryLight, stroke: colors.primary, rx: 8 }));
        parts.push(C.text(wx + 50, wordY + 15, words[i], { fontSize: 14, fill: colors.primary, anchor: 'middle', fontWeight: '600' }));
        parts.push(C.text(wx + 50, wordY + 35, 'embedding', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));

        // Plus sign
        parts.push(C.text(wx + 50, wordY + 62, '+', { fontSize: 20, fill: colors.text, anchor: 'middle', fontWeight: 'bold' }));

        // Position encoding
        parts.push(C.rect(wx, wordY + 78, 100, 45, { fill: colors.accentLight, stroke: colors.accent, rx: 8 }));
        parts.push(C.text(wx + 50, wordY + 95, `pos = ${i + 1}`, { fontSize: 13, fill: colors.accent, anchor: 'middle', fontWeight: '600' }));
        parts.push(C.text(wx + 50, wordY + 115, 'sin/cos', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));

        // Equals
        parts.push(C.text(wx + 50, wordY + 140, '=', { fontSize: 18, fill: colors.text, anchor: 'middle', fontWeight: 'bold' }));

        // Combined output
        parts.push(C.rect(wx, wordY + 155, 100, 40, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 8 }));
        parts.push(C.text(wx + 50, wordY + 178, 'input vector', { fontSize: 11, fill: colors.secondary, anchor: 'middle', fontWeight: '500' }));
      }

      // Sine wave illustration at bottom
      const waveY = 350, waveH = 40;
      parts.push(C.text(80, waveY, 'Encoding Pattern:', { fontSize: 12, fill: colors.textLight }));
      // Draw sine wave
      let wavePath = `M120,${waveY + 20}`;
      for (let x = 0; x <= 600; x += 5) {
        const y = waveY + 20 + Math.sin(x / 30) * waveH / 2;
        wavePath += ` L${120 + x},${y}`;
      }
      parts.push(C.path(wavePath, { stroke: colors.accent, strokeWidth: 2 }));
      // Second wave (cosine, shifted)
      let wave2Path = `M120,${waveY + 20}`;
      for (let x = 0; x <= 600; x += 5) {
        const y = waveY + 20 + Math.cos(x / 30) * waveH / 2;
        wave2Path += ` L${120 + x},${y}`;
      }
      parts.push(C.path(wave2Path, { stroke: colors.primary, strokeWidth: 1.5, opacity: 0.5 }));

      // Note at bottom
      parts.push(C.rect(200, 405, 400, 30, { fill: colors.surface, stroke: colors.border, rx: 6 }));
      parts.push(C.text(400, 422, '"dog bites man" ≠ "man bites dog" — order matters!', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));

      return parts.join('\n');
    }
  },

  // ─── 8. ch19-transformer-arch ──────────────────────────
  {
    filename: 'ch19-transformer-arch',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 25, 'Transformer Architecture', { fontSize: 20, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      // Encoder side (left)
      const encX = 80, encY = 55, encW = 280, encH = 350;
      parts.push(C.rect(encX, encY, encW, encH, { fill: colors.primary, rx: 12, opacity: 0.05 }));
      parts.push(C.rect(encX, encY, encW, encH, { fill: 'none', stroke: colors.primary, rx: 12, strokeWidth: 2 }));
      parts.push(C.text(encX + encW / 2, encY + 20, 'Encoder (×N)', { fontSize: 14, fill: colors.primary, anchor: 'middle', fontWeight: 'bold' }));

      // Encoder blocks
      const eBlockY = 90;
      // Input Embedding
      parts.push(C.rect(encX + 30, eBlockY, encW - 60, 35, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 6 }));
      parts.push(C.text(encX + encW / 2, eBlockY + 18, 'Input Embedding + Pos Enc', { fontSize: 11, fill: colors.secondary, anchor: 'middle', fontWeight: '500' }));

      // Multi-Head Attention
      parts.push(C.rect(encX + 30, eBlockY + 55, encW - 60, 50, { fill: '#48BB78', rx: 6, opacity: 0.15 }));
      parts.push(C.rect(encX + 30, eBlockY + 55, encW - 60, 50, { fill: 'none', stroke: '#48BB78', rx: 6, strokeWidth: 1.5 }));
      parts.push(C.text(encX + encW / 2, eBlockY + 75, 'Multi-Head Attention', { fontSize: 12, fill: '#48BB78', anchor: 'middle', fontWeight: '600' }));
      parts.push(C.text(encX + encW / 2, eBlockY + 93, '(Self)', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));

      // Add & Norm
      parts.push(C.rect(encX + 30, eBlockY + 115, encW - 60, 25, { fill: colors.border, rx: 4, opacity: 0.5 }));
      parts.push(C.text(encX + encW / 2, eBlockY + 128, 'Add & Norm', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));

      // Feed Forward
      parts.push(C.rect(encX + 30, eBlockY + 155, encW - 60, 45, { fill: colors.primaryLight, stroke: colors.primary, rx: 6 }));
      parts.push(C.text(encX + encW / 2, eBlockY + 178, 'Feed Forward', { fontSize: 12, fill: colors.primary, anchor: 'middle', fontWeight: '500' }));

      // Add & Norm 2
      parts.push(C.rect(encX + 30, eBlockY + 210, encW - 60, 25, { fill: colors.border, rx: 4, opacity: 0.5 }));
      parts.push(C.text(encX + encW / 2, eBlockY + 223, 'Add & Norm', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));

      // Repeat indicator
      parts.push(C.text(encX + encW / 2, eBlockY + 265, '× N layers', { fontSize: 12, fill: colors.primary, anchor: 'middle', fontWeight: '600' }));

      // Decoder side (right)
      const decX = 440, decY = 55, decW = 300, decH = 350;
      parts.push(C.rect(decX, decY, decW, decH, { fill: '#E53E3E', rx: 12, opacity: 0.04 }));
      parts.push(C.rect(decX, decY, decW, decH, { fill: 'none', stroke: '#E53E3E', rx: 12, strokeWidth: 2 }));
      parts.push(C.text(decX + decW / 2, decY + 20, 'Decoder (×N)', { fontSize: 14, fill: '#E53E3E', anchor: 'middle', fontWeight: 'bold' }));

      // Decoder blocks
      const dBlockY = 90;
      // Output Embedding
      parts.push(C.rect(decX + 30, dBlockY, decW - 60, 35, { fill: colors.accentLight, stroke: colors.accent, rx: 6 }));
      parts.push(C.text(decX + decW / 2, dBlockY + 18, 'Output Embedding + Pos Enc', { fontSize: 11, fill: colors.accent, anchor: 'middle', fontWeight: '500' }));

      // Masked Multi-Head Attention
      parts.push(C.rect(decX + 30, dBlockY + 50, decW - 60, 42, { fill: '#48BB78', rx: 6, opacity: 0.15 }));
      parts.push(C.rect(decX + 30, dBlockY + 50, decW - 60, 42, { fill: 'none', stroke: '#48BB78', rx: 6, strokeWidth: 1.5 }));
      parts.push(C.text(decX + decW / 2, dBlockY + 72, 'Masked Multi-Head Attention', { fontSize: 11, fill: '#48BB78', anchor: 'middle', fontWeight: '600' }));

      // Cross-Attention
      parts.push(C.rect(decX + 30, dBlockY + 105, decW - 60, 42, { fill: '#9F7AEA', rx: 6, opacity: 0.15 }));
      parts.push(C.rect(decX + 30, dBlockY + 105, decW - 60, 42, { fill: 'none', stroke: '#9F7AEA', rx: 6, strokeWidth: 1.5 }));
      parts.push(C.text(decX + decW / 2, dBlockY + 127, 'Cross-Attention (to Encoder)', { fontSize: 11, fill: '#9F7AEA', anchor: 'middle', fontWeight: '600' }));

      // Feed Forward
      parts.push(C.rect(decX + 30, dBlockY + 160, decW - 60, 40, { fill: colors.primaryLight, stroke: colors.primary, rx: 6 }));
      parts.push(C.text(decX + decW / 2, dBlockY + 180, 'Feed Forward', { fontSize: 12, fill: colors.primary, anchor: 'middle', fontWeight: '500' }));

      // Linear + Softmax
      parts.push(C.rect(decX + 30, dBlockY + 215, decW - 60, 35, { fill: colors.accentLight, stroke: colors.accent, rx: 6 }));
      parts.push(C.text(decX + decW / 2, dBlockY + 233, 'Linear + Softmax → Output', { fontSize: 11, fill: colors.accent, anchor: 'middle', fontWeight: '500' }));

      // Cross-attention arrow from encoder to decoder
      parts.push(C.arrow(encX + encW + 5, 200, decX - 5, 200, { stroke: '#9F7AEA', strokeWidth: 2.5 }));
      parts.push(C.text(390, 188, 'K, V', { fontSize: 10, fill: '#9F7AEA', anchor: 'middle', fontWeight: '600' }));

      // Input/Output labels at bottom
      parts.push(C.text(encX + encW / 2, 430, 'Source Input', { fontSize: 12, fill: colors.primary, anchor: 'middle', fontWeight: '500' }));
      parts.push(C.text(decX + decW / 2, 430, 'Target Output', { fontSize: 12, fill: '#E53E3E', anchor: 'middle', fontWeight: '500' }));

      return parts.join('\n');
    }
  },

  // ─── 9. ch20-gpt-evolution ─────────────────────────────
  {
    filename: 'ch20-gpt-evolution',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'GPT Evolution: Scaling Up', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      const models = [
        { name: 'GPT-1', year: '2018', params: '117M', h: 80, color: '#48BB78' },
        { name: 'GPT-2', year: '2019', params: '1.5B', h: 150, color: colors.secondary },
        { name: 'GPT-3', year: '2020', params: '175B', h: 240, color: colors.primary },
        { name: 'GPT-4', year: '2023', params: '~1.8T', h: 330, color: '#9F7AEA' },
      ];

      const barW = 100, baseY = 380, startX = 140, gap = 170;

      // Staircase bars
      for (let i = 0; i < models.length; i++) {
        const m = models[i];
        const bx = startX + i * gap;
        const by = baseY - m.h;

        // Bar
        parts.push(C.rect(bx, by, barW, m.h, { fill: m.color, rx: 8, opacity: 0.2 }));
        parts.push(C.rect(bx, by, barW, m.h, { fill: 'none', stroke: m.color, rx: 8, strokeWidth: 2 }));

        // Model name
        parts.push(C.text(bx + barW / 2, by - 25, m.name, { fontSize: 16, fill: m.color, anchor: 'middle', fontWeight: 'bold' }));
        // Year
        parts.push(C.text(bx + barW / 2, by - 8, m.year, { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));
        // Params inside bar
        parts.push(C.text(bx + barW / 2, by + m.h / 2, m.params, { fontSize: 14, fill: m.color, anchor: 'middle', fontWeight: '600' }));
        parts.push(C.text(bx + barW / 2, by + m.h / 2 + 18, 'params', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));

        // Connecting arrow
        if (i < models.length - 1) {
          parts.push(C.arrow(bx + barW + 15, baseY - m.h / 2, bx + gap - 15, baseY - models[i + 1].h / 2, {
            stroke: colors.textLight, strokeWidth: 1.5
          }));
        }
      }

      // Base line
      parts.push(C.line(100, baseY, 740, baseY, { stroke: colors.border, strokeWidth: 2 }));

      // Y-axis label
      parts.push(C.text(70, 200, 'Scale', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }));
      parts.push(C.arrow(70, 370, 70, 80, { stroke: colors.textLight, strokeWidth: 1.5 }));

      // Bottom note
      parts.push(C.rect(220, 400, 360, 35, { fill: colors.surface, stroke: colors.border, rx: 8 }));
      parts.push(C.text(400, 420, 'Bigger model → More emergent capabilities', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }));

      return parts.join('\n');
    }
  },

  // ─── ch18-multi-head-attention ─────────────────────────
  {
    filename: 'ch18-multi-head-attention',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'Multi-Head Attention', {
          fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),
        C.text(400, 58, 'Multiple heads understand from different angles', {
          fontSize: 12, fill: colors.textLight, anchor: 'middle'
        }),
      ];

      // Input sentence
      const words = ['He', 'lent', 'the', 'book', 'to', 'her'];
      const wordX = 130;
      const wordSpacing = 48;
      parts.push(C.rect(100, 80, 300, 40, { fill: colors.primaryLight, rx: 8, opacity: 0.5 }));
      for (let i = 0; i < words.length; i++) {
        parts.push(C.text(wordX + i * wordSpacing, 100, words[i], { fontSize: 12, fill: colors.text, anchor: 'middle' }));
      }

      // Heads (8 colored channels)
      const headColors = ['#2E7BF6', '#22C1A6', '#FF8A3D', '#9F7AEA', '#E53E3E', '#38B2AC', '#D69E2E', '#667EEA'];
      const headLabels = ['Grammar', 'Reference', 'Semantics', 'Temporal', 'Subject', 'Object', 'Context', 'Theme'];
      const startY = 140;
      const headH = 30;
      const headGap = 4;

      for (let h = 0; h < 8; h++) {
        const y = startY + h * (headH + headGap);
        parts.push(C.rect(80, y, 340, headH, { fill: headColors[h], rx: 4, opacity: 0.12 }));
        parts.push(C.rect(80, y, 340, headH, { fill: 'none', stroke: headColors[h], rx: 4, opacity: 0.6 }));
        parts.push(C.text(95, y + headH / 2, `Head ${h + 1}`, { fontSize: 9, fill: headColors[h], fontWeight: '600' }));
        parts.push(C.text(410, y + headH / 2, headLabels[h], { fontSize: 10, fill: headColors[h] }));
      }

      // Arrow from heads to concat
      parts.push(C.arrow(430, 270, 530, 270, { stroke: colors.text }));

      // Concat + Linear box
      parts.push(C.rect(540, 180, 120, 180, { fill: colors.surface, stroke: colors.primary, rx: 12 }));
      parts.push(C.text(600, 250, 'Concat', { fontSize: 14, fontWeight: '600', fill: colors.primary, anchor: 'middle' }));
      parts.push(C.text(600, 275, '+', { fontSize: 16, fill: colors.textLight, anchor: 'middle' }));
      parts.push(C.text(600, 300, 'Linear', { fontSize: 14, fontWeight: '600', fill: colors.primary, anchor: 'middle' }));

      // Output arrow
      parts.push(C.arrow(665, 270, 730, 270, { stroke: colors.primary }));
      parts.push(C.rect(735, 240, 50, 60, { fill: colors.primaryLight, stroke: colors.primary, rx: 8 }));
      parts.push(C.text(760, 270, 'Out', { fontSize: 12, fontWeight: '600', fill: colors.primary, anchor: 'middle' }));

      // Footer
      parts.push(C.text(400, 430, '8 experts analyze the same sentence from different perspectives, then combine insights', {
        fontSize: 11, fill: colors.textLight, anchor: 'middle'
      }));

      return parts.join('\n');
    }
  },

  // ─── ch19-autoregressive ─────────────────────────────────
  {
    filename: 'ch19-autoregressive',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 40, 'Autoregressive Generation', {
          fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),
        C.text(400, 65, 'Word by word, like a word chain game', {
          fontSize: 13, fill: colors.textLight, anchor: 'middle'
        }),
      ];

      // Steps showing progressive generation
      const steps = [
        { text: 'Today the weather', newWord: '' },
        { text: 'Today the weather is', newWord: 'is' },
        { text: 'Today the weather is really', newWord: 'really' },
        { text: 'Today the weather is really nice', newWord: 'nice' },
      ];

      const startY = 110;
      const stepH = 70;

      for (let i = 0; i < steps.length; i++) {
        const y = startY + i * stepH;
        const s = steps[i];

        // Step number
        parts.push(C.circle(60, y + 20, 16, { fill: colors.primary, opacity: 0.15 }));
        parts.push(C.text(60, y + 20, `${i + 1}`, { fontSize: 13, fill: colors.primary, anchor: 'middle', fontWeight: 'bold' }));

        // Text box
        parts.push(C.rect(90, y, 500, 42, { fill: colors.surface, stroke: colors.border, rx: 8 }));

        // Words
        const allWords = s.text.split(' ');
        let xPos = 110;
        for (let w = 0; w < allWords.length; w++) {
          const isNew = (w === allWords.length - 1 && s.newWord !== '');
          const col = isNew ? colors.accent : colors.text;
          const fw = isNew ? 'bold' : 'normal';
          parts.push(C.text(xPos, y + 21, allWords[w], { fontSize: 14, fill: col, fontWeight: fw }));
          xPos += allWords[w].length * 9 + 10;
        }

        // Cursor at end
        if (i < steps.length - 1) {
          parts.push(C.rect(xPos + 5, y + 8, 2, 26, { fill: colors.accent, rx: 1 }));
        }

        // Arrow down
        if (i < steps.length - 1) {
          parts.push(C.arrow(340, y + 45, 340, y + stepH - 5, { stroke: colors.textLight }));
        }
      }

      // Loop arrow on the right
      parts.push(C.path('M620,150 C700,150 700,360 620,360', { stroke: colors.primary, strokeWidth: 2, fill: 'none' }));
      parts.push(C.text(710, 255, 'Repeat', { fontSize: 12, fill: colors.primary, anchor: 'middle' }));
      parts.push(C.arrow(620, 358, 600, 358, { stroke: colors.primary }));

      // Footer
      parts.push(C.text(400, 430, 'Each step: predict the next most likely word → append → repeat', {
        fontSize: 12, fill: colors.textLight, anchor: 'middle'
      }));

      return parts.join('\n');
    }
  },
];
