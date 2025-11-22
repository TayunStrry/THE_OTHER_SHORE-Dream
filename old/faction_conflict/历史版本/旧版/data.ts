/**
 * 运行状态标识符
 */
export let runtimeState = 1;

export function setRuntimeState(value: number) {
    runtimeState = value;
}
export function getRuntimeState() {
    return runtimeState;
}