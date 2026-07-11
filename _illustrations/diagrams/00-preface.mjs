import { colors, fonts, viewBoxes } from '../design-system.mjs';
import * as C from '../components.mjs';

export const diagrams = [
  {
    filename: 'preface-friendly-intro',
    viewBox: viewBoxes.wide,
    render() {
      return [
        // 背景
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),

        // 装饰性背景圆
        C.circle(650, 100, 180, { fill: colors.primaryLight, opacity: 0.4 }),
        C.circle(150, 380, 120, { fill: colors.secondaryLight, opacity: 0.3 }),

        // 标题
        C.text(400, 40, 'AI for Everyone', {
          fontSize: 28, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),
        C.text(400, 68, 'A Friendly Introduction', {
          fontSize: 14, fill: colors.textLight, anchor: 'middle'
        }),

        // ─── 人物（简洁几何风格：坐在沙发上看书）─────

        // 沙发 - 简洁的圆角矩形
        C.rect(120, 280, 240, 90, { fill: colors.secondary, rx: 20, opacity: 0.2 }),
        C.rect(120, 280, 240, 70, { fill: colors.secondary, rx: 16, opacity: 0.15 }),
        // 沙发靠背
        C.rect(130, 240, 220, 55, { fill: colors.secondary, rx: 14, opacity: 0.25 }),
        // 沙发扶手
        C.rect(110, 260, 30, 80, { fill: colors.secondary, rx: 12, opacity: 0.3 }),
        C.rect(340, 260, 30, 80, { fill: colors.secondary, rx: 12, opacity: 0.3 }),

        // 人物身体 - 坐姿
        C.circle(240, 210, 28, { fill: colors.accentLight, stroke: colors.accent, strokeWidth: 2 }), // 头
        C.rect(215, 245, 50, 60, { fill: colors.primaryLight, stroke: colors.primary, rx: 10 }), // 身体
        // 手臂（持书）
        C.path('M220,270 Q200,290 210,310', { stroke: colors.primary, strokeWidth: 2, fill: 'none' }),
        C.path('M260,270 Q280,290 275,310', { stroke: colors.primary, strokeWidth: 2, fill: 'none' }),

        // 书本
        C.rect(200, 300, 80, 55, { fill: colors.surface, stroke: colors.primary, rx: 4 }),
        C.line(240, 300, 240, 355, { stroke: colors.primary, strokeWidth: 1 }),
        // 书上的"文字"线条
        C.line(208, 315, 232, 315, { stroke: colors.border, strokeWidth: 1.5 }),
        C.line(208, 325, 228, 325, { stroke: colors.border, strokeWidth: 1.5 }),
        C.line(248, 315, 272, 315, { stroke: colors.border, strokeWidth: 1.5 }),
        C.line(248, 325, 268, 325, { stroke: colors.border, strokeWidth: 1.5 }),

        // 人物微笑
        C.path('M232,218 Q240,225 248,218', { stroke: colors.accent, strokeWidth: 1.5, fill: 'none' }),
        // 眼睛
        C.circle(232, 205, 3, { fill: colors.text }),
        C.circle(248, 205, 3, { fill: colors.text }),

        // ─── 从书中飘出的 AI 图标 ─────

        // 飘浮路径（虚线）
        C.path('M280,300 Q350,250 400,200', { stroke: colors.primary, strokeWidth: 1, fill: 'none' }),
        C.path('M280,310 Q380,280 480,180', { stroke: colors.secondary, strokeWidth: 1, fill: 'none' }),
        C.path('M275,295 Q340,220 520,210', { stroke: colors.accent, strokeWidth: 1, fill: 'none' }),

        // 图标 1：灯泡 - 创意/想法
        C.group([
          C.circle(420, 180, 32, { fill: colors.accentLight, opacity: 0.8 }),
          C.icon('lightbulb', 408, 168, 24),
        ]),

        // 图标 2：机器人 - AI
        C.group([
          C.circle(530, 200, 32, { fill: colors.primaryLight, opacity: 0.8 }),
          C.icon('robot', 518, 188, 24),
        ]),

        // 图标 3：大脑 - 智能
        C.group([
          C.circle(610, 150, 32, { fill: colors.secondaryLight, opacity: 0.8 }),
          C.icon('brain', 598, 138, 24),
        ]),

        // 图标 4：对话气泡 - 交流
        C.group([
          C.circle(500, 100, 28, { fill: colors.accentLight, opacity: 0.8 }),
          C.icon('chat', 488, 88, 24),
        ]),

        // 图标 5：代码 - 编程
        C.group([
          C.circle(680, 240, 28, { fill: colors.primaryLight, opacity: 0.7 }),
          C.icon('code', 668, 228, 24),
        ]),

        // ─── 底部装饰标签 ─────
        C.badge(280, 400, 'Easy to Learn', colors.secondary),
        C.badge(430, 400, 'No Math Required', colors.primary),
        C.badge(600, 400, 'Fun!', colors.accent),

        // 底部小装饰点
        C.circle(50, 120, 4, { fill: colors.primary, opacity: 0.3 }),
        C.circle(750, 350, 5, { fill: colors.secondary, opacity: 0.3 }),
        C.circle(700, 400, 3, { fill: colors.accent, opacity: 0.3 }),

      ].join('\n');
    }
  },

  // ─── preface-three-readers ─────────────────────────────
  {
    filename: 'preface-three-readers',
    viewBox: viewBoxes.wide,
    render() {
      // Helper: simple person figure
      function person(cx, cy, headColor, bodyColor) {
        return [
          C.circle(cx, cy - 35, 22, { fill: headColor, opacity: 0.2 }),
          C.circle(cx, cy - 35, 22, { fill: 'none', stroke: headColor, strokeWidth: 2 }),
          // eyes
          C.circle(cx - 7, cy - 40, 2.5, { fill: colors.text }),
          C.circle(cx + 7, cy - 40, 2.5, { fill: colors.text }),
          // smile
          C.path(`M${cx - 6},${cy - 28} Q${cx},${cy - 22} ${cx + 6},${cy - 28}`, { stroke: colors.text, strokeWidth: 1.5, fill: 'none' }),
          // body
          C.rect(cx - 22, cy - 8, 44, 55, { fill: bodyColor, rx: 12, opacity: 0.2 }),
          C.rect(cx - 22, cy - 8, 44, 55, { fill: 'none', stroke: bodyColor, rx: 12, strokeWidth: 1.5 }),
        ].join('\n');
      }

      const y = 200;
      return [
        // Background
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),
        C.circle(100, 80, 100, { fill: colors.primaryLight, opacity: 0.3 }),
        C.circle(700, 380, 120, { fill: colors.secondaryLight, opacity: 0.3 }),

        // Title
        C.text(400, 45, 'Three Types of Readers', {
          fontSize: 26, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),

        // ─── Person 1: Curious Outsider ─────
        // Icon above: magnifying glass (question mark)
        C.circle(160, 120, 24, { fill: colors.accentLight, opacity: 0.8 }),
        C.text(160, 120, '?', { fontSize: 22, fill: colors.accent, anchor: 'middle', fontWeight: 'bold' }),
        person(160, y, colors.accent, colors.accent),
        C.text(160, y + 70, 'Outsider', { fontSize: 15, fill: colors.text, anchor: 'middle', fontWeight: '600' }),
        C.text(160, y + 90, 'Curious about AI', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),

        // ─── Person 2: Practitioner ─────
        C.circle(400, 120, 24, { fill: colors.primaryLight, opacity: 0.8 }),
        C.icon('gear', 388, 108, 24),
        person(400, y, colors.primary, colors.primary),
        // Laptop accessory
        C.rect(375, y + 10, 50, 32, { fill: colors.primaryLight, stroke: colors.primary, rx: 3 }),
        C.rect(370, y + 42, 60, 4, { fill: colors.primary, rx: 2, opacity: 0.5 }),
        C.text(400, y + 70, 'Practitioner', { fontSize: 15, fill: colors.text, anchor: 'middle', fontWeight: '600' }),
        C.text(400, y + 90, 'Apply AI at work', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),

        // ─── Person 3: Student ─────
        C.circle(640, 120, 24, { fill: colors.secondaryLight, opacity: 0.8 }),
        C.icon('book', 628, 108, 24),
        person(640, y, colors.secondary, colors.secondary),
        // Backpack strap hint
        C.path('M625,170 Q620,185 625,200', { stroke: colors.secondary, strokeWidth: 2, fill: 'none' }),
        C.path('M655,170 Q660,185 655,200', { stroke: colors.secondary, strokeWidth: 2, fill: 'none' }),
        C.text(640, y + 70, 'Student', { fontSize: 15, fill: colors.text, anchor: 'middle', fontWeight: '600' }),
        C.text(640, y + 90, 'Systematic learning', { fontSize: 12, fill: colors.textLight, anchor: 'middle' }),

        // Bottom connector line
        C.line(160, y + 110, 640, y + 110, { stroke: colors.border, strokeWidth: 1, strokeDasharray: '4,4' }),

        // Bottom tagline
        C.text(400, 420, 'This book is for everyone', {
          fontSize: 14, fill: colors.textLight, anchor: 'middle'
        }),
      ].join('\n');
    }
  },

  // ─── preface-roadmap ─────────────────────────────────
  {
    filename: 'preface-roadmap',
    viewBox: viewBoxes.wide,
    render() {
      const chapters = [
        { label: 'Preface', color: colors.accent },
        { label: 'AI Basics', color: colors.primary },
        { label: 'Machine Learning', color: colors.primary },
        { label: 'Neural Networks', color: colors.secondary },
        { label: 'Transformer', color: colors.secondary },
        { label: 'LLM Practice', color: colors.accent },
      ];

      const startX = 80, endX = 720;
      const step = (endX - startX) / (chapters.length - 1);
      // Winding path Y positions
      const yPositions = [320, 220, 310, 190, 280, 140];

      const parts = [
        // Background
        C.rect(0, 0, 800, 450, { fill: colors.background, rx: 0 }),

        // Title
        C.text(400, 40, 'Learning Roadmap', {
          fontSize: 26, fontWeight: 'bold', fill: colors.text, anchor: 'middle'
        }),
        C.text(400, 65, 'Your journey to understanding AI', {
          fontSize: 13, fill: colors.textLight, anchor: 'middle'
        }),

        // Mountain silhouette background
        C.path('M0,450 L100,380 L200,350 L300,300 L400,250 L500,200 L600,160 L700,120 L750,100 L800,130 L800,450 Z', {
          fill: colors.primary, opacity: 0.05, stroke: 'none', strokeWidth: 0
        }),
      ];

      // Draw winding path connecting nodes
      let pathD = `M${startX},${yPositions[0]}`;
      for (let i = 1; i < chapters.length; i++) {
        const x = startX + i * step;
        const prevX = startX + (i - 1) * step;
        const cpx = (prevX + x) / 2;
        pathD += ` Q${cpx},${(yPositions[i - 1] + yPositions[i]) / 2 - 20} ${x},${yPositions[i]}`;
      }
      parts.push(C.path(pathD, { stroke: colors.border, strokeWidth: 3, fill: 'none' }));

      // Draw chapter nodes
      for (let i = 0; i < chapters.length; i++) {
        const x = startX + i * step;
        const y = yPositions[i];
        const ch = chapters[i];
        // Node circle
        parts.push(C.circle(x, y, 20, { fill: ch.color, opacity: 0.15 }));
        parts.push(C.circle(x, y, 20, { fill: 'none', stroke: ch.color, strokeWidth: 2 }));
        parts.push(C.text(x, y, `${i + 1}`, { fontSize: 14, fill: ch.color, anchor: 'middle', fontWeight: 'bold' }));
        // Label below/above node
        const labelY = i % 2 === 0 ? y + 35 : y - 32;
        parts.push(C.text(x, labelY, ch.label, { fontSize: 13, fill: colors.text, anchor: 'middle', fontWeight: '500' }));
      }

      // Flag at the end
      const flagX = endX + 10, flagY = yPositions[5] - 45;
      parts.push(C.line(flagX, flagY, flagX, flagY + 40, { stroke: colors.accent, strokeWidth: 2 }));
      parts.push(C.path(`M${flagX},${flagY} L${flagX + 30},${flagY + 10} L${flagX},${flagY + 20} Z`, {
        fill: colors.accent, stroke: 'none', strokeWidth: 0
      }));
      parts.push(C.text(flagX + 15, flagY - 8, 'Understand AI!', {
        fontSize: 11, fill: colors.accent, anchor: 'middle', fontWeight: '600'
      }));

      // Decorative dots
      parts.push(C.circle(50, 100, 4, { fill: colors.primary, opacity: 0.3 }));
      parts.push(C.circle(760, 400, 5, { fill: colors.secondary, opacity: 0.3 }));

      // Footer
      parts.push(C.text(400, 430, 'From zero to AI literacy — step by step', {
        fontSize: 12, fill: colors.textLight, anchor: 'middle'
      }));

      return parts.join('\n');
    }
  },
];
