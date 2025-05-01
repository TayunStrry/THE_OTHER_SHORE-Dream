/*
 * NodeJS -> ES2023 -> 项目包装器脚本
 */
import { cpSync, existsSync, mkdirSync, rmSync, statSync } from 'fs';
import AdmZip from 'adm-zip';
/**
 * 项目路径配置
 */
const projectConfig = [
    {
        name: '彼岸幻梦-服务端',
        source: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang/development_behavior_packs/幻梦-Dream_BP'
    },
    {
        name: '彼岸幻梦-客户端',
        source: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang/development_resource_packs/幻梦-Dream_RP'
    },
    {
        name: '轻量连锁-服务端',
        source: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang/development_behavior_packs/轻量连锁_服务端'
    },
    {
        name: '律令禁止-服务端',
        source: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang/development_behavior_packs/律令禁止_服务端'
    },
    {
        name: '草神赐福-客户端',
        source: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang/development_resource_packs/草神赐福_客户端'
    },
    {
        name: '生物对战_行为包',
        source: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/development_behavior_packs/生物对战_行为包'
    },
    {
        name: '生物对战_资源包',
        source: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/development_resource_packs/生物对战_资源包'
    }
];
/**
 * 压缩包配置选项
 */
const zipConfig = {
    /**
     * 压缩包输出目录
     */
    outputPath: './DIR_OUTPUT',
    /**
     * 压缩包文件名
     */
    fileName: 'THE_OTHER_SHORE',
    /**
     * 压缩包注释
     */
    comment: 'open source in JavaScript modules in < THE_OTHER_SHORE:OPAl-Script >',
    /**
     * 压缩包后缀
     */
    extension: 'mcaddon',
    /**
     * 模组版本号
     */
    addonVersion: '4.4.0',
    /**
     * 游戏版本号
     */
    gameVersion: '1.21.90',
    /**
     * 压缩后是否删除源文件
     */
    removeAfterZip: true,
    /**
     * 是否单独压缩每个项目（值为文件后缀名, 空字符串表示不单独压缩）
     */
    individualZipExtension: 'mcpack'
};
/**
 * 项目的版本号信息
 */
const compositeVersion = zipConfig.addonVersion.replace(/\./g, '-') + '_' + zipConfig.gameVersion.replace(/\./g, '-');
/**
 * 格式化文件大小为易读格式
 *
 * @param {number} bytes 文件大小(字节)
 *
 * @returns {string} 格式化后的字符串
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    /**
     * 定义二进制单位换算基数（1KB = 1024字节）
     */
    const k = 1024;
    /**
     * 支持的单位列表（从小到大排列）
     */
    const sizes = ['B', 'KB', 'MB', 'GB'];
    /**
     * 计算单位层级：
     * 1. 计算对数确定指数（如：1MB = 1024^2 → 指数为2）
     * 2. 取整后得到单位索引（如指数2对应MB）
     * 3. 确保不超过数组最大索引（防止越界）
     */
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
    // 执行单位换算：数值保留两位小数并拼接单位
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
/**
 * 执行文件夹复制与打包
 */
async function deployPackages() {
    /**
     * 统计打包成功的项目包数量
     */
    let successCount = 0;
    /**
     * 统计打包失败的项目包数量
     */
    let errorCount = 0;
    /**
     * 压缩包实例
     */
    const zip = new AdmZip();
    /**
     * 存储所有生成的压缩包信息
     */
    const zipFiles = [];
    // 阶段1：复制文件
    console.log('━'.repeat(40));
    console.log('📂 开始项目文件复制...');
    console.log('━'.repeat(40));
    // 遍历每个项目
    for (const config of projectConfig) {
        /**
         * 目标文件夹路径
         */
        const filePath = zipConfig.outputPath + '/' + config.name;
        // 复制项目文件夹
        try {
            cpSync(config.source, filePath, { recursive: true, force: true });
            console.log(`   ✔️ ${config.name.padEnd(20, ' ')} → 复制成功`);
            // 增加打包成功的项目包数量
            successCount++;
        }
        catch (err) {
            console.error(`   ✖️ ${config.name.padEnd(20, ' ')} → 复制失败: ${err.message}`);
            errorCount++;
        }
    };
    // 阶段2：打包文件
    console.log('\n' + '━'.repeat(40));
    console.log('📦 开始项目打包处理...');
    console.log('━'.repeat(40));
    // 创建主资源包文件
    try {
        // 确保输出目录存在
        if (!existsSync(zipConfig.outputPath)) mkdirSync(zipConfig.outputPath, { recursive: true });
        // 单独压缩每个项目（如果配置了单独压缩）
        if (zipConfig.individualZipExtension) {
            // 输出信息
            console.log('\n🔹 生成独立资源包:');
            // 遍历每个项目
            for (const config of projectConfig) {
                /**
                 * 目标文件夹路径
                 */
                const filePath = zipConfig.outputPath + '/' + config.name;
                // 跳过不存在的目标目录
                if (!existsSync(filePath)) continue;
                /**
                 * 创建单独压缩包
                 */
                const individualZip = new AdmZip();
                // 添加目标文件夹到压缩包
                individualZip.addLocalFolder(filePath, config.name);
                // 写入元数据
                individualZip.addZipComment(zipConfig.comment);
                /**
                 * 拼接独立压缩包的路径
                 */
                const individualZipPath = `${zipConfig.outputPath}/${config.name}_${compositeVersion}.${zipConfig.individualZipExtension}`;
                // 保存独立压缩包
                individualZip.writeZip(individualZipPath);
                /**
                 * 独立压缩包的文件状态对象（包含大小等元数据）
                 */
                const stats = statSync(individualZipPath);
                /**
                 * 格式化后的独立压缩包大小（如：5.2 MB）
                 */
                const size = formatFileSize(stats.size);
                // 存储压缩包信息
                zipFiles.push({ name: config.name, path: individualZipPath, size: stats.size, formattedSize: size });
                // 输出独立压缩包路径
                console.log(`   📁 ${config.name.padEnd(20, ' ')} → ${individualZipPath} (${size})`);
                // 增加打包成功的项目包数量
                successCount++;
            }
        };
        console.log('\n🔹 生成主资源包:');
        // 添加每个目标目录到主压缩包
        projectConfig.forEach(
            config => {
                /**
                 * 目标文件夹路径
                 */
                const filePath = zipConfig.outputPath + '/' + config.name;
                // 跳过不存在的目标目录
                if (!existsSync(filePath)) return;
                // 添加目标文件夹到压缩包
                zip.addLocalFolder(filePath, config.name);
                // 输出路径信息
                console.log(`   📦 ${config.name.padEnd(20, ' ')} → 已添加到主包`);
                // 增加打包成功的项目包数量
                successCount++;
            }
        );
        // 写入元数据
        zip.addZipComment(zipConfig.comment);
        /**
         * 拼接压缩包路径
         */
        const zipPath = `${zipConfig.outputPath}/${zipConfig.fileName}_${compositeVersion}.${zipConfig.extension}`;
        // 保存压缩包
        zip.writeZip(zipPath);
        /**
         * 主资源包的文件状态对象（包含文件大小等元数据）
         */
        const mainStats = statSync(zipPath);
        /**
         * 格式化后的主资源包大小（如：10.5 MB）
         */
        const mainSize = formatFileSize(mainStats.size);
        // 存储主压缩包信息
        zipFiles.push({ name: '主资源包', path: zipPath, size: mainStats.size, formattedSize: mainSize });
        // 输出压缩包路径
        console.log('\n' + '*'.repeat(40));
        console.log(`🎉 主资源包生成完成：${zipPath} (${mainSize})`);
        console.log('*'.repeat(40));
        // 增加打包成功的项目包数量
        successCount++;
    }
    catch (err) {
        console.error('\n🔥 压缩包创建失败:', err.message);
        errorCount++;
    };
    // 阶段3：根据配置删除源文件
    if (zipConfig.removeAfterZip) {
        console.log('\n' + '━'.repeat(40));
        console.log('🧹 清理临时文件...');
        console.log('━'.repeat(40));
        // 遍历每个项目
        for (const config of projectConfig) {
            /**
             * 目标文件夹路径
             */
            const filePath = zipConfig.outputPath + '/' + config.name;
            // 跳过不存在的目标目录
            if (!existsSync(filePath)) continue;
            // 删除目标文件夹
            try {
                rmSync(filePath, { recursive: true, force: true });
                console.log(`   🗑️ ${filePath.split('/').pop().padEnd(20, ' ')} → 已清理`);
            }
            catch (err) {
                console.error(`   ❌ ${filePath.split('/').pop().padEnd(20, ' ')} → 清理失败: ${err.message}`);
                errorCount++;
            }
        }
    };
    /**
     * 所有生成的压缩包文件总大小（字节）
     */
    const totalSize = zipFiles.reduce((sum, file) => sum + file.size, 0);
    /**
     * 压缩包平均大小（字节）, 无文件时返回 0
     */
    const avgSize = zipFiles.length > 0 ? totalSize / zipFiles.length : 0;
    /**
     * 格式化后的总大小字符串（如：10.5 MB）
     */
    const formattedTotal = formatFileSize(totalSize);
    /**
     * 格式化后的平均大小字符串（如：2.3 KB）
     */
    const formattedAvg = formatFileSize(avgSize);
    // 最终报告
    console.log('\n' + '═'.repeat(40));
    console.log('📊 部署结果汇总');
    console.log('━'.repeat(40));
    console.log(`   ✅ 成功操作: ${successCount} 项`);
    console.log(`   ❌ 失败操作: ${errorCount} 项`);
    console.log('━'.repeat(40));
    console.log('📦 压缩包体积统计:');
    // 按从大到小排序
    zipFiles.sort((a, b) => b.size - a.size).forEach(file => console.log(`   ${file.formattedSize.padStart(10, ' ')} → ${file.name}`));
    // 输出压缩包数量和体积
    console.log('━'.repeat(40));
    console.log(`   🔢 压缩包数量: ${zipFiles.length} 个`);
    console.log(`   📊 总体积: ${formattedTotal}`);
    console.log(`   ⚖️ 平均体积: ${formattedAvg}`);
    console.log('═'.repeat(40) + '\n');
};
// 运行打包程序
deployPackages();