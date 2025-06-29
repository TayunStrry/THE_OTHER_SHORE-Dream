
/**
 * 应用保存的主题设置（如暗色模式）
 */
function applySavedTheme() {
    /**
     * 从本地存储中获取已保存的主题
     */
    const savedTheme = localStorage.getItem("theme");
    // 如果之前保存的是暗色模式，则应用相应样式
    if (savedTheme === "dark") {
        // 添加暗色模式类名以启用暗色主题样式
        document.body.classList.add("dark-mode");
        // 修改按钮图标为太阳图标（表示当前为暗色模式）
        darkLightSwitchButton.innerHTML = '<i class="fas fa-sun"></i>';
    }
}
/**
 * 显示 API 状态提示信息
 *
 * @param {string} message - 要显示的提示信息内容
 *
 * @param {string} type - 提示类型，用于控制样式（如 "success" 或 "error"）
 */
function showsystemStatusDisplayPanel(message, type) {
    // 设置提示信息文本内容
    systemStatusDisplayPanel.textContent = message;
    // 设置提示信息的类型样式类名
    systemStatusDisplayPanel.className = `api-status api-${type}`;
    // 显示提示信息框
    systemStatusDisplayPanel.style.display = "block";
    // 5秒后自动隐藏提示信息
    setTimeout(() => { systemStatusDisplayPanel.style.display = "none"; }, 5000);
};
/**
 * 更新 API 连接状态显示
 *
 * @param {boolean} connected - 当前是否已连接到 API
 */
function updateConnectionStatus(connected) {
    // 更新全局连接状态变量
    isConnected = connected;
    // 判断是否连接成功
    if (connected) {
        // 设置状态指示器为“已连接”样式
        statusIndicator.className = "status-indicator status-connected";
        // 更新连接状态文本
        connectionStatusText.textContent = "已连接";
        // 显示连接成功的提示信息
        showsystemStatusDisplayPanel("API连接成功！", "success");
    }
    else {
        // 设置状态指示器为“未连接”样式
        statusIndicator.className = "status-indicator status-disconnected";
        // 更新连接状态文本
        connectionStatusText.textContent = "未连接";
    }
};
/**
 * 清空系统提示词输入框和显示区域
 */
function clearSystemPrompt() {
    // 清空输入框内容
    systemPrompt.value = "";
    // 更新提示词显示文本
    displayedSystemPrompt.textContent = "未设置系统提示词";
    // 显示清除成功的状态提示
    showsystemStatusDisplayPanel("系统提示词已清除", "success");
}
/**
 * 切换语音引擎模式
 *
 * @param {string} mode - 模式名称，可选值为 "system" 或 "custom"
 */
function switchSpeechEngineMode(mode) {
    // 设置当前语音引擎类型
    currentSpeechEngineType = mode;
    // 判断按钮的类型
    if (mode === "system") {
        // 启用系统语音引擎按钮样式
        systemSpeechEngineButton.classList.add("active");
        // 取消自定义语音引擎按钮样式
        customSpeechEngineButton.classList.remove("active");
        // 显示系统 TTS 面板，隐藏自定义 TTS 面板
        systemSpeechEnginePanel.style.display = "block";
        customSpeechEnginePanel.style.display = "none";
    }
    else {
        // 启用自定义语音引擎按钮样式
        customSpeechEngineButton.classList.add("active");
        // 取消系统语音引擎按钮样式
        systemSpeechEngineButton.classList.remove("active");
        // 显示自定义 TTS 面板，隐藏系统 TTS 面板
        systemSpeechEnginePanel.style.display = "none";
        customSpeechEnginePanel.style.display = "block";
    }
};
/**
 * 获取系统时间
 *
 * 返回格式化的时间字符串，例如：2025-06-28 14:30
 */
function getSystemTime() {
    /**
     * 创建一个 Date 对象，用于获取当前时间
     */
    const now = new Date();
    /**
     * 获取年份
     */
    const year = now.getFullYear();
    /**
     * 获取月份并补零
     */
    const month = String(now.getMonth() + 1).padStart(2, "0");
    /**
     * 获取日期并补零
     */
    const day = String(now.getDate()).padStart(2, "0");
    /**
     * 获取小时并补零
     */
    const hours = String(now.getHours()).padStart(2, "0");
    /**
     * 获取分钟并补零
     */
    const minutes = String(now.getMinutes()).padStart(2, "0");
    // 拼接并返回时间字符串
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};
/**
 * 提取文章的结论
 *
 * 该函数会尝试从给定的文本内容中提取文章的结论部分。
 *
 * 它首先会尝试匹配包含<think>标签的推理过程部分，提取标签后的内容作为结论。
 *
 * 如果没有找到<think>标签，会尝试匹配包含特定HTML类名的结论部分，提取其中的文本内容。
 *
 * 如果仍然没有找到符合格式的结论部分，会返回原始文本内容。
 *
 * @param {string} content - 包含推理过程和结论的文本内容
 *
 * @returns {string} 提取到的结论文本内容

 */
function extractConclusion(content) {
    /**
     * 尝试匹配 <think> 标签
     */
    const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>([\s\S]*)/);
    // 如果匹配成功，返回匹配到的结论部分
    if (thinkMatch) return thinkMatch[2].trim();
    /**
     * 尝试匹配思考区块的HTML结构
     */
    const conclusionMatch = content.match(/<div class="conclusion">([\s\S]*?)<\/div>/i);
    // 如果匹配成功，返回移除HTML标签，只保留文本内容
    if (conclusionMatch) return conclusionMatch[1].replace(/<[^>]*>/g, "").trim();
    // 如果没有找到特定格式，返回整个内容
    return content;
};

/**
 * 处理<think>标签
 *
 * @param {string} content - 输入的文本内容
 *
 * @returns {string} 处理后的文本内容
 */
function processThinkTags(content) {
    /**
     * 思考过程正则表达式
     */
    const thinkRegex = /<think>([\s\S]*?)<\/think>([\s\S]*)/;
    /**
     * 使用正则表达式匹配<think>标签
     */
    const match = content.match(thinkRegex);
    /**
     * 已处理内容
     */
    let processedContent = "";
    // 如果匹配到<think>标签
    if (match) {
        /**
         * 获取深度思考的内容
         */
        const thinkContent = match[1];
        /**
         * 获取结论的内容
         */
        const conclusion = match[2];
        /**
         * 使用marked库将思考过程渲染为HTML
         */
        const renderedThink = marked.parse(thinkContent);
        /**
         * 使用marked库将结论渲染为HTML
         */
        const renderedConclusion = marked.parse(conclusion);
        // 构建HTML结构
        processedContent = `
            <div class="think-block">
                <div class="think-header">
                    <span><i class="fas fa-lightbulb think-icon"></i> 推理过程</span>
                    <button class="toggle-think">折叠</button>
                </div>
                <div class="think-content">
                    ${renderedThink}
                </div>
            </div>
            <div class="conclusion">
                ${renderedConclusion}
            </div>
        `;
    }
    // 如果没有<think>标签，直接渲染整个内容
    else processedContent = marked.parse(content);
    // 添加表格类名 - 新增代码
    processedContent = processedContent.replace(
        /<table(\s[^>]*)?>/gi,
        (match, attrs) => `<table class="markdown-table" ${attrs || ""}>`
    );
    // 导出处理结果
    return processedContent;
}

/**
 * 清理文本，用于语音合成
 *
 * @param {string} text - 输入的文本
 *
 * @returns {string} - 清理后的文本
 */
function cleanTextForTTS(text) {
    // 如果文本为空，直接返回空字符串
    if (!text) return "";
    /**
     * 移除括号内的内容
     */
    let cleanedText = text.replace(/\([^)]*\)/g, "");
    // 移除尖括号标签及其内容
    cleanedText = cleanedText.replace(/<[^>]+>/g, "");
    // 移除Markdown代码块
    cleanedText = cleanedText.replace(/```[\s\S]*?```/g, "");
    // 移除Markdown图像
    cleanedText = cleanedText.replace(/!\[.*?\]\(.*?\)/g, "");
    // 清理多余空格
    return cleanedText.replace(/\s{2,}/g, " ").trim();
};

/**
 * 绑定思考区块折叠按钮的点击事件
 *
 * @param {HTMLElement} container - 包含折叠按钮的容器元素
 */
function bindThinkToggleEvents(container) {
    /**
     * 折叠按钮点击事件处理函数
     *
     * @param {HTMLElement} button 折叠按钮元素
     */
    function openBinding(button) {
        /**
         * 实际的点击事件回调函数，用于切换思考内容的折叠状态
         */
        function binding() {
            /**
             * 获取当前按钮所在思考区块的思考内容元素
             */
            const thinkContent = button.closest(".think-block").querySelector(".think-content");
            // 切换思考内容的折叠类名
            thinkContent.classList.toggle("collapsed");
            // 根据折叠状态更新按钮文本
            if (thinkContent.classList.contains("collapsed")) button.textContent = "展开";
            // 否则更新为折叠
            else button.textContent = "折叠";
        }
        // 为按钮添加点击事件监听器
        button.addEventListener("click", binding);
    }
    // 遍历容器内所有折叠按钮，并为其绑定点击事件
    container.querySelectorAll(".toggle-think").forEach(openBinding);
};

// 配置Marked解析器
marked.setOptions(
    {
        highlight: function (code, lang) {
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: "hljs language-",
    }
);
