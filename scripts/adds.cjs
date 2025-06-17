const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 自定义函数移除JSON注释
function removeJsonComments(jsonString) {
  let inString = false;
  let inComment = false;
  let inMultiLineComment = false;
  let escapeNext = false;
  let result = '';

  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString[i];

    // 处理转义字符
    if (escapeNext) {
      result += char;
      escapeNext = false;
      continue;
    }

    // 处理字符串状态
    if (char === '"' && !inComment) {
      inString = !inString;
      result += char;
      continue;
    }

    // 处理转义字符
    if (inString && char === '\\') {
      escapeNext = true;
      result += char;
      continue;
    }

    // 检测注释开始
    if (!inString && !inComment) {
      // 检测单行注释
      if (char === '/' && jsonString[i + 1] === '/') {
        inComment = true;
        inMultiLineComment = false;
        i++; // 跳过下一个斜杠
        continue;
      }

      // 检测多行注释
      if (char === '/' && jsonString[i + 1] === '*') {
        inComment = true;
        inMultiLineComment = true;
        i++; // 跳过星号
        continue;
      }
    }

    // 检测注释结束
    if (inComment) {
      // 单行注释结束
      if (!inMultiLineComment && (char === '\n' || char === '\r')) {
        inComment = false;
        result += char; // 保留换行符
        continue;
      }

      // 多行注释结束
      if (inMultiLineComment && char === '*' && jsonString[i + 1] === '/') {
        inComment = false;
        inMultiLineComment = false;
        i++; // 跳过斜杠
        continue;
      }

      // 仍在注释中，跳过字符
      continue;
    }

    // 普通字符，添加到结果
    result += char;
  }

  return result;
}

// 递归排序对象的所有键
function sortObjectKeys(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;

  // 处理数组
  if (Array.isArray(obj)) {
    return obj.map(item => sortObjectKeys(item));
  }

  // 排序键：先按长度，再按字母顺序
  const sortedKeys = Object.keys(obj).sort((a, b) => {
    return a.length - b.length || a.localeCompare(b);
  });

  // 创建新对象并递归处理值
  const sortedObj = {};
  for (const key of sortedKeys) {
    sortedObj[key] = sortObjectKeys(obj[key]);
  }
  return sortedObj;
}

// 递归查找所有JSON文件
function findJsonFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(dir, file.name);

    if (file.isDirectory()) {
      // 递归处理子目录
      findJsonFiles(filePath, fileList);
    } else if (path.extname(file.name).toLowerCase() === '.json') {
      // 添加到文件列表
      fileList.push({
        path: filePath,
        relative: path.relative(SOURCE_DIR, filePath)
      });
    }
  }

  return fileList;
}

// 更新进度条
function updateProgress(current, total, fileName) {
  const percentage = Math.round((current / total) * 100);
  const filled = Math.round(percentage / 5);
  const empty = 20 - filled;

  const progressBar = `[${'█'.repeat(filled)}${'░'.repeat(empty)}]`;

  // 确保文件名长度不会导致换行
  const displayName = fileName.length > 30
    ? '...' + fileName.slice(-30)
    : fileName;

  // 移动光标到行首并清除当前行
  readline.cursorTo(process.stdout, 0);
  readline.clearLine(process.stdout, 0);

  // 写入进度信息
  process.stdout.write(
    `${progressBar} ${percentage}% | ${current}/${total} | ${displayName}`
  );

  // 完成后换行
  if (current === total) {
    process.stdout.write('\n');
  }
}

// 使用制表符格式化JSON（制表符宽度=4）
function formatJsonWithTabs(data) {
  return JSON.stringify(data, null, '\t');
}

// 处理单个JSON文件
async function processJsonFile(inputPath, outputPath) {
  try {
    // 读取文件内容
    const data = await fs.promises.readFile(inputPath, 'utf8');

    // 移除JSON注释
    const cleanedData = removeJsonComments(data);

    // 解析并排序键
    const jsonData = JSON.parse(cleanedData);
    const sortedData = sortObjectKeys(jsonData);

    // 确保输出目录存在
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 使用制表符格式化并写入新文件
    await fs.promises.writeFile(
      outputPath,
      formatJsonWithTabs(sortedData),
      'utf8'
    );

    return true;
  } catch (error) {
    console.error(`\n处理文件 ${inputPath} 时出错:`, error.message);
    return false;
  }
}

// 主处理函数
async function processAllJsonFiles() {
  try {
    console.log('开始查找JSON文件...');

    // 查找所有JSON文件
    const allFiles = findJsonFiles(SOURCE_DIR);
    const totalFiles = allFiles.length;

    if (totalFiles === 0) {
      console.log('未找到JSON文件');
      return;
    }

    console.log(`找到 ${totalFiles} 个JSON文件，开始处理...`);

    // 处理每个文件
    let successCount = 0;

    // 初始进度显示
    updateProgress(0, totalFiles, '准备开始...');

    for (let i = 0; i < totalFiles; i++) {
      const { path: inputPath, relative: fileRelative } = allFiles[i];
      const outputPath = path.join(OUTPUT_DIR, fileRelative);

      // 更新进度条 - 在文件处理前更新
      updateProgress(i + 1, totalFiles, fileRelative);

      // 处理文件
      const success = await processJsonFile(inputPath, outputPath);
      if (success) successCount++;
    }

    // 最终结果
    console.log(`\n处理完成!`);
    console.log(`成功: ${successCount} 个文件`);
    console.log(`失败: ${totalFiles - successCount} 个文件`);
    console.log(`输出目录: ${path.resolve(OUTPUT_DIR)}`);
    console.log(`格式化: 使用制表符 (宽度=4)`);
  } catch (error) {
    console.error('处理过程中出错:', error);
  }
}

// === 配置区域 - 修改这里的路径 ===
const SOURCE_DIR = 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/development_behavior_packs/生物对战_行为包';    // JSON源文件目录
const OUTPUT_DIR = './open';    // 输出目录
// === 结束配置区域 ===

// 启动程序
processAllJsonFiles();