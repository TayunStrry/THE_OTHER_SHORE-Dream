/**
 * 获取当前UI配置状态
 */
function getCurrentConfig() {
    return {
        /** @property {string} - 推理模型API端点 */
        endpoint: apiEndpointReasoningModel.value,
        /** @property {string} - 推理模型名称 */
        model: reasoningModelDropdown.value,
        /** @property {string} - 系统提示词 */
        systemPrompt: inputSystemPrompt.value,
        /** @property {string} - API密钥 */
        apiKey: document.getElementById("apiKeyReasoningModel").value,
        /** @property {boolean} includeHistory - 是否包含聊天历史 */
        includeHistory: isIncludeHistory,
        /** @property {number} - 模型温度 */
        temperature: parseFloat(temperature.value),
        /** @property {number} - 最大生成长度 */
        maxTokens: parseInt(maxTokens.value),
        /** @property {string} - 自定义文本转语音API地址 */
        apiEndpointSpeechModel: apiEndpointSpeechModel.value,
        /** @property {string} - 自定义文本转语音模型速度 */
        speechModelSpeedSlider: parseFloat(speechModelSpeedSlider.value),
        /** @property {string} - 自定义文本转语音模型速度 */
        speechModelVolumeSlider: parseFloat(speechModelVolumeSlider.value),
        /** @property {string} - 文本转语音模型的类型 */
        currentSpeechEngineType: currentSpeechEngineType,
        /** @property {string} - 语音选择 */
        speechModelVoice: speechModelVoiceSelect.value,
        /** @property {boolean} - 是否自动播放文本转语音 */
        autoplaySpeechModel: autoplaySpeechModel?.checked,
    };
};;

/**
 * 将当前配置保存到本地存储
 * @param {string} name - 要保存的配置名称
 */
function saveConfigToStorage(name) {
	/**
	 * 获取当前UI配置状态
	 */
	const config = getCurrentConfig();
	// 将当前配置添加到已保存配置对象中
	savedConfigs[name] = config;
	// 将已保存配置对象序列化为JSON字符串并保存到本地存储
	localStorage.setItem("savedConfigs", JSON.stringify(savedConfigs));
	// 保存当前配置的名称到本地存储
	localStorage.setItem("currentConfig", name);
	// 显示系统状态面板，提示配置保存成功
	showsystemStatusDisplayPanel(`配置 "${name}" 已保存！`, "success");
	// 重新渲染配置列表
	renderConfigList();
};

/**
 * 加载指定名称的配置
 *
 * @param {string} name - 要加载的配置名称
 */
function loadConfig(name) {
	// 检查指定名称的配置是否存在，若不存在则直接返回
	if (!savedConfigs[name]) return;
	// 将指定名称的配置应用到UI上
	applyConfigToUI(savedConfigs[name]);
	// 显示系统状态面板，提示配置加载成功
	showsystemStatusDisplayPanel(`配置 "${name}" 已加载`, "success");
};

/**
 * 删除指定名称的配置
 *
 * @param {string} name - 要删除的配置名称
 */
function deleteConfig(name) {
	// 弹出确认对话框，若用户取消则终止操作
	if (!confirm(`确定要删除配置 "${name}" 吗？`)) return;
	// 从已保存配置对象中删除指定名称的配置
	delete savedConfigs[name];
	// 将更新后的已保存配置对象序列化为JSON字符串并保存到本地存储
	localStorage.setItem("savedConfigs", JSON.stringify(savedConfigs));
	// 重新渲染配置列表
	renderConfigList();
	// 显示系统状态面板，提示配置删除成功
	showsystemStatusDisplayPanel(`配置 "${name}" 已删除`, "success");
};

/**
 * 删除所有已保存的配置
 *
 * 该函数会先检查是否存在可删除的配置，若存在则弹出确认对话框，用户确认后删除所有配置
 */
function deleteAllConfigs() {
	// 检查已保存配置对象是否为空，若为空则提示没有可删除的配置并终止函数
	if (Object.keys(savedConfigs).length === 0) {
		showsystemStatusDisplayPanel("没有可删除的配置", "warning");
		return;
	}
	// 弹出确认对话框，询问用户是否确定删除所有配置，此操作不可撤销
	if (confirm("确定要删除所有配置吗？此操作不可撤销！")) {
		// 将已保存配置对象置为空对象
		savedConfigs = {};
		// 从本地存储中移除已保存配置
		localStorage.removeItem("savedConfigs");
		// 重新渲染配置列表
		renderConfigList();
		// 显示系统状态面板，提示所有配置已删除
		showsystemStatusDisplayPanel("所有配置已删除", "success");
	}
};

/**
 * 渲染配置列表到页面上
 *
 * 该函数会清空现有的配置列表，根据已保存的配置重新渲染。
 *
 * 如果没有保存的配置，则显示提示信息。
 *
 * 同时会为每个配置项的加载和删除按钮绑定相应的事件。
 */
