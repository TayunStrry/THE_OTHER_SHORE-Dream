// 全局变量
let conversationHistory = [];
let isGenerating = false;
let abortController = null;
let isConnected = false;
let speechSynthesis = window.speechSynthesis;
let currentSpeech = null;
let availableVoices = [];
let currentAudio = null;
let savedConfigs = {};
let currentTtsMode = "custom"; // 'custom' 或 'system'
let isHistoryCollapsed = true; // 默认折叠历史记录
let currentVtuberState = "idle";
let isVtuberMode = false;

// DOM元素
const themeToggle = document.getElementById("themeToggle");
const saveConfigBtn = document.getElementById("saveConfig");
const testConnectionBtn = document.getElementById("testConnection");
const sendButton = document.getElementById("sendButton");
const userInput = document.getElementById("userInput");
const chatHistory = document.getElementById("chatHistory");
const includeHistory = document.getElementById("includeHistory");
const apiEndpoint = document.getElementById("apiEndpoint");
const aiModel = document.getElementById("aiModel");
const systemPrompt = document.getElementById("systemPrompt");
const displayedSystemPrompt = document.getElementById("displayedSystemPrompt");
const clearSystemPromptBtn = document.getElementById("clearSystemPrompt");
const temperature = document.getElementById("temperature");
const maxTokens = document.getElementById("maxTokens");
const connectionStatusText = document.getElementById("connectionStatusText");
const statusIndicator = document.querySelector(".status-indicator");
const apiStatus = document.getElementById("apiStatus");
const currentModel = document.getElementById("currentModel");
const ttsText = document.getElementById("ttsText");
const ttsButton = document.getElementById("ttsButton");
const stopTTSBtn = document.getElementById("stopTTS");
const ttsSpeed = document.getElementById("ttsSpeed");
const ttsSpeedValue = document.getElementById("ttsSpeedValue");
const ttsVolume = document.getElementById("ttsVolume");
const ttsVolumeValue = document.getElementById("ttsVolumeValue");
const importConfigBtn = document.getElementById("importConfig");
const saveModal = document.getElementById("saveModal");
const importModal = document.getElementById("importModal");
const configJson = document.getElementById("configJson");
const configName = document.getElementById("configName");
const confirmSaveBtn = document.getElementById("confirmSaveBtn");
const cancelSaveBtn = document.getElementById("cancelSaveBtn");
const importConfigJson = document.getElementById("importConfigJson");
const confirmImportBtn = document.getElementById("confirmImportBtn");
const cancelImportBtn = document.getElementById("cancelImportBtn");
const configList = document.getElementById("configList");
const deleteAllConfigsBtn = document.getElementById("deleteAllConfigs");
const ttsApiEndpoint = document.getElementById("ttsApiEndpoint");
const ttsModeCustom = document.getElementById("ttsModeCustom");
const ttsModeSystem = document.getElementById("ttsModeSystem");
const ttsVoiceSelect = document.getElementById("ttsVoice");
const ttsSupportIndicator = document.getElementById("ttsSupportIndicator");
const autoPlayTTS = document.getElementById("autoPlayTTS");
const vtuberToggle = document.getElementById("vtuberToggle");

const configMode = document.getElementById("configMode");
const vtuberMode = document.getElementById("vtuberMode");

const vtuberLayout = document.getElementById("vtuberLayout");
const configPanel = document.getElementById("configPanel");
const rightPanel = document.getElementById("rightPanel");

const vtuberStatus = document.getElementById("vtuberStatus");
const characterGif = document.getElementById("characterGif");
const vtuberChatBubble = document.getElementById("vtuberChatBubble");
const vtuberInput = document.getElementById("vtuberInput");
const vtuberSendBtn = document.getElementById("vtuberSendBtn");
const toggleHistoryBtn = document.getElementById("toggleHistoryBtn");

// 初始化
document.addEventListener("DOMContentLoaded", async () => {
  applySavedTheme();
  setCurrentDate();
  updateConnectionStatus(false);
  loadSavedConfigs();
  mermaid.initialize({
    startOnLoad: true,
    theme: document.body.classList.contains("dark-mode") ? "dark" : "default",
    securityLevel: "loose",
    fontFamily: "inherit",
  });

  // 为初始模板消息绑定折叠事件
  const initialMessage = document.querySelector(
    ".assistant-message .markdown-content"
  );
  if (initialMessage) {
    bindThinkToggleEvents(initialMessage);
  }

  // 应用当前配置（如果有）
  const currentConfigName = localStorage.getItem("currentConfig");
  if (currentConfigName && savedConfigs[currentConfigName]) {
    await applyConfigToUI(savedConfigs[currentConfigName]);
  } else {
    await applyConfigToUI({});
  }

  // 确保输入框可用
  userInput.disabled = false;
  sendButton.disabled = false;

  // 加载系统TTS语音
  if ("speechSynthesis" in window) {
    speechSynthesis.onvoiceschanged = loadSystemTtsVoices;
    loadSystemTtsVoices();
  } else {
    ttsSupportIndicator.className = "tts-support-indicator tts-not-supported";
    ttsSupportIndicator.innerHTML =
      '<i class="fas fa-exclamation-triangle"></i> 浏览器不支持系统TTS功能';
    if (currentTtsMode === "system") switchTtsMode("custom");
  }

  // 设置角色模式初始状态
  setVtuberState(VTUBER_STATES.IDLE);
});

// 事件绑定
vtuberToggle.addEventListener("click", toggleVtuberMode);
vtuberSendBtn.addEventListener("click", sendVtuberMessage);
vtuberInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendVtuberMessage();
  }
});
themeToggle.addEventListener("click", toggleTheme);
saveConfigBtn.addEventListener("click", () => {
  const config = getCurrentConfig();
  configJson.value = JSON.stringify(config, null, 2);
  configName.value = "";
  saveModal.style.display = "flex";
  configName.focus();
});
testConnectionBtn.addEventListener("click", testConnection);
sendButton.addEventListener("click", sendMessage);
clearSystemPromptBtn.addEventListener("click", clearSystemPrompt);
ttsButton.addEventListener("click", () => playTTS(ttsText.value.trim()));
stopTTSBtn.addEventListener("click", stopTTS);
ttsSpeed.addEventListener("input", function () {
  ttsSpeedValue.textContent = `${this.value}x`;
});
ttsVolume.addEventListener("input", function () {
  ttsVolumeValue.textContent = `${Math.round(this.value * 100)}%`;
});
importConfigBtn.addEventListener("click", () => {
  importModal.style.display = "flex";
  importConfigJson.value = "";
  importConfigJson.focus();
});
deleteAllConfigsBtn.addEventListener("click", deleteAllConfigs);
ttsModeCustom.addEventListener("click", () => switchTtsMode("custom"));
ttsModeSystem.addEventListener("click", () => switchTtsMode("system"));
confirmSaveBtn.addEventListener("click", () => {
  const name = configName.value.trim();
  if (!name) {
    alert("请输入配置名称");
    return;
  }
  saveConfigToStorage(name);
  saveModal.style.display = "none";
});
cancelSaveBtn.addEventListener(
  "click",
  () => (saveModal.style.display = "none")
);
confirmImportBtn.addEventListener("click", () => {
  try {
    const config = JSON.parse(importConfigJson.value);
    applyConfigToUI(config);
    importModal.style.display = "none";
    showApiStatus("配置导入成功！", "success");
  } catch (e) {
    showApiStatus("无效的配置JSON", "error");
  }
});
cancelImportBtn.addEventListener(
  "click",
  () => (importModal.style.display = "none")
);
document.querySelectorAll(".close-modal").forEach((btn) => {
  btn.addEventListener("click", () => {
    saveModal.style.display = "none";
    importModal.style.display = "none";
  });
});
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
aiModel.addEventListener("change", function () {
  currentModel.textContent = this.value;
});
toggleHistoryBtn.addEventListener("click", toggleHistoryPanel);

// 导出聊天记录
document
  .getElementById("exportChatHistory")
  .addEventListener("click", function () {
    // 实现导出功能
    console.log("导出聊天记录");
  });
// 导入聊天记录
document
  .getElementById("importChatHistory")
  .addEventListener("click", function () {
    // 实现导入功能
    console.log("导入聊天记录");
  });
