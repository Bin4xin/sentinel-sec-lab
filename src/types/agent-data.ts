export type LocalizedText = {
  zh: string;
  en: string;
} | string;

export interface CodeBlock {
  language: string;       // "javascript", "python", "bash", "json", "typescript", "go", "java", "cpp", "ruby", "shell" etc.
  code: string;           // raw code content
  caption?: {             // optional caption below code block
    zh: string;
    en: string;
  };
}

export interface SimStep {
  type: "user_message" | "assistant_text" | "tool_call" | "tool_result" | "system_event";
  content?: LocalizedText;       // optional: plain text content
  codeBlocks?: CodeBlock[];      // optional: code blocks with syntax highlighting
  toolName?: string;
  annotation: LocalizedText;
}

export interface Scenario {
  version: string;
  title: LocalizedText;
  description: LocalizedText;
  steps: SimStep[];
}