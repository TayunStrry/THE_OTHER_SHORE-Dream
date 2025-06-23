// 主题切换功能
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  themeToggle.innerHTML = isDarkMode
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

// 应用保存的主题
function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

// 显示API状态消息
function showApiStatus(message, type) {
  apiStatus.textContent = message;
  apiStatus.className = `api-status api-${type}`;
  apiStatus.style.display = "block";

  // 5秒后隐藏消息
  setTimeout(() => {
    apiStatus.style.display = "none";
  }, 5000);
}

// 切换历史记录面板
function toggleHistoryPanel() {
  const historyPanel = document.querySelector(".chat-history-panel");
  isHistoryCollapsed = !isHistoryCollapsed;
  historyPanel.classList.toggle("collapsed", isHistoryCollapsed);
}

// 更新连接状态
function updateConnectionStatus(connected) {
  isConnected = connected;
  if (connected) {
    statusIndicator.className = "status-indicator status-connected";
    connectionStatusText.textContent = "已连接";
    sendButton.disabled = false;
    showApiStatus("API连接成功！", "success");
  } else {
    statusIndicator.className = "status-indicator status-disconnected";
    connectionStatusText.textContent = "未连接";
    sendButton.disabled = false;
  }
}

// 清除系统提示词
function clearSystemPrompt() {
  systemPrompt.value = "";
  displayedSystemPrompt.textContent = "未设置系统提示词";
  showApiStatus("系统提示词已清除", "success");
}

// 切换TTS模式
function switchTtsMode(mode) {
  currentTtsMode = mode;

  if (mode === "system") {
    ttsModeSystem.classList.add("active");
    ttsModeCustom.classList.remove("active");
    systemTtsPanel.style.display = "block";
    customTtsPanel.style.display = "none";
  } else {
    ttsModeCustom.classList.add("active");
    ttsModeSystem.classList.remove("active");
    systemTtsPanel.style.display = "none";
    customTtsPanel.style.display = "block";
  }
}
