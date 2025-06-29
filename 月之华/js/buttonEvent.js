// TODO : 绑定 角色聊天面板 按钮点击事件
document.getElementById("switchChatInteractionInterface").addEventListener('click',
    () => {
        if (!displayChatInteractionInterface) {
            // 显示输入框
            document.getElementById("characterInteractionChatInterface").style.display = "flex"
            // 变更按钮样式
            document.getElementById("switchChatInteractionInterface").classList.add("clicking");
            // 改变全局变量
            displayChatInteractionInterface = true;
        }
        else {
            // 隐藏输入框
            document.getElementById("characterInteractionChatInterface").style.display = "none"
            // 变更按钮样式
            document.getElementById("switchChatInteractionInterface").classList.remove("clicking");
            // 改变全局变量
            displayChatInteractionInterface = false;
        }
    }
);
// TODO : 绑定 内部通讯面板 按钮点击事件
document.getElementById("moduleInteractionButton").addEventListener('click',
    () => {
        if (!displayModuleInteractionPanel) {
            // 显示内部模块通讯
            document.getElementById("moduleInteractionPanel").style.display = "flex"
            // 变更按钮样式
            document.getElementById("moduleInteractionButton").classList.add("clicking");
            // 改变全局变量
            displayModuleInteractionPanel = true;
        }
        else {
            // 隐藏内部模块通讯
            document.getElementById("moduleInteractionPanel").style.display = "none"
            // 变更按钮样式
            document.getElementById("moduleInteractionButton").classList.remove("clicking");
            // 改变全局变量
            displayModuleInteractionPanel = false;
        }
    }
);
// TODO : 绑定 显示配置面板 按钮点击事件
document.getElementById("configurePanelButton").addEventListener('click',
    () => {
        if (!displayConfigurePanel) {
            // 显示配置面板
            reasoningModelConfigurationPanel.style.display = "flex";
            speechModelConfigurationPanel.style.display = "flex";
            // 变更按钮样式
            document.getElementById("configurePanelButton").classList.add("clicking");
            // 改变全局变量
            displayConfigurePanel = true;
        }
        else {
            // 隐藏配置面板
            reasoningModelConfigurationPanel.style.display = "none";
            speechModelConfigurationPanel.style.display = "none";
            // 变更按钮样式
            document.getElementById("configurePanelButton").classList.remove("clicking");
            // 改变全局变量
            displayConfigurePanel = false;
        }
    }
);
// TODO : 绑定 包含历史记录 按钮点击事件
document.getElementById("includeHistoryButton").addEventListener('click',
    () => {
        if (!isIncludeHistory) {
            // 变更按钮样式
            document.getElementById("includeHistoryButton").classList.remove("disable");
            // 改变全局变量
            isIncludeHistory = true;
        }
        else {
            // 变更按钮样式
            document.getElementById("includeHistoryButton").classList.add("disable");
            // 改变全局变量
            isIncludeHistory = false;
        }
    }
);
// TODO : 绑定 禁用深度思考 按钮点击事件
document.getElementById("disableThinkingButton").addEventListener('click',
    () => {
        if (!isDisableThinking) {
            // 变更按钮样式
            document.getElementById("disableThinkingButton").classList.add("clicking");
            // 改变全局变量
            isDisableThinking = true;
        }
        else {
            // 变更按钮样式
            document.getElementById("disableThinkingButton").classList.remove("clicking");
            // 改变全局变量
            isDisableThinking = false;
        };
        // 显示功能提示
        showsystemStatusDisplayPanel("禁用深度思考 : " + isDisableThinking, "success");
    }
);
// TODO : 绑定 角色模式切换 按钮点击事件
interactiveModeSwitchingButton.addEventListener("click",
    async function () {
        // 如果是切换到角色模式，则自动测试连接
        if (!displayVtuberMode && !isConnected) {
            // 禁用按钮
            interactiveModeSwitchingButton.disabled = true;
            // 显示加载动画
            interactiveModeSwitchingButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 连接中...';
            try {
                // 执行测试连接 并 等待测试结果
                await testConnection();
                // 如果连接失败，则显示错误信息
                if (!isConnected) {
                    // 恢复按钮
                    interactiveModeSwitchingButton.disabled = false;
                    // 恢复按钮样式
                    interactiveModeSwitchingButton.innerHTML = '<i class="fas fa-user-astronaut"></i><span>角色模式</span>';
                    // 退出函数
                    return;
                }
            }
            catch (error) {
                // 恢复按钮
                interactiveModeSwitchingButton.disabled = false;
                // 恢复按钮样式
                interactiveModeSwitchingButton.innerHTML = '<i class="fas fa-user-astronaut"></i><span>角色模式</span>';
                // 退出函数
                return;
            }
        }
        // 切换角色模式
        displayVtuberMode = !displayVtuberMode;
        // TODO : 点击角色模式后隐藏与显示布局组件
        if (displayVtuberMode) {
            // 显示角色模式布局
            if (!displayConfigurePanel) reasoningModelConfigurationPanel.style.display = "none";
            if (!displayConfigurePanel) speechModelConfigurationPanel.style.display = "none";
            conversationAndHistoryPanel.style.display = "none";
            characterInteractionPanel.style.display = "flex";
            // 改变按钮样式
            interactiveModeSwitchingButton.innerHTML = '<i class="fas fa-cog"></i><span>聊天模式</span>';
            interactiveModeSwitchingButton.classList.add("active");
            // 设置角色模式状态为空闲
            setVtuberState(VTUBER_STATES.IDLE);
        }
        else {
            // 显示聊天模式布局
            reasoningModelConfigurationPanel.style.display = "flex";
            speechModelConfigurationPanel.style.display = "flex";
            conversationAndHistoryPanel.style.display = "flex";
            characterInteractionPanel.style.display = "none";
            // 改变按钮样式
            interactiveModeSwitchingButton.innerHTML = '<i class="fas fa-user-astronaut"></i><span>角色模式</span>';
            interactiveModeSwitchingButton.classList.remove("active");
        }
        // 恢复按钮
        interactiveModeSwitchingButton.disabled = false;
    }
);
// TODO : 绑定 切换 暗色模式 和 亮色模式 按钮点击事件
darkLightSwitchButton.addEventListener("click",
    () => {
        // 切换页面主体的暗色模式类名
        document.body.classList.toggle("dark-mode");
        /**
         * 获取当前是否为暗色模式
         */
        const isDarkMode = document.body.classList.contains("dark-mode");
        // 存储当前主题到本地存储中
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
        // 更新按钮图标
        darkLightSwitchButton.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
);
// TODO : 绑定 保存配置功能 按钮点击事件
saveConfigButton.addEventListener("click",
    () => {
        /**
         * 获取当前配置
         */
        const config = getCurrentConfig();
        // 配置JSON
        configJson.value = JSON.stringify(config, null, 2);
        configName.value = "";
        saveModal.style.display = "flex";
        configName.focus();
    }
);
// TODO : 绑定 导入配置 按钮点击事件
importConfigButton.addEventListener("click",
    () => {
        importModal.style.display = "flex";
        importConfigJson.value = "";
        importConfigJson.focus();
    }
);
// TODO : 绑定 保存配置 按钮点击事件
confirmSaveButton.addEventListener("click",
    () => {
        const name = configName.value.trim();
        if (!name) {
            alert("请输入配置名称");
            return;
        }
        saveConfigToStorage(name);
        saveModal.style.display = "none";
    }
);
// TODO : 绑定 导入配置 按钮点击事件
confirmImportButton.addEventListener("click",
    () => {
        try {
            const config = JSON.parse(importConfigJson.value);
            applyConfigToUI(config);
            importModal.style.display = "none";
            showsystemStatusDisplayPanel("配置导入成功！", "success");
        }
        catch (e) {
            showsystemStatusDisplayPanel("无效的配置JSON", "error");
        }
    }
);
// TODO : 绑定 关闭模态框 按钮点击事件
document.querySelectorAll(".close-modal").forEach(
    button => {
        // TODO : 绑定 关闭模态框 按钮点击事件
        button.addEventListener("click",
            () => {
                saveModal.style.display = "none";
                importModal.style.display = "none";
            }
        );
    }
);
// TODO : 绑定 导出聊天记录 按钮点击事件
document.getElementById("exportChatHistory").addEventListener("click",
    () => {
        try {
            /**
             * 创建包含聊天记录和元数据的对象
             */
            const chatData = {
                meta: {
                    // 记录当前聊天记录的导出时间，使用 ISO 格式
                    exportedAt: new Date().toISOString(),
                    // 定义导出数据的版本号
                    version: "1.0"
                },
                // 获取当前输入的系统提示词
                systemPrompt: inputSystemPrompt.value,
                // 获取当前的聊天记录
                history: conversationHistory
            };
            /**
             * 将包含聊天记录和元数据的对象转换为格式化的 JSON 字符串
             */
            const dataStr = JSON.stringify(chatData, null, 2);
            /**
             * 创建一个 Blob 对象，用于存储 JSON 格式的聊天记录数据
             */
            const blob = new Blob([dataStr], { type: "application/json" });
            /**
             * 为 Blob 对象创建一个临时的 URL
             */
            const url = URL.createObjectURL(blob);
            /**
             * 创建一个 <a> 元素，用于触发文件下载
             */
            const a = document.createElement("a");
            // 设置 <a> 元素的链接为临时 URL
            a.href = url;
            // 设置下载文件的名称，包含当前系统时间
            a.download = `聊天记录_${getSystemTime()}.json`;
            // 将 <a> 元素添加到页面中
            document.body.appendChild(a);
            // 模拟点击 <a> 元素，触发文件下载
            a.click();
            // 清理操作：移除临时创建的 <a> 元素
            setTimeout(() => document.body.removeChild(a), 0);
            // 清理操作：释放临时创建的 URL
            setTimeout(() => URL.revokeObjectURL(url), 0);
            // 显示系统状态提示，通知用户聊天记录导出成功
            showsystemStatusDisplayPanel("聊天记录导出成功！", "success");
        }
        catch (error) {
            // 将导出失败的错误信息打印到控制台，方便调试
            console.error("导出聊天记录失败:", error);
            // 显示系统状态提示，通知用户导出失败并包含错误信息
            showsystemStatusDisplayPanel("导出失败: " + error.message, "error");
        }
    }
);
// TODO : 绑定 导入聊天记录 按钮点击事件
// 绑定 导入聊天记录 按钮的点击事件
document.getElementById("importChatHistory").addEventListener("click",
    () => {
        /**
         * 创建一个文件输入元素，用于选择要导入的文件
         */
        const input = document.createElement('input');
        // 设置输入元素的类型为文件选择
        input.type = 'file';
        // 限制只能选择JSON格式的文件
        input.accept = '.json';
        // 定义文件选择变化时的回调函数
        input.onchange = function (event) {
            /**
             * 获取用户选择的文件
             */
            const file = event.target.files[0];
            // 如果用户没有选择文件，则直接返回
            if (!file) return;
            /**
             * 创建一个文件读取器实例
             */
            const reader = new FileReader();
            // 定义文件读取完成时的回调函数
            reader.onload = function (e) {
                try {
                    /**
                     * 将读取的文件内容解析为JSON对象
                     */
                    const chatData = JSON.parse(e.target.result);
                    // 验证文件格式，确保包含history字段且为数组类型
                    if (!chatData.history || !Array.isArray(chatData.history)) throw new Error("无效的聊天记录格式");
                    // 如果文件中包含系统提示词，则更新界面上的系统提示词
                    if (chatData.systemPrompt) {
                        inputSystemPrompt.value = chatData.systemPrompt;
                        displayedSystemPrompt.textContent = chatData.systemPrompt;
                    }
                    // 用导入的聊天记录替换当前的聊天记录
                    conversationHistory = chatData.history;
                    // 重新渲染聊天记录界面
                    renderAllMessages();
                    // 显示导入成功的提示信息
                    showsystemStatusDisplayPanel("聊天记录导入成功！", "success");
                }
                catch (error) {
                    // 打印导入失败的错误信息到控制台
                    console.error("导入聊天记录失败:", error);
                    // 显示导入失败的提示信息，包含错误详情
                    showsystemStatusDisplayPanel("导入失败: " + error.message, "error");
                }
            };
            // 以文本格式读取选择的文件
            reader.readAsText(file);
        };
        // 触发文件选择对话框
        input.click();
    }
);
// TODO : 绑定 角色互动模式 聊天输入按钮点击事件
characterInteractionChatInputButton.addEventListener("click", () => sendChatMessageToBackendModel());
// TODO : 绑定 常规聊天模式 聊天输入按钮点击事件
generalStatusChatInputButton.addEventListener("click", () => sendChatMessageToBackendModel());
// TODO : 绑定 自定义语音引擎 按钮点击事件
customSpeechEngineButton.addEventListener("click", () => switchSpeechEngineMode("custom"));
// TODO : 绑定 系统语音引擎 按钮点击事件
systemSpeechEngineButton.addEventListener("click", () => switchSpeechEngineMode("system"));
// TODO : 绑定 连接测试 按钮点击事件
testConnectionBtnton.addEventListener("click", () => testConnection());
// TODO : 绑定 清空系统提示 按钮点击事件
clearSystemPromptBtton.addEventListener("click", () => clearSystemPrompt());
// TODO : 绑定 播放TTS 按钮点击事件
playSpeechModelBtton.addEventListener("click", () => playSpeechModel(speechModelText.value.trim()));
// TODO : 绑定 停止TTS 按钮点击事件
stopSpeechModelButton.addEventListener("click", () => stopSpeechModel());
// TODO : 绑定 取消保存 按钮点击事件
cancelSaveButton.addEventListener("click", () => (saveModal.style.display = "none"));
// TODO : 绑定 取消导入 按钮点击事件
cancelImportButton.addEventListener("click", () => importModal.style.display = "none");
// TODO : 绑定 删除所有配置 按钮点击事件
deleteAllConfigsButton.addEventListener("click", () => deleteAllConfigs());