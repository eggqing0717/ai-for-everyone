/**
 * 批量生成书籍插画脚本
 * 使用阿里云百炼（DashScope）通义万相 API
 * Node.js v22+（使用内置 fetch，无需额外依赖）
 * 
 * 用法:
 *   node generate_images.mjs              # 使用英文提示词生成所有（跳过已存在）
 *   node generate_images.mjs --force      # 强制覆盖全部
 *   node generate_images.mjs --lang en    # 使用英文提示词（默认）
 *   node generate_images.mjs --lang zh    # 使用中文提示词
 *   node generate_images.mjs --start 1 --end 5        # 只生成第1-5张
 *   node generate_images.mjs --start 1 --end 1 --force  # 测试第1张
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync, cpSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ============ 配置 ============
const API_KEY = "sk-137471ae6bf04ed3a5ae2d43c5ec695b";
const SUBMIT_URL = "https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis";
const TASK_URL = "https://dashscope.aliyuncs.com/api/v1/tasks";
const MODEL = "wanx2.1-t2i-turbo";
const OUTPUT_DIR = join(__dirname, "zh", "assets", "images");
const EN_OUTPUT_DIR = join(__dirname, "en", "assets", "images");
const PROMPT_FILE_ZH = join(__dirname, "配图提示词清单.md");
const PROMPT_FILE_EN = join(__dirname, "illustration-prompts-en.md");
const DELAY_SECONDS = 3;       // 每次请求间隔
const POLL_INTERVAL = 5;       // 轮询任务状态间隔（秒）
const POLL_TIMEOUT = 300;      // 轮询超时（秒）
const MAX_RETRIES = 3;         // 失败重试次数

// 需要 1:1 比例的图片
const SQUARE_IMAGES = new Set(["ch18-attention-heatmap.png"]);

// ============ 解析命令行参数 ============
function parseArgs() {
    const args = process.argv.slice(2);
    const options = { start: 1, end: null, force: false, lang: 'en' };
    
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--force') {
            options.force = true;
        } else if (args[i] === '--start' && args[i + 1]) {
            options.start = parseInt(args[i + 1]);
            i++;
        } else if (args[i] === '--end' && args[i + 1]) {
            options.end = parseInt(args[i + 1]);
            i++;
        } else if (args[i] === '--model' && args[i + 1]) {
            options.model = args[i + 1];
            i++;
        } else if (args[i] === '--lang' && args[i + 1]) {
            options.lang = args[i + 1].toLowerCase();
            i++;
        }
    }
    return options;
}

/**
 * 从 Markdown 文件中解析所有图片的序号、文件名和提示词
 */
function parsePrompts(filepath) {
    const content = readFileSync(filepath, "utf-8");
    const pattern = /\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*([^|]+)\|\s*([^|]+)\|/g;
    const images = [];
    let match;

    while ((match = pattern.exec(content)) !== null) {
        images.push({
            seq: parseInt(match[1]),
            filename: match[2].trim(),
            alt: match[3].trim(),
            prompt: match[4].trim()
        });
    }

    return images;
}

/**
 * 提交图片生成任务（异步模式），返回 task_id
 */
async function submitTask(prompt, size = "1024*576", modelName = MODEL) {
    const payload = {
        model: modelName,
        input: {
            prompt: prompt
        },
        parameters: {
            size: size,
            n: 1
        }
    };

    const response = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            "X-DashScope-Async": "enable"
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`提交任务失败 [${response.status}]: ${JSON.stringify(data)}`);
    }

    if (data.output && data.output.task_id) {
        return data.output.task_id;
    }

    throw new Error(`提交任务响应格式异常: ${JSON.stringify(data)}`);
}

/**
 * 轮询任务状态直到完成，返回图片 URL
 */
async function pollTask(taskId) {
    const startTime = Date.now();

    while (true) {
        const elapsed = (Date.now() - startTime) / 1000;
        if (elapsed > POLL_TIMEOUT) {
            throw new Error(`任务超时（${POLL_TIMEOUT}秒）: ${taskId}`);
        }

        const response = await fetch(`${TASK_URL}/${taskId}`, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`查询任务失败 [${response.status}]: ${JSON.stringify(data)}`);
        }

        const status = data.output?.task_status;

        if (status === 'SUCCEEDED') {
            const results = data.output?.results;
            if (results && results.length > 0 && results[0].url) {
                return results[0].url;
            }
            throw new Error(`任务成功但无图片URL: ${JSON.stringify(data)}`);
        } else if (status === 'FAILED') {
            const errMsg = data.output?.message || data.output?.code || '未知错误';
            throw new Error(`任务失败: ${errMsg}`);
        } else if (status === 'PENDING' || status === 'RUNNING') {
            await sleep(POLL_INTERVAL);
        } else {
            throw new Error(`未知任务状态 "${status}": ${JSON.stringify(data)}`);
        }
    }
}

/**
 * 完整的生成流程：提交 → 轮询 → 返回URL
 */
async function generateImage(prompt, size = "1024*576", modelName = MODEL) {
    const taskId = await submitTask(prompt, size, modelName);
    console.log(`           📋 任务已提交: ${taskId}`);
    const imageUrl = await pollTask(taskId);
    return imageUrl;
}

/**
 * 下载图片并保存到本地
 */
async function downloadImage(url, savePath) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`下载图片失败，状态码: ${response.status}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    writeFileSync(savePath, buffer);
}

/**
 * 延迟
 */
function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

/**
 * 将 zh/assets/images/ 下所有 .png 复制到 en/assets/images/
 */
function syncImagesToEn() {
    mkdirSync(EN_OUTPUT_DIR, { recursive: true });
    const files = readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.png'));
    let copied = 0;
    for (const file of files) {
        const src = join(OUTPUT_DIR, file);
        const dest = join(EN_OUTPUT_DIR, file);
        cpSync(src, dest);
        copied++;
    }
    console.log(`\n✓ 已将 ${copied} 张图片同步到 en/assets/images/`);
}

/**
 * 主函数
 */
async function main() {
    const options = parseArgs();
    const modelName = options.model || MODEL;
    const promptFile = options.lang === 'zh' ? PROMPT_FILE_ZH : PROMPT_FILE_EN;

    console.log("=".repeat(60));
    console.log("📚 AI通识知识库 - 批量生图脚本（通义万相 DashScope API）");
    console.log("=".repeat(60));
    console.log(`模型: ${modelName}`);
    console.log(`语言: ${options.lang === 'zh' ? '中文' : '英文'}`);
    console.log(`提示词文件: ${promptFile}`);
    console.log(`强制覆盖: ${options.force ? '是' : '否'}`);
    console.log(`输出目录: ${OUTPUT_DIR}`);
    console.log();

    // 确保输出目录存在
    mkdirSync(OUTPUT_DIR, { recursive: true });

    // 解析提示词
    const images = parsePrompts(promptFile);
    console.log(`✓ 共解析到 ${images.length} 张图片的提示词`);

    const endAt = options.end || images.length;
    const startFrom = options.start;

    // 筛选范围
    const toGenerate = images.filter(img => img.seq >= startFrom && img.seq <= endAt);
    console.log(`✓ 本次计划生成: 第 ${startFrom} 张 ~ 第 ${endAt} 张，共 ${toGenerate.length} 张\n`);

    let successCount = 0;
    let skipCount = 0;
    let failCount = 0;

    for (let i = 0; i < toGenerate.length; i++) {
        const img = toGenerate[i];
        const savePath = join(OUTPUT_DIR, img.filename);

        // 断点续传：跳过已存在的图片（除非 --force）
        if (!options.force && existsSync(savePath) && statSync(savePath).size > 0) {
            console.log(`[${String(img.seq).padStart(2, '0')}/${endAt}] ⏭ 跳过（已存在）: ${img.filename}`);
            skipCount++;
            continue;
        }

        // 确定图片尺寸（DashScope 用 * 分隔）
        const imageSize = SQUARE_IMAGES.has(img.filename) ? "1024*1024" : "1024*576";

        console.log(`[${String(img.seq).padStart(2, '0')}/${endAt}] 🎨 生成中: ${img.filename} (${imageSize})`);
        console.log(`           提示词: ${img.prompt.substring(0, 80)}...`);

        let success = false;
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                // 调用 API 生成
                const imageUrl = await generateImage(img.prompt, imageSize, modelName);
                console.log(`           ✓ 图片已生成，正在下载...`);

                // 下载图片
                await downloadImage(imageUrl, savePath);
                const fileSize = statSync(savePath).size;
                console.log(`           ✓ 已保存: ${img.filename} (${(fileSize / 1024).toFixed(1)} KB)`);
                successCount++;
                success = true;
                break;

            } catch (e) {
                console.log(`           ✗ 第${attempt}次尝试失败: ${e.message}`);
                if (attempt < MAX_RETRIES) {
                    console.log(`           ⏳ 等待 ${DELAY_SECONDS * 3} 秒后重试...`);
                    await sleep(DELAY_SECONDS * 3);
                }
            }
        }

        if (!success) {
            console.log(`           ❌ 最终失败，跳过此图`);
            failCount++;
        }

        // 请求间隔
        if (i < toGenerate.length - 1) {
            console.log(`           ⏳ 等待 ${DELAY_SECONDS} 秒...`);
            await sleep(DELAY_SECONDS);
        }

        console.log();
    }

    // 汇总
    console.log("=".repeat(60));
    console.log(`🎉 生成完毕！成功: ${successCount} | 跳过: ${skipCount} | 失败: ${failCount}`);
    console.log(`📁 图片保存目录: ${OUTPUT_DIR}`);

    // 同步图片到 en/assets/images/
    if (successCount > 0 || skipCount > 0) {
        console.log(`\n📋 正在同步图片到 en/assets/images/ ...`);
        syncImagesToEn();
    }
}

main().catch(err => {
    console.error("❌ 脚本执行出错:", err.message);
    process.exit(1);
});
