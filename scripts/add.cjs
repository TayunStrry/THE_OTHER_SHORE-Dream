const fs = require('fs');
const path = require('path');
const stripJsonComments = require('strip-json-comments');

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

// 处理JSON文件
async function processJSONFiles(inputDir, outputDir) {
  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 读取目录中的所有文件
  const files = await fs.promises.readdir(inputDir);

  for (const file of files) {
    if (path.extname(file).toLowerCase() !== '.json') continue;

    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    try {
      // 读取并处理文件内容
      const data = await fs.promises.readFile(inputPath, 'utf8');

      // 移除JSON注释（关键修复）
      const cleanedData = stripJsonComments(data);

      // 解析并排序键
      const jsonData = JSON.parse(cleanedData);
      const sortedData = sortObjectKeys(jsonData);

      // 写入新文件
      await fs.promises.writeFile(
        outputPath,
        JSON.stringify(sortedData, null, 2),
        'utf8'
      );

      console.log(`✓ 成功处理: ${file}`);
    } catch (error) {
      console.error(`处理文件 ${file} 时出错:`, error.message);
    }
  }
}

// 使用示例
const inputDirectory = 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/development_behavior_packs/生物对战_行为包';    // JSON源文件目录
const outputDirectory = './open';   // 输出目录

processJSONFiles(inputDirectory, outputDirectory);