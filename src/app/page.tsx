"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { AgentLoopSimulator } from "@/components/agent-loop-simulator";
import { useLocale } from "@/lib/locale-context";
import { UI_TEXT } from "@/lib/i18n";
import type { Scenario } from "@/types/agent-data";

interface Category {
  id: string;
  name: string;
  description: string;
  files: string[];
}

interface Manifest {
  categories: Category[];
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedScenario, setSelectedScenario] = useState<string>("");
  const [scenarioData, setScenarioData] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { locale } = useLocale();
  const t = UI_TEXT[locale];

  // 客户端挂载
  useEffect(() => {
    setMounted(true);
  }, []);

  // 加载分类列表
  useEffect(() => {
    if (!mounted) return;

    fetch("/data/scenarios-manifest.json")
      .then((res) => res.json())
      .then((data: Manifest) => {
        const cats = data.categories || [];
        setCategories(cats);
        if (cats.length > 0) {
          setSelectedCategory(cats[0].id);
        }
      })
      .catch((err) => {
        console.error("Failed to load manifest:", err);
        setCategories([]);
      });
  }, [mounted]);

  // 当分类变化时，重置场景选择
  useEffect(() => {
    if (!selectedCategory) return;
    const cat = categories.find((c) => c.id === selectedCategory);
    if (cat && cat.files.length > 0) {
      setSelectedScenario(cat.files[0].replace(".json", ""));
    }
  }, [selectedCategory, categories]);

  // 当选择场景时，加载场景数据
  useEffect(() => {
    if (!selectedCategory || !selectedScenario) {
      setScenarioData(null);
      return;
    }

    setLoading(true);
    fetch(`/data/scenarios/${selectedCategory}/${selectedScenario}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setScenarioData(data))
      .catch(() => setScenarioData(null))
      .finally(() => setLoading(false));
  }, [selectedCategory, selectedScenario]);

  // 获取当前分类
  const currentCategory = categories.find((c) => c.id === selectedCategory);
  const totalScenarios = categories.reduce(
    (sum, cat) => sum + cat.files.length,
    0
  );

  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--background)]">
        <div className="text-[var(--text-muted)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[var(--background)]">
      {/* 左侧边栏 */}
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        scenarioCount={totalScenarios}
      />

      {/* 右侧主内容 */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* 顶部标题栏 */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--card-border)] bg-[var(--card-bg)] px-6">
          <div>
            <h2 className="text-lg font-semibold">
              {currentCategory?.name || "选择分类"}
            </h2>
            {currentCategory && (
              <p className="text-xs text-[var(--text-muted)]">
                {currentCategory.description}
              </p>
            )}
          </div>
        </header>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto p-2">
          {/* 场景选择 */}
          {currentCategory && currentCategory.files.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-medium text-[var(--text-muted)]">
                {t.select_scenario}
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentCategory.files.map((file) => {
                  const scenarioId = file.replace(".json", "");
                  const isSelected = selectedScenario === scenarioId;
                  return (
                    <button
                      key={file}
                      onClick={() => setSelectedScenario(scenarioId)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        isSelected
                          ? "bg-[var(--foreground)] text-[var(--background)]"
                          : "bg-[var(--card-bg)] hover:opacity-80 border border-[var(--card-border)]"
                      }`}
                    >
                      {scenarioId.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 模拟器 */}
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
            {loading ? (
              <div className="flex h-64 items-center justify-center text-[var(--text-muted)]">
                Loading scenario...
              </div>
            ) : scenarioData ? (
              <AgentLoopSimulator scenario={scenarioData} />
            ) : (
              <div className="flex h-64 items-center justify-center text-[var(--text-muted)]">
                {t.sim_no_scenario}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
