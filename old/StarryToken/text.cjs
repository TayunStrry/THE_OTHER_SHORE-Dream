const fs = require('fs');
const path = require('path');

/**
 * 将词典文本文件转换为 JS 数组文件
 *
 * @param {string} inputFilePath - 输入的 .txt 文件路径
 * @param {string} outputFilePath - 输出的 .js 文件路径
 */
function convertTxtToJsArray(inputFilePath, outputFilePath) {
    // 读取文本文件内容
    const data = fs.readFileSync(inputFilePath, 'utf-8');

    // 解析每一行为 [word, posTag, frequency]
    const wordArray = data
        .split(/\r?\n/) // 支持 Windows 和 Unix 换行符
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            const [word, posTag, frequency] = line.split('|');
            return [word, posTag, parseInt(frequency, 10)];
        });

    // 构建要写入的 JS 文件内容
    const fileContent = `
// 生成的词典列表，格式为 [word, posTag, frequency]
export const list: [string, string, number][] = ${JSON.stringify(wordArray)};`;

    // 确保输出目录存在
    const dir = path.dirname(outputFilePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(outputFilePath, fileContent, 'utf-8');

    console.log(`✅ 成功将 '${inputFilePath}' 转换并写入至 '${outputFilePath}'`);
}
/**
 * 将词典文本文件转换为 JS 数组文件
 *
 * @param {string} inputFilePath - 输入的 .txt 文件路径
 * @param {string} outputFilePath - 输出的 .js 文件路径
 */
function loadSynonymDict(inputFilePath, outputFilePath) {
    // 读取文本文件内容
    const data = fs.readFileSync(inputFilePath, 'utf-8');

    // 解析每一行为 [word, posTag, frequency]
    const wordArray = data
        .split(/\r?\n/) // 支持 Windows 和 Unix 换行符
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            const [word, newWord] = line.split(',');
            return [word, newWord];
        });

    // 构建要写入的 JS 文件内容
    const fileContent = `
// 生成的词典列表，格式为 [word, newWord]
export const list: [string, string][] = ${JSON.stringify(wordArray)};`;

    // 确保输出目录存在
    const dir = path.dirname(outputFilePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(outputFilePath, fileContent, 'utf-8');

    console.log(`✅ 成功将 '${inputFilePath}' 转换并写入至 '${outputFilePath}'`);
}
/**
 * 将词典文本文件转换为 JS 数组文件
 *
 * @param {string} inputFilePath - 输入的 .txt 文件路径
 * @param {string} outputFilePath - 输出的 .ts 文件路径
 */
function loadStopwordDict(inputFilePath, outputFilePath) {
    // 读取文本文件内容
    const data = fs.readFileSync(inputFilePath, 'utf-8');

    // 解析每一行为 [word]
    const wordArray = data
        .split(/\r?\n/) // 支持 Windows 和 Unix 换行符
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            return line;
        });

    // 构建要写入的 TS 文件内容
    const fileContent = `
// 生成的词典列表，格式为 word[]
export const list: string[] = ${JSON.stringify(wordArray)};`;

    // 确保输出目录存在
    const dir = path.dirname(outputFilePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(outputFilePath, fileContent, 'utf-8');

    console.log(`✅ 成功将 '${inputFilePath}' 转换并写入至 '${outputFilePath}'`);
}

/**
 * 将指定目录下的所有 .txt 文件转换为 .ts 文件
 *
 * @param {string} inputDirPath - 包含 .txt 文件的输入目录路径
 * @param {string} outputDirPath - 输出 .ts 文件的目标目录路径
 */
function convertAllTxtToTs(inputDirPath, outputDirPath) {
    // 读取输入目录中的所有文件
    const files = fs.readdirSync(inputDirPath);

    // 遍历所有文件并处理 .txt 文件
    files.forEach(file => {
        if (path.extname(file).toLowerCase() === '.txt') {
            const inputFilePath = path.join(inputDirPath, file);
            const outputFileName = path.basename(file, '.txt') + '.ts';
            const outputFilePath = path.join(outputDirPath, outputFileName);

            // 读取文本文件内容
            const data = fs.readFileSync(inputFilePath, 'utf-8');

            // 解析每一行为 [word, posTag, frequency]
            const wordArray = data
                .split(/\r?\n/) // 支持 Windows 和 Unix 换行符
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .map(line => {
                    const [word, posTag, frequency] = line.split('|');
                    return [word, posTag, parseInt(frequency, 10)];
                });

            // 构建要写入的 JS 文件内容
            const fileContent = `
// 生成的词典列表，格式为 [word, posTag, frequency]
export const list: [string, string, number][] = ${JSON.stringify(wordArray)};`;

            // 确保输出目录存在
            const dir = path.dirname(outputFilePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            // 写入文件
            fs.writeFileSync(outputFilePath, fileContent, 'utf-8');

            console.log(`✅ 成功将 '${inputFilePath}' 转换并写入至 '${outputFilePath}'`);
        }
    });
}

// 示例调用：
loadStopwordDict(
    'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/Source/moonlight/segment/dicts/stopword.txt',
    'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/Source/StarryToken/lexicon/stopword.ts'
)
//convertAllTxtToTs(
// 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/Source/moonlight/segment/dicts/',
//  'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/Source/StarryToken/lexicon/'
// );