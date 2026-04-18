"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Redo2,
  Underline as UnderlineIcon,
  Undo2,
  Unlink
} from "lucide-react";
import { isRichTextEmpty } from "@/lib/blog-content";
import { looksLikeMarkdown, markdownToHtml } from "@/lib/markdown";
import { cn } from "@/lib/utils";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type CommandState = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  bulletList: boolean;
  orderedList: boolean;
  blockquote: boolean;
  h2: boolean;
  h3: boolean;
};

const defaultCommandState: CommandState = {
  bold: false,
  italic: false,
  underline: false,
  bulletList: false,
  orderedList: false,
  blockquote: false,
  h2: false,
  h3: false
};

function normalizeEditorHtml(value: string) {
  return value
    .replace(/<(div|p)><br><\/\1>/g, "")
    .replace(/^<br>$/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function ToolbarButton({
  label,
  active = false,
  onClick,
  children
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      data-active={active}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={cn(
        "rounded-xl border px-3 py-2 text-sm font-medium transition",
        active
          ? "border-[#2D5016] bg-[#EAF7E6] text-[#2D5016]"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
      )}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write the article content"
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [commandState, setCommandState] = useState(defaultCommandState);

  const refreshCommandState = useCallback(() => {
    const editor = editorRef.current;
    const selection = document.getSelection();

    if (!editor || !selection || !editor.contains(selection.anchorNode)) {
      setCommandState(defaultCommandState);
      return;
    }

    try {
      const formatBlock = String(document.queryCommandValue("formatBlock") || "")
        .replace(/[<>]/g, "")
        .toLowerCase();

      setCommandState({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        bulletList: document.queryCommandState("insertUnorderedList"),
        orderedList: document.queryCommandState("insertOrderedList"),
        blockquote: formatBlock === "blockquote",
        h2: formatBlock === "h2",
        h3: formatBlock === "h3"
      });
    } catch {
      setCommandState(defaultCommandState);
    }
  }, []);

  const emitChange = useCallback(() => {
    const nextValue = normalizeEditorHtml(editorRef.current?.innerHTML ?? "");

    if (nextValue !== value) {
      onChange(nextValue);
    }

    refreshCommandState();
  }, [onChange, refreshCommandState, value]);

  useEffect(() => {
    try {
      document.execCommand("styleWithCSS", false, "false");
      document.execCommand("defaultParagraphSeparator", false, "p");
    } catch {
      // Browser support for execCommand varies; content editing still works.
    }
  }, []);

  useEffect(() => {
    const editor = editorRef.current;

    if (!editor) {
      return;
    }

    const nextValue = value.trim();

    if (normalizeEditorHtml(editor.innerHTML) !== nextValue) {
      editor.innerHTML = nextValue;
    }
  }, [value]);

  useEffect(() => {
    const handleSelectionChange = () => refreshCommandState();

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, [refreshCommandState]);

  const runCommand = useCallback(
    (command: string, commandValue?: string) => {
      editorRef.current?.focus();
      document.execCommand(command, false, commandValue);
      emitChange();
    },
    [emitChange]
  );

  const applyBlock = useCallback(
    (tagName: "P" | "H2" | "H3" | "BLOCKQUOTE") => {
      runCommand("formatBlock", `<${tagName.toLowerCase()}>`);
    },
    [runCommand]
  );

  const setLink = useCallback(() => {
    const currentValue = String(document.queryCommandValue("createLink") || "");
    const url = window.prompt("Enter the link URL", currentValue || "https://");

    if (url === null) {
      return;
    }

    if (!url.trim()) {
      runCommand("unlink");
      return;
    }

    runCommand("createLink", url.trim());
  }, [runCommand]);

  return (
    <div className="space-y-3">
      <div className="rich-editor-shell">
        <div className="rich-editor-toolbar">
          <ToolbarButton
            label="Paragraph"
            active={!commandState.h2 && !commandState.h3 && !commandState.blockquote}
            onClick={() => applyBlock("P")}
          >
            <Pilcrow className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Heading 2" active={commandState.h2} onClick={() => applyBlock("H2")}>
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Heading 3" active={commandState.h3} onClick={() => applyBlock("H3")}>
            <Heading3 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Bold" active={commandState.bold} onClick={() => runCommand("bold")}>
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Italic" active={commandState.italic} onClick={() => runCommand("italic")}>
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Underline"
            active={commandState.underline}
            onClick={() => runCommand("underline")}
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Bullet list"
            active={commandState.bulletList}
            onClick={() => runCommand("insertUnorderedList")}
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Numbered list"
            active={commandState.orderedList}
            onClick={() => runCommand("insertOrderedList")}
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Blockquote"
            active={commandState.blockquote}
            onClick={() => applyBlock("BLOCKQUOTE")}
          >
            <Quote className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Add link" onClick={setLink}>
            <Link2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Remove link" onClick={() => runCommand("unlink")}>
            <Unlink className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Undo" onClick={() => runCommand("undo")}>
            <Undo2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton label="Redo" onClick={() => runCommand("redo")}>
            <Redo2 className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <div className="rich-editor-content">
          <div className="relative">
            {isRichTextEmpty(value) ? (
              <div className="rich-editor-placeholder">{placeholder}</div>
            ) : null}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="prose-content rich-editor-surface"
              onInput={emitChange}
              onBlur={emitChange}
              onKeyUp={refreshCommandState}
              onMouseUp={refreshCommandState}
              onPaste={(event) => {
                const text = event.clipboardData.getData("text/plain");

                if (!text.trim()) {
                  return;
                }

                event.preventDefault();

                if (looksLikeMarkdown(text)) {
                  document.execCommand("insertHTML", false, markdownToHtml(text));
                } else {
                  document.execCommand("insertText", false, text);
                }

                emitChange();
              }}
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500">
        On desktop the article body scrolls inside the editor, so the controls stay visible until you reach the end of the content panel. Pasted markdown is converted into formatted rich text automatically.
      </p>
    </div>
  );
}
