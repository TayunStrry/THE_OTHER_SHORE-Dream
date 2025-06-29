/**
 * 测试连接并获取推理模型列表
 *
 * @returns {Promise<boolean>} 返回一个 Promise，表示连接是否成功
 */
async function testConnection() {
	/**
	 * 拼接 API 地址
	 */
	const endpoint = apiEndpointReasoningModel.value + "/models";
	try {
		// 设置状态指示器为“警告”状态（连接中）
		statusIndicator.className = "status-indicator status-warning";
		// 更新连接状态文本
		connectionStatusText.textContent = "连接中...";
		/**
		 * 发送 GET 请求到 API 地址
		 */
		const response = await fetch(endpoint,
			{
				method: "GET",
				headers: {
					"Authorization": "Bearer " + encodeURIComponent(document.getElementById("apiKeyReasoningModel").value),
					"Content-Type": "application/json"
				},
			}
		);
		// 如果响应不成功，抛出错误
		if (!response.ok) throw new Error(`API返回错误: ${response.status}`);
		/**
		 * 获取 API 返回的数据 并 解析 JSON 响应数据
		 */
		const data = await response.json();
		// 更新连接状态为成功
		updateConnectionStatus(true);
		// 显示 API 连接成功的提示信息
		showsystemStatusDisplayPanel("连接成功！API服务正常。", "success");
		// 更新下拉菜单中的模型选项
		updateModelDropdown(data.data || []);
		// 返回获取成功
		return true;
	}
	catch (error) {
		// 捕获并处理错误，输出错误日志
		console.error("连接测试失败:", error);
		// 更新连接状态为失败
		updateConnectionStatus(false);
		// 显示 API 连接失败的提示信息
		showsystemStatusDisplayPanel(`连接失败: ${error.message}`, "error");
		// 返回获取失败
		return false;
	}
};
// 更新模型下拉框内容
function updateModelDropdown(models) {
	// 清空当前下拉框的所有选项
	reasoningModelDropdown.innerHTML = "";
	// 遍历模型列表，为每个模型创建 option 元素并添加到下拉框中
	models.forEach(
		model => {
			/**
			 * 创建一个 option 元素
			 */
			const option = document.createElement("option");
			// 设置选项的值为模型 ID
			option.value = model.id;
			// 设置选项显示的文字为模型 ID
			option.textContent = model.id;
			// 将新选项添加到下拉框中
			reasoningModelDropdown.appendChild(option);
		}
	);
	/**
	 * 获取当前配置信息
	 */
	const currentConfig = getCurrentConfig();
	// 如果当前配置中存在已选中的模型，则尝试在下拉框中找到对应的选项并选中
	if (currentConfig.model) {
		/**
		 * 获取当前配置中已选中的模型名称
		 */
		const optionToSelect = Array.from(reasoningModelDropdown.options).find(option => option.value === currentConfig.model);
		// 如果找到匹配的选项，则将其设为选中状态，并更新界面上显示的当前模型名称
		if (optionToSelect) {
			optionToSelect.selected = true;
			currentModel.textContent = currentConfig.model;
		}
	}
	// 如果当前没有选中的模型，并且模型列表不为空，则默认选中第一个模型
	if (!reasoningModelDropdown.value && models.length > 0) {
		// 设置第一个模型为选中项
		reasoningModelDropdown.value = models[0].id;
		// 更新界面上显示的当前模型名称
		currentModel.textContent = models[0].id;
	}
	// 显示加载模型成功的提示信息
	showsystemStatusDisplayPanel(`已加载 ${models.length} 个可用模型`, "success");
};