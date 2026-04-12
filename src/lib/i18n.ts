export type Locale = "zh" | "en";

export const UI_TEXT: Record<Locale, {
  sim_title: string;
  sim_no_scenario: string;
  sim_start_hint: string;
  select_category: string;
  select_scenario: string;
  dark_mode: string;
  light_mode: string;

  sidebar: {
    categories: (count: number) => string;      // 如 "分类 (3)"
    scenariosCount: (count: number) => string;  // 如 "3 个场景"
    totalScenarios: (count: number) => string;  // 如 "共 3 个场景"
    languageSwitchHint: string;                 // 语言切换按钮提示
  };

  themeSettings: {
    title: string;              // "主题设置" / "Theme Settings"
    colorScheme: string;        // "配色方案" / "Color Scheme"
    default: string;            // "默认" / "Default"
    highlight: string;          // "高亮" / "Highlight"
    systemSettings: string;     // "系统设置" / "System"
    followSystem: string;       // "跟随系统" / "Follow System"
    followSystemHint: (mode: string) => string; // "当前跟随系统深色模式" 等
  };
}> = {
  zh: {
    sim_title: "Lab Simulator",
    sim_no_scenario: "暂无模拟场景",
    sim_start_hint: "点击 播放 或 单步 开始模拟",
    select_category: "选择分类",
    select_scenario: "选择场景",
    dark_mode: "深色模式",
    light_mode: "浅色模式",
    sidebar: {
      categories: (count) => `分类 (${count})`,
      scenariosCount: (count) => `${count} 个场景`,
      totalScenarios: (count) => `共 ${count} 个场景`,
      languageSwitchHint: "切换到英文",
    },
    themeSettings: {
      title: "主题设置",
      colorScheme: "配色方案",
      default: "默认",
      highlight: "高亮",
      systemSettings: "系统设置",
      followSystem: "跟随系统",
      followSystemHint: (mode) => `当前跟随系统${mode}模式`,
    },
  },
  en: {
    sim_title: "Scenario Simulator",
    sim_no_scenario: "No simulation scenario available",
    sim_start_hint: "Click Play or Step to start simulation",
    select_category: "Select Category",
    select_scenario: "Select Scenario",
    dark_mode: "Dark Mode",
    light_mode: "Light Mode",
    sidebar: {
      categories: (count) => `Categories (${count})`,
      scenariosCount: (count) => `${count} scenarios`,
      totalScenarios: (count) => `Total ${count} scenarios`,
      languageSwitchHint: "Switch to Chinese",
    },
    themeSettings: {
      title: "Theme Settings",
      colorScheme: "Color Scheme",
      default: "Default",
      highlight: "Highlight",
      systemSettings: "System",
      followSystem: "Follow System",
      followSystemHint: (mode) => `Following system ${mode} mode`,
    },
  },
};

import { LocalizedText } from "@/types/agent-data";

export function getLocalizedText(text: LocalizedText, locale: Locale = "zh"): string {
  if (typeof text === "string") return text;
  return text[locale] || text.zh;
}
