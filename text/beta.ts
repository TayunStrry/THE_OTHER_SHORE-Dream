import {
    world,
    system,
    Player,
    StartupEvent,
    CommandPermissionLevel,
    CustomCommandParamType,
    CustomCommandOrigin,
    CustomCommandStatus,
    CustomCommand
} from "@minecraft/server";
const seeCamera: CustomCommand = {
    name: "lkx:see_camera",
    description: "观察相机",
    permissionLevel: 1,
    optionalParameters: [{
        type: CustomCommandParamType.String,
        name: "启动或者关闭"
    }]
};
export const playerWithCamera = new Set();
export const seeCameraMap = new Map();


system.runInterval(() => {

    for (const player of world.getPlayers()) {
        const player2Id = seeCameraMap.get(player.id);
        // console.error(player2Id);
        if (!player2Id) continue;
        const player2 = world.getEntity(player2Id);
        // console.error(player2);
        if (!player2) continue;
        const command = `execute as @s[tag=战斗] at @s run camera @a[name='${player.nameTag}'] set minecraft:free ease 0.25 in_out_quad pos ^1.5^1^-2 facing @s`
        player.runCommand(command);

    }

}, 1);

function seeCameraFunc(entity, str) {
    if (!(entity instanceof Player)) return;
    console.error("测试" + str + JSON.stringify(entity));
    if (str === "on") {
        playerWithCamera.add(entity);
        setCameraObject(entity);
    }
    if (str === "off") {
        seeCameraMap.delete(player.id);
        playerWithCamera.delete(entity);
    }
    if (str === "change") {
        setCameraObject(entity);
    }
}

function setCameraObject(entity) {
    // if (playerWithCamera.has(entity)) {
    let players = world.getPlayers({
        tags: ["战斗"]
    });
    console.error(players.length);
    const player = players[Math.floor(Math.random() * players.length - 1)];
    if (player) {
        console.error("名字" + player.nameTag)
        entity.setDynamicProperty("lkx:see_camera", player.id);
        seeCameraMap.set(entity.id, player.id)
        console.error(seeCameraMap.get(entity.id));
    }
}
system.beforeEvents.startup.subscribe((data) => {
    data.customCommandRegistry.registerCommand(seeCamera, seeCameraFunc);
});

world.afterEvents.playerSpawn.subscribe((event) => {
    const player = event.player;
    console.error("玩家" + player.nameTag + "加载了");
    seeCameraMap.delete(player.id);
    playerWithCamera.delete(player);
});

world.beforeEvents.playerLeave.subscribe((event) => {
    const player = event.player
    console.error("玩家" + player.nameTag + "离开了");
    seeCameraMap.delete(player.id);
    playerWithCamera.delete(player);
});