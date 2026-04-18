function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatInlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|tel:[^\s)]+)\)/g,
      '<a href="$2">$1</a>'
    )
    .replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/___([^_]+)___/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
    .replace(/_([^_\n]+)_/g, "<em>$1</em>")
    .replace(/~~([^~]+)~~/g, "<del>$1</del>");
}

export function looksLikeMarkdown(value: string) {
  return /(^|\n)\s{0,3}(#{1,6}\s+|>\s+|[-*+]\s+|\d+\.\s+)|(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(__[^_]+__)|(\*[^*\n]+\*)|(_[^_\n]+_)/.test(
    value
  );
}

export function markdownToHtml(value: string) {
  const lines = value.replace(/\r\n/g, "\n").split("\n");
  const blocks: string[] = [];
  let paragraph: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let listItems: string[] = [];
  let quoteLines: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) {
      return;
    }

    blocks.push(`<p>${paragraph.join(" ")}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listType || !listItems.length) {
      listType = null;
      listItems = [];
      return;
    }

    blocks.push(`<${listType}>${listItems.join("")}</${listType}>`);
    listType = null;
    listItems = [];
  };

  const flushQuote = () => {
    if (!quoteLines.length) {
      return;
    }

    blocks.push(
      `<blockquote>${quoteLines.map((line) => `<p>${line}</p>`).join("")}</blockquote>`
    );
    quoteLines = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      flushQuote();
      continue;
    }

    const headingMatch = /^(#{1,4})\s+(.*)$/.exec(line);
    const bulletMatch = /^[-*+]\s+(.*)$/.exec(line);
    const orderedMatch = /^\d+\.\s+(.*)$/.exec(line);
    const quoteMatch = /^>\s?(.*)$/.exec(line);
    const ruleMatch = /^(-{3,}|\*{3,}|_{3,})$/.exec(line);

    if (headingMatch) {
      flushParagraph();
      flushList();
      flushQuote();

      const level = Math.min(4, headingMatch[1].length + 1);
      blocks.push(`<h${level}>${formatInlineMarkdown(headingMatch[2])}</h${level}>`);
      continue;
    }

    if (ruleMatch) {
      flushParagraph();
      flushList();
      flushQuote();
      blocks.push("<hr>");
      continue;
    }

    if (bulletMatch) {
      flushParagraph();
      flushQuote();

      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }

      listItems.push(`<li>${formatInlineMarkdown(bulletMatch[1])}</li>`);
      continue;
    }

    if (orderedMatch) {
      flushParagraph();
      flushQuote();

      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }

      listItems.push(`<li>${formatInlineMarkdown(orderedMatch[1])}</li>`);
      continue;
    }

    if (quoteMatch) {
      flushParagraph();
      flushList();
      quoteLines.push(formatInlineMarkdown(quoteMatch[1]));
      continue;
    }

    flushList();
    flushQuote();
    paragraph.push(formatInlineMarkdown(line));
  }

  flushParagraph();
  flushList();
  flushQuote();

  return blocks.join("");
}
