import { colors, fonts, viewBoxes } from '../design-system.mjs';
import * as C from '../components.mjs';

export const diagrams = [
  // ─── 1. ai-agent-workflow ───────────────────────────
  {
    filename: 'ai-agent-workflow',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'AI Agent Workflow: Think-Act-Observe Loop', { fontSize: 20, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      // User input (left)
      parts.push(C.rect(30, 160, 120, 80, { fill: colors.primaryLight, stroke: colors.primary, rx: 12 }));
      parts.push(C.text(90, 190, 'User', { fontSize: 14, fill: colors.primary, anchor: 'middle', fontWeight: '600' }));
      parts.push(C.text(90, 210, 'Goal', { fontSize: 12, fill: colors.text, anchor: 'middle' }));

      // Arrow from user to Think
      parts.push(C.arrow(155, 200, 200, 200, { stroke: colors.primary, strokeWidth: 2 }));

      // Central loop area
      // Think box
      parts.push(C.rect(210, 80, 140, 70, { fill: colors.primaryLight, stroke: colors.primary, rx: 10 }));
      parts.push(C.text(280, 105, 'Think', { fontSize: 15, fill: colors.primary, anchor: 'middle', fontWeight: '700' }));
      parts.push(C.text(280, 125, 'LLM reasons', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));
      parts.push(C.text(280, 140, 'about next step', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));

      // Arrow Think -> Act
      parts.push(C.arrow(355, 115, 410, 115, { stroke: colors.text, strokeWidth: 1.5 }));

      // Act box
      parts.push(C.rect(420, 80, 140, 70, { fill: colors.accentLight, stroke: colors.accent, rx: 10 }));
      parts.push(C.text(490, 105, 'Act', { fontSize: 15, fill: colors.accent, anchor: 'middle', fontWeight: '700' }));
      parts.push(C.text(490, 125, 'Call tools or', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));
      parts.push(C.text(490, 140, 'generate content', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));

      // Arrow Act -> Observe
      parts.push(C.arrow(565, 115, 620, 115, { stroke: colors.text, strokeWidth: 1.5 }));

      // Observe box
      parts.push(C.rect(630, 80, 140, 70, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 10 }));
      parts.push(C.text(700, 105, 'Observe', { fontSize: 15, fill: colors.secondary, anchor: 'middle', fontWeight: '700' }));
      parts.push(C.text(700, 125, 'Check results', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));
      parts.push(C.text(700, 140, 'from tools', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));

      // Loop arrow (Observe back to Think)
      parts.push(C.path('M700,155 L700,185 Q700,200 685,200 L295,200 Q280,200 280,185 L280,155', { stroke: colors.textLight, strokeWidth: 1.5, fill: 'none' }));
      parts.push(`<polygon points="277,155 280,148 283,155" fill="${colors.textLight}"/>`);
      parts.push(C.text(490, 215, 'Not done yet? Loop back', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));

      // Tools area (below Act)
      parts.push(C.rect(380, 260, 220, 130, { fill: colors.surface, stroke: colors.border, rx: 10 }));
      parts.push(C.text(490, 280, 'Tools', { fontSize: 13, fill: colors.text, anchor: 'middle', fontWeight: '600' }));
      const tools = ['Search Engine', 'Code Runner', 'APIs', 'Database'];
      for (let i = 0; i < tools.length; i++) {
        parts.push(C.rect(395, 295 + i * 22, 190, 18, { fill: colors.primaryLight, rx: 4, stroke: 'none' }));
        parts.push(C.text(490, 304 + i * 22, tools[i], { fontSize: 10, fill: colors.primary, anchor: 'middle' }));
      }

      // Arrow from Act to Tools
      parts.push(C.line(490, 155, 490, 255, { stroke: colors.accent, strokeWidth: 1.5, strokeDasharray: '4,3' }));

      // Output (right)
      parts.push(C.rect(650, 300, 120, 80, { fill: '#F0FFF4', stroke: '#48BB78', rx: 12 }));
      parts.push(C.text(710, 330, 'Final', { fontSize: 14, fill: '#276749', anchor: 'middle', fontWeight: '600' }));
      parts.push(C.text(710, 350, 'Output', { fontSize: 14, fill: '#276749', anchor: 'middle', fontWeight: '600' }));
      parts.push(C.text(710, 370, 'to User', { fontSize: 11, fill: '#48BB78', anchor: 'middle' }));

      // Arrow from loop to output (done)
      parts.push(C.arrow(700, 200, 710, 295, { stroke: '#48BB78', strokeWidth: 2 }));
      parts.push(C.text(735, 250, 'Done!', { fontSize: 11, fill: '#48BB78', anchor: 'middle' }));

      // Bottom legend
      parts.push(C.rect(50, 410, 700, 30, { fill: colors.surface, stroke: colors.border, rx: 8 }));
      parts.push(C.text(400, 428, 'Agent Loop: User Goal -> Think -> Act (use tools) -> Observe -> Repeat until done', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));

      return parts.join('\n');
    }
  },

  // ─── 2. ai-agent-vs-chat ─────────────────────────────
  {
    filename: 'ai-agent-vs-chat',
    viewBox: viewBoxes.wide,
    render() {
      const parts = [
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.text(400, 35, 'Regular Chat vs. AI Agent', { fontSize: 22, fontWeight: 'bold', fill: colors.text, anchor: 'middle' }),
      ];

      // Divider
      parts.push(C.line(400, 55, 400, 420, { stroke: colors.border, strokeWidth: 2, strokeDasharray: '6,4' }));

      // ─── Left: Regular Chat ───
      const leftX = 30, leftW = 340;
      parts.push(C.rect(leftX, 60, leftW, 360, { fill: colors.surface, stroke: colors.border, rx: 12 }));
      parts.push(C.rect(leftX, 60, leftW, 40, { fill: colors.primaryLight, rx: 12, stroke: 'none' }));
      parts.push(C.rect(leftX, 90, leftW, 10, { fill: colors.primaryLight, rx: 0, stroke: 'none' }));
      parts.push(C.text(leftX + leftW / 2, 84, 'Regular Chat AI', { fontSize: 15, fill: colors.primary, anchor: 'middle', fontWeight: 'bold' }));

      // Simple flow: User -> AI -> Response
      parts.push(C.rect(leftX + 50, 120, 100, 50, { fill: colors.primaryLight, stroke: colors.primary, rx: 8 }));
      parts.push(C.text(leftX + 100, 145, 'User', { fontSize: 13, fill: colors.primary, anchor: 'middle', fontWeight: '600' }));

      parts.push(C.arrow(leftX + 100, 175, leftX + 100, 200, { stroke: colors.text, strokeWidth: 1.5 }));
      parts.push(C.text(leftX + 115, 190, 'question', { fontSize: 10, fill: colors.textLight }));

      parts.push(C.rect(leftX + 50, 205, 100, 50, { fill: colors.accentLight, stroke: colors.accent, rx: 8 }));
      parts.push(C.text(leftX + 100, 230, 'LLM', { fontSize: 13, fill: colors.accent, anchor: 'middle', fontWeight: '600' }));

      parts.push(C.arrow(leftX + 100, 260, leftX + 100, 285, { stroke: colors.text, strokeWidth: 1.5 }));
      parts.push(C.text(leftX + 115, 275, 'answer', { fontSize: 10, fill: colors.textLight }));

      parts.push(C.rect(leftX + 50, 290, 100, 50, { fill: '#F0FFF4', stroke: '#48BB78', rx: 8 }));
      parts.push(C.text(leftX + 100, 315, 'Text Output', { fontSize: 12, fill: '#276749', anchor: 'middle' }));

      // Labels on left
      parts.push(C.text(leftX + 200, 150, 'Single turn', { fontSize: 11, fill: colors.textLight }));
      parts.push(C.text(leftX + 200, 170, 'Text only', { fontSize: 11, fill: colors.textLight }));
      parts.push(C.text(leftX + 200, 190, 'No tools', { fontSize: 11, fill: colors.textLight }));
      parts.push(C.text(leftX + 200, 210, 'No memory', { fontSize: 11, fill: colors.textLight }));

      // Summary
      parts.push(C.rect(leftX + 30, 360, leftW - 60, 45, { fill: colors.primaryLight, rx: 8, stroke: 'none' }));
      parts.push(C.text(leftX + leftW / 2, 380, 'Input -> Output', { fontSize: 13, fill: colors.primary, anchor: 'middle', fontWeight: '600' }));
      parts.push(C.text(leftX + leftW / 2, 398, 'One question, one answer', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));

      // ─── Right: AI Agent ───
      const rightX = 430, rightW = 340;
      parts.push(C.rect(rightX, 60, rightW, 360, { fill: colors.surface, stroke: colors.secondary, rx: 12, strokeWidth: 2 }));
      parts.push(C.rect(rightX, 60, rightW, 40, { fill: colors.secondaryLight, rx: 12, stroke: 'none' }));
      parts.push(C.rect(rightX, 90, rightW, 10, { fill: colors.secondaryLight, rx: 0, stroke: 'none' }));
      parts.push(C.text(rightX + rightW / 2, 84, 'AI Agent', { fontSize: 15, fill: colors.secondary, anchor: 'middle', fontWeight: 'bold' }));

      // Circular flow
      const cx = rightX + 120, cy = 230;

      // User goal at top
      parts.push(C.rect(rightX + 80, 110, 100, 40, { fill: colors.primaryLight, stroke: colors.primary, rx: 8 }));
      parts.push(C.text(rightX + 130, 130, 'User Goal', { fontSize: 12, fill: colors.primary, anchor: 'middle', fontWeight: '600' }));

      parts.push(C.arrow(rightX + 130, 155, rightX + 130, 175, { stroke: colors.text, strokeWidth: 1.5 }));

      // Think
      parts.push(C.rect(rightX + 75, 180, 110, 35, { fill: colors.primaryLight, stroke: colors.primary, rx: 8 }));
      parts.push(C.text(rightX + 130, 198, 'Think', { fontSize: 12, fill: colors.primary, anchor: 'middle', fontWeight: '600' }));

      // Arrow Think -> Act
      parts.push(C.arrow(rightX + 130, 220, rightX + 130, 240, { stroke: colors.text, strokeWidth: 1.5 }));

      // Act
      parts.push(C.rect(rightX + 75, 245, 110, 35, { fill: colors.accentLight, stroke: colors.accent, rx: 8 }));
      parts.push(C.text(rightX + 130, 263, 'Act (Tools)', { fontSize: 12, fill: colors.accent, anchor: 'middle', fontWeight: '600' }));

      // Arrow Act -> Observe
      parts.push(C.arrow(rightX + 130, 285, rightX + 130, 305, { stroke: colors.text, strokeWidth: 1.5 }));

      // Observe
      parts.push(C.rect(rightX + 75, 310, 110, 35, { fill: colors.secondaryLight, stroke: colors.secondary, rx: 8 }));
      parts.push(C.text(rightX + 130, 328, 'Observe', { fontSize: 12, fill: colors.secondary, anchor: 'middle', fontWeight: '600' }));

      // Loop arrow back to Think
      parts.push(C.path(`M${rightX + 75},${328} L${rightX + 55},${328} Q${rightX + 45},${328} ${rightX + 45},${318} L${rightX + 45},${198} Q${rightX + 45},${185} ${rightX + 60},${185} L${rightX + 70},${198}`, { stroke: colors.textLight, strokeWidth: 1.5, fill: 'none' }));
      parts.push(C.text(rightX + 30, 260, 'loop', { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));

      // Tools on the right side
      parts.push(C.rect(rightX + 210, 180, 110, 140, { fill: colors.surface, stroke: colors.border, rx: 8 }));
      parts.push(C.text(rightX + 265, 198, 'Tools', { fontSize: 12, fill: colors.text, anchor: 'middle', fontWeight: '600' }));
      const rTools = ['Search', 'Code', 'APIs', 'Files'];
      for (let i = 0; i < rTools.length; i++) {
        parts.push(C.rect(rightX + 220, 210 + i * 25, 90, 20, { fill: colors.accentLight, rx: 4, stroke: 'none' }));
        parts.push(C.text(rightX + 265, 220 + i * 25, rTools[i], { fontSize: 10, fill: colors.accent, anchor: 'middle' }));
      }

      // Arrow from Act to Tools
      parts.push(C.line(rightX + 190, 263, rightX + 205, 263, { stroke: colors.accent, strokeWidth: 1.5, strokeDasharray: '3,2' }));

      // Summary
      parts.push(C.rect(rightX + 30, 360, rightW - 60, 45, { fill: colors.secondaryLight, rx: 8, stroke: 'none' }));
      parts.push(C.text(rightX + rightW / 2, 380, 'Goal -> Plan -> Execute -> Adapt', { fontSize: 13, fill: colors.secondary, anchor: 'middle', fontWeight: '600' }));
      parts.push(C.text(rightX + rightW / 2, 398, 'Multi-step with tools and memory', { fontSize: 11, fill: colors.textLight, anchor: 'middle' }));

      return parts.join('\n');
    }
  },
];
