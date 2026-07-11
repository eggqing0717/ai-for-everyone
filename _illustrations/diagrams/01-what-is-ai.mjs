import { colors, fonts, viewBoxes } from '../design-system.mjs';
import * as C from '../components.mjs';

export const diagrams = [
  // ─── ch01-ai-pyramid ─────────────────────────────────────
  {
    filename: 'ch01-ai-pyramid',
    viewBox: viewBoxes.wide,
    render() {
      return [
        // Background
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.circle(680, 80, 140, { fill: colors.primaryLight, opacity: 0.3 }),

        // Title
        C.text(400, 40, 'The AI Pyramid', {
          fontSize: 26, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),
        C.text(400, 65, 'Three layers of intelligence', {
          fontSize: 13, fill: colors.textLight, anchor: 'middle'
        }),

        // Pyramid - three layers (top to bottom: DL, ML, AI)
        // Layer 1 (top) - Deep Learning
        `<polygon points="400,100 320,200 480,200" fill="${colors.accent}" opacity="0.85"/>`,
        C.text(400, 165, 'Deep Learning', {
          fontSize: 15, fill: colors.surface, anchor: 'middle', fontWeight: '600'
        }),

        // Layer 2 (middle) - Machine Learning
        `<polygon points="320,208 260,310 540,310 480,208" fill="${colors.secondary}" opacity="0.85"/>`,
        C.text(400, 270, 'Machine Learning', {
          fontSize: 16, fill: colors.surface, anchor: 'middle', fontWeight: '600'
        }),

        // Layer 3 (bottom) - Artificial Intelligence
        `<polygon points="260,318 200,420 600,420 540,318" fill="${colors.primary}" opacity="0.85"/>`,
        C.text(400, 378, 'Artificial Intelligence', {
          fontSize: 17, fill: colors.surface, anchor: 'middle', fontWeight: '600'
        }),

        // Right side annotations
        C.line(485, 155, 560, 140, { stroke: colors.textLight, strokeWidth: 1, strokeDasharray: '3,3' }),
        C.text(570, 140, 'Neural networks with', { fontSize: 11, fill: colors.textLight }),
        C.text(570, 155, 'many layers', { fontSize: 11, fill: colors.textLight }),

        C.line(545, 260, 590, 255, { stroke: colors.textLight, strokeWidth: 1, strokeDasharray: '3,3' }),
        C.text(600, 250, 'Learning patterns', { fontSize: 11, fill: colors.textLight }),
        C.text(600, 265, 'from data', { fontSize: 11, fill: colors.textLight }),

        C.line(605, 370, 630, 365, { stroke: colors.textLight, strokeWidth: 1, strokeDasharray: '3,3' }),
        C.text(640, 360, 'Machines that mimic', { fontSize: 11, fill: colors.textLight }),
        C.text(640, 375, 'human intelligence', { fontSize: 11, fill: colors.textLight }),

        // Left side icons
        C.icon('brain', 130, 135, 28),
        C.text(155, 170, 'DL', { fontSize: 12, fill: colors.accent, anchor: 'middle', fontWeight: '600' }),

        C.icon('gear', 100, 245, 28),
        C.text(125, 280, 'ML', { fontSize: 12, fill: colors.secondary, anchor: 'middle', fontWeight: '600' }),

        C.icon('robot', 80, 355, 28),
        C.text(105, 390, 'AI', { fontSize: 12, fill: colors.primary, anchor: 'middle', fontWeight: '600' }),

        // Decorative
        C.circle(60, 80, 4, { fill: colors.accent, opacity: 0.4 }),
        C.circle(750, 420, 5, { fill: colors.primary, opacity: 0.3 }),
      ].join('\n');
    }
  },

  // ─── ch01-ai-vs-software ─────────────────────────────────
  {
    filename: 'ch01-ai-vs-software',
    viewBox: viewBoxes.wide,
    render() {
      return [
        // Background
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),

        // Title
        C.text(400, 38, 'Traditional Programming vs. AI', {
          fontSize: 24, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),

        // Divider
        C.line(400, 70, 400, 420, { stroke: colors.border, strokeWidth: 1.5, strokeDasharray: '6,4' }),

        // ─── Left: Traditional Programming ─────
        C.text(200, 80, 'Traditional Programming', {
          fontSize: 16, fontWeight: '600', fill: colors.textLight, anchor: 'middle'
        }),

        // Rules box
        C.rect(100, 120, 200, 60, { fill: colors.accentLight, stroke: colors.accent, rx: 10 }),
        C.text(200, 145, 'Rules', { fontSize: 15, fill: colors.accent, anchor: 'middle', fontWeight: '600' }),
        C.text(200, 165, '(if-then logic)', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }),

        // Arrow down
        C.arrow(200, 185, 200, 220, { stroke: colors.textLight }),

        // Computer box
        C.rect(130, 225, 140, 55, { fill: colors.primaryLight, stroke: colors.primary, rx: 10 }),
        C.icon('cpu', 143, 240, 22),
        C.text(200, 257, 'Computer', { fontSize: 13, fill: colors.text, anchor: 'middle' }),

        // Arrow down
        C.arrow(200, 285, 200, 320, { stroke: colors.textLight }),

        // Output box
        C.rect(130, 325, 140, 50, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 10 }),
        C.text(200, 355, 'Output', { fontSize: 14, fill: colors.secondary, anchor: 'middle', fontWeight: '500' }),

        // Human writing rules
        C.circle(85, 150, 15, { fill: colors.accentLight, stroke: colors.accent, strokeWidth: 1.5 }),
        C.text(85, 148, '\u270D', { fontSize: 12, anchor: 'middle' }),
        C.path('M95,145 L100,145', { stroke: colors.accent, strokeWidth: 1, fill: 'none' }),

        // ─── Right: AI Approach ─────
        C.text(600, 80, 'AI / Machine Learning', {
          fontSize: 16, fontWeight: '600', fill: colors.primary, anchor: 'middle'
        }),

        // Data box
        C.rect(500, 120, 200, 60, { fill: colors.primaryLight, stroke: colors.primary, rx: 10 }),
        C.icon('data', 518, 137, 22),
        C.text(600, 145, 'Data', { fontSize: 15, fill: colors.primary, anchor: 'middle', fontWeight: '600' }),
        C.text(600, 165, '(examples & patterns)', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }),

        // Arrow down
        C.arrow(600, 185, 600, 220, { stroke: colors.textLight }),

        // Learning box
        C.rect(530, 225, 140, 55, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 10 }),
        C.icon('brain', 545, 240, 20),
        C.text(600, 257, 'Learning', { fontSize: 13, fill: colors.text, anchor: 'middle' }),

        // Arrow down
        C.arrow(600, 285, 600, 320, { stroke: colors.textLight }),

        // Output + Rules box
        C.rect(530, 325, 140, 50, { fill: colors.accentLight, stroke: colors.accent, rx: 10 }),
        C.text(600, 345, 'Output +', { fontSize: 13, fill: colors.accent, anchor: 'middle', fontWeight: '500' }),
        C.text(600, 363, 'Learned Rules', { fontSize: 12, fill: colors.accent, anchor: 'middle' }),

        // Bottom comparison
        C.rect(100, 400, 200, 30, { fill: colors.textLight, rx: 6, opacity: 0.1 }),
        C.text(200, 418, 'Human writes rules', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }),

        C.rect(500, 400, 200, 30, { fill: colors.primary, rx: 6, opacity: 0.1 }),
        C.text(600, 418, 'Machine learns rules', { fontSize: 11, fill: colors.primary, anchor: 'middle' }),

        // VS badge
        C.circle(400, 250, 22, { fill: colors.surface, stroke: colors.border, strokeWidth: 2 }),
        C.text(400, 250, 'VS', { fontSize: 12, fill: colors.textLight, anchor: 'middle', fontWeight: 'bold' }),

      ].join('\n');
    }
  },

  // ─── ch02-three-waves ─────────────────────────────────────
  {
    filename: 'ch02-three-waves',
    viewBox: viewBoxes.wide,
    render() {
      return [
        // Background
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),

        // Title
        C.text(400, 38, 'Three Waves of AI', {
          fontSize: 26, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),

        // Timeline base line
        C.line(60, 320, 740, 320, { stroke: colors.text, strokeWidth: 2 }),
        // Arrow at end
        C.arrow(730, 320, 755, 320, { stroke: colors.text, strokeWidth: 2 }),

        // Time markers
        C.text(140, 345, '1950s', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.text(400, 345, '1980s', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.text(640, 345, '2010s', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.text(755, 340, 'Now', { fontSize: 11, fill: colors.text, anchor: 'middle', fontWeight: '600' }),

        // Wave 1: Symbolism
        C.path('M80,320 Q140,180 200,320', { fill: colors.accent, opacity: 0.2, stroke: colors.accent, strokeWidth: 2 }),
        C.circle(140, 200, 6, { fill: colors.accent }),
        C.text(140, 100, '1st Wave', { fontSize: 14, fill: colors.accent, anchor: 'middle', fontWeight: '600' }),
        C.text(140, 120, 'Symbolism', { fontSize: 12, fill: colors.text, anchor: 'middle' }),
        C.text(140, 138, 'Hand-written rules', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }),

        // AI Winter 1
        C.text(270, 360, 'AI Winter', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),
        C.line(220, 320, 320, 320, { stroke: colors.textLight, strokeWidth: 1, strokeDasharray: '3,3' }),

        // Wave 2: Machine Learning
        C.path('M320,320 Q400,160 480,320', { fill: colors.primary, opacity: 0.15, stroke: colors.primary, strokeWidth: 2 }),
        C.circle(400, 180, 6, { fill: colors.primary }),
        C.text(400, 100, '2nd Wave', { fontSize: 14, fill: colors.primary, anchor: 'middle', fontWeight: '600' }),
        C.text(400, 120, 'Machine Learning', { fontSize: 12, fill: colors.text, anchor: 'middle' }),
        C.text(400, 138, 'Patterns from data', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }),

        // AI Winter 2
        C.text(530, 360, 'AI Winter', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),
        C.line(490, 320, 570, 320, { stroke: colors.textLight, strokeWidth: 1, strokeDasharray: '3,3' }),

        // Wave 3: Deep Learning
        C.path('M570,320 Q640,100 740,130', { fill: colors.secondary, opacity: 0.15, stroke: colors.secondary, strokeWidth: 2.5 }),
        C.circle(640, 140, 6, { fill: colors.secondary }),
        C.text(660, 80, '3rd Wave', { fontSize: 14, fill: colors.secondary, anchor: 'middle', fontWeight: '600' }),
        C.text(660, 100, 'Deep Learning', { fontSize: 12, fill: colors.text, anchor: 'middle' }),
        C.text(660, 118, 'Brain-inspired networks', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }),

        // Rising arrow for current wave
        C.text(730, 110, '\u2191', { fontSize: 18, fill: colors.secondary, anchor: 'middle' }),

        // Bottom legend
        C.rect(180, 395, 12, 12, { fill: colors.accent, rx: 2, opacity: 0.7 }),
        C.text(198, 403, 'Rules-based', { fontSize: 11, fill: colors.textLight }),
        C.rect(340, 395, 12, 12, { fill: colors.primary, rx: 2, opacity: 0.7 }),
        C.text(358, 403, 'Statistical', { fontSize: 11, fill: colors.textLight }),
        C.rect(480, 395, 12, 12, { fill: colors.secondary, rx: 2, opacity: 0.7 }),
        C.text(498, 403, 'Neural networks', { fontSize: 11, fill: colors.textLight }),

        // Decorative
        C.circle(50, 50, 4, { fill: colors.primary, opacity: 0.3 }),
        C.circle(770, 420, 4, { fill: colors.secondary, opacity: 0.3 }),
      ].join('\n');
    }
  },

  // ─── ch03-ai-daily-life ─────────────────────────────────────
  {
    filename: 'ch03-ai-daily-life',
    viewBox: viewBoxes.wide,
    render() {
      // Helper for icon card
      function iconCard(x, y, iconSvg, label, color) {
        return [
          C.rect(x, y, 110, 100, { fill: color, rx: 12, opacity: 0.1 }),
          C.rect(x, y, 110, 100, { fill: 'none', stroke: color, rx: 12, strokeWidth: 1.5 }),
          iconSvg,
          C.text(x + 55, y + 82, label, { fontSize: 11, fill: colors.text, anchor: 'middle', fontWeight: '500' }),
        ].join('\n');
      }

      const row1Y = 90, row2Y = 220, row3Y = 340;
      const cols = [60, 200, 340, 480, 620];

      return [
        // Background
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),

        // Title
        C.text(400, 40, 'AI in Daily Life', {
          fontSize: 26, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),
        C.text(400, 62, 'AI is already everywhere around us', {
          fontSize: 12, fill: colors.textLight, anchor: 'middle'
        }),

        // Row 1: Face unlock, Navigation, Voice Assistant
        iconCard(cols[0], row1Y,
          C.group([
            C.circle(cols[0] + 55, row1Y + 38, 20, { fill: colors.primary, opacity: 0.2 }),
            C.circle(cols[0] + 55, row1Y + 32, 10, { fill: 'none', stroke: colors.primary, strokeWidth: 1.5 }),
            C.path(`M${cols[0] + 42},${row1Y + 50} Q${cols[0] + 55},${row1Y + 58} ${cols[0] + 68},${row1Y + 50}`, { stroke: colors.primary, strokeWidth: 1.5, fill: 'none' }),
          ]),
          'Face Unlock', colors.primary),

        iconCard(cols[1], row1Y,
          C.group([
            C.circle(cols[1] + 55, row1Y + 40, 18, { fill: colors.secondary, opacity: 0.2 }),
            C.path(`M${cols[1] + 45},${row1Y + 48} L${cols[1] + 55},${row1Y + 30} L${cols[1] + 65},${row1Y + 48}`, { stroke: colors.secondary, strokeWidth: 2, fill: 'none' }),
            C.circle(cols[1] + 55, row1Y + 30, 4, { fill: colors.secondary }),
          ]),
          'Navigation', colors.secondary),

        iconCard(cols[2], row1Y,
          C.icon('chat', cols[2] + 43, row1Y + 28, 28),
          'Voice Assistant', colors.primary),

        iconCard(cols[3], row1Y,
          C.icon('code', cols[3] + 43, row1Y + 28, 28),
          'Smart Input', colors.accent),

        iconCard(cols[4], row1Y,
          C.icon('brain', cols[4] + 43, row1Y + 28, 28),
          'Recommendation', colors.secondary),

        // Row 2: Translation, Photo Edit, Search, Email, Music
        iconCard(cols[0], row2Y,
          C.group([
            C.text(cols[0] + 35, row2Y + 38, 'A', { fontSize: 18, fill: colors.primary, anchor: 'middle', fontWeight: 'bold' }),
            C.text(cols[0] + 55, row2Y + 42, '\u2192', { fontSize: 14, fill: colors.textLight, anchor: 'middle' }),
            C.text(cols[0] + 75, row2Y + 38, 'B', { fontSize: 18, fill: colors.secondary, anchor: 'middle', fontWeight: 'bold' }),
          ]),
          'Translation', colors.primary),

        iconCard(cols[1], row2Y,
          C.group([
            C.rect(cols[1] + 30, row2Y + 22, 30, 30, { fill: colors.accent, rx: 4, opacity: 0.3 }),
            C.rect(cols[1] + 50, row2Y + 32, 30, 30, { fill: colors.accent, rx: 4, opacity: 0.5 }),
          ]),
          'Photo Edit', colors.accent),

        iconCard(cols[2], row2Y,
          C.group([
            C.circle(cols[2] + 52, row2Y + 38, 14, { fill: 'none', stroke: colors.primary, strokeWidth: 2 }),
            C.line(cols[2] + 62, row2Y + 48, cols[2] + 72, row2Y + 58, { stroke: colors.primary, strokeWidth: 2 }),
          ]),
          'Smart Search', colors.primary),

        iconCard(cols[3], row2Y,
          C.group([
            C.rect(cols[3] + 35, row2Y + 25, 40, 28, { fill: colors.secondary, rx: 3, opacity: 0.2 }),
            C.path(`M${cols[3] + 35},${row2Y + 30} L${cols[3] + 55},${row2Y + 42} L${cols[3] + 75},${row2Y + 30}`, { stroke: colors.secondary, strokeWidth: 1.5, fill: 'none' }),
          ]),
          'Email Filter', colors.secondary),

        iconCard(cols[4], row2Y,
          C.group([
            C.circle(cols[4] + 55, row2Y + 38, 15, { fill: colors.accent, opacity: 0.2 }),
            C.text(cols[4] + 55, row2Y + 40, '\u266B', { fontSize: 20, fill: colors.accent, anchor: 'middle' }),
          ]),
          'Music Rec.', colors.accent),

        // Bottom note
        C.text(400, 430, 'AI touches 10+ moments in your typical day', {
          fontSize: 12, fill: colors.textLight, anchor: 'middle'
        }),
      ].join('\n');
    }
  },

  // ─── ch02-three-ingredients ─────────────────────────────
  {
    filename: 'ch02-three-ingredients',
    viewBox: viewBoxes.wide,
    render() {
      return [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 40, 'Three Ingredients of the AI Explosion', {
          fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),
        C.text(400, 65, 'Data + Compute + Algorithms = AI', {
          fontSize: 13, fill: colors.textLight, anchor: 'middle'
        }),

        // Three panels
        // Panel 1: Data (ingredients)
        C.rect(60, 100, 200, 240, { fill: colors.primaryLight, stroke: colors.primary, rx: 16, opacity: 0.3 }),
        C.rect(60, 100, 200, 240, { fill: 'none', stroke: colors.primary, rx: 16 }),
        C.icon('data', 148, 130, 28),
        C.text(160, 175, 'Data', { fontSize: 18, fontWeight: 'bold', fill: colors.primary, anchor: 'middle' }),
        C.text(160, 200, '(Ingredients)', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.rect(90, 220, 140, 24, { fill: colors.surface, stroke: colors.border, rx: 4 }),
        C.text(160, 232, 'Images, Text, Video', { fontSize: 11, fill: colors.text, anchor: 'middle' }),
        C.rect(90, 252, 140, 24, { fill: colors.surface, stroke: colors.border, rx: 4 }),
        C.text(160, 264, 'Labeled examples', { fontSize: 11, fill: colors.text, anchor: 'middle' }),
        C.rect(90, 284, 140, 24, { fill: colors.surface, stroke: colors.border, rx: 4 }),
        C.text(160, 296, 'Massive datasets', { fontSize: 11, fill: colors.text, anchor: 'middle' }),

        // Panel 2: Compute (kitchen)
        C.rect(300, 100, 200, 240, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 16, opacity: 0.3 }),
        C.rect(300, 100, 200, 240, { fill: 'none', stroke: colors.secondary, rx: 16 }),
        C.icon('cpu', 388, 130, 28),
        C.text(400, 175, 'Compute', { fontSize: 18, fontWeight: 'bold', fill: colors.secondary, anchor: 'middle' }),
        C.text(400, 200, '(Kitchen & Stove)', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.rect(330, 220, 140, 24, { fill: colors.surface, stroke: colors.border, rx: 4 }),
        C.text(400, 232, 'GPU Chips', { fontSize: 11, fill: colors.text, anchor: 'middle' }),
        C.rect(330, 252, 140, 24, { fill: colors.surface, stroke: colors.border, rx: 4 }),
        C.text(400, 264, 'Cloud Clusters', { fontSize: 11, fill: colors.text, anchor: 'middle' }),
        C.rect(330, 284, 140, 24, { fill: colors.surface, stroke: colors.border, rx: 4 }),
        C.text(400, 296, 'Parallel Processing', { fontSize: 11, fill: colors.text, anchor: 'middle' }),

        // Panel 3: Algorithms (recipe)
        C.rect(540, 100, 200, 240, { fill: colors.accentLight, stroke: colors.accent, rx: 16, opacity: 0.3 }),
        C.rect(540, 100, 200, 240, { fill: 'none', stroke: colors.accent, rx: 16 }),
        C.icon('book', 628, 130, 28),
        C.text(640, 175, 'Algorithms', { fontSize: 18, fontWeight: 'bold', fill: colors.accent, anchor: 'middle' }),
        C.text(640, 200, '(Recipe)', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.rect(570, 220, 140, 24, { fill: colors.surface, stroke: colors.border, rx: 4 }),
        C.text(640, 232, 'Neural Networks', { fontSize: 11, fill: colors.text, anchor: 'middle' }),
        C.rect(570, 252, 140, 24, { fill: colors.surface, stroke: colors.border, rx: 4 }),
        C.text(640, 264, 'Transformers', { fontSize: 11, fill: colors.text, anchor: 'middle' }),
        C.rect(570, 284, 140, 24, { fill: colors.surface, stroke: colors.border, rx: 4 }),
        C.text(640, 296, 'Backpropagation', { fontSize: 11, fill: colors.text, anchor: 'middle' }),

        // Arrows converging to center bottom
        C.arrow(160, 350, 370, 390, { stroke: colors.primary }),
        C.arrow(400, 350, 400, 385, { stroke: colors.secondary }),
        C.arrow(640, 350, 430, 390, { stroke: colors.accent }),

        // Result: AI
        C.circle(400, 410, 28, { fill: colors.primary, opacity: 0.15 }),
        C.circle(400, 410, 28, { fill: 'none', stroke: colors.primary, strokeWidth: 2 }),
        C.text(400, 410, 'AI', { fontSize: 16, fontWeight: 'bold', fill: colors.primary, anchor: 'middle' }),
      ].join('\n');
    }
  },

  // ─── ch03-opportunity-risk ─────────────────────────────
  {
    filename: 'ch03-opportunity-risk',
    viewBox: viewBoxes.wide,
    render() {
      return [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 40, 'AI: Opportunities & Risks', {
          fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),

        // Left side - Opportunities (green)
        C.rect(40, 80, 340, 340, { fill: '#E6FAF5', stroke: colors.secondary, rx: 16 }),
        C.text(210, 115, 'Opportunities', { fontSize: 18, fontWeight: 'bold', fill: colors.secondary, anchor: 'middle' }),

        C.circle(100, 170, 20, { fill: colors.secondaryLight }),
        C.text(100, 170, '\u23F1', { fontSize: 16, anchor: 'middle' }),
        C.text(135, 170, 'Save time & effort', { fontSize: 13, fill: colors.text }),

        C.circle(100, 225, 20, { fill: colors.secondaryLight }),
        C.text(100, 225, '\u2193', { fontSize: 16, anchor: 'middle' }),
        C.text(135, 225, 'Lower barriers to entry', { fontSize: 13, fill: colors.text }),

        C.circle(100, 280, 20, { fill: colors.secondaryLight }),
        C.text(100, 280, '\u2728', { fontSize: 16, anchor: 'middle' }),
        C.text(135, 280, 'New creative possibilities', { fontSize: 13, fill: colors.text }),

        C.circle(100, 335, 20, { fill: colors.secondaryLight }),
        C.text(100, 335, '\u26A1', { fontSize: 16, anchor: 'middle' }),
        C.text(135, 335, 'Boost productivity', { fontSize: 13, fill: colors.text }),

        // Center balance icon
        C.line(400, 130, 400, 370, { stroke: colors.border, strokeWidth: 2 }),
        C.circle(400, 110, 18, { fill: colors.surface, stroke: colors.border, strokeWidth: 2 }),
        C.text(400, 110, '\u2696', { fontSize: 16, anchor: 'middle' }),

        // Right side - Risks (orange)
        C.rect(420, 80, 340, 340, { fill: colors.accentLight, stroke: colors.accent, rx: 16 }),
        C.text(590, 115, 'Risks', { fontSize: 18, fontWeight: 'bold', fill: colors.accent, anchor: 'middle' }),

        C.circle(480, 170, 20, { fill: colors.accentLight }),
        C.text(480, 170, '\u2753', { fontSize: 16, anchor: 'middle' }),
        C.text(515, 170, 'Hallucination / nonsense', { fontSize: 13, fill: colors.text }),

        C.circle(480, 225, 20, { fill: colors.accentLight }),
        C.text(480, 225, '\u{1F512}', { fontSize: 16, anchor: 'middle' }),
        C.text(515, 225, 'Privacy concerns', { fontSize: 13, fill: colors.text }),

        C.circle(480, 280, 20, { fill: colors.accentLight }),
        C.text(480, 280, '\u26A0', { fontSize: 16, anchor: 'middle' }),
        C.text(515, 280, 'Bias & fairness', { fontSize: 13, fill: colors.text }),

        C.circle(480, 335, 20, { fill: colors.accentLight }),
        C.text(480, 335, '\u{1F4BC}', { fontSize: 16, anchor: 'middle' }),
        C.text(515, 335, 'Job displacement', { fontSize: 13, fill: colors.text }),

        // Footer
        C.text(400, 440, 'Every powerful technology has two sides — understanding both helps us navigate wisely', {
          fontSize: 11, fill: colors.textLight, anchor: 'middle'
        }),
      ].join('\n');
    }
  },
];
