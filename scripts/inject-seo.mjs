/**
 * Post-build script: inject SEO meta tags, generate sitemap.xml and robots.txt.
 *
 * Usage: node scripts/inject-seo.mjs
 */

import { readdir, readFile, writeFile, stat, copyFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const BOOK_DIR = join(process.cwd(), '_book');
const LANGS = ['zh', 'en'];
const SITE_URL = 'https://ai-4-every.one';
const SITE_NAME = '入门AI - 零基础学人工智能';

const DEFAULT_DESC_ZH = '零基础学AI，图解人工智能入门教程。从AI是什么到ChatGPT原理，轻松看懂人工智能。';
const DEFAULT_DESC_EN = 'Learn AI from scratch. A visual guide to artificial intelligence fundamentals, from what AI is to how ChatGPT works.';

const KEYWORDS_ZH = 'AI入门,人工智能,机器学习,深度学习,神经网络,Transformer,大模型,ChatGPT,AI科普,零基础学AI';
const KEYWORDS_EN = 'AI basics,artificial intelligence,machine learning,deep learning,neural networks,Transformer,LLM,ChatGPT,AI tutorial,beginner AI';

const INDEX_TITLE = '入门AI - 零基础学人工智能 | AI for Everyone';
const INDEX_DESC = '免费AI入门教程，24篇图文带你零基础看懂人工智能。涵盖机器学习、神经网络、Transformer、ChatGPT原理等核心知识。中英文双语。';

const FAVICON_SNIPPET = '\n<!-- Favicon -->\n<link rel="icon" type="image/jpeg" href="/icon.jpg">\n';

/**
 * Recursively collect all .html files under a directory.
 */
async function collectHtmlFiles(dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await collectHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Extract text content from <title> tag.
 */
function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? match[1].trim() : '';
}

/**
 * Extract first ~150 characters of plain text from the main content section.
 */
function extractDescription(html, lang) {
  // Try to extract from the main content section (Honkit uses <section class="normal markdown-section">)
  let contentMatch = html.match(/<section[^>]*class="[^"]*markdown-section[^"]*"[^>]*>([\s\S]*?)<\/section>/i);
  if (!contentMatch) {
    // Fallback to body
    contentMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  }
  if (!contentMatch) return lang === 'zh' ? DEFAULT_DESC_ZH : DEFAULT_DESC_EN;

  // Remove script/style tags and their content
  let text = contentMatch[1]
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')         // strip HTML tags
    .replace(/\s+/g, ' ')           // collapse whitespace
    .trim();

  if (text.length < 20) {
    return lang === 'zh' ? DEFAULT_DESC_ZH : DEFAULT_DESC_EN;
  }

  // Take first 150 characters
  if (text.length > 150) {
    text = text.slice(0, 150).replace(/\s+\S*$/, '') + '…';
  }

  return text;
}

/**
 * Escape HTML special characters for attribute values.
 */
function escAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Build SEO snippet for a language page.
 */
function buildSeoSnippet({ title, description, lang, urlPath, relPath }) {
  const locale = lang === 'zh' ? 'zh_CN' : 'en_US';
  const altLocale = lang === 'zh' ? 'en_US' : 'zh_CN';
  const otherLang = lang === 'zh' ? 'en' : 'zh';
  const keywords = lang === 'zh' ? KEYWORDS_ZH : KEYWORDS_EN;

  const altPath = relPath; // same relative path under the other lang
  const canonicalUrl = `${SITE_URL}/${urlPath}`;
  const zhUrl = `${SITE_URL}/zh/${altPath}`;
  const enUrl = `${SITE_URL}/en/${altPath}`;

  const safeTitle = escAttr(title);
  const safeDesc = escAttr(description);

  return `
<!-- SEO Meta -->
<meta name="description" content="${safeDesc}">
<meta name="keywords" content="${keywords}">

<!-- Open Graph -->
<meta property="og:title" content="${safeTitle}">
<meta property="og:description" content="${safeDesc}">
<meta property="og:type" content="article">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:site_name" content="${escAttr(SITE_NAME)}">
<meta property="og:locale" content="${locale}">
<meta property="og:locale:alternate" content="${altLocale}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${safeTitle}">
<meta name="twitter:description" content="${safeDesc}">

<!-- Canonical & Hreflang -->
<link rel="canonical" href="${canonicalUrl}">
<link rel="alternate" hreflang="zh" href="${zhUrl}">
<link rel="alternate" hreflang="en" href="${enUrl}">

<!-- Structured Data -->
<script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  author: { '@type': 'Organization', name: '入门AI' },
  publisher: { '@type': 'Organization', name: '入门AI' },
  url: canonicalUrl,
  inLanguage: lang
}, null, 2)}
</script>
`;
}

/**
 * Build SEO snippet for the root index page (language selector).
 */
function buildIndexSeoSnippet() {
  const safeTitle = escAttr(INDEX_TITLE);
  const safeDesc = escAttr(INDEX_DESC);

  return `
<!-- SEO Meta -->
<meta name="description" content="${safeDesc}">
<meta name="keywords" content="${KEYWORDS_ZH}">

<!-- Open Graph -->
<meta property="og:title" content="${safeTitle}">
<meta property="og:description" content="${safeDesc}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE_URL}/">
<meta property="og:site_name" content="${escAttr(SITE_NAME)}">
<meta property="og:locale" content="zh_CN">
<meta property="og:locale:alternate" content="en_US">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${safeTitle}">
<meta name="twitter:description" content="${safeDesc}">

<!-- Canonical & Hreflang -->
<link rel="canonical" href="${SITE_URL}/">
<link rel="alternate" hreflang="zh" href="${SITE_URL}/zh/">
<link rel="alternate" hreflang="en" href="${SITE_URL}/en/">
<link rel="alternate" hreflang="x-default" href="${SITE_URL}/">

<!-- Structured Data -->
<script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '入门AI - 零基础学人工智能',
  alternateName: 'AI for Everyone',
  url: SITE_URL + '/',
  inLanguage: ['zh', 'en'],
  description: INDEX_DESC
}, null, 2)}
</script>
`;
}

/**
 * Generate robots.txt in _book/.
 */
async function generateRobotsTxt() {
  const content = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  await writeFile(join(BOOK_DIR, 'robots.txt'), content, 'utf-8');
  console.log('✓ Generated robots.txt');
}

/**
 * Generate sitemap.xml from collected file paths.
 */
async function generateSitemap(allFiles) {
  const today = new Date().toISOString().split('T')[0];

  let urls = '';

  // Root index
  urls += `  <url>
    <loc>${SITE_URL}/</loc>
    <xhtml:link rel="alternate" hreflang="zh" href="${SITE_URL}/zh/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>\n`;

  // Collect unique relative paths across languages
  const pathSet = new Map(); // relPath -> { zh: bool, en: bool }

  for (const { lang, filePath } of allFiles) {
    const langRoot = join(BOOK_DIR, lang);
    const relPath = relative(langRoot, filePath).split(sep).join('/');
    if (!pathSet.has(relPath)) {
      pathSet.set(relPath, { zh: false, en: false });
    }
    pathSet.get(relPath)[lang] = true;
  }

  for (const [relPath, langs] of pathSet) {
    const isIndex = relPath === 'index.html' || relPath.endsWith('/index.html');
    const priority = isIndex ? '0.9' : '0.8';

    // Use zh version as primary loc if exists, else en
    const primaryLang = langs.zh ? 'zh' : 'en';
    const loc = `${SITE_URL}/${primaryLang}/${relPath}`;

    urls += `  <url>\n    <loc>${loc}</loc>\n`;
    if (langs.zh) {
      urls += `    <xhtml:link rel="alternate" hreflang="zh" href="${SITE_URL}/zh/${relPath}"/>\n`;
    }
    if (langs.en) {
      urls += `    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/${relPath}"/>\n`;
    }
    urls += `    <lastmod>${today}</lastmod>\n`;
    urls += `    <changefreq>monthly</changefreq>\n`;
    urls += `    <priority>${priority}</priority>\n`;
    urls += `  </url>\n`;
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}</urlset>
`;

  await writeFile(join(BOOK_DIR, 'sitemap.xml'), sitemap, 'utf-8');
  console.log('✓ Generated sitemap.xml');
}

async function main() {
  let injectedCount = 0;
  const allFiles = []; // { lang, filePath }

  // Process language directories
  for (const lang of LANGS) {
    const langDir = join(BOOK_DIR, lang);
    let files;
    try {
      files = await collectHtmlFiles(langDir);
    } catch (e) {
      console.warn(`Warning: could not read ${langDir}: ${e.message}`);
      continue;
    }

    for (const filePath of files) {
      allFiles.push({ lang, filePath });

      let html = await readFile(filePath, 'utf-8');

      // Remove HonKit default favicon to avoid conflict
      html = html.replace(/<link[^>]*rel="shortcut icon"[^>]*favicon\.ico[^>]*>/gi, '');

      // Skip if already injected
      if (html.includes('<!-- SEO Meta -->')) {
        // Still inject favicon if missing
        if (!html.includes('<!-- Favicon -->')) {
          const headCloseIdx = html.indexOf('</head>');
          if (headCloseIdx !== -1) {
            html = html.slice(0, headCloseIdx) + FAVICON_SNIPPET + html.slice(headCloseIdx);
            await writeFile(filePath, html, 'utf-8');
          }
        }
        continue;
      }

      const title = extractTitle(html);
      const description = extractDescription(html, lang);

      const langRoot = join(BOOK_DIR, lang);
      const relPath = relative(langRoot, filePath).split(sep).join('/');
      const urlPath = `${lang}/${relPath}`;

      const snippet = buildSeoSnippet({ title, description, lang, urlPath, relPath });

      // Inject before </head>
      const headCloseIdx = html.indexOf('</head>');
      if (headCloseIdx === -1) {
        console.warn(`Warning: no </head> found in ${filePath}, skipping.`);
        continue;
      }

      html = html.slice(0, headCloseIdx) + FAVICON_SNIPPET + snippet + html.slice(headCloseIdx);
      await writeFile(filePath, html, 'utf-8');
      injectedCount++;
    }
  }

  // Process root index.html
  const indexPath = join(BOOK_DIR, 'index.html');
  try {
    let indexHtml = await readFile(indexPath, 'utf-8');
    // Remove HonKit default favicon
    indexHtml = indexHtml.replace(/<link[^>]*rel="shortcut icon"[^>]*favicon\.ico[^>]*>/gi, '');
    if (!indexHtml.includes('<!-- SEO Meta -->')) {
      const snippet = buildIndexSeoSnippet();
      const headCloseIdx = indexHtml.indexOf('</head>');
      if (headCloseIdx !== -1) {
        indexHtml = indexHtml.slice(0, headCloseIdx) + FAVICON_SNIPPET + snippet + indexHtml.slice(headCloseIdx);
        await writeFile(indexPath, indexHtml, 'utf-8');
        injectedCount++;
        console.log('✓ Injected SEO into root index.html');
      }
    } else if (!indexHtml.includes('<!-- Favicon -->')) {
      const headCloseIdx = indexHtml.indexOf('</head>');
      if (headCloseIdx !== -1) {
        indexHtml = indexHtml.slice(0, headCloseIdx) + FAVICON_SNIPPET + indexHtml.slice(headCloseIdx);
        await writeFile(indexPath, indexHtml, 'utf-8');
        console.log('✓ Injected favicon into root index.html');
      }
    }
  } catch (e) {
    console.warn(`Warning: could not process root index.html: ${e.message}`);
  }

  // Generate robots.txt and sitemap.xml
  await generateRobotsTxt();
  await generateSitemap(allFiles);

  // Copy icon.jpg to _book/ (ensure it's available even if HonKit didn't copy it)
  try {
    const srcFavicon = join(process.cwd(), 'icon.jpg');
    const destFavicon = join(BOOK_DIR, 'icon.jpg');
    await copyFile(srcFavicon, destFavicon);
    console.log('✓ Copied icon.jpg to _book/');
  } catch (e) {
    console.warn(`Warning: could not copy icon.jpg: ${e.message}`);
  }

  console.log(`✓ SEO tags injected into ${injectedCount} HTML files.`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
