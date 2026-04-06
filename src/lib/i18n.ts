export type Locale = "zh" | "en";

export const UI_TEXT: Record<Locale, {
  sim_title: string;
  sim_no_scenario: string;
  sim_start_hint: string;
  select_category: string;
  select_scenario: string;
  dark_mode: string;
  light_mode: string;
}> = {
  zh: {
    sim_title: "Lab Simulator",
    sim_no_scenario: "暂无模拟场景",
    sim_start_hint: "点击 播放 或 单步 开始模拟",
    select_category: "选择分类",
    select_scenario: "选择场景",
    dark_mode: "深色模式",
    light_mode: "浅色模式",
  },
  en: {
    sim_title: "Scenario Simulator",
    sim_no_scenario: "No simulation scenario available",
    sim_start_hint: "Click Play or Step to start simulation",
    select_category: "Select Category",
    select_scenario: "Select Scenario",
    dark_mode: "Dark Mode",
    light_mode: "Light Mode",
  },
};

import { LocalizedText } from "@/types/agent-data";

export function getLocalizedText(text: LocalizedText, locale: Locale = "zh"): string {
  if (typeof text === "string") return text;
  return text[locale] || text.zh;
}
