/*
 * 原版接口
 */
import * as server from "@minecraft/server";
/*
 * 系统组件
 */
import * as opal from "../system/opal";
/**
 * * 组件前缀代词
 */
const componentPrefix = 'opal:place.';
/**
 * * 方块自定义组件列表
 */
const components = new Map();
/*
 * 虚空方块
 */
components.set(componentPrefix + 'unreal_space', {
    beforeOnPlayerPlace(source) {
        source.permutationToPlace = source.permutationToPlace.withState('STATE:is_storage', 1);
    }
});
/*
 * 魔导总线
 */
components.set(componentPrefix + 'magic_cable', {
    beforeOnPlayerPlace(source) {
        source.permutationToPlace = source.permutationToPlace.withState('STATE:is_storage', false);
    }
});
/*
 * 从林木椅
 */
components.set(componentPrefix + 'jungle_wood_chair', {
    beforeOnPlayerPlace(source) {
        source.permutationToPlace = source.player?.isSneaking ? source.permutationToPlace.withState('STATE:type', 1) : source.permutationToPlace.withState('STATE:type', 0);
    }
});
/*
 * 使徒人偶
 */
components.set(componentPrefix + 'divine_favor_guide_image', {
    async beforeOnPlayerPlace(source) {
        /**
         * * 获取方块状态
         */
        const { permutationToPlace, dimension, block } = source;
        // 设置状态
        source.permutationToPlace = permutationToPlace.withState('STATE:is_storage', false).withState('STATE:random_texture', opal.RandomFloor(0, 12));
        // 延迟 1 tick
        await server.system.waitTicks(1);
        // 播放音效
        dimension.playSound('chime.amethyst_block', block);
        // 延迟播放音效
        server.system.runTimeout(() => dimension.playSound('step.amethyst_block', block), 10);
        // 播放粒子
        opal.TrySpawnParticle(dimension, "constant:erupt_rune_orange", block.center());
        opal.TrySpawnParticle(dimension, "constant:disperse_rune_orange", block.center());
        opal.TrySpawnParticle(dimension, "constant:fireworks_fireball_amber_color", block.center());
    }
});
export default components;
