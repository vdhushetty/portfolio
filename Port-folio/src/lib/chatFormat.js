const codeLanguages = new Set([
  "bash",
  "c",
  "cpp",
  "csharp",
  "css",
  "dockerfile",
  "go",
  "hcl",
  "html",
  "java",
  "javascript",
  "js",
  "json",
  "jsx",
  "kotlin",
  "markdown",
  "md",
  "plaintext",
  "powershell",
  "py",
  "python",
  "r",
  "rust",
  "scala",
  "shell",
  "sql",
  "terraform",
  "text",
  "ts",
  "tsx",
  "typescript",
  "xml",
  "yaml",
  "yml",
]);

function readCodeFence(rawFence) {
  let content = String(rawFence || "")
    .replace(/^\r?\n/, "")
    .replace(/\r?\n$/, "");
  let language = "";
  const newline = content.indexOf("\n");

  if (newline >= 0) {
    const candidate = content.slice(0, newline).trim().toLowerCase();
    if (codeLanguages.has(candidate)) {
      language = candidate;
      content = content.slice(newline + 1);
    }
  } else {
    const inline = content.match(/^\s*([a-z0-9_+#.-]+)\s+([\s\S]+)$/i);
    if (inline && codeLanguages.has(inline[1].toLowerCase())) {
      language = inline[1].toLowerCase();
      content = inline[2];
    }
  }

  return { type: "code", language, content };
}

export function parseMessageParts(value) {
  const text = String(value || "");
  const parts = [];
  const fences = /```([\s\S]*?)```/g;
  let cursor = 0;
  let match;

  while ((match = fences.exec(text))) {
    if (match.index > cursor) {
      parts.push({ type: "text", content: text.slice(cursor, match.index) });
    }
    parts.push(readCodeFence(match[1]));
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) {
    parts.push({ type: "text", content: text.slice(cursor) });
  }

  return parts.length ? parts : [{ type: "text", content: text }];
}

export function codeLanguageLabel(language) {
  const labels = {
    js: "JavaScript",
    jsx: "JSX",
    py: "Python",
    ts: "TypeScript",
    tsx: "TSX",
    yml: "YAML",
  };
  return labels[language] || (language ? language.toUpperCase() : "Code");
}
