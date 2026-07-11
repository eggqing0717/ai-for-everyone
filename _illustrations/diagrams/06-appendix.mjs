import { colors, fonts, viewBoxes } from '../design-system.mjs';
import * as C from '../components.mjs';

export const diagrams = [
  // ─── 1. AI Tools Overview ──────────────────────────────
  {
    filename: 'appendix-tools',
    viewBox: viewBoxes.wide,
    render() {
      const tools = [
        { name: 'ChatGPT', color: colors.secondary, row: 0, col: 0 },
        { name: 'Claude', color: colors.accent, row: 0, col: 1 },
        { name: 'Midjourney', color: colors.primary, row: 0, col: 2 },
        { name: 'DALL-E', color: colors.accent, row: 0, col: 3 },
        { name: 'Copilot', color: colors.secondary, row: 1, col: 0 },
        { name: 'Gemini', color: colors.primary, row: 1, col: 1 },
        { name: 'Stable Diff.', color: colors.accent, row: 1, col: 2 },
        { name: 'Whisper', color: colors.secondary, row: 1, col: 3 },
        { name: 'LLaMA', color: colors.primary, row: 2, col: 0 },
        { name: 'Hugging Face', color: colors.accent, row: 2, col: 1 },
        { name: 'LangChain', color: colors.secondary, row: 2, col: 2 },
        { name: 'TensorFlow', color: colors.primary, row: 2, col: 3 },
      ];

      const gridStartX = 100;
      const gridStartY = 90;
      const cellW = 155;
      const cellH = 100;
      const gap = 15;

      const parts = [
        // Background
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),

        // Title
        C.text(400, 40, 'AI Tools & Platforms Overview', {
          fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),
        C.text(400, 62, 'Popular tools for text, image, code, and audio generation', {
          fontSize: 12, fill: colors.textLight, anchor: 'middle'
        }),
      ];

      // Category headers
      const categories = [
        { label: 'Chat & Text', x: 177, color: colors.secondary },
        { label: 'Image Gen', x: 490, color: colors.primary },
        { label: 'Code & Dev', x: 177, color: colors.secondary },
        { label: 'Open Source', x: 490, color: colors.primary },
      ];

      // Draw tool grid
      for (const tool of tools) {
        const x = gridStartX + tool.col * (cellW + gap);
        const y = gridStartY + tool.row * (cellH + gap);

        // Card
        parts.push(C.rect(x, y, cellW, cellH, { fill: colors.surface, stroke: colors.border, rx: 10, shadow: true }));

        // Color bar at top
        parts.push(C.rect(x, y, cellW, 6, { fill: tool.color, rx: 10, opacity: 0.7 }));
        parts.push(C.rect(x, y + 4, cellW, 4, { fill: tool.color, rx: 0, opacity: 0.7 }));

        // Icon circle
        parts.push(C.circle(x + cellW/2, y + 40, 18, { fill: tool.color, opacity: 0.15 }));
        parts.push(C.circle(x + cellW/2, y + 40, 18, { fill: 'none', stroke: tool.color, strokeWidth: 1.5 }));

        // First letter as icon
        parts.push(C.text(x + cellW/2, y + 40, tool.name[0], {
          fontSize: 16, fill: tool.color, anchor: 'middle', fontWeight: 'bold'
        }));

        // Tool name
        parts.push(C.text(x + cellW/2, y + 75, tool.name, {
          fontSize: 12, fill: colors.text, anchor: 'middle', fontWeight: '600'
        }));
      }

      // Bottom legend
      parts.push(C.rect(150, 420, 14, 14, { fill: colors.secondary, rx: 3 }));
      parts.push(C.text(172, 427, 'Text/Chat', { fontSize: 11, fill: colors.text }));
      parts.push(C.rect(310, 420, 14, 14, { fill: colors.primary, rx: 3 }));
      parts.push(C.text(332, 427, 'Image/Vision', { fontSize: 11, fill: colors.text }));
      parts.push(C.rect(470, 420, 14, 14, { fill: colors.accent, rx: 3 }));
      parts.push(C.text(492, 427, 'Multi-purpose', { fontSize: 11, fill: colors.text }));

      return parts.join('\n');
    }
  },

  // ─── 2. AI Development Timeline ───────────────────────
  {
    filename: 'appendix-timeline',
    viewBox: viewBoxes.wide,
    render() {
      const events = [
        { year: '1950', label: 'Turing Test', color: colors.primary, y: -1 },
        { year: '1956', label: 'Dartmouth\nConference', color: colors.primary, y: 1 },
        { year: '1986', label: 'Backprop', color: colors.secondary, y: -1 },
        { year: '1997', label: 'Deep Blue', color: colors.secondary, y: 1 },
        { year: '2012', label: 'AlexNet\nImageNet', color: colors.accent, y: -1 },
        { year: '2016', label: 'AlphaGo', color: colors.accent, y: 1 },
        { year: '2017', label: 'Transformer', color: colors.primary, y: -1 },
        { year: '2022', label: 'ChatGPT', color: colors.accent, y: 1 },
      ];

      const timelineY = 250;
      const startX = 60;
      const endX = 740;
      const n = events.length;
      const step = (endX - startX) / (n - 1);

      const parts = [
        // Background
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),

        // Title
        C.text(400, 40, 'AI Development Timeline', {
          fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),
        C.text(400, 62, 'Key Milestones from 1950 to 2024', {
          fontSize: 13, fill: colors.textLight, anchor: 'middle'
        }),

        // Main timeline line
        C.line(startX - 20, timelineY, endX + 20, timelineY, { stroke: colors.text, strokeWidth: 2.5 }),
        C.arrow(endX + 10, timelineY, endX + 30, timelineY, { stroke: colors.text, strokeWidth: 2.5 }),
      ];

      // Draw events
      for (let i = 0; i < n; i++) {
        const e = events[i];
        const x = startX + i * step;
        const above = e.y < 0;
        const labelY = above ? timelineY - 70 : timelineY + 70;
        const stemEnd = above ? timelineY - 30 : timelineY + 30;

        // Node circle on timeline
        parts.push(C.circle(x, timelineY, 8, { fill: e.color }));

        // Stem line
        parts.push(C.line(x, timelineY + (above ? -10 : 10), x, stemEnd, {
          stroke: e.color, strokeWidth: 1.5
        }));

        // Event card
        const cardW = 80;
        const cardH = 55;
        const cardY = above ? labelY - cardH/2 : labelY - cardH/2;
        parts.push(C.rect(x - cardW/2, cardY, cardW, cardH, {
          fill: colors.surface, stroke: e.color, rx: 8, shadow: true
        }));

        // Year
        parts.push(C.text(x, cardY + 18, e.year, {
          fontSize: 12, fill: e.color, anchor: 'middle', fontWeight: 'bold'
        }));

        // Label (handle multiline)
        const lines = e.label.split('\n');
        lines.forEach((line, li) => {
          parts.push(C.text(x, cardY + 35 + li * 14, line, {
            fontSize: 10, fill: colors.text, anchor: 'middle'
          }));
        });
      }

      // Era labels at bottom
      parts.push(C.rect(60, 370, 200, 30, { fill: colors.primaryLight, rx: 15, opacity: 0.5 }));
      parts.push(C.text(160, 385, 'Symbolic AI Era', {
        fontSize: 11, fill: colors.primary, anchor: 'middle', fontWeight: '600'
      }));

      parts.push(C.rect(300, 370, 180, 30, { fill: colors.secondaryLight, rx: 15, opacity: 0.5 }));
      parts.push(C.text(390, 385, 'Machine Learning Era', {
        fontSize: 11, fill: colors.secondary, anchor: 'middle', fontWeight: '600'
      }));

      parts.push(C.rect(520, 370, 220, 30, { fill: colors.accentLight, rx: 15, opacity: 0.5 }));
      parts.push(C.text(630, 385, 'Deep Learning & LLM Era', {
        fontSize: 11, fill: colors.accent, anchor: 'middle', fontWeight: '600'
      }));

      // "AI Winter" annotations
      parts.push(C.text(220, 420, '← AI Winters →', {
        fontSize: 10, fill: colors.textLight, anchor: 'middle'
      }));

      return parts.join('\n');
    }
  },
];