function renderConfigList() {
	// 清空现有的配置列表
	configList.innerHTML = '';
	// 检查是否有保存的配置，如果没有则显示提示信息并终止函数
	if (Object.keys(savedConfigs).length === 0) {
		configList.innerHTML = '<p class="no-configs">没有保存的配置</p>';
		return;
	};
	// 遍历所有已保存的配置
	for (const name in savedConfigs) {
		/**
		 * 创建一个新的配置项元素
		 */
		const configItem = document.createElement("div");
		// 设置配置项的类名
		configItem.className = "config-item";
		// 设置配置项的内部HTML，包含配置名称和操作按钮
		configItem.innerHTML = `
            <div class="config-name">${name}</div>
            <div class="config-actions">
                <button class="config-btn load-btn" data-name="${name}">加载</button>
                <button class="config-btn delete-btn" data-name="${name}">删除</button>
            </div>
        `;
		// 将配置项添加到配置列表中
		configList.appendChild(configItem);
	};
	// TODO : 绑定 配置加载 按钮事件
	document.querySelectorAll(".load-btn").forEach(button => button.addEventListener("click", () => loadConfig(button.dataset.name)));
	// TODO : 绑定 配置删除 按钮事件
	document.querySelectorAll(".delete-btn").forEach(button => button.addEventListener("click", () => deleteConfig(button.dataset.name)))
};

/**
 * 加载本地存储中保存的配置
 *
 * 该函数会从本地存储中获取已保存的配置数据，尝试解析为对象。
 *
 * 如果解析成功，则将配置数据赋值给 savedConfigs 变量并重新渲染配置列表；
 *
 * 如果解析失败，则捕获错误并将 savedConfigs 置为空对象。
 *
 * 如果本地存储中没有保存的配置数据，则不做任何操作。
 */
function loadSavedConfigs() {
	/**
	 * 从本地存储中获取已保存的配置数据
	 */
	const saved = localStorage.getItem("savedConfigs");
	// 检查是否存在保存的配置数据
	if (saved) {
		try {
			// 尝试将获取的 JSON 字符串解析为配置对象
			savedConfigs = JSON.parse(saved);
			// 解析成功后，重新渲染配置列表
			renderConfigList();
		}
		catch (error) {
			// 解析失败时，在控制台输出错误信息
			console.error("Error parsing saved configs:", error);
			// 将已保存的配置对象置为空对象
			savedConfigs = {};
		}
	}
};

/**
 * 应用配置到UI
 *
 * @description 应用配置到UI，包括系统提示词、 reasoningModelDropdown、temperature、maxTokens、apiEndpointReasoningModel、apiEndpointSpeechModel、speechModelSpeedSlider、speechModelVolumeSlider、autoplaySpeechModel
 *
 * @param {*} config 配置对象
 */
async function applyConfigToUI(config) {
    // 优先使用配置中的系统提示词
    if (config.systemPrompt) {
        // 设置系统提示词
        inputSystemPrompt.value = config.systemPrompt;
        // 显示系统提示词
        displayedSystemPrompt.textContent = config.systemPrompt;
    }
    // 否则使用默认系统提示词
    else {
        /**
         * 获取默认系统提示词
         *
         * @returns {string} 默认系统提示词
         */
        const defaultPrompt = defaultSystemPrompt.replace(/[\r\n]+/g, '').replace(/[ \t]+/g, ' ');
        // 重载系统提示词输入框
        inputSystemPrompt.value = defaultPrompt;
        // 显示默认系统提示词
        displayedSystemPrompt.textContent = defaultPrompt;
    };

    // 应用其他配置
    apiEndpointReasoningModel.value = config.endpoint || "http://localhost:1234/v1";
    reasoningModelDropdown.value = config.model || "openai - qwen - deepseek - chatglm";

    // 新增：设置API密钥
    if (config.apiKey) {
        document.getElementById("apiKeyReasoningModel").value = config.apiKey;
    }

    temperature.value = config.temperature || 0.7;
    maxTokens.value = config.maxTokens || 4096;
    apiEndpointSpeechModel.value = config.apiEndpointSpeechModel || "http://localhost:7860";
    speechModelSpeedSlider.value = config.speechModelSpeedSlider || 1.0;
    speechModelVolumeSlider.value = config.speechModelVolumeSlider || 1.0;
    speechModelSpeedValue.textContent = `${speechModelSpeedSlider.value}x`;
    speechModelVolumeValue.textContent = `${Math.round(speechModelVolumeSlider.value * 100)}%`;
    autoplaySpeechModel.checked = config.autoplaySpeechModel !== false;
    currentModel.textContent = reasoningModelDropdown.value;

    // 新增：设置语音选择
    if (config.speechModelVoice && speechModelVoiceSelect) {
        speechModelVoiceSelect.value = config.speechModelVoice;
    }

    // 应用是否启用历史记录
    if (config.includeHistory == false) {
        // 变更按钮样式
        document.getElementById("includeHistoryButton").classList.add("disable");
        // 改变全局变量
        isIncludeHistory = false;
    }
    else {
        // 变更按钮样式
        document.getElementById("includeHistoryButton").classList.remove("disable");
        // 改变全局变量
        isIncludeHistory = true;
    }

    // 应用TTS模式
    if (config.currentSpeechEngineType === "custom") switchSpeechEngineMode("custom");
    else switchSpeechEngineMode("system");
};
