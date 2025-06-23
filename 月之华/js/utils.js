// 提取结论部分
function extractConclusion(content) {
  // 尝试匹配 <think> 标签
  const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>([\s\S]*)/);
  if (thinkMatch) {
    return thinkMatch[2].trim();
  }

  // 尝试匹配思考区块的HTML结构
  const conclusionMatch = content.match(
    /<div class="conclusion">([\s\S]*?)<\/div>/i
  );
  if (conclusionMatch) {
    // 移除HTML标签，只保留文本内容
    return conclusionMatch[1].replace(/<[^>]*>/g, "").trim();
  }

  // 如果没有找到特定格式，返回整个内容
  return content;
}

// 处理<think>标签
function processThinkTags(content) {
  // 使用正则表达式匹配<think>标签
  const thinkRegex = /<think>([\s\S]*?)<\/think>([\s\S]*)/;
  const match = content.match(thinkRegex);

  let processedContent = "";

  if (match) {
    const thinkContent = match[1];
    const conclusion = match[2];

    // 使用Markdown渲染推理内容
    const renderedThink = marked.parse(thinkContent);
    const renderedConclusion = marked.parse(conclusion);

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
  } else {
    // 如果没有<think>标签，直接渲染整个内容
    processedContent = marked.parse(content);
  }
  // 确保mermaid图表被正确包装
  processedContent = processedContent.replace(
    /```mermaid([\s\S]*?)```/g,
    '<div class="mermaid">$1</div>'
  );

  // 添加表格类名 - 新增代码
  processedContent = processedContent.replace(
    /<table(\s[^>]*)?>/gi,
    (match, attrs) => `<table class="markdown-table" ${attrs || ""}>`
  );

  return processedContent;
}

// 清理文本用于TTS（移除括号和尖括号内容）
function cleanTextForTTS(text) {
  if (!text) return "";
  // 移除括号内的内容
  let cleanedText = text.replace(/\([^)]*\)/g, "");
  // 移除尖括号标签及其内容
  cleanedText = cleanedText.replace(/<[^>]+>/g, "");
  // 移除Markdown代码块
  cleanedText = cleanedText.replace(/```[\s\S]*?```/g, "");
  // 移除Markdown图像
  cleanedText = cleanedText.replace(/!\[.*?\]\(.*?\)/g, "");
  // 清理多余空格
  return cleanedText.replace(/\s{2,}/g, " ").trim();
}

// 绑定折叠按钮事件
function bindThinkToggleEvents(container) {
  container.querySelectorAll(".toggle-think").forEach((button) => {
    button.addEventListener("click", function () {
      const thinkContent =
        this.closest(".think-block").querySelector(".think-content");
      thinkContent.classList.toggle("collapsed");

      if (thinkContent.classList.contains("collapsed")) {
        this.textContent = "展开";
      } else {
        this.textContent = "折叠";
      }
    });
  });
}

// 设置当前日期
function setCurrentDate() {
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  document.getElementById("currentDate").textContent = formattedDate;
}

// 配置Marked解析器
marked.setOptions({
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-",
});
