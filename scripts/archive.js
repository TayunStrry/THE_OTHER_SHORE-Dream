/*
 * NodeJS -> ES2023 -> 文本数据转换
 */
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
// 导入要处理的 Map<any, any>() 数据
import help from '../deliverable/JavaScript/data/help.js';
/**
 * 清理文本内容（优化版）
 * 合并正则表达式提升效率
 */
function cleanText(text) {
    return String(text).replace(/\\n|§[0-9a-z]/g, '');
};
/**
 * 安全转换可迭代对象为数组
 */
function safeConvert(data) {
    try {
        // 如果是数组直接返回
        if (Array.isArray(data)) return [...data];
        // 如果是可迭代对象（如Set/Map）
        if (data !== null && typeof data === 'object' && typeof data[Symbol.iterator] === 'function') {
            return [...data];
        }
        // 如果是普通对象则返回键值对数组
        return Object.entries(data);
    }
    catch (error) {
        console.error('数据转换失败:', error);
        return [];
    }
};
/**
 * 确保目录存在（同步安全版）
 */
function ensureDirectory(dirPath) {
    try {
        if (!existsSync(dirPath)) {
            mkdirSync(dirPath,
                {
                    recursive: true,
                    mode: 0o755 // 设置合理的目录权限
                }
            );
        }
        return true;
    }
    catch (error) {
        console.error('目录创建失败:', error.message);
        return false;
    }
};
// 主执行函数
try {
    // 获取当前文件路径
    const currentDir = dirname(fileURLToPath(import.meta.url));
    // 构建输出路径
    const outputPath = join(currentDir, '../deliverable/月华百科.json');
    // 安全转换数据
    const convertedData = safeConvert(help);
    // 序列化后清理内容并美化输出
    const content = cleanText(JSON.stringify(convertedData, null, '\t'));
    // 确保目录存在
    const targetDir = dirname(outputPath);
    if (!ensureDirectory(targetDir)) { throw new Error('目录准备失败'); }
    // 写入文件（使用Buffer提升性能）
    writeFileSync(
        outputPath,
        Buffer.from(content, 'utf8'), // 使用Buffer处理
        { flag: 'w' } // 明确使用写入模式
    );
    console.log(`文件成功生成于：${outputPath}`);
    console.log(`生成文件大小：${(content.length / 1024).toFixed(2)} KB`);
}
catch (error) {
    console.error('程序运行失败:', error.message);
    process.exitCode = 1; // 设置退出码但不强制退出
}