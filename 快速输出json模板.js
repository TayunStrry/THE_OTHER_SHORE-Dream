import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function generateItemJson(name, targetDirectory) {
    // 检查输入是否为空
    if (!name) {
        throw new Error('输入的字符串不能为空');
    }

    // 定义 JSON 模板
    const template = {
        "format_version": "1.21.40",
        "minecraft:item": {
            "description": {
                "identifier": "starry_map:bee_fire_cuisine",
                "menu_category": {
                    "category": "items"
                }
            },
            "components": {
                // 方块挖掘
                "minecraft:can_destroy_in_creative": false,
                // 手持物品
                "minecraft:allow_off_hand": false,
                "minecraft:hand_equipped": false,
                // 基础属性
                "minecraft:icon": {
                    "textures": {
                        "default": "item_texture:蜂火佳肴"
                    }
                },
                "minecraft:max_stack_size": 1,
                "minecraft:use_animation": "eat",
                "minecraft:use_modifiers": {
                    "use_duration": 1.5,
                    "movement_modifier": 0.5
                },
                "minecraft:food": {
                    "can_always_eat": true,
                    "nutrition": 1,
                    "saturation_modifier": 0.5,
                    "using_converts_to": "minecraft:bowl"
                },
                // 自定义组件
                "minecraft:custom_components": [
                    "opal:item.bee_fire_cuisine"
                ],
                // 物品标签
                "minecraft:tags": {
                    "tags": [
                        "tags:item_delicacies.series"
                    ]
                }
            }
        }
    };

    // 将 JSON 对象转换为字符串
    let jsonContent = JSON.stringify(template, null, '\t');

    // 使用正则表达式替换中文部分
    const escapedName = escapeRegExp(name);
    jsonContent = jsonContent.replace(/蜂火佳肴/g, escapedName);

    // 创建目标目录（如果不存在）
    if (!existsSync(targetDirectory)) {
        mkdirSync(targetDirectory, { recursive: true });
    }

    // 获取当前文件路径
    const currentDir = dirname(fileURLToPath(import.meta.url));
    // 构建输出路径
    const outputPath = join(currentDir, targetDirectory, `${name}.json`);

    // 写入文件
    writeFileSync(outputPath, jsonContent, 'utf8');

    console.log(`文件已成功写入: ${outputPath}`);
}

[
    '咖喱蝰蛇',
    '蝰蛇炮管',
    '灵蜥佳肴',
    '灵蜥苹果',
    '灵蜥碎片',
    '炭烤野蜂',
    '炭烤渊鲸',
    '野蜂烧鸡',
    '野蜂碎片',
    '渊鲸残骸',
    '渊鲸浓汤',
].forEach(name => generateItemJson(name, './archives_output'))

