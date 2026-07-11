import { colors, fonts } from './design-system.mjs';

// ─── XML 转义工具 ────────────────────────────────────

/**
 * 转义 XML 特殊字符，防止 SVG 解析错误
 */
export function escapeXml(str) {
  if (typeof str !== 'string') return String(str);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// ─── 基础图形 ────────────────────────────────────────

/**
 * 圆角矩形
 * opts: { fill, stroke, rx, opacity, shadow, strokeWidth }
 */
export function rect(x, y, w, h, opts = {}) {
  const {
    fill = colors.surface,
    stroke = 'none',
    rx = 8,
    opacity = 1,
    shadow = false,
    strokeWidth = 1.5,
  } = opts;
  const filter = shadow ? ' filter="url(#shadow)"' : '';
  const opacityAttr = opacity < 1 ? ` opacity="${opacity}"` : '';
  const strokeAttr = stroke !== 'none' ? ` stroke="${stroke}" stroke-width="${strokeWidth}"` : '';
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${strokeAttr}${opacityAttr}${filter}/>`;
}

/**
 * 圆形
 * opts: { fill, stroke, opacity, strokeWidth }
 */
export function circle(cx, cy, r, opts = {}) {
  const {
    fill = colors.primary,
    stroke = 'none',
    opacity = 1,
    strokeWidth = 1.5,
  } = opts;
  const opacityAttr = opacity < 1 ? ` opacity="${opacity}"` : '';
  const strokeAttr = stroke !== 'none' ? ` stroke="${stroke}" stroke-width="${strokeWidth}"` : '';
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"${strokeAttr}${opacityAttr}/>`;
}

/**
 * 文本标签
 * opts: { fontSize, fill, anchor, fontWeight, fontFamily, dy }
 */
export function text(x, y, content, opts = {}) {
  const {
    fontSize = 14,
    fill = colors.text,
    anchor = 'start',
    fontWeight = 'normal',
    fontFamily = fonts.primary,
    dy = '0.35em',
  } = opts;
  return `<text x="${x}" y="${y}" font-size="${fontSize}" fill="${fill}" text-anchor="${anchor}" font-weight="${fontWeight}" font-family="${fontFamily}" dy="${dy}">${escapeXml(content)}</text>`;
}

/**
 * 带箭头的线段
 * opts: { stroke, strokeWidth, markerEnd, curved }
 */
export function arrow(x1, y1, x2, y2, opts = {}) {
  const {
    stroke = colors.text,
    strokeWidth = 1.5,
    markerEnd = 'url(#arrowhead)',
    curved = false,
  } = opts;
  if (curved) {
    const mx = (x1 + x2) / 2;
    const my = Math.min(y1, y2) - 30;
    return `<path d="M${x1},${y1} Q${mx},${my} ${x2},${y2}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" marker-end="${markerEnd}"/>`;
  }
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}" marker-end="${markerEnd}"/>`;
}

/**
 * 直线
 * opts: { stroke, strokeWidth, strokeDasharray }
 */
export function line(x1, y1, x2, y2, opts = {}) {
  const {
    stroke = colors.border,
    strokeWidth = 1.5,
    strokeDasharray = '',
  } = opts;
  const dashAttr = strokeDasharray ? ` stroke-dasharray="${strokeDasharray}"` : '';
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}"${dashAttr}/>`;
}

/**
 * 折线
 * opts: { stroke, strokeWidth, fill, markerEnd }
 */
export function polyline(points, opts = {}) {
  const {
    stroke = colors.text,
    strokeWidth = 1.5,
    fill = 'none',
    markerEnd = '',
  } = opts;
  const pts = Array.isArray(points) ? points.map(p => p.join(',')).join(' ') : points;
  const markerAttr = markerEnd ? ` marker-end="${markerEnd}"` : '';
  return `<polyline points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"${markerAttr}/>`;
}

/**
 * 自定义路径
 * opts: { fill, stroke, strokeWidth, opacity }
 */
export function path(d, opts = {}) {
  const {
    fill = 'none',
    stroke = colors.text,
    strokeWidth = 1.5,
    opacity = 1,
  } = opts;
  const opacityAttr = opacity < 1 ? ` opacity="${opacity}"` : '';
  return `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"${opacityAttr}/>`;
}

// ─── 结构组件 ────────────────────────────────────────

