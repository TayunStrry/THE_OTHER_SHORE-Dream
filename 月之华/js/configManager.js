// 获取当前配置
function getCurrentConfig() {
  return {
    endpoint: apiEndpoint.value,
    model: aiModel.value,
    systemPrompt: systemPrompt.value,
    includeHistory: includeHistory.checked,
    temperature: parseFloat(temperature.value),
    maxTokens: parseInt(maxTokens.value),
    ttsApiEndpoint: ttsApiEndpoint.value,
    ttsSpeed: parseFloat(ttsSpeed.value),
    ttsVolume: parseFloat(ttsVolume.value),
    ttsMode: currentTtsMode,
    autoPlayTTS: autoPlayTTS.checked,
  };
}

// 保存配置到本地存储
function saveConfigToStorage(name) {
  const config = getCurrentConfig();
  savedConfigs[name] = config;
  localStorage.setItem("savedConfigs", JSON.stringify(savedConfigs));
  localStorage.setItem("currentConfig", name); // 保存当前配置名
  showApiStatus(`配置 "${name}" 已保存！`, "success");
  renderConfigList();
}

// 加载配置
function loadConfig(name) {
  if (savedConfigs[name]) {
    applyConfigToUI(savedConfigs[name]);
    showApiStatus(`配置 "${name}" 已加载`, "success");
  }
}

// 删除配置
function deleteConfig(name) {
  if (confirm(`确定要删除配置 "${name}" 吗？`)) {
    delete savedConfigs[name];
    localStorage.setItem("savedConfigs", JSON.stringify(savedConfigs));
    renderConfigList();
    showApiStatus(`配置 "${name}" 已删除`, "success");
  }
}

// 删除所有配置
function deleteAllConfigs() {
  if (Object.keys(savedConfigs).length === 0) {
    showApiStatus("没有可删除的配置", "warning");
    return;
  }

  if (confirm("确定要删除所有配置吗？此操作不可撤销！")) {
    savedConfigs = {};
    localStorage.removeItem("savedConfigs");
    renderConfigList();
    showApiStatus("所有配置已删除", "success");
  }
}

// 渲染配置列表
function renderConfigList() {
  configList.innerHTML = "";

  if (Object.keys(savedConfigs).length === 0) {
    configList.innerHTML = '<p class="no-configs">没有保存的配置</p>';
    return;
  }

  for (const name in savedConfigs) {
    const configItem = document.createElement("div");
    configItem.className = "config-item";
    configItem.innerHTML = `
            <div class="config-name">${name}</div>
            <div class="config-actions">
                <button class="config-btn load-btn" data-name="${name}">加载</button>
                <button class="config-btn delete-btn" data-name="${name}">删除</button>
            </div>
        `;
    configList.appendChild(configItem);
  }

  // 添加事件监听
  document.querySelectorAll(".load-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      loadConfig(this.dataset.name);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      deleteConfig(this.dataset.name);
    });
  });
}

// 加载保存的配置
function loadSavedConfigs() {
  const saved = localStorage.getItem("savedConfigs");
  if (saved) {
    try {
      savedConfigs = JSON.parse(saved);
      renderConfigList();
    } catch (e) {
      console.error("Error parsing saved configs:", e);
      savedConfigs = {};
    }
  }
}

// 应用配置到UI
async function applyConfigToUI(config) {
  // 优先使用配置中的系统提示词
  if (config.systemPrompt) {
    systemPrompt.value = config.systemPrompt;
    displayedSystemPrompt.textContent = config.systemPrompt;
  } else {
    // 直接使用默认提示词，不再尝试加载文件
    const defaultPrompt = document
      .getElementById("embeddedSystemPrompt")
      .value.trim();
    systemPrompt.value = defaultPrompt;
    displayedSystemPrompt.textContent = defaultPrompt;
  }

  // 应用其他配置
  apiEndpoint.value = config.endpoint || "http://localhost:1234";
  aiModel.value = config.model || "qwen/qwen3-30b-a3b";
  includeHistory.checked = config.includeHistory !== false;
  temperature.value = config.temperature || 0.7;
  maxTokens.value = config.maxTokens || 1024;
  ttsApiEndpoint.value = config.ttsApiEndpoint || "http://127.0.0.1:7860/tts";
  ttsSpeed.value = config.ttsSpeed || 1.0;
  ttsVolume.value = config.ttsVolume || 1.0;
  ttsSpeedValue.textContent = `${ttsSpeed.value}x`;
  ttsVolumeValue.textContent = `${Math.round(ttsVolume.value * 100)}%`;
  autoPlayTTS.checked = config.autoPlayTTS !== false;

  currentModel.textContent = aiModel.value;

  // 应用TTS模式
  if (config.ttsMode === "system") {
    switchTtsMode("system");
  } else {
    switchTtsMode("custom");
  }
}
