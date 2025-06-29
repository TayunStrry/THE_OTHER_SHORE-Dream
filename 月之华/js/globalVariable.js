/**
 * 显示 角色互动聊天面板
 */
let displayChatInteractionInterface = false;
/**
 * 显示 角色模式
 */
let displayVtuberMode = false;
/**
 * 是否 已连接 后端 推理模型
 */
let isConnected = false;
/**
 * 用于中断请求的控制器（如 API 请求）
 */
let abortController = null;
/**
 * 显示 内部模块通讯记录面板
 */
let displayModuleInteractionPanel = false;
/**
 * 显示 配置面板
 */
let displayConfigurePanel = false;
/**
 * 发送聊天记录时包含历史聊天记录
 */
let isIncludeHistory = true;
/**
 * 是否禁用深度思考
 */
let isDisableThinking = false;
/**
 * 当前语音引擎类型
 */
let currentSpeechEngineType = "custom";
/**
 * 可用的系统语言模型列表
 */
let availableVoices = [];
/**
 * 与推理模型的聊天历史记录
 */
let conversationHistory = [];
/**
 * 语音合成对象
 */
let speechSynthesis = window.speechSynthesis;
/**
 * 当前语音合成任务对象
 */
let currentSpeech = null;
/**
 * 当前音频对象
 */
let currentAudio = null;
/**
 * 保存配置的按钮
 */
let savedConfigs = {};
/**
 * 当前 Vtuber 状态
 */
let currentVtuberState = "idle";