/**
 * 分组容器
 * opts: { transform, opacity, id }
 */
export function group(children, opts = {}) {
  const { transform = '', opacity = 1, id = '' } = opts;
  const attrs = [];
  if (transform) attrs.push(`transform="${transform}"`);
  if (opacity < 1) attrs.push(`opacity="${opacity}"`);
  if (id) attrs.push(`id="${id}"`);
  const attrStr = attrs.length ? ' ' + attrs.join(' ') : '';
  const content = Array.isArray(children) ? children.join('\n') : children;
  return `<g${attrStr}>\n${content}\n</g>`;
}

/**
 * SVG defs 区域
 */
export function defs(content) {
  const inner = Array.isArray(content) ? content.join('\n') : content;
  return `<defs>\n${inner}\n</defs>`;
}

/**
 * 线性渐变定义
 * stops: [{ offset, color, opacity }]
 */
export function linearGradient(id, stops, opts = {}) {
  const { x1 = '0%', y1 = '0%', x2 = '0%', y2 = '100%' } = opts;
  const stopsStr = stops.map(s => {
    const op = s.opacity != null ? ` stop-opacity="${s.opacity}"` : '';
    return `  <stop offset="${s.offset}" stop-color="${s.color}"${op}/>`;
  }).join('\n');
  return `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">\n${stopsStr}\n</linearGradient>`;
}

// ─── 图标 ────────────────────────────────────────────

const iconPaths = {
  brain: 'M12 2C8.5 2 6 4.5 6 7.5c0 1.5.5 2.8 1.4 3.8C6.5 12.5 6 14 6 15.5 6 18.5 8.5 21 12 21s6-2.5 6-6.5c0-1.5-.5-3-1.4-4C17.5 9.3 18 8 18 6.5 18 4.5 15.5 2 12 2zm0 2c1.5 0 3 .8 3.5 2-.5.2-1 .5-1.5.8-.5-.5-1.2-.8-2-.8s-1.5.3-2 .8c-.5-.3-1-.6-1.5-.8C9 4.8 10.5 4 12 4z',
  robot: 'M12 2a2 2 0 012 2v1h3a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h3V4a2 2 0 012-2zm-2 9a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm4 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-2 5c-1.5 0-2.5-.5-3-1h6c-.5.5-1.5 1-3 1z',
  lightbulb: 'M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-1 17h2v1h-2v-1zm0 2h2v1h-2v-1z',
  book: 'M4 4a2 2 0 012-2h8a2 2 0 012 2v16l-6-3-6 3V4z',
  data: 'M12 2C8 2 4 3.5 4 5.5v13C4 20.5 8 22 12 22s8-1.5 8-3.5v-13C20 3.5 16 2 12 2zm0 2c4 0 6 1.2 6 1.5S16 7 12 7 6 5.8 6 5.5 8 4 12 4zM6 8c1.5 1 3.5 1.5 6 1.5S16.5 9 18 8v3.5c0 .3-2 1.5-6 1.5s-6-1.2-6-1.5V8zm0 6c1.5 1 3.5 1.5 6 1.5s4.5-.5 6-1.5v3.5c0 .3-2 1.5-6 1.5s-6-1.2-6-1.5V14z',
  network: 'M12 2a3 3 0 00-3 3c0 1.1.6 2 1.5 2.6L9 10H6a3 3 0 100 6h1.5l1.5 2.4A3 3 0 0012 22a3 3 0 002.5-4.6L16 15h1a3 3 0 100-6h-2l-1.5-2.4A3 3 0 0012 2z',
  'arrow-right': 'M5 12h14m-7-7l7 7-7 7',
  check: 'M5 12l5 5L20 7',
  gear: 'M12 8a4 4 0 100 8 4 4 0 000-8zm0-6l1.5 2.4a7 7 0 013.1 1.8L19 5l1 3.5-2.3 1.2a7 7 0 010 3.6L20 14.5 19 18l-2.4-1.2a7 7 0 01-3.1 1.8L12 21l-1.5-2.4a7 7 0 01-3.1-1.8L5 18l-1-3.5 2.3-1.2a7 7 0 010-3.6L4 8.5 5 5l2.4 1.2a7 7 0 013.1-1.8L12 2z',
  code: 'M8 6l-6 6 6 6m8-12l6 6-6 6m-4-14l-2 16',
  chat: 'M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2z',
  layers: 'M12 2L2 7l10 5 10-5L12 2zm0 7l-10 5 10 5 10-5-10-5zm0 7l-10 5 10 5 10-5-10-5z',
  cpu: 'M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm3 5h6v6H9V9zm-5 2h2m14 0h2M11 2v2m0 16v2m4-20v2m0 16v2M7 2v2m0 16v2',
};

/**
 * 常用图标
 * type: brain, robot, lightbulb, book, data, network, arrow-right, check, gear, code, chat, layers, cpu
 */
export function icon(type, x, y, size = 24) {
  const d = iconPaths[type];
  if (!d) return '';
  const scale = size / 24;
  return group(
    path(d, { fill: colors.primary, stroke: 'none', strokeWidth: 0 }),
    { transform: `translate(${x}, ${y}) scale(${scale})` }
  );
}

// ─── 复合组件 ────────────────────────────────────────

/**
 * 带背景色的标签徽章
 */
export function badge(x, y, label, color = colors.primary) {
  const padding = 12;
  const w = label.length * 8 + padding * 2;
  const h = 26;
  return group([
    rect(x, y, w, h, { fill: color, rx: 13, opacity: 0.15 }),
    text(x + w / 2, y + h / 2, label, { fontSize: 12, fill: color, anchor: 'middle', fontWeight: '600' }),
  ]);
}

/**
 * 连接两个点
 * opts: { type: 'straight'|'curve'|'elbow', stroke, strokeWidth, markerEnd }
 */
export function connector(from, to, opts = {}) {
  const {
    type = 'straight',
    stroke = colors.border,
    strokeWidth = 1.5,
    markerEnd = '',
  } = opts;
  const markerAttr = markerEnd ? ` marker-end="${markerEnd}"` : '';
  if (type === 'curve') {
    const mx = (from[0] + to[0]) / 2;
    const my = (from[1] + to[1]) / 2 - 30;
    return `<path d="M${from[0]},${from[1]} Q${mx},${my} ${to[0]},${to[1]}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}"${markerAttr}/>`;
  }
  if (type === 'elbow') {
    const mx = to[0];
    const my = from[1];
    return `<polyline points="${from[0]},${from[1]} ${mx},${my} ${to[0]},${to[1]}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}"${markerAttr}/>`;
  }
  return `<line x1="${from[0]}" y1="${from[1]}" x2="${to[0]}" y2="${to[1]}" stroke="${stroke}" stroke-width="${strokeWidth}"${markerAttr}/>`;
}

/**
 * 带标题的卡片面板
 * opts: { fill, stroke, headerFill, rx, shadow }
 */
export function card(x, y, w, h, title, content = '', opts = {}) {
  const {
    fill = colors.surface,
    stroke = colors.border,
    headerFill = colors.primaryLight,
    rx = 12,
    shadow = true,
  } = opts;
  const headerH = 36;
  const parts = [
    rect(x, y, w, h, { fill, stroke, rx, shadow }),
    rect(x, y, w, headerH, { fill: headerFill, rx, stroke: 'none' }),
    // Clip bottom corners of header
    rect(x, y + headerH - rx, w, rx, { fill: headerFill, rx: 0, stroke: 'none' }),
    text(x + 16, y + headerH / 2, title, { fontSize: 13, fontWeight: '600', fill: colors.text }),
  ];
  if (content) {
    parts.push(text(x + 16, y + headerH + 20, content, { fontSize: 12, fill: colors.textLight }));
  }
  return group(parts);
}

/**
 * 金字塔/层次结构
 * levels: [{ label, color }] - 从上到下
 * opts: { gap }
 */
export function pyramid(x, y, w, h, levels, opts = {}) {
  const { gap = 4 } = opts;
  const n = levels.length;
  const layerH = (h - gap * (n - 1)) / n;
  const parts = [];
  for (let i = 0; i < n; i++) {
    const topWidth = w * (0.3 + 0.7 * (i / (n - 1 || 1)));
    const lx = x + (w - topWidth) / 2;
    const ly = y + i * (layerH + gap);
    const fill = levels[i].color || colors.primary;
    parts.push(rect(lx, ly, topWidth, layerH, { fill, rx: 6, opacity: 0.85 }));
    parts.push(text(x + w / 2, ly + layerH / 2, levels[i].label, {
      fontSize: 13, fill: colors.surface, anchor: 'middle', fontWeight: '600'
    }));
  }
  return group(parts);
}

/**
 * 水平时间线
 * nodes: [{ label, sublabel?, color? }]
 * opts: { gap, nodeRadius }
 */
export function timeline(x, y, w, nodes, opts = {}) {
  const { nodeRadius = 8 } = opts;
  const n = nodes.length;
  const step = w / (n - 1 || 1);
  const parts = [
    line(x, y, x + w, y, { stroke: colors.border, strokeWidth: 2 }),
  ];
  for (let i = 0; i < n; i++) {
    const cx = x + i * step;
    const col = nodes[i].color || colors.primary;
    parts.push(circle(cx, y, nodeRadius, { fill: col }));
    parts.push(text(cx, y + 24, nodes[i].label, { fontSize: 12, fill: colors.text, anchor: 'middle' }));
    if (nodes[i].sublabel) {
      parts.push(text(cx, y + 40, nodes[i].sublabel, { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));
    }
  }
  return group(parts);
}

/**
 * 水平流程行（元素+箭头）
 * items: [{ label, icon?, color? }]
 * opts: { boxW, boxH, gap }
 */
export function flowRow(x, y, items, opts = {}) {
  const { boxW = 120, boxH = 50, gap = 60 } = opts;
  const parts = [];
  for (let i = 0; i < items.length; i++) {
    const bx = x + i * (boxW + gap);
    const col = items[i].color || colors.primaryLight;
    const borderCol = items[i].color || colors.primary;
    parts.push(rect(bx, y, boxW, boxH, { fill: col, stroke: borderCol, rx: 8, opacity: 0.3 }));
    parts.push(rect(bx, y, boxW, boxH, { fill: 'none', stroke: borderCol, rx: 8 }));
    parts.push(text(bx + boxW / 2, y + boxH / 2, items[i].label, {
      fontSize: 13, fill: colors.text, anchor: 'middle', fontWeight: '500'
    }));
    if (items[i].icon) {
      parts.push(icon(items[i].icon, bx + 8, y + boxH / 2 - 10, 20));
    }
    // Arrow between items
    if (i < items.length - 1) {
      const ax1 = bx + boxW + 8;
      const ax2 = bx + boxW + gap - 8;
      parts.push(arrow(ax1, y + boxH / 2, ax2, y + boxH / 2, { stroke: colors.textLight }));
    }
  }
  return group(parts);
}

/**
 * 节点-边网络图
 * nodes: [{ id, x, y, label, color?, radius? }]
 * edges: [{ from, to, label? }]
 * opts: { nodeRadius }
 */
export function nodeGraph(nodes, edges, opts = {}) {
  const { nodeRadius = 24 } = opts;
  const parts = [];
  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  // Draw edges first
  edges.forEach(e => {
    const fromNode = nodeMap[e.from];
    const toNode = nodeMap[e.to];
    if (fromNode && toNode) {
      parts.push(connector([fromNode.x, fromNode.y], [toNode.x, toNode.y], {
        stroke: colors.border, strokeWidth: 1.5, markerEnd: 'url(#arrowhead)'
      }));
      if (e.label) {
        const mx = (fromNode.x + toNode.x) / 2;
        const my = (fromNode.y + toNode.y) / 2 - 10;
        parts.push(text(mx, my, e.label, { fontSize: 10, fill: colors.textLight, anchor: 'middle' }));
      }
    }
  });

  // Draw nodes
  nodes.forEach(n => {
    const r = n.radius || nodeRadius;
    const col = n.color || colors.primary;
    parts.push(circle(n.x, n.y, r, { fill: col, opacity: 0.15 }));
    parts.push(circle(n.x, n.y, r, { fill: 'none', stroke: col, strokeWidth: 2 }));
    parts.push(text(n.x, n.y, n.label, { fontSize: 11, fill: colors.text, anchor: 'middle' }));
  });

  return group(parts);
}

// ─── 默认 Defs（箭头 marker + 阴影 filter）──────────

export function defaultDefs() {
  return defs([
    `<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
  <polygon points="0 0, 10 3.5, 0 7" fill="${colors.text}"/>
</marker>`,
    `<filter id="shadow" x="-4%" y="-4%" width="108%" height="108%">
  <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.08"/>
</filter>`,
  ]);
}
