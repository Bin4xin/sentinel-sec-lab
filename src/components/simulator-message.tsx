"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { SimStep } from "@/types/agent-data";
import { getLocalizedText } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { User, Bot, Terminal, ArrowRight, AlertCircle, Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
// 如果未安装 remark-gfm，请删除下一行导入及下方 remarkPlugins 配置
import remarkGfm from "remark-gfm";

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
      // fallback
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

function getContainerClassName(type: string): string {
  switch (type) {
    case "tool_call":
    case "tool_result":
      return "font-mono text-xs";
    case "system_event":
      return "text-purple-300";
    default:
      return "text-sm";
  }
}

export function SimulatorMessage({ step }: SimulatorMessageProps) {
  const { locale } = useLocale();
  const config = TYPE_CONFIG[step.type] || TYPE_CONFIG.assistant_text;
  const Icon = config.icon;
  const highlightStyle = vs;

  const contentText = step.content ? getLocalizedText(step.content, locale) : "";

  return (
      <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={cn("rounded-lg border p-3", config.bgClass, config.borderClass)}
      >
        {/* Header */}
        <div className="mb-1.5 flex items-center gap-2">
          <Icon size={14} className="shrink-0 text-[var(--text-muted)]" />
          <span className="text-xs font-medium text-[var(--text-muted)]">
          {config.label}
            {step.toolName && (
                <span className="ml-1.5 font-mono text-[var(--foreground)]">{step.toolName}</span>
            )}
        </span>
        </div>

        {/* Text content with Markdown support */}
        {step.content && (
            <div
                className={cn(
                    "leading-relaxed text-[var(--foreground)]",
                    getContainerClassName(step.type)
                )}
            >
              <ReactMarkdown
                  // 如果未安装 remark-gfm，请删除下面这行
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => (
                        <p style={{ whiteSpace: "pre-line" }} className="my-0">
                          {children}
                        </p>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className?.includes("language-");
                      return isInline ? (
                          <code className="rounded bg-[var(--accent)] px-1 py-0.5 font-mono text-[0.85em]">
                            {children}
                          </code>
                      ) : (
                          <code className={cn("font-mono text-sm", className)}>{children}</code>
                      );
                    },
                    pre: ({ children }) => {
                      // 类型安全：确保 children 是有效的 React 元素
                      if (!React.isValidElement(children)) {
                        return <pre>{children}</pre>;
                      }

                      const codeElement = children as React.ReactElement<{
                        className?: string;
                        children?: React.ReactNode;
                      }>;

                      const className = codeElement.props.className || "";
                      const language = className.replace("language-", "") || "text";
                      const code = codeElement.props.children?.toString() || "";

                      return (
                          <div className="group relative my-2 overflow-hidden rounded-md border border-[var(--card-border)]">
                            <div className="flex items-center justify-between bg-[var(--card-bg)] px-3 py-1">
                      <span className="font-mono text-[10px] text-[var(--text-muted)]">
                        {language}
                      </span>
                            </div>
                            <div className="relative max-h-72 overflow-y-auto">
                              <CopyButton code={code} />
                              <SyntaxHighlighter
                                  language={language}
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
                                {code}
                              </SyntaxHighlighter>
                            </div>
                          </div>
                      );
                    },
                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                          {children}
                        </a>
                    ),
                    ul: ({ children }) => <ul className="list-disc pl-5 my-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-5 my-1">{children}</ol>,
                    li: ({ children }) => <li className="my-0.5">{children}</li>,
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-[var(--card-border)] pl-3 my-2 italic">
                          {children}
                        </blockquote>
                    ),
                  }}
              >
                {contentText}
              </ReactMarkdown>
            </div>
        )}

        {/* Dedicated code blocks field */}
        {step.codeBlocks && step.codeBlocks.length > 0 && (
            <div className={cn("flex flex-col gap-2", step.content ? "mt-2" : "")}>
              {step.codeBlocks.map((block, idx) => (
                  <div key={idx} className="overflow-hidden rounded-md border border-[var(--card-border)]">
                    <div className="flex items-center justify-between bg-[var(--card-bg)] px-3 py-1">
                <span className="font-mono text-[10px] text-[var(--text-muted)]">
                  {block.language}
                </span>
                    </div>
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
            <div className="mt-2 text-xs italic text-[var(--text-muted)]">
              <ReactMarkdown
                  components={{
                    p: ({ children }) => <p style={{ whiteSpace: "pre-line" }}>{children}</p>,
                    code: ({ children }) => (
                        <code className="rounded bg-[var(--code-bg)] px-1 py-0.5 font-mono text-[0.85em]">
                          {children}
                        </code>
                    ),
                  }}
              >
                {getLocalizedText(step.annotation, locale)}
              </ReactMarkdown>
            </div>
        )}
      </motion.div>
  );
}