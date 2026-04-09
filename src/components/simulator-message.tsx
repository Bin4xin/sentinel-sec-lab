"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { SimStep } from "@/types/agent-data";
import { getLocalizedText } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { User, Bot, Terminal, ArrowRight, AlertCircle, Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";

interface SimulatorMessageProps {
  step: SimStep;
  index: number;
}

const TYPE_CONFIG: Record<
  string,
  { icon: typeof User; label: string; bgClass: string; borderClass: string }
> = {
  user_message: {
    icon: User,
    label: "User",
    bgClass: "bg-blue-500/10",
    borderClass: "border-blue-500/30",
  },
  assistant_text: {
    icon: Bot,
    label: "Assistant",
    bgClass: "bg-[var(--card-bg)]",
    borderClass: "border-[var(--card-border)]",
  },
  tool_call: {
    icon: Terminal,
    label: "Tool Call",
    bgClass: "bg-amber-500/10",
    borderClass: "border-amber-500/30",
  },
  tool_result: {
    icon: ArrowRight,
    label: "Tool Result",
    bgClass: "bg-emerald-500/10",
    borderClass: "border-emerald-500/30",
  },
  system_event: {
    icon: AlertCircle,
    label: "System",
    bgClass: "bg-purple-500/10",
    borderClass: "border-purple-500/30",
  },
};

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-2 rounded p-1 text-[var(--text-muted)] opacity-0 transition-opacity hover:text-[var(--foreground)] group-hover:opacity-100"
      title="Copy code"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

export function SimulatorMessage({ step }: SimulatorMessageProps) {
  const { locale } = useLocale();
  const config = TYPE_CONFIG[step.type] || TYPE_CONFIG.assistant_text;
  const Icon = config.icon;

  // Use CSS custom properties for theme-aware code highlighting
  // The SyntaxHighlighter theme is set to vs (light) by default
  // CSS overrides in globals.css handle dark mode colors
  const highlightStyle = vs;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "rounded-lg border p-3",
        config.bgClass,
        config.borderClass
      )}
    >
      {/* Header */}
      <div className="mb-1.5 flex items-center gap-2">
        <Icon size={14} className="shrink-0 text-[var(--text-muted)]" />
        <span className="text-xs font-medium text-[var(--text-muted)]">
          {config.label}
          {step.toolName && (
            <span className="ml-1.5 font-mono text-[var(--foreground)]">
              {step.toolName}
            </span>
          )}
        </span>
      </div>

      {/* Plain text content */}
      {step.content && (
        <>
          {step.type === "tool_call" || step.type === "tool_result" ? (
            <pre className="overflow-x-auto whitespace-pre-wrap rounded bg-[var(--background)] p-2.5 font-mono text-xs leading-relaxed text-[var(--foreground)]">
              {getLocalizedText(step.content, locale) || "(empty)"}
            </pre>
          ) : step.type === "system_event" ? (
            <pre className="overflow-x-auto whitespace-pre-wrap rounded bg-purple-500/10 p-2.5 font-mono text-xs leading-relaxed text-purple-300 dark:text-purple-200">
              {getLocalizedText(step.content, locale)}
            </pre>
          ) : (
            <p className="text-sm leading-relaxed text-[var(--foreground)]">
              {getLocalizedText(step.content, locale)}
            </p>
          )}
        </>
      )}

      {/* Code blocks with syntax highlighting */}
      {step.codeBlocks && step.codeBlocks.length > 0 && (
        <div className={cn("flex flex-col gap-2", step.content ? "mt-2" : "")}>
          {step.codeBlocks.map((block, idx) => (
            <div key={idx} className="overflow-hidden rounded-md border border-[var(--card-border)]">
              {/* Language badge */}
              <div className="flex items-center justify-between bg-[var(--card-bg)] px-3 py-1">
                <span className="font-mono text-[10px] text-[var(--text-muted)]">
                  {block.language}
                </span>
              </div>

              {/* Code with copy button */}
              <div className="group relative max-h-72 overflow-y-auto">
                <CopyButton code={block.code} />
                <SyntaxHighlighter
                  language={block.language}
                  style={highlightStyle}
                  showLineNumbers
                  wrapLongLines={false}
                  customStyle={{
                    margin: 0,
                    fontSize: "0.75rem",
                    lineHeight: "1.5",
                    borderRadius: 0,
                    background: "var(--code-bg)",
                  }}
                  lineNumberStyle={{
                    minWidth: "2.5em",
                    paddingRight: "1em",
                    color: "var(--code-linenumber)",
                    userSelect: "none",
                  }}
                >
                  {block.code}
                </SyntaxHighlighter>
              </div>

              {/* Caption */}
              {block.caption && (
                <div className="border-t border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-1.5">
                  <p className="text-[11px] italic text-[var(--text-muted)]">
                    {getLocalizedText(block.caption, locale)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Annotation */}
      {step.annotation && (
        <p className="mt-2 text-xs italic text-[var(--text-muted)]">
          {getLocalizedText(step.annotation, locale)}
        </p>
      )}
    </motion.div>
  );
}