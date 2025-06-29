/**
 * 角色互动模式 聊天输入框
 */
const characterInteractionChatInput = document.getElementById("characterInteractionChatInput");
/**
 * 常规聊天模式 聊天输入框
 */
const generalStatusChatInput = document.getElementById("generalStatusChatInput");
/**
 * 页面布局-角色交互界面
 */
const characterInteractionPanel = document.getElementById("characterInteractionPanel");
/**
 * 页面布局-配置推理模型
 */
const reasoningModelConfigurationPanel = document.getElementById("reasoningModelConfigurationPanel");
/**
 * 页面布局-配置语音模型
 */
const speechModelConfigurationPanel = document.getElementById("speechModelConfigurationPanel");
/**
 * 页面布局-聊天与历史记录
 */
const conversationAndHistoryPanel = document.getElementById("conversationAndHistoryPanel");
/**
 * 角色模式切换按钮
 */
const interactiveModeSwitchingButton = document.getElementById("interactiveModeSwitchingButton");
/**
 * 角色互动模式 聊天输入按钮
 */
const characterInteractionChatInputButton = document.getElementById("characterInteractionChatInputButton");
/**
 * 常规聊天模式 聊天输入按钮
 */
const generalStatusChatInputButton = document.getElementById("generalStatusChatInputButton");
/**
 * 深色与浅色模式切换按钮
 */
const darkLightSwitchButton = document.getElementById("darkLightSwitchButton");
/**
 * 自定义语音引擎按钮
 */
const customSpeechEngineButton = document.getElementById("customSpeechEngineButton");
/**
 * 系统语音引擎按钮
 */
const systemSpeechEngineButton = document.getElementById("systemSpeechEngineButton");
/**
 * 系统提示词显示面板
 */
const displayedSystemPrompt = document.getElementById("displayedSystemPrompt");
/**
 * 系统提示词输入框
 */
const inputSystemPrompt = document.getElementById("systemPrompt");
/**
 * 系统状态显示面板
 */
const systemStatusDisplayPanel = document.getElementById("systemStatusDisplayPanel");
/**
 * 后端推理模型状态显示
 */
const statusIndicator = document.querySelector(".status-indicator");
/**
 * 后端推理模型状态文本
 */
const connectionStatusText = document.getElementById("connectionStatusText");
/**
 * 保存配置按钮
 */
const saveConfigButton = document.getElementById("saveConfigButton");
/**
 * 测试连接按钮
 */
const testConnectionBtnton = document.getElementById("testConnection");
/**
 * 聊天历史记录显示区域
 */
const chatHistory = document.getElementById("chatHistory");
/**
 * 推理模型API端点输入框
 */
const apiEndpointReasoningModel = document.getElementById("apiEndpointReasoningModel");
/**
 * AI模型选择下拉框
 */
const reasoningModelDropdown = document.getElementById("reasoningModelDropdown");
/**
 * 清除系统提示词按钮
 */
const clearSystemPromptBtton = document.getElementById("clearSystemPromptBtton");
/**
 * 温度参数输入框
 */
const temperature = document.getElementById("temperature");
/**
 * 最大token数输入框
 */
const maxTokens = document.getElementById("maxTokens");
/**
 * 当前模型显示区域
 */
const currentModel = document.getElementById("currentModel");
/**
 * TTS文本输入框
 */
const speechModelText = document.getElementById("speechModelText");
/**
 * 播放语音按钮
 */
const playSpeechModelBtton = document.getElementById("playSpeechModelBtton");
/**
 * 停止语音按钮
 */
const stopSpeechModelButton = document.getElementById("stopSpeechModel");
/**
 * TTS语速滑块
 */
const speechModelSpeedSlider = document.getElementById("speechModelSpeedSlider");
/**
 * TTS语速显示值
 */
const speechModelSpeedValue = document.getElementById("speechModelSpeedValue");
/**
 * TTS音量滑块
 */
const speechModelVolumeSlider = document.getElementById("speechModelVolumeSlider");
/**
 * TTS音量显示值
 */
const speechModelVolumeValue = document.getElementById("speechModelVolumeValue");
/**
 * 导入配置按钮
 */
const importConfigButton = document.getElementById("importConfigButton");
/**
 * 保存配置模态框
 */
const saveModal = document.getElementById("saveModal");
/**
 * 导入配置模态框
 */
const importModal = document.getElementById("importModal");
/**
 * 配置JSON显示区域
 */
const configJson = document.getElementById("configJson");
/**
 * 配置名称输入框
 */
const configName = document.getElementById("configName");
/**
 * 确认保存按钮
 */
const confirmSaveButton = document.getElementById("confirmSaveButton");
/**
 * 取消保存按钮
 */
const cancelSaveButton = document.getElementById("cancelSaveButton");
/**
 * 导入配置JSON输入框
 */
const importConfigJson = document.getElementById("importConfigJson");
/**
 * 确认导入按钮
 */
const confirmImportButton = document.getElementById("confirmImportButton");
/**
 * 取消导入按钮
 */
const cancelImportButton = document.getElementById("cancelImportButton");
/**
 * 配置列表显示区域
 */
const configList = document.getElementById("configList");
/**
 * 删除所有配置按钮
 */
const deleteAllConfigsButton = document.getElementById("deleteAllConfigsButton");
/**
 * 语音模型API端点输入框
 */
const apiEndpointSpeechModel = document.getElementById("apiEndpointSpeechModel");
/**
 * TTS语音选择下拉框
 */
const speechModelVoiceSelect = document.getElementById("speechModelVoiceSelect");
/**
 * TTS支持状态指示器
 */
const ttsSupportIndicator = document.getElementById("ttsSupportIndicator");
/**
 * 自动播放语音复选框
 */
const autoplaySpeechModel = document.getElementById("autoplaySpeechModel");
/**
 * VTuber状态显示区域
 */
const vtuberStatus = document.getElementById("vtuberStatus");
/**
 * VTuber角色GIF图像
 */
const characterGif = document.getElementById("characterGif");
/**
 * VTuber聊天气泡显示区域
 */
const vtuberChatBubble = document.getElementById("vtuberChatBubble");
/**
 * 配置模式主容器
 */
const configMode = document.getElementById("configMode");