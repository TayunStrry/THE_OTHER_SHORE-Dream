/*
 * 原版接口
 */
import * as serverUI from "@minecraft/server-ui";
import * as server from "@minecraft/server";
/**
 * * 组件前缀代词
 */
const componentPrefix = 'opal:item.';
/**
 * * 物品自定义组件列表
 */
const components = new Map<string, server.ItemCustomComponent>();
/*
 * 幻彩棱镜
 */
components.set(componentPrefix + 'iridescent_prism',
    {
        'onHitEntity'(source: server.ItemComponentHitEntityEvent) {
            console.log('Hit entity: ' + source.hitEntity.typeId);
        }
    }
);
export default components;