import { colors, fonts, viewBoxes } from '../design-system.mjs';
import * as C from '../components.mjs';

export const diagrams = [
  // ─── ch04-three-elements ─────────────────────────────────
  {
    filename: 'ch04-three-elements',
    viewBox: viewBoxes.wide,
    render() {
      // Triangle vertices
      const topX = 400, topY = 100;
      const blX = 200, blY = 360;
      const brX = 600, brY = 360;

      return [
        // Background
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),

        // Title
        C.text(400, 40, 'Three Elements of Machine Learning', {
          fontSize: 24, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),

        // Triangle edges (double arrows)
        C.line(topX, topY + 35, blX + 30, blY - 25, { stroke: colors.border, strokeWidth: 2 }),
        C.line(topX, topY + 35, brX - 30, brY - 25, { stroke: colors.border, strokeWidth: 2 }),
        C.line(blX + 40, blY, brX - 40, brY, { stroke: colors.border, strokeWidth: 2 }),

        // Arrow indicators on edges
        C.text(285, 220, '\u2194', { fontSize: 16, fill: colors.textLight, anchor: 'middle' }),
        C.text(515, 220, '\u2194', { fontSize: 16, fill: colors.textLight, anchor: 'middle' }),
        C.text(400, 375, '\u2194', { fontSize: 16, fill: colors.textLight, anchor: 'middle' }),

        // Center text
        C.text(400, 250, 'None can', { fontSize: 13, fill: colors.textLight, anchor: 'middle' }),
        C.text(400, 268, 'be missing', { fontSize: 13, fill: colors.textLight, anchor: 'middle' }),

        // ─── Node 1: Data (top) ─────
        C.circle(topX, topY, 40, { fill: colors.primary, opacity: 0.15 }),
        C.circle(topX, topY, 40, { fill: 'none', stroke: colors.primary, strokeWidth: 2.5 }),
        C.icon('data', topX - 12, topY - 16, 24),
        C.text(topX, topY + 55, 'Data', { fontSize: 16, fill: colors.primary, anchor: 'middle', fontWeight: '600' }),
        C.text(topX, topY + 73, 'Examples to learn from', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }),

        // ─── Node 2: Model (bottom-left) ─────
        C.circle(blX, blY, 40, { fill: colors.secondary, opacity: 0.15 }),
        C.circle(blX, blY, 40, { fill: 'none', stroke: colors.secondary, strokeWidth: 2.5 }),
        C.icon('gear', blX - 12, blY - 16, 24),
        C.text(blX, blY + 55, 'Model', { fontSize: 16, fill: colors.secondary, anchor: 'middle', fontWeight: '600' }),
        C.text(blX, blY + 73, 'Structure to fit patterns', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }),

        // ─── Node 3: Algorithm (bottom-right) ─────
        C.circle(brX, brY, 40, { fill: colors.accent, opacity: 0.15 }),
        C.circle(brX, brY, 40, { fill: 'none', stroke: colors.accent, strokeWidth: 2.5 }),
        C.icon('code', brX - 12, brY - 16, 24),
        C.text(brX, brY + 55, 'Algorithm', { fontSize: 16, fill: colors.accent, anchor: 'middle', fontWeight: '600' }),
        C.text(brX, brY + 73, 'How to optimize', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }),

        // Decorative
        C.circle(60, 60, 4, { fill: colors.primary, opacity: 0.3 }),
        C.circle(740, 60, 5, { fill: colors.secondary, opacity: 0.3 }),
      ].join('\n');
    }
  },

  // ─── ch04-ml-roadmap ─────────────────────────────────────
  {
    filename: 'ch04-ml-roadmap',
    viewBox: viewBoxes.wide,
    render() {
      const stations = [
        { label: 'Data', sublabel: 'Collect & clean', color: colors.primary, iconType: 'data' },
        { label: 'Model', sublabel: 'Choose structure', color: colors.secondary, iconType: 'gear' },
        { label: 'Training', sublabel: 'Learn patterns', color: colors.accent, iconType: 'brain' },
        { label: 'Evaluation', sublabel: 'Test accuracy', color: colors.primary, iconType: 'check' },
        { label: 'Deploy', sublabel: 'Real-world use', color: colors.secondary, iconType: 'network' },
      ];

      const startX = 80, endX = 720;
      const y = 225;
      const step = (endX - startX) / (stations.length - 1);

      const parts = [
        // Background
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),

        // Title
        C.text(400, 40, 'Machine Learning Roadmap', {
          fontSize: 24, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),
        C.text(400, 63, 'Five steps from data to deployment', {
          fontSize: 13, fill: colors.textLight, anchor: 'middle'
        }),

        // Path line
        C.line(startX, y, endX, y, { stroke: colors.border, strokeWidth: 3 }),
      ];

      // Draw stations
      for (let i = 0; i < stations.length; i++) {
        const x = startX + i * step;
        const s = stations[i];

        // Circle node
        parts.push(C.circle(x, y, 30, { fill: s.color, opacity: 0.12 }));
        parts.push(C.circle(x, y, 30, { fill: 'none', stroke: s.color, strokeWidth: 2.5 }));

        // Icon inside
        parts.push(C.icon(s.iconType, x - 12, y - 12, 24));

        // Label below
        parts.push(C.text(x, y + 50, s.label, {
          fontSize: 14, fill: colors.text, anchor: 'middle', fontWeight: '600'
        }));
        parts.push(C.text(x, y + 68, s.sublabel, {
          fontSize: 11, fill: colors.textLight, anchor: 'middle'
        }));

        // Step number above
        parts.push(C.circle(x, y - 55, 14, { fill: s.color, opacity: 0.2 }));
        parts.push(C.text(x, y - 55, `${i + 1}`, {
          fontSize: 12, fill: s.color, anchor: 'middle', fontWeight: 'bold'
        }));

        // Arrow between stations
        if (i < stations.length - 1) {
          const ax1 = x + 35;
          const ax2 = x + step - 35;
          parts.push(C.arrow(ax1, y, ax2, y, { stroke: colors.textLight, strokeWidth: 1.5 }));
        }
      }

      // Decorative footprint dots along the path
      for (let i = 0; i < 12; i++) {
        const dx = startX + 20 + i * 58;
        parts.push(C.circle(dx, y + 95, 2, { fill: colors.border, opacity: 0.6 }));
      }

      // Footer
      parts.push(C.text(400, 420, 'Each step builds on the previous one', {
        fontSize: 12, fill: colors.textLight, anchor: 'middle'
      }));

      return parts.join('\n');
    }
  },

  // ─── ch05-supervised-vs-unsupervised ─────────────────────
  {
    filename: 'ch05-supervised-vs-unsupervised',
    viewBox: viewBoxes.wide,
    render() {
      return [
        // Background
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),

        // Title
        C.text(400, 38, 'Supervised vs. Unsupervised Learning', {
          fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),

        // Divider
        C.line(400, 65, 400, 410, { stroke: colors.border, strokeWidth: 1.5, strokeDasharray: '6,4' }),

        // ─── Left: Supervised Learning ─────
        C.text(200, 80, 'Supervised Learning', {
          fontSize: 16, fontWeight: '600', fill: colors.primary, anchor: 'middle'
        }),
        C.text(200, 100, 'Learning with answers', {
          fontSize: 11, fill: colors.textLight, anchor: 'middle'
        }),

        // Data with labels
        C.rect(80, 130, 240, 160, { fill: colors.primaryLight, rx: 12, opacity: 0.3 }),
        // Sample data items with labels
        C.circle(130, 170, 18, { fill: colors.primary, opacity: 0.2 }),
        C.text(130, 170, '\uD83D\uDC31', { fontSize: 14, anchor: 'middle' }),
        C.text(160, 170, '= Cat', { fontSize: 12, fill: colors.text }),

        C.circle(130, 215, 18, { fill: colors.primary, opacity: 0.2 }),
        C.text(130, 215, '\uD83D\uDC36', { fontSize: 14, anchor: 'middle' }),
        C.text(160, 215, '= Dog', { fontSize: 12, fill: colors.text }),

        C.circle(130, 260, 18, { fill: colors.primary, opacity: 0.2 }),
        C.text(130, 260, '\uD83D\uDC26', { fontSize: 14, anchor: 'middle' }),
        C.text(160, 260, '= Bird', { fontSize: 12, fill: colors.text }),

        // "Labels" badge
        C.badge(230, 145, 'Labels', colors.primary),

        // Arrow down
        C.arrow(200, 300, 200, 330, { stroke: colors.textLight }),

        // Result
        C.rect(120, 340, 160, 50, { fill: colors.primaryLight, stroke: colors.primary, rx: 10 }),
        C.text(200, 360, 'Learns to classify', { fontSize: 12, fill: colors.text, anchor: 'middle' }),
        C.text(200, 378, 'new examples', { fontSize: 12, fill: colors.text, anchor: 'middle' }),

        // ─── Right: Unsupervised Learning ─────
        C.text(600, 80, 'Unsupervised Learning', {
          fontSize: 16, fontWeight: '600', fill: colors.secondary, anchor: 'middle'
        }),
        C.text(600, 100, 'Finding hidden patterns', {
          fontSize: 11, fill: colors.textLight, anchor: 'middle'
        }),

        // Data without labels - scattered dots
        C.rect(480, 130, 240, 160, { fill: colors.secondaryLight, rx: 12, opacity: 0.3 }),

        // Scattered dots (no labels)
        C.circle(530, 170, 8, { fill: colors.accent, opacity: 0.6 }),
        C.circle(560, 200, 8, { fill: colors.accent, opacity: 0.6 }),
        C.circle(545, 240, 8, { fill: colors.accent, opacity: 0.6 }),

        C.circle(630, 160, 8, { fill: colors.primary, opacity: 0.6 }),
        C.circle(660, 190, 8, { fill: colors.primary, opacity: 0.6 }),
        C.circle(645, 230, 8, { fill: colors.primary, opacity: 0.6 }),

        C.circle(590, 260, 8, { fill: colors.secondary, opacity: 0.6 }),
        C.circle(610, 220, 8, { fill: colors.secondary, opacity: 0.6 }),

        // Cluster circles (dashed)
        `<circle cx="545" cy="200" r="45" fill="none" stroke="${colors.accent}" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.6"/>`,
        `<circle cx="645" cy="190" r="45" fill="none" stroke="${colors.primary}" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.6"/>`,

        // "No Labels" badge
        C.badge(610, 145, 'No Labels', colors.secondary),

        // Arrow down
        C.arrow(600, 300, 600, 330, { stroke: colors.textLight }),

        // Result
        C.rect(520, 340, 160, 50, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 10 }),
        C.text(600, 360, 'Discovers groups', { fontSize: 12, fill: colors.text, anchor: 'middle' }),
        C.text(600, 378, 'and structure', { fontSize: 12, fill: colors.text, anchor: 'middle' }),

        // VS badge
        C.circle(400, 230, 20, { fill: colors.surface, stroke: colors.border, strokeWidth: 2 }),
        C.text(400, 230, 'VS', { fontSize: 11, fill: colors.textLight, anchor: 'middle', fontWeight: 'bold' }),

        // Footer
        C.text(200, 420, 'Teacher provides answers', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }),
        C.text(600, 420, 'No teacher, self-discovery', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }),
      ].join('\n');
    }
  },

  // ─── ch06-data-types ─────────────────────────────────────
  {
    filename: 'ch06-data-types',
    viewBox: viewBoxes.wide,
    render() {
      function dataCard(x, y, iconContent, title, examples, color) {
        return [
          // Card background
          C.rect(x, y, 160, 180, { fill: color, rx: 14, opacity: 0.08 }),
          C.rect(x, y, 160, 180, { fill: 'none', stroke: color, rx: 14, strokeWidth: 1.5 }),
          // Icon area
          C.circle(x + 80, y + 60, 32, { fill: color, opacity: 0.15 }),
          iconContent,
          // Title
          C.text(x + 80, y + 115, title, { fontSize: 15, fill: colors.text, anchor: 'middle', fontWeight: '600' }),
          // Examples
          C.text(x + 80, y + 140, examples, { fontSize: 11, fill: colors.textLight, anchor: 'middle' }),
          C.text(x + 80, y + 156, '', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }),
        ].join('\n');
      }

      return [
        // Background
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),

        // Title
        C.text(400, 40, 'Types of Data in ML', {
          fontSize: 24, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),
        C.text(400, 63, 'Machine learning can process many data formats', {
          fontSize: 12, fill: colors.textLight, anchor: 'middle'
        }),

        // 4 data type cards
        // Image data
        dataCard(40, 100, C.group([
          C.rect(40 + 60, 100 + 40, 40, 32, { fill: colors.primary, rx: 4, opacity: 0.3 }),
          C.circle(40 + 73, 100 + 50, 5, { fill: colors.primary, opacity: 0.6 }),
          C.path('M108,165 L118,155 L128,162 L138,148 L148,165', { stroke: colors.primary, strokeWidth: 1.5, fill: 'none' }),
        ]), 'Images', 'Photos, medical scans', colors.primary),

        // Text data
        dataCard(230, 100, C.group([
          C.rect(230 + 55, 100 + 38, 50, 36, { fill: colors.secondary, rx: 4, opacity: 0.2 }),
          C.line(230 + 60, 100 + 50, 230 + 95, 100 + 50, { stroke: colors.secondary, strokeWidth: 2 }),
          C.line(230 + 60, 100 + 58, 230 + 88, 100 + 58, { stroke: colors.secondary, strokeWidth: 2, opacity: 0.6 }),
          C.line(230 + 60, 100 + 66, 230 + 80, 100 + 66, { stroke: colors.secondary, strokeWidth: 2, opacity: 0.4 }),
        ]), 'Text', 'Articles, reviews, chat', colors.secondary),

        // Numeric data
        dataCard(420, 100, C.group([
          C.text(420 + 80, 100 + 50, '42', { fontSize: 24, fill: colors.accent, anchor: 'middle', fontWeight: 'bold' }),
          C.text(420 + 80, 100 + 70, '.7  3.14', { fontSize: 12, fill: colors.accent, anchor: 'middle' }),
        ]), 'Numbers', 'Sales, temperature, price', colors.accent),

        // Audio data
        dataCard(610, 100, C.group([
          // Sound wave
          C.path('M640,155 Q648,140 656,155 Q664,170 672,155 Q680,140 688,155', { stroke: colors.primary, strokeWidth: 2, fill: 'none' }),
          C.path('M644,165 Q652,155 660,165 Q668,175 676,165 Q684,155 690,165', { stroke: colors.primary, strokeWidth: 1.5, fill: 'none', opacity: 0.5 }),
        ]), 'Audio', 'Speech, music, sounds', colors.primary),

        // Bottom: connecting line
        C.line(120, 310, 690, 310, { stroke: colors.border, strokeWidth: 1, strokeDasharray: '4,4' }),

        // Bottom: ML processes all
        C.rect(280, 330, 240, 50, { fill: colors.primaryLight, stroke: colors.primary, rx: 10 }),
        C.icon('brain', 300, 343, 22),
        C.text(400, 360, 'ML processes all types', { fontSize: 14, fill: colors.text, anchor: 'middle', fontWeight: '500' }),

        // Arrows from line to ML box
        C.arrow(400, 312, 400, 328, { stroke: colors.textLight }),

        // Footer
        C.text(400, 420, 'Different data types require different preprocessing', {
          fontSize: 12, fill: colors.textLight, anchor: 'middle'
        }),
      ].join('\n');
    }
  },

  // ─── 5. Data Annotation Scene ──────────────────────────
  {
    filename: 'ch06-data-annotation',
    viewBox: viewBoxes.wide,
    render() {
      return [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.circle(700, 80, 140, { fill: colors.primaryLight, opacity: 0.3 }),
        C.circle(100, 400, 100, { fill: colors.secondaryLight, opacity: 0.3 }),
        C.text(400, 35, 'Data Annotation Workbench', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),

        // Image cards with labels
        C.rect(60, 80, 140, 110, { fill: colors.surface, stroke: colors.border, rx: 8, shadow: true }),
        C.rect(70, 90, 120, 70, { fill: colors.primaryLight, rx: 4 }),
        C.text(130, 125, '\ud83d\udc31', { fontSize: 28, anchor: 'middle' }),
        C.rect(80, 168, 60, 20, { fill: colors.secondary, rx: 10, opacity: 0.2 }),
        C.text(110, 178, 'Cat', { fontSize: 11, fill: colors.secondary, anchor: 'middle', fontWeight: '600' }),

        C.rect(220, 80, 140, 110, { fill: colors.surface, stroke: colors.border, rx: 8, shadow: true }),
        C.rect(230, 90, 120, 70, { fill: colors.accentLight, rx: 4 }),
        C.text(290, 125, '\ud83d\udc15', { fontSize: 28, anchor: 'middle' }),
        C.rect(240, 168, 60, 20, { fill: colors.accent, rx: 10, opacity: 0.2 }),
        C.text(270, 178, 'Dog', { fontSize: 11, fill: colors.accent, anchor: 'middle', fontWeight: '600' }),

        C.rect(380, 80, 140, 110, { fill: colors.surface, stroke: colors.border, rx: 8, shadow: true }),
        C.rect(390, 90, 120, 70, { fill: colors.secondaryLight, rx: 4 }),
        C.text(450, 125, '\ud83d\udc26', { fontSize: 28, anchor: 'middle' }),
        C.rect(400, 168, 60, 20, { fill: colors.primary, rx: 10, opacity: 0.2 }),
        C.text(430, 178, 'Bird', { fontSize: 11, fill: colors.primary, anchor: 'middle', fontWeight: '600' }),

        // Text annotation section
        C.rect(60, 220, 480, 80, { fill: colors.surface, stroke: colors.border, rx: 10, shadow: true }),
        C.text(80, 245, 'Text:', { fontSize: 13, fill: colors.textLight, fontWeight: '600' }),
        C.text(120, 245, '"The cat sat on the mat"', { fontSize: 13, fill: colors.text }),
        C.text(80, 275, 'Labels:', { fontSize: 13, fill: colors.textLight, fontWeight: '600' }),
        C.rect(135, 263, 60, 22, { fill: colors.primary, rx: 11, opacity: 0.15 }),
        C.text(165, 274, 'Entity', { fontSize: 11, fill: colors.primary, anchor: 'middle', fontWeight: '600' }),
        C.rect(205, 263, 75, 22, { fill: colors.secondary, rx: 11, opacity: 0.15 }),
        C.text(242, 274, 'Positive', { fontSize: 11, fill: colors.secondary, anchor: 'middle', fontWeight: '600' }),
        C.rect(290, 263, 70, 22, { fill: colors.accent, rx: 11, opacity: 0.15 }),
        C.text(325, 274, 'Animal', { fontSize: 11, fill: colors.accent, anchor: 'middle', fontWeight: '600' }),

        // Right side: annotator
        C.rect(580, 100, 180, 280, { fill: colors.primaryLight, rx: 12, opacity: 0.2 }),
        C.circle(670, 150, 25, { fill: colors.accentLight, stroke: colors.accent, strokeWidth: 1.5 }),
        C.circle(663, 145, 3, { fill: colors.text }),
        C.circle(677, 145, 3, { fill: colors.text }),
        C.path('M662,157 Q670,163 678,157', { stroke: colors.accent, strokeWidth: 1.5, fill: 'none' }),
        C.rect(650, 180, 40, 50, { fill: colors.primaryLight, stroke: colors.primary, rx: 8 }),
        C.rect(620, 250, 100, 110, { fill: colors.surface, stroke: colors.border, rx: 6 }),
        C.text(670, 270, 'Checklist', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }),
        C.line(635, 285, 705, 285, { stroke: colors.border }),
        C.text(648, 302, '\u2713 Cat', { fontSize: 12, fill: colors.secondary }),
        C.text(648, 322, '\u2713 Dog', { fontSize: 12, fill: colors.secondary }),
        C.text(648, 342, '\u25cb Bird', { fontSize: 12, fill: colors.textLight }),

        // Bottom workflow
        C.text(400, 390, 'Raw Data \u2192 Annotation \u2192 Labeled Dataset \u2192 Model Training', { fontSize: 13, fill: colors.textLight, anchor: 'middle' }),
        C.arrow(180, 410, 300, 410, { stroke: colors.primary }),
        C.arrow(330, 410, 450, 410, { stroke: colors.secondary }),
        C.arrow(480, 410, 600, 410, { stroke: colors.accent }),
        C.badge(100, 420, 'Images', colors.primary),
        C.badge(310, 420, 'Labels', colors.secondary),
        C.badge(510, 420, 'Training', colors.accent),
      ].join('\n');
    }
  },

  // ─── 6. Model Fitting ─────────────────────────────────
  {
    filename: 'ch07-model-fitting',
    viewBox: viewBoxes.wide,
    render() {
      const dataPoints = [
        [80,320],[120,280],[160,250],[200,230],[240,200],[280,180],
        [320,170],[360,175],[400,190],[440,220],[480,260],[520,300],
        [560,330],[600,340],[640,320],[680,290],
        [100,300],[150,270],[200,250],[300,160],[350,185],[450,240],
        [500,280],[550,310],[620,335],[680,310]
      ];
      return [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'Model Fitting: Underfitting / Good Fit / Overfitting', { fontSize: 20, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
        C.line(50, 380, 750, 380, { stroke: colors.text, strokeWidth: 1.5 }),
        C.line(50, 380, 50, 60, { stroke: colors.text, strokeWidth: 1.5 }),
        C.text(400, 430, 'Input Feature (x)', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        C.text(25, 220, 'y', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
        ...dataPoints.map(([x, y]) => C.circle(x, y, 4, { fill: colors.text, opacity: 0.3 })),
        // Underfitting
        C.path('M80,310 L700,270', { stroke: colors.accent, strokeWidth: 3, opacity: 0.8 }),
        // Good fit
        C.path('M80,320 Q200,200 320,170 Q480,180 560,310 Q620,340 700,300', { stroke: colors.secondary, strokeWidth: 3, opacity: 0.9 }),
        // Overfitting
        C.path('M80,320 L120,280 L160,250 L200,230 L240,200 L280,180 L320,170 L360,175 L400,190 L440,220 L480,260 L520,300 L560,330 L600,340 L640,320 L680,290', { stroke: colors.primary, strokeWidth: 2.5, opacity: 0.8 }),
        // Legend
        C.rect(540, 55, 220, 100, { fill: colors.surface, stroke: colors.border, rx: 8, shadow: true }),
        C.line(560, 80, 595, 80, { stroke: colors.accent, strokeWidth: 3 }),
        C.text(605, 80, 'Underfitting (too simple)', { fontSize: 11, fill: colors.text }),
        C.line(560, 105, 595, 105, { stroke: colors.secondary, strokeWidth: 3 }),
        C.text(605, 105, 'Good Fit (just right)', { fontSize: 11, fill: colors.text }),
        C.line(560, 130, 595, 130, { stroke: colors.primary, strokeWidth: 3 }),
        C.text(605, 130, 'Overfitting (too complex)', { fontSize: 11, fill: colors.text }),
      ].join('\n');
    }
  },

  // ─── 7. Gradient Descent ──────────────────────────────
  {
    filename: 'ch07-gradient-descent',
    viewBox: viewBoxes.wide,
    render() {
      return [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'Gradient Descent: Rolling Down to the Minimum', { fontSize: 20, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
        // Loss surface
        C.path('M80,100 Q200,80 300,180 Q400,340 500,350 Q550,355 600,300 Q680,180 750,200 L750,400 L80,400 Z', { fill: colors.primaryLight, stroke: 'none', opacity: 0.3 }),
        C.path('M80,100 Q200,80 300,180 Q400,340 500,350 Q550,355 600,300 Q680,180 750,200', { stroke: colors.primary, strokeWidth: 2.5, fill: 'none' }),
        C.text(400, 430, 'Parameter (w)', { fontSize: 13, fill: colors.textLight, anchor: 'middle' }),
        C.text(30, 250, 'Loss', { fontSize: 13, fill: colors.textLight, anchor: 'middle' }),
        C.line(60, 400, 760, 400, { stroke: colors.border, strokeWidth: 1 }),
        C.line(60, 400, 60, 70, { stroke: colors.border, strokeWidth: 1 }),
        // Ball path
        C.circle(140, 90, 10, { fill: colors.accent, opacity: 0.9 }),
        C.text(140, 65, 'Start', { fontSize: 11, fill: colors.accent, anchor: 'middle', fontWeight: '600' }),
        C.circle(220, 110, 8, { fill: colors.accent, opacity: 0.7 }),
        C.arrow(150, 93, 212, 108, { stroke: colors.accent, strokeWidth: 1.5 }),
        C.circle(300, 180, 8, { fill: colors.accent, opacity: 0.6 }),
        C.arrow(228, 114, 292, 176, { stroke: colors.accent, strokeWidth: 1.5 }),
        C.circle(380, 290, 8, { fill: colors.accent, opacity: 0.5 }),
        C.arrow(306, 186, 374, 285, { stroke: colors.accent, strokeWidth: 1.5 }),
        C.circle(440, 335, 7, { fill: colors.accent, opacity: 0.5 }),
        C.arrow(386, 295, 434, 330, { stroke: colors.accent, strokeWidth: 1.5 }),
        C.circle(510, 352, 12, { fill: colors.secondary, opacity: 0.9 }),
        C.text(510, 380, 'Minimum', { fontSize: 11, fill: colors.secondary, anchor: 'middle', fontWeight: '600' }),
        C.arrow(446, 338, 500, 350, { stroke: colors.accent, strokeWidth: 1.5 }),
        // Gradient labels
        C.text(160, 135, '\u2207L', { fontSize: 11, fill: colors.primary, anchor: 'middle' }),
        C.text(260, 185, '\u2207L', { fontSize: 11, fill: colors.primary, anchor: 'middle' }),
        C.text(350, 310, '\u2207L', { fontSize: 11, fill: colors.primary, anchor: 'middle' }),
        // Loss curve inset
        C.rect(570, 70, 200, 160, { fill: colors.surface, stroke: colors.border, rx: 8, shadow: true }),
        C.text(670, 90, 'Loss vs. Iteration', { fontSize: 12, fill: colors.text, anchor: 'middle', fontWeight: '600' }),
        C.line(590, 210, 750, 210, { stroke: colors.border }),
        C.line(590, 210, 590, 105, { stroke: colors.border }),
        C.text(670, 225, 'Iterations', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),
        C.path('M595,115 Q620,130 640,155 Q670,185 720,200 L745,205', { stroke: colors.accent, strokeWidth: 2, fill: 'none' }),
        C.text(575, 115, 'High', { fontSize: 9, fill: colors.textLight, anchor: 'end' }),
        C.text(575, 205, 'Low', { fontSize: 9, fill: colors.textLight, anchor: 'end' }),
        C.text(400, 410, 'Step size = Learning Rate \u00d7 Gradient', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),
      ].join('\n');
    }
  },

  // ─── 8. Train/Validation/Test Split ───────────────────
  {
    filename: 'ch08-train-val-test',
    viewBox: viewBoxes.wide,
    render() {
      return [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 40, 'Dataset Split: Train / Validation / Test', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
        C.text(400, 85, 'Full Dataset (100%)', { fontSize: 14, fill: colors.textLight, anchor: 'middle' }),
        C.rect(80, 100, 640, 50, { fill: colors.border, rx: 8 }),
        // Training 60%
        C.rect(80, 100, 384, 50, { fill: colors.primary, rx: 8, opacity: 0.8 }),
        C.text(272, 125, 'Training Set (60%)', { fontSize: 14, fill: colors.surface, anchor: 'middle', fontWeight: '600' }),
        // Validation 20%
        C.rect(464, 100, 128, 50, { fill: colors.secondary, rx: 0, opacity: 0.8 }),
        C.text(528, 125, 'Val (20%)', { fontSize: 13, fill: colors.surface, anchor: 'middle', fontWeight: '600' }),
        // Test 20%
        C.rect(592, 100, 128, 50, { fill: colors.accent, rx: 8, opacity: 0.8 }),
        C.text(656, 125, 'Test (20%)', { fontSize: 13, fill: colors.surface, anchor: 'middle', fontWeight: '600' }),
        // Training card
        C.rect(60, 190, 220, 130, { fill: colors.surface, stroke: colors.primary, rx: 10, shadow: true }),
        C.rect(60, 190, 220, 32, { fill: colors.primary, rx: 10, opacity: 0.15 }),
        C.text(170, 208, 'Training Set', { fontSize: 13, fill: colors.primary, anchor: 'middle', fontWeight: '700' }),
        C.text(80, 245, '\u2022 Learn patterns from data', { fontSize: 11, fill: colors.text }),
        C.text(80, 265, '\u2022 Update model weights', { fontSize: 11, fill: colors.text }),
        C.text(80, 285, '\u2022 Largest portion', { fontSize: 11, fill: colors.text }),
        C.text(80, 305, '\u2022 Used every epoch', { fontSize: 11, fill: colors.textLight }),
        // Validation card
        C.rect(300, 190, 200, 130, { fill: colors.surface, stroke: colors.secondary, rx: 10, shadow: true }),
        C.rect(300, 190, 200, 32, { fill: colors.secondary, rx: 10, opacity: 0.15 }),
        C.text(400, 208, 'Validation Set', { fontSize: 13, fill: colors.secondary, anchor: 'middle', fontWeight: '700' }),
        C.text(320, 245, '\u2022 Tune hyperparams', { fontSize: 11, fill: colors.text }),
        C.text(320, 265, '\u2022 Monitor overfitting', { fontSize: 11, fill: colors.text }),
        C.text(320, 285, '\u2022 No weight updates', { fontSize: 11, fill: colors.text }),
        C.text(320, 305, '\u2022 Used each epoch end', { fontSize: 11, fill: colors.textLight }),
        // Test card
        C.rect(520, 190, 220, 130, { fill: colors.surface, stroke: colors.accent, rx: 10, shadow: true }),
        C.rect(520, 190, 220, 32, { fill: colors.accent, rx: 10, opacity: 0.15 }),
        C.text(630, 208, 'Test Set', { fontSize: 13, fill: colors.accent, anchor: 'middle', fontWeight: '700' }),
        C.text(540, 245, '\u2022 Final evaluation only', { fontSize: 11, fill: colors.text }),
        C.text(540, 265, '\u2022 Never seen in training', { fontSize: 11, fill: colors.text }),
        C.text(540, 285, '\u2022 Simulates real-world', { fontSize: 11, fill: colors.text }),
        C.text(540, 305, '\u2022 Used once at the end', { fontSize: 11, fill: colors.textLight }),
        // Bottom flow
        C.text(400, 365, 'Workflow', { fontSize: 14, fill: colors.text, anchor: 'middle', fontWeight: '600' }),
        C.flowRow(100, 385, [
          { label: 'Train', color: colors.primary },
          { label: 'Validate', color: colors.secondary },
          { label: 'Tune', color: colors.secondary },
          { label: 'Test', color: colors.accent },
        ], { boxW: 100, boxH: 36, gap: 65 }),
      ].join('\n');
    }
  },

  // ─── 9. Confusion Matrix ──────────────────────────────
  {
    filename: 'ch08-confusion-matrix',
    viewBox: viewBoxes.square,
    render() {
      const gridX = 180, gridY = 160, cellW = 170, cellH = 150;
      return [
        C.rect(0, 0, 600, 600, { fill: colors.background, rx: 0 }),
        C.text(300, 40, 'Confusion Matrix', { fontSize: 24, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
        C.text(300, 65, 'Binary Classification Evaluation', { fontSize: 13, fill: colors.textLight, anchor: 'middle' }),
        // Axis labels
        C.text(300, 100, 'Predicted', { fontSize: 15, fill: colors.text, anchor: 'middle', fontWeight: '600' }),
        C.text(265, 135, 'Positive', { fontSize: 12, fill: colors.primary, anchor: 'middle', fontWeight: '600' }),
        C.text(435, 135, 'Negative', { fontSize: 12, fill: colors.accent, anchor: 'middle', fontWeight: '600' }),
        C.text(100, 310, 'Actual', { fontSize: 15, fill: colors.text, anchor: 'middle', fontWeight: '600' }),
        C.text(145, 235, 'Pos', { fontSize: 12, fill: colors.primary, anchor: 'middle', fontWeight: '600' }),
        C.text(145, 385, 'Neg', { fontSize: 12, fill: colors.accent, anchor: 'middle', fontWeight: '600' }),
        // TP
        C.rect(gridX, gridY, cellW, cellH, { fill: colors.secondary, rx: 8, opacity: 0.2 }),
        C.rect(gridX, gridY, cellW, cellH, { fill: 'none', stroke: colors.secondary, rx: 8, strokeWidth: 2 }),
        C.text(gridX + cellW/2, gridY + 50, 'TP', { fontSize: 28, fill: colors.secondary, anchor: 'middle', fontWeight: 'bold' }),
        C.text(gridX + cellW/2, gridY + 85, 'True Positive', { fontSize: 12, fill: colors.secondary, anchor: 'middle' }),
        C.text(gridX + cellW/2, gridY + 110, '\u2713 Correctly detected', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),
        // FP
        C.rect(gridX + cellW, gridY, cellW, cellH, { fill: colors.accent, rx: 8, opacity: 0.15 }),
        C.rect(gridX + cellW, gridY, cellW, cellH, { fill: 'none', stroke: colors.accent, rx: 8, strokeWidth: 2 }),
        C.text(gridX + cellW + cellW/2, gridY + 50, 'FP', { fontSize: 28, fill: colors.accent, anchor: 'middle', fontWeight: 'bold' }),
        C.text(gridX + cellW + cellW/2, gridY + 85, 'False Positive', { fontSize: 12, fill: colors.accent, anchor: 'middle' }),
        C.text(gridX + cellW + cellW/2, gridY + 110, '\u2717 False alarm', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),
        // FN
        C.rect(gridX, gridY + cellH, cellW, cellH, { fill: colors.accent, rx: 8, opacity: 0.15 }),
        C.rect(gridX, gridY + cellH, cellW, cellH, { fill: 'none', stroke: colors.accent, rx: 8, strokeWidth: 2 }),
        C.text(gridX + cellW/2, gridY + cellH + 50, 'FN', { fontSize: 28, fill: colors.accent, anchor: 'middle', fontWeight: 'bold' }),
        C.text(gridX + cellW/2, gridY + cellH + 85, 'False Negative', { fontSize: 12, fill: colors.accent, anchor: 'middle' }),
        C.text(gridX + cellW/2, gridY + cellH + 110, '\u2717 Missed detection', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),
        // TN
        C.rect(gridX + cellW, gridY + cellH, cellW, cellH, { fill: colors.secondary, rx: 8, opacity: 0.2 }),
        C.rect(gridX + cellW, gridY + cellH, cellW, cellH, { fill: 'none', stroke: colors.secondary, rx: 8, strokeWidth: 2 }),
        C.text(gridX + cellW + cellW/2, gridY + cellH + 50, 'TN', { fontSize: 28, fill: colors.secondary, anchor: 'middle', fontWeight: 'bold' }),
        C.text(gridX + cellW + cellW/2, gridY + cellH + 85, 'True Negative', { fontSize: 12, fill: colors.secondary, anchor: 'middle' }),
        C.text(gridX + cellW + cellW/2, gridY + cellH + 110, '\u2713 Correctly rejected', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }),
        // Metrics
        C.rect(100, 490, 400, 70, { fill: colors.surface, stroke: colors.border, rx: 10, shadow: true }),
        C.text(300, 515, 'Key Metrics', { fontSize: 13, fill: colors.text, anchor: 'middle', fontWeight: '600' }),
        C.text(170, 540, 'Precision = TP/(TP+FP)', { fontSize: 11, fill: colors.primary, anchor: 'middle' }),
        C.text(400, 540, 'Recall = TP/(TP+FN)', { fontSize: 11, fill: colors.secondary, anchor: 'middle' }),
      ].join('\n');
    }
  },
];
