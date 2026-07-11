/**
 * Post-build script: inject language switcher into all HTML pages
 * under _book/zh/ and _book/en/.
 *
 * Usage: node scripts/inject-lang-switcher.mjs
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, dirname, sep } from 'node:path';

const BOOK_DIR = join(process.cwd(), '_book');
const LANGS = ['zh', 'en'];

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
 * Build the language switcher HTML snippet for a given file.
 * @param {string} filePath - absolute path to the current HTML file
 * @param {string} currentLang - 'zh' or 'en'
 */
function buildSwitcher(filePath, currentLang) {
  const otherLang = currentLang === 'zh' ? 'en' : 'zh';

  // Relative path from the language root, e.g. "01-what-is-ai/01-what-is-ai.html"
  const langRoot = join(BOOK_DIR, currentLang);
  const relFromLangRoot = relative(langRoot, filePath).split(sep).join('/');

  // Compute relative path from current file to the other language file
  const currentDir = dirname(filePath);
  const targetFile = join(BOOK_DIR, otherLang, relFromLangRoot);
  let relToTarget = relative(currentDir, targetFile).split(sep).join('/');
  // Ensure it starts with . or ..
  if (!relToTarget.startsWith('.')) {
    relToTarget = './' + relToTarget;
  }

  const zhLabel = '中文';
  const enLabel = 'English';

  let zhPart, enPart;

  if (currentLang === 'zh') {
    // Chinese is current (bold, not clickable)
    zhPart = `<span style="font-weight:600;color:#1a202c;padding:2px 6px;">${zhLabel}</span>`;
    enPart = `<a href="${relToTarget}" style="color:#2E7BF6;text-decoration:none;padding:2px 6px;">${enLabel}</a>`;
  } else {
    // English is current (bold, not clickable)
    zhPart = `<a href="${relToTarget}" style="color:#2E7BF6;text-decoration:none;padding:2px 6px;">${zhLabel}</a>`;
    enPart = `<span style="font-weight:600;color:#1a202c;padding:2px 6px;">${enLabel}</span>`;
  }

  return `\n<!-- lang-switcher -->\n<div style="position:fixed;top:10px;right:10px;z-index:9999;background:rgba(255,255,255,0.95);border:1px solid #e2e8f0;border-radius:6px;padding:4px 8px;font-size:13px;box-shadow:0 2px 8px rgba(0,0,0,0.1);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">\n  ${zhPart}\n  <span style="color:#ccc;">|</span>\n  ${enPart}\n</div>\n`;
}

async function main() {
  let injectedCount = 0;

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
      let html = await readFile(filePath, 'utf-8');

      // Skip if already injected
      if (html.includes('<!-- lang-switcher -->')) {
        continue;
      }

      const snippet = buildSwitcher(filePath, lang);

      // Inject before </body>
      const bodyCloseIdx = html.lastIndexOf('</body>');
      if (bodyCloseIdx === -1) {
        console.warn(`Warning: no </body> found in ${filePath}, skipping.`);
        continue;
      }

      html = html.slice(0, bodyCloseIdx) + snippet + html.slice(bodyCloseIdx);
      await writeFile(filePath, html, 'utf-8');
      injectedCount++;
    }
  }

  console.log(`✓ Language switcher injected into ${injectedCount} HTML files.`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
