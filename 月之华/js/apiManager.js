// 测试连接并获取模型
async function testConnection() {
  const endpoint = apiEndpoint.value + "/v1/models";

  try {
    statusIndicator.className = "status-indicator status-warning";
    connectionStatusText.textContent = "连接中...";

    const response = await fetch(endpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`API返回错误: ${response.status}`);

    const data = await response.json();
    updateConnectionStatus(true);
    showApiStatus("连接成功！API服务正常。", "success");
    updateModelDropdown(data.data || []);
    return true;
  } catch (error) {
    console.error("连接测试失败:", error);
    updateConnectionStatus(false);
    showApiStatus(`连接失败: ${error.message}`, "error");
    return false;
  }
}

// 更新模型下拉框
function updateModelDropdown(models) {
  // 清空当前选项
  aiModel.innerHTML = "";

  // 添加新选项
  models.forEach((model) => {
    const option = document.createElement("option");
    option.value = model.id;
    option.textContent = model.id;
    aiModel.appendChild(option);
  });

  // 如果之前有选中的模型，尝试选中它
  const currentConfig = getCurrentConfig();
  if (currentConfig.model) {
    const optionToSelect = Array.from(aiModel.options).find(
      (option) => option.value === currentConfig.model
    );
    if (optionToSelect) {
      optionToSelect.selected = true;
      currentModel.textContent = currentConfig.model;
    }
  }

  // 如果没有选中任何模型，选择第一个
  if (!aiModel.value && models.length > 0) {
    aiModel.value = models[0].id;
    currentModel.textContent = models[0].id;
  }

  showApiStatus(`已加载 ${models.length} 个可用模型`, "success");
}
