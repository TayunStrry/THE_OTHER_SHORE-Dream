/*
 * NodeJS => 项目发布预处理脚本
 */
import { cpSync, existsSync } from 'fs';
import AdmZip from 'adm-zip';
/**
 * 项目路径配置
 */
const projectConfig = [
    {
        name: '彼岸幻梦-服务端',
        source: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang/development_behavior_packs/幻梦-Dream_BP',
        target: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/Source/project_output/彼岸幻梦_服务端'
    },
    {
        name: '彼岸幻梦-客户端',
        source: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang/development_resource_packs/幻梦-Dream_RP',
        target: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/Source/project_output/彼岸幻梦_客户端'
    },
    {
        name: '轻量连锁-服务端',
        source: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang/development_behavior_packs/轻量连锁_服务端',
        target: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/Source/project_output/轻量连锁_服务端'
    },
    {
        name: '律令禁止-服务端',
        source: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang/development_behavior_packs/律令禁止_服务端',
        target: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/Source/project_output/律令禁止_服务端'
    },
    {
        name: '草神赐福-客户端',
        source: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang/development_resource_packs/草神赐福_客户端',
        target: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/Source/project_output/草神赐福_客户端'
    }
];
/**
 * 压缩包配置选项
 */
const zipConfig = {
    /**
     * 压缩包输出目录
     */
    outputPath: 'C:/Users/196530/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/Source/project_output',
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
    gameVersion: '1.21.90'
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
    // 阶段1：复制文件
    console.log('🔄 开始复制资源文件...');
    for (const config of projectConfig) {
        try {
            cpSync(config.source, config.target, { recursive: true, force: true });
            console.log(`✅ [${config.name}] 复制成功`);
            successCount++;
        }
        catch (err) {
            console.error(`❌ [${config.name}] 复制失败:`, err.message);
            errorCount++;
        }
    }
    // 阶段2：打包文件
    console.log('\n🔨 开始打包资源文件...');
    try {
        // 确保输出目录存在
        if (!existsSync(zipConfig.outputPath)) cpSync(zipConfig.outputPath, { recursive: true });
        // 添加每个目标目录到压缩包
        projectConfig.forEach(
            task => {
                // 跳过不存在的目标目录
                if (!existsSync(task.target)) return
                zip.addLocalFolder(task.target, task.name);
                console.log(`📦 已添加 [${task.name}] 到压缩包`);
            }
        );
        // 写入元数据
        zip.addZipComment(zipConfig.comment);
        /**
         * 拼接压缩包路径
         */
        const zipPath = `${zipConfig.outputPath}/${zipConfig.fileName}_${zipConfig.addonVersion.split('.').join('-')}_${zipConfig.gameVersion.split('.').join('-')}.${zipConfig.extension}`;
        // 保存压缩包
        zip.writeZip(zipPath);
        console.log(`\n🎉 压缩包创建成功：${zipPath}`);
    }
    catch (err) {
        console.error('\n🔥 压缩包创建失败:', err.message);
        errorCount++;
    }
    // 最终报告
    console.log('\n' + '-'.repeat(50));
    console.log('📊 部署报告：');
    console.log(`✅ 成功操作: ${successCount} 项`);
    console.log(`❌ 失败操作: ${errorCount} 项`);
    console.log('-'.repeat(50));
}
// 运行打包程序
deployPackages();