import { colors, fonts, viewBoxes } from '../design-system.mjs';
import * as C from '../components.mjs';

export const diagrams = [
  // ─── 1. ch09-single-neuron ────────────────────────────
  {
    filename: 'ch09-single-neuron',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'Artificial Neuron', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
        C.text(60, 100, 'Inputs', { fontSize: 14, fontWeight: '600', fill: colors.textLight, anchor: 'middle' }),
      ];
      const inputs = ['x\u2081', 'x\u2082', 'x\u2083'];
      const weights = ['w\u2081', 'w\u2082', 'w\u2083'];
      const inputY = [140, 225, 310];

      for (let i = 0; i < 3; i++) {
        parts.push(C.circle(80, inputY[i], 28, { fill: colors.primaryLight, stroke: colors.primary, strokeWidth: 2 }));
        parts.push(C.text(80, inputY[i], inputs[i], { fontSize: 14, fill: colors.primary, anchor: 'middle', fontWeight: '600' }));
      }

      const sumX = 320, sumY = 225;
      for (let i = 0; i < 3; i++) {
        parts.push(C.path(`M108,${inputY[i]} L${sumX - 40},${sumY}`, { stroke: colors.primary, strokeWidth: 1.5, opacity: 0.6 }));
        const mx = (108 + sumX - 40) / 2;
        const my = (inputY[i] + sumY) / 2 - 12;
        parts.push(C.text(mx, my, `\u00D7 ${weights[i]}`, { fontSize: 11, fill: colors.accent, anchor: 'middle', fontWeight: '600' }));
      }

      parts.push(C.circle(sumX, sumY, 36, { fill: colors.secondaryLight, stroke: colors.secondary, strokeWidth: 2.5 }));
      parts.push(C.text(sumX, sumY, '\u03A3', { fontSize: 22, fill: colors.secondary, anchor: 'middle', fontWeight: 'bold' }));
      parts.push(C.text(sumX, sumY + 52, 'Weighted Sum', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));

      parts.push(C.arrow(sumX + 40, sumY, 470, sumY, { stroke: colors.text, strokeWidth: 2 }));
      parts.push(C.text(420, sumY - 14, '+ bias', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));

      const actX = 480, actY = sumY - 35, actW = 120, actH = 70;
      parts.push(C.rect(actX, actY, actW, actH, { fill: colors.accentLight, stroke: colors.accent, rx: 10 }));
      parts.push(C.text(actX + actW / 2, actY + 25, 'Activation', { fontSize: 13, fill: colors.accent, anchor: 'middle', fontWeight: '600' }));
      parts.push(C.text(actX + actW / 2, actY + 45, 'Function f(x)', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));
      parts.push(C.path(`M${actX + 20},${actY + 55} Q${actX + 40},${actY + 55} ${actX + 60},${actY + 35} Q${actX + 80},${actY + 15} ${actX + 100},${actY + 15}`, { stroke: colors.accent, strokeWidth: 1.5 }));

      parts.push(C.arrow(actX + actW + 5, sumY, 700, sumY, { stroke: colors.text, strokeWidth: 2 }));
      parts.push(C.circle(720, sumY, 30, { fill: colors.primaryLight, stroke: colors.primary, strokeWidth: 2.5 }));
      parts.push(C.text(720, sumY, 'y', { fontSize: 18, fill: colors.primary, anchor: 'middle', fontWeight: 'bold' }));
      parts.push(C.text(720, sumY + 46, 'Output', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }));

      parts.push(C.rect(180, 385, 440, 45, { fill: colors.surface, stroke: colors.border, rx: 8 }));
      parts.push(C.text(400, 412, 'y = f( w\u2081x\u2081 + w\u2082x\u2082 + w\u2083x\u2083 + b )', { fontSize: 15, fill: colors.text, anchor: 'middle', fontFamily: fonts.mono }));

      return parts.join('\n');
    }
  },

  // ─── 2. ch09-layers ────────────────────────────────────
  {
    filename: 'ch09-layers',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'Multi-Layer Neural Network', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      const layers = [
        { name: 'Input Layer', count: 4, x: 120, color: colors.secondary },
        { name: 'Hidden Layer 1', count: 5, x: 310, color: colors.primary },
        { name: 'Hidden Layer 2', count: 4, x: 500, color: colors.primary },
        { name: 'Output Layer', count: 2, x: 680, color: colors.accent },
      ];

      const startY = 90, endY = 370;

      for (let l = 0; l < layers.length - 1; l++) {
        const curr = layers[l];
        const next = layers[l + 1];
        for (let i = 0; i < curr.count; i++) {
          const y1 = startY + (i + 0.5) * ((endY - startY) / curr.count);
          for (let j = 0; j < next.count; j++) {
            const y2 = startY + (j + 0.5) * ((endY - startY) / next.count);
            parts.push(C.line(curr.x + 18, y1, next.x - 18, y2, { stroke: colors.border, strokeWidth: 0.8 }));
          }
        }
      }

      for (const layer of layers) {
        for (let i = 0; i < layer.count; i++) {
          const cy = startY + (i + 0.5) * ((endY - startY) / layer.count);
          parts.push(C.circle(layer.x, cy, 18, { fill: layer.color, opacity: 0.15 }));
          parts.push(C.circle(layer.x, cy, 18, { fill: 'none', stroke: layer.color, strokeWidth: 2 }));
        }
        parts.push(C.text(layer.x, endY + 30, layer.name, { fontSize: 12, fill: colors.text, anchor: 'middle', fontWeight: '600' }));
      }

      parts.push(C.text(400, endY + 55, 'Information flows left \u2192 right', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }));
      parts.push(C.rect(80, 410, 100, 26, { fill: colors.secondaryLight, rx: 6 }));
      parts.push(C.text(130, 423, 'Features', { fontSize: 11, fill: colors.secondary, anchor: 'middle', fontWeight: '500' }));
      parts.push(C.rect(270, 410, 270, 26, { fill: colors.primaryLight, rx: 6 }));
      parts.push(C.text(405, 423, 'Learning & Abstraction', { fontSize: 11, fill: colors.primary, anchor: 'middle', fontWeight: '500' }));
      parts.push(C.rect(620, 410, 130, 26, { fill: colors.accentLight, rx: 6 }));
      parts.push(C.text(685, 423, 'Prediction', { fontSize: 11, fill: colors.accent, anchor: 'middle', fontWeight: '500' }));

      return parts.join('\n');
    }
  },

  // ─── 3. ch10-backprop ──────────────────────────────────
  {
    filename: 'ch10-backprop',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'Backpropagation', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
        C.text(400, 58, 'Forward pass (blue) \u2192 compute loss \u2192 Backward pass (red)', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
      ];

      const layerX = [120, 270, 420, 570, 700];
      const layerN = [3, 4, 4, 3, 2];
      const startY = 100, endY = 340;

      for (let l = 0; l < layerX.length - 1; l++) {
        parts.push(C.arrow(layerX[l] + 22, 80, layerX[l + 1] - 22, 80, { stroke: colors.primary, strokeWidth: 2 }));
      }
      parts.push(C.text(400, 72, 'Forward', { fontSize: 11, fill: colors.primary, anchor: 'middle', fontWeight: '600' }));

      for (let l = layerX.length - 1; l > 0; l--) {
        parts.push(C.arrow(layerX[l] - 22, 370, layerX[l - 1] + 22, 370, { stroke: '#E53E3E', strokeWidth: 2 }));
      }
      parts.push(C.text(400, 390, 'Backward (gradient flow)', { fontSize: 11, fill: '#E53E3E', anchor: 'middle', fontWeight: '600' }));

      for (let l = 0; l < layerX.length - 1; l++) {
        for (let i = 0; i < layerN[l]; i++) {
          const y1 = startY + (i + 0.5) * ((endY - startY) / layerN[l]);
          for (let j = 0; j < layerN[l + 1]; j++) {
            const y2 = startY + (j + 0.5) * ((endY - startY) / layerN[l + 1]);
            parts.push(C.line(layerX[l] + 14, y1, layerX[l + 1] - 14, y2, { stroke: colors.border, strokeWidth: 0.7 }));
          }
        }
      }

      const layerColors = [colors.secondary, colors.primary, colors.primary, colors.primary, colors.accent];
      for (let l = 0; l < layerX.length; l++) {
        for (let i = 0; i < layerN[l]; i++) {
          const cy = startY + (i + 0.5) * ((endY - startY) / layerN[l]);
          parts.push(C.circle(layerX[l], cy, 14, { fill: layerColors[l], opacity: 0.2 }));
          parts.push(C.circle(layerX[l], cy, 14, { fill: 'none', stroke: layerColors[l], strokeWidth: 1.8 }));
        }
      }

      parts.push(C.rect(720, 180, 65, 80, { fill: '#FED7D7', stroke: '#E53E3E', rx: 8 }));
      parts.push(C.text(752, 210, 'Loss', { fontSize: 13, fill: '#E53E3E', anchor: 'middle', fontWeight: '600' }));
      parts.push(C.text(752, 232, '= 0.35', { fontSize: 12, fill: '#E53E3E', anchor: 'middle' }));
      parts.push(C.text(752, 250, '(error)', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));

      parts.push(C.text(120, 420, 'Input', { fontSize: 11, fill: colors.text, anchor: 'middle' }));
      parts.push(C.text(700, 420, 'Output', { fontSize: 11, fill: colors.text, anchor: 'middle' }));
      parts.push(C.text(400, 420, 'Adjust weights to reduce loss', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }));

      return parts.join('\n');
    }
  },

  // ─── 4. ch11-why-deep ──────────────────────────────────
  {
    filename: 'ch11-why-deep',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'Why Go Deep? Feature Hierarchy', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      const cols = [
        { x: 80, label: 'Layer 1', sublabel: 'Pixels', color: colors.secondary },
        { x: 270, label: 'Layer 2', sublabel: 'Edges & Lines', color: colors.primary },
        { x: 470, label: 'Layer 3', sublabel: 'Parts', color: colors.primary },
        { x: 660, label: 'Layer 4', sublabel: 'Full Object', color: colors.accent },
      ];

      const boxW = 140, boxH = 220, boxY = 90;
      for (let i = 0; i < cols.length; i++) {
        const c = cols[i];
        parts.push(C.rect(c.x, boxY, boxW, boxH, { fill: colors.surface, stroke: c.color, rx: 10, strokeWidth: 2 }));
        parts.push(C.text(c.x + boxW / 2, boxY + 20, c.label, { fontSize: 13, fill: c.color, anchor: 'middle', fontWeight: '600' }));
        parts.push(C.text(c.x + boxW / 2, boxY + boxH + 20, c.sublabel, { fontSize: 12, fill: colors.text, anchor: 'middle', fontWeight: '500' }));
        if (i < cols.length - 1) {
          parts.push(C.arrow(c.x + boxW + 10, boxY + boxH / 2, cols[i + 1].x - 10, boxY + boxH / 2, { stroke: colors.textLight, strokeWidth: 2 }));
        }
      }

      // Col 1: pixels
      const pixelColors = [colors.primary, colors.secondary, colors.accent, '#9F7AEA', '#48BB78'];
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 5; c++) {
          parts.push(C.rect(95 + c * 22, 120 + r * 30, 16, 16, { fill: pixelColors[(r + c) % 5], rx: 2, opacity: 0.6 }));
        }
      }

      // Col 2: edges
      parts.push(C.line(290, 130, 340, 170, { stroke: colors.text, strokeWidth: 2 }));
      parts.push(C.line(290, 170, 370, 170, { stroke: colors.text, strokeWidth: 2 }));
      parts.push(C.line(310, 200, 310, 260, { stroke: colors.text, strokeWidth: 2 }));
      parts.push(C.path('M280,230 Q320,210 360,240', { stroke: colors.text, strokeWidth: 2 }));
      parts.push(C.line(290, 270, 360, 270, { stroke: colors.text, strokeWidth: 2 }));

      // Col 3: face parts
      parts.push(C.path('M490,140 Q510,125 530,140 Q510,155 490,140', { stroke: colors.primary, strokeWidth: 2 }));
      parts.push(C.circle(510, 140, 4, { fill: colors.primary }));
      parts.push(C.path('M490,180 Q510,165 530,180 Q510,195 490,180', { stroke: colors.primary, strokeWidth: 2 }));
      parts.push(C.circle(510, 180, 4, { fill: colors.primary }));
      parts.push(C.path('M510,210 L500,250 L520,250', { stroke: colors.primary, strokeWidth: 2 }));
      parts.push(C.path('M490,275 Q510,290 530,275', { stroke: colors.primary, strokeWidth: 2 }));

      // Col 4: complete face
      parts.push(C.circle(730, 195, 55, { fill: 'none', stroke: colors.accent, strokeWidth: 2.5 }));
      parts.push(C.circle(715, 180, 5, { fill: colors.text }));
      parts.push(C.circle(745, 180, 5, { fill: colors.text }));
      parts.push(C.path('M730,190 L726,208 L734,208', { stroke: colors.text, strokeWidth: 1.5 }));
      parts.push(C.path('M715,222 Q730,235 745,222', { stroke: colors.text, strokeWidth: 2 }));

      // Bottom arrow
      parts.push(C.rect(200, 380, 400, 35, { fill: colors.primaryLight, rx: 17 }));
      parts.push(C.text(400, 398, 'Concrete  \u2192  \u2192  \u2192  Abstract', { fontSize: 14, fill: colors.primary, anchor: 'middle', fontWeight: '600' }));

      return parts.join('\n');
    }
  },

  // ─── 5. ch12-cnn-pipeline ──────────────────────────────
  {
    filename: 'ch12-cnn-pipeline',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'CNN Pipeline', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      const stages = [
        { x: 30, w: 100, label: 'Input', sublabel: 'Image', color: colors.secondary },
        { x: 170, w: 120, label: 'Convolution', sublabel: 'Extract features', color: colors.primary },
        { x: 330, w: 110, label: 'Pooling', sublabel: 'Downsample', color: '#9F7AEA' },
        { x: 480, w: 130, label: 'Fully Connected', sublabel: 'Classify', color: colors.accent },
        { x: 660, w: 110, label: 'Output', sublabel: 'Cat 95%', color: '#48BB78' },
      ];

      const stageY = 120, stageH = 200;
      for (let i = 0; i < stages.length; i++) {
        const s = stages[i];
        parts.push(C.rect(s.x, stageY, s.w, stageH, { fill: s.color, rx: 10, opacity: 0.1 }));
        parts.push(C.rect(s.x, stageY, s.w, stageH, { fill: 'none', stroke: s.color, rx: 10, strokeWidth: 1.5 }));
        parts.push(C.text(s.x + s.w / 2, stageY - 12, s.label, { fontSize: 12, fill: s.color, anchor: 'middle', fontWeight: '600' }));
        parts.push(C.text(s.x + s.w / 2, stageY + stageH + 18, s.sublabel, { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));
        if (i < stages.length - 1) {
          parts.push(C.arrow(s.x + s.w + 5, stageY + stageH / 2, stages[i + 1].x - 5, stageY + stageH / 2, { stroke: colors.text, strokeWidth: 1.5 }));
        }
      }

      // Input grid
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 4; c++) {
          const fill = (r + c) % 3 === 0 ? colors.secondary : (r + c) % 3 === 1 ? colors.primaryLight : colors.secondaryLight;
          parts.push(C.rect(42 + c * 20, 145 + r * 30, 16, 24, { fill, rx: 2 }));
        }
      }

      // Convolution feature maps
      for (let i = 0; i < 4; i++) {
        parts.push(C.rect(185, 145 + i * 40, 90, 30, { fill: colors.primary, rx: 4, opacity: 0.15 + i * 0.1 }));
      }

      // Pooling blocks
      for (let i = 0; i < 3; i++) {
        parts.push(C.rect(350, 160 + i * 50, 70, 35, { fill: '#9F7AEA', rx: 4, opacity: 0.2 }));
      }

      // FC nodes
      for (const ny of [170, 210, 250, 270]) {
        parts.push(C.circle(545, ny, 10, { fill: colors.accent, opacity: 0.3 }));
        parts.push(C.circle(545, ny, 10, { fill: 'none', stroke: colors.accent, strokeWidth: 1.5 }));
      }

      // Output result
      parts.push(C.rect(680, 180, 70, 60, { fill: '#48BB78', rx: 8, opacity: 0.15 }));
      parts.push(C.text(715, 215, 'Cat', { fontSize: 14, fill: '#48BB78', anchor: 'middle', fontWeight: 'bold' }));
      parts.push(C.text(715, 232, '95%', { fontSize: 13, fill: '#48BB78', anchor: 'middle' }));

      // Bottom
      parts.push(C.rect(150, 380, 500, 40, { fill: colors.surface, stroke: colors.border, rx: 8 }));
      parts.push(C.text(400, 404, 'Image \u2192 Features \u2192 Compression \u2192 Classification \u2192 Result', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }));

      return parts.join('\n');
    }
  },

  // ─── 6. ch13-rnn-sequence ──────────────────────────────
  {
    filename: 'ch13-rnn-sequence',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'RNN: Processing Sequences Step by Step', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      const words = ['I', 'love', 'deep', 'learning', '!'];
      const cellW = 100, cellH = 80;
      const startX = 100, cellY = 180;
      const gap = 50;

      for (let i = 0; i < words.length; i++) {
        const cx = startX + i * (cellW + gap);
        parts.push(C.rect(cx, cellY, cellW, cellH, { fill: colors.primaryLight, stroke: colors.primary, rx: 10, strokeWidth: 2 }));
        parts.push(C.text(cx + cellW / 2, cellY + cellH / 2, 'RNN', { fontSize: 14, fill: colors.primary, anchor: 'middle', fontWeight: '600' }));

        // Input word
        parts.push(C.rect(cx + 20, cellY + cellH + 30, 60, 30, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 6 }));
        parts.push(C.text(cx + cellW / 2, cellY + cellH + 45, words[i], { fontSize: 13, fill: colors.text, anchor: 'middle', fontWeight: '500' }));
        parts.push(C.arrow(cx + cellW / 2, cellY + cellH + 28, cx + cellW / 2, cellY + cellH + 2, { stroke: colors.secondary, strokeWidth: 1.5 }));

        // Output
        parts.push(C.arrow(cx + cellW / 2, cellY - 2, cx + cellW / 2, cellY - 30, { stroke: colors.textLight, strokeWidth: 1.5 }));
        parts.push(C.text(cx + cellW / 2, cellY - 42, `h${i + 1}`, { fontSize: 12, fill: colors.textLight, anchor: 'middle' }));

        // Hidden state arrow
        if (i < words.length - 1) {
          const ax1 = cx + cellW + 2;
          const ax2 = cx + cellW + gap - 2;
          parts.push(C.arrow(ax1, cellY + cellH / 2, ax2, cellY + cellH / 2, { stroke: colors.accent, strokeWidth: 2.5 }));
          if (i === 0) {
            parts.push(C.text(ax1 + (gap - 4) / 2, cellY + cellH / 2 - 14, 'hidden state', { fontSize: 9, fill: colors.accent, anchor: 'middle' }));
          }
        }

        // Time step
        parts.push(C.text(cx + cellW / 2, cellY - 60, `t=${i + 1}`, { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));
      }

      parts.push(C.rect(250, 380, 300, 40, { fill: colors.accentLight, rx: 8 }));
      parts.push(C.text(400, 400, 'Memory passes from step to step \u2192', { fontSize: 13, fill: colors.accent, anchor: 'middle', fontWeight: '500' }));

      return parts.join('\n');
    }
  },

  // ─── 7. ch14-model-zoo ─────────────────────────────────
  {
    filename: 'ch14-model-zoo',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'Classic Model Zoo', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
        C.text(400, 56, 'Key milestones in deep learning history', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
      ];

      parts.push(C.line(60, 380, 740, 380, { stroke: colors.border, strokeWidth: 3 }));

      const models = [
        { name: 'AlexNet', year: '2012', desc: '8 layers\nGPU training', x: 80, color: colors.secondary },
        { name: 'VGG', year: '2014', desc: '19 layers\nsimple & deep', x: 220, color: colors.primary },
        { name: 'ResNet', year: '2015', desc: '152 layers\nskip connections', x: 360, color: '#9F7AEA' },
        { name: 'BERT', year: '2018', desc: 'Bidirectional\nNLU', x: 510, color: colors.accent },
        { name: 'GPT-4', year: '2023', desc: 'Multimodal\nemergent', x: 660, color: '#E53E3E' },
      ];

      const cardW = 120, cardH = 170;
      for (let i = 0; i < models.length; i++) {
        const m = models[i];
        const cardY = 85 + (i % 2) * 25;
        parts.push(C.rect(m.x, cardY, cardW, cardH, { fill: colors.surface, stroke: m.color, rx: 10, strokeWidth: 2 }));
        parts.push(C.rect(m.x, cardY, cardW, 36, { fill: m.color, rx: 10, opacity: 0.15 }));
        parts.push(C.rect(m.x, cardY + 26, cardW, 10, { fill: m.color, rx: 0, opacity: 0.15 }));
        parts.push(C.text(m.x + cardW / 2, cardY + 20, m.name, { fontSize: 14, fill: m.color, anchor: 'middle', fontWeight: 'bold' }));
        parts.push(C.text(m.x + cardW / 2, cardY + 55, m.year, { fontSize: 20, fill: colors.text, anchor: 'middle', fontWeight: 'bold' }));

        const descLines = m.desc.split('\n');
        for (let d = 0; d < descLines.length; d++) {
          parts.push(C.text(m.x + cardW / 2, cardY + 85 + d * 18, descLines[d], { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));
        }

        // Scale bar
        const barH = 30 + i * 18;
        parts.push(C.rect(m.x + 20, cardY + cardH - barH - 15, 25, barH, { fill: m.color, rx: 4, opacity: 0.2 }));

        // Line to timeline
        parts.push(C.line(m.x + cardW / 2, cardY + cardH, m.x + cardW / 2, 375, { stroke: m.color, strokeWidth: 1.5, strokeDasharray: '4,3' }));
        parts.push(C.circle(m.x + cardW / 2, 380, 7, { fill: m.color }));
        parts.push(C.text(m.x + cardW / 2, 400, m.year, { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));
      }

      parts.push(C.arrow(60, 430, 740, 430, { stroke: colors.textLight, strokeWidth: 1.5 }));
      parts.push(C.text(400, 445, 'Increasing scale and capability \u2192', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));

      return parts.join('\n');
    }
  },

  // ─── ch10-forward-loss ─────────────────────────────────
  {
    filename: 'ch10-forward-loss',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'Forward Propagation & Loss Computation', {
          fontSize: 20, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),
      ];

      // Input image
      parts.push(C.rect(40, 140, 100, 100, { fill: colors.primaryLight, stroke: colors.primary, rx: 8 }));
      parts.push(C.text(90, 200, '\u{1F436}', { fontSize: 32, anchor: 'middle' }));
      parts.push(C.text(90, 260, 'Input', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }));

      // Network layers
      const layerX = [200, 300, 400];
      for (let l = 0; l < 3; l++) {
        const nodesInLayer = l === 1 ? 5 : 4;
        for (let n = 0; n < nodesInLayer; n++) {
          const y = 120 + n * (220 / (nodesInLayer - 1));
          parts.push(C.circle(layerX[l], y, 14, { fill: colors.primaryLight, stroke: colors.primary, strokeWidth: 1.5 }));
        }
        if (l < 2) {
          parts.push(C.arrow(layerX[l] + 20, 190, layerX[l + 1] - 20, 190, { stroke: colors.border }));
        }
      }
      parts.push(C.text(300, 370, 'Neural Network', { fontSize: 13, fill: colors.textLight, anchor: 'middle' }));

      // Arrow to output
      parts.push(C.arrow(150, 190, 180, 190, { stroke: colors.primary }));
      parts.push(C.arrow(420, 190, 490, 190, { stroke: colors.primary }));

      // Prediction box
      parts.push(C.rect(500, 150, 120, 80, { fill: colors.primaryLight, stroke: colors.primary, rx: 10 }));
      parts.push(C.text(560, 180, 'Prediction', { fontSize: 12, fontWeight: '600', fill: colors.primary, anchor: 'middle' }));
      parts.push(C.text(560, 205, 'Dog: 70%', { fontSize: 14, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }));

      // Correct answer box
      parts.push(C.rect(500, 280, 120, 80, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 10 }));
      parts.push(C.text(560, 310, 'Correct', { fontSize: 12, fontWeight: '600', fill: colors.secondary, anchor: 'middle' }));
      parts.push(C.text(560, 335, 'Dog: 100%', { fontSize: 14, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }));

      // Loss computation
      parts.push(C.arrow(625, 190, 680, 250, { stroke: colors.accent }));
      parts.push(C.arrow(625, 320, 680, 270, { stroke: colors.accent }));
      parts.push(C.rect(670, 240, 100, 50, { fill: colors.accentLight, stroke: colors.accent, rx: 10 }));
      parts.push(C.text(720, 258, 'Loss', { fontSize: 13, fontWeight: '600', fill: colors.accent, anchor: 'middle' }));
      parts.push(C.text(720, 278, '= 30%', { fontSize: 14, fontWeight: 'bold', fill: colors.accent, anchor: 'middle' }));

      // Flow labels
      parts.push(C.text(300, 400, 'Data flows forward through the network → Compare with correct answer → Compute error', {
        fontSize: 11, fill: colors.textLight, anchor: 'middle'
      }));

      return parts.join('\n');
    }
  },
];
