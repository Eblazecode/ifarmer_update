function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function paragraphsToHtml(paragraphs: string[]) {
  return paragraphs
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

export function normalizeBlogContent(value?: string | string[] | null) {
  if (Array.isArray(value)) {
    return paragraphsToHtml(value);
  }

  return typeof value === "string" ? value.trim() : "";
}

export function isRichTextEmpty(value?: string | null) {
  const plainText = (value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return plainText.length === 0;
}

export function normalizeBlogPost<T extends { content?: string | string[] | null }>(
  post: T
) {
  return {
    ...post,
    content: normalizeBlogContent(post.content)
  };
}

export function normalizeBlogPosts<T extends { content?: string | string[] | null }>(
  posts: T[]
) {
  return posts.map((post) => normalizeBlogPost(post));
}
