const allowedFiles = new Set([
  "README.md",
  "codex_handbook.md",
  "codex.md",
  "codex_concepts.md",
  "prompt_template.md",
  "14_models.md",
]);

const defaultTitles = {
  "README.md": "Codex 文档导航",
  "codex_handbook.md": "Codex 中文手册",
  "codex.md": "Codex 使用指南",
  "codex_concepts.md": "Codex 相关概念与理解",
  "prompt_template.md": "Codex 提示词模板",
  "14_models.md": "14 个模型节点优缺点",
};

const pageTitleEl = document.getElementById("page-title");
const contentEl = document.getElementById("content");
const rawLinkEl = document.getElementById("raw-link");

const params = new URLSearchParams(window.location.search);
const file = params.get("file") || "README.md";
const title = params.get("title") || defaultTitles[file] || file;

if (!allowedFiles.has(file)) {
  pageTitleEl.textContent = "无法打开文档";
  contentEl.innerHTML = "<p>不支持的文档路径。</p>";
} else {
  pageTitleEl.textContent = title;
  rawLinkEl.href = `./${file}`;
  document.title = `${title} | Codex 文档阅读器`;
  loadMarkdown(file);
}

async function loadMarkdown(targetFile) {
  try {
    const response = await fetch(`./${targetFile}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const markdown = await response.text();
    contentEl.innerHTML = renderMarkdown(markdown);
  } catch (error) {
    contentEl.innerHTML = `<p>文档加载失败：${escapeHtml(String(error.message || error))}</p>`;
  }
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (!line.trim()) {
      continue;
    }

    if (/^```/.test(line)) {
      const language = line.slice(3).trim();
      const block = [];
      i += 1;

      while (i < lines.length && !/^```/.test(lines[i])) {
        block.push(lines[i]);
        i += 1;
      }

      html.push(
        `<pre><code class="language-${escapeHtml(language)}">${escapeHtml(block.join("\n"))}</code></pre>`
      );
      continue;
    }

    if (/^\|.+\|$/.test(line) && isTableDivider(lines[i + 1] || "")) {
      const headers = splitTableRow(line);
      const rows = [];
      i += 2;

      while (i < lines.length && /^\|.+\|$/.test(lines[i])) {
        rows.push(splitTableRow(lines[i]));
        i += 1;
      }

      i -= 1;
      html.push(renderTable(headers, rows));
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);

    if (headingMatch) {
      const level = headingMatch[1].length;
      html.push(`<h${level}>${renderInline(headingMatch[2])}</h${level}>`);
      continue;
    }

    if (/^---+$/.test(line.trim()) || /^\*\*\*+$/.test(line.trim())) {
      html.push("<hr>");
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items = [];

      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i += 1;
      }

      i -= 1;
      html.push(`<ol>${items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ol>`);
      continue;
    }

    if (/^-\s+/.test(line)) {
      const items = [];

      while (i < lines.length && /^-\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^-\s+/, ""));
        i += 1;
      }

      i -= 1;
      html.push(`<ul>${items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`);
      continue;
    }

    const paragraph = [line];

    while (
      i + 1 < lines.length &&
      lines[i + 1].trim() &&
      !/^(#{1,6})\s+/.test(lines[i + 1]) &&
      !/^```/.test(lines[i + 1]) &&
      !/^\|.+\|$/.test(lines[i + 1]) &&
      !/^\d+\.\s+/.test(lines[i + 1]) &&
      !/^-\s+/.test(lines[i + 1]) &&
      !/^---+$/.test(lines[i + 1].trim()) &&
      !/^\*\*\*+$/.test(lines[i + 1].trim())
    ) {
      paragraph.push(lines[i + 1]);
      i += 1;
    }

    html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
  }

  return html.join("\n");
}

function renderInline(text) {
  let output = escapeHtml(text);

  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const cleanHref = href.trim();

    if (cleanHref.endsWith(".md")) {
      const encodedFile = encodeURIComponent(cleanHref.replace(/^\.\//, ""));
      const encodedTitle = encodeURIComponent(label);
      return `<a href="./viewer.html?file=${encodedFile}&title=${encodedTitle}">${escapeHtml(label)}</a>`;
    }

    return `<a href="${escapeAttribute(cleanHref)}">${escapeHtml(label)}</a>`;
  });

  output = output.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  output = output.replace(/`([^`]+)`/g, "<code>$1</code>");

  return output;
}

function renderTable(headers, rows) {
  const thead = `<thead><tr>${headers.map((cell) => `<th>${renderInline(cell)}</th>`).join("")}</tr></thead>`;
  const tbody = `<tbody>${rows
    .map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`)
    .join("")}</tbody>`;

  return `<table>${thead}${tbody}</table>`;
}

function splitTableRow(row) {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableDivider(line) {
  return /^\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(line.trim());
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
