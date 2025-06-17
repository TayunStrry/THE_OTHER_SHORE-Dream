const fs = require('fs');
const path = require('path');
/**
 * 将指定目录下的所有 .json 文件转换为 .json 文件
 *
 * 该函数会读取输入目录中的所有.json文件，包括子目录中的文件，
 * 将它们转换为.json文件并写入到输出目录中，保持原始目录结构。
 * 输出目录结构会自动创建。
 *
 * @param {string} inputDirPath - 包含 .json 文件的输入目录路径
 * @param {string} outputDirPath - 输出 .json 文件的目标目录路径
 * @return {number} 返回成功转换的文件数量
 * @throws {Error} 如果输入或输出目录路径未提供，或文件操作失败
 */
function convertAllTxtToTs(inputDirPath, outputDirPath) {
    // 验证输入参数
    if (!inputDirPath || !outputDirPath) {
        throw new Error('Input and output directory paths must be provided');
    }

    let fileCount = 0;

    // 递归读取目录及其子目录中的文件
    function walkDir(currentPath) {
        const files = fs.readdirSync(currentPath);

        files.forEach(file => {
            const filePath = path.join(currentPath, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                // 如果是目录，递归处理
                walkDir(filePath);
            } else if (path.extname(file).toLowerCase() === '.json') {
                // 处理单个JSON文件
                try {
                    // 读取文本文件内容
                    const data = fs.readFileSync(filePath, 'utf-8');

                    // 解析JSON数据并转换为Unicode格式
                    const fileContent = JsonToUnicode(data);

                    // 构建输出文件路径，保持目录结构
                    const relativePath = path.relative(inputDirPath, path.dirname(filePath));
                    const fileNameWithoutExt = path.basename(filePath, '.json');

                    // 转换文件名为Unicode编码形式
                    const encodedFileName = fileNameWithoutExt
                        .split('')
                        .map(char => char.charCodeAt(0).toString(16).padStart(4, '0'))
                        .join('')
                        .replace(/,/g, '');

                    const finalOutputPath = path.join(
                        outputDirPath,
                        relativePath,
                        `${encodedFileName}.json`
                    );

                    // 确保输出目录存在
                    const dir = path.dirname(finalOutputPath);
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }

                    // 写入文件
                    fs.writeFileSync(finalOutputPath, fileContent, 'utf-8');

                    console.log(`✅ 成功将 '${filePath}' 转换并写入至 '${finalOutputPath}'`);
                    fileCount++;
                } catch (error) {
                    console.error(`❌ 转换文件失败 ${filePath}: ${error.message}`);
                }
            }
        });
    }

    // 开始递归处理
    walkDir(inputDirPath);

    return fileCount;
}
/**
 * 将JSON字符串中的特定字符转换为Unicode编码的十六进制形式
 *
 * 对大写字母、小写字母、中文字符进行编码，同时将特定的 Unicode 编码转换为 true 和 false
 * 该函数主要用于处理包含敏感字符的JSON字符串，将其转换为安全的Unicode表示形式
 * 转换规则：
 * - 大写字母A-Z (0x0041-0x005A) 转换为\uXXXX格式
 * - 小写字母a-z (0x0061-0x007A) 转换为\uXXXX格式
 * - 中文字符 (0x4E00-0x9FA5) 转换为\uXXXX格式
 * - 特定Unicode序列会被转换回true/false
 * 注意：该函数会自动将非字符串输入转换为字符串
 *
 * @param {string} input - 待处理的 JSON 字符串
 * @param {boolean} [preserveSpecialValues=true] - 是否保留'true'和'false'的特殊转换
 * @return {string} 处理后的 JSON 字符串，其中特定字符被转换为Unicode编码
 * @throws {Error} 如果输入不是字符串且无法转换为字符串
 */
function JsonToUnicode(input, preserveSpecialValues = true) {
    // 确保输入是字符串
    if (typeof input !== 'string') {
        try {
            input = JSON.stringify(input);
        } catch (error) {
            throw new Error(`Failed to convert input to string: ${error.message}`);
        }
    }

    /**
     * 将字符串转换为字符数组
     * 用于逐个处理字符串中的每个字符
     */
    const chars = input.split('');

    /**
     * 将字符数组转换为 Unicode字符串
     * 使用map方法对每个字符进行转换
     */
    const compile = chars.map(
        char => {
            /**
             * 获取字符的 Unicode 编码
             * charCodeAt(0) 方法返回指定索引位置的字符的 Unicode 编码
             */
            const code = char.charCodeAt(0);
            // 对大写字母进行Unicode编码
            if (code >= 0x0041 && code <= 0x005A) return `\\u${code.toString(16).padStart(4, '0')}`;
            // 对小写字母进行Unicode编码
            else if (code >= 0x0061 && code <= 0x007A) return `\\u${code.toString(16).padStart(4, '0')}`;
            // 对中文字符进行Unicode编码
            else if (code >= 0x4E00 && code <= 0x9FA5) return `\\u${code.toString(16).padStart(4, '0')}`;
            // 其他字符保持不变
            else return char;
        }
    ).join('');

    // 根据preserveSpecialValues参数决定是否执行特殊值转换
    if (preserveSpecialValues) {
        // 将特定Unicode序列转换回true/false
        return compile
            .replace(/\\u0074\\u0072\\u0075\\u0065/g, 'true')
            .replace(/\\u0066\\u0061\\u006c\\u0073\\u0065/g, 'false');
    }

    return compile;
}

// 导出函数
module.exports = {
    convertAllTxtToTs,
    JsonToUnicode
};

// 执行转换操作
// 执行文件转换并获取统计信息
try {
    const convertedFilesCount = convertAllTxtToTs(
        'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/Source/StarryToken/proto/',
        'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/Source/StarryToken/open/'
    );

    console.log(`📊 总共转换了 ${convertedFilesCount} 个文件`);
}
catch (error) {
    console.error(`❌ 转换过程发生错误: ${error.message}`);
}
