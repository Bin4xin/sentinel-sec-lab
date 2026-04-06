"use client";

import { useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useSimulator } from "@/hooks/useSimulator";
import { SimulatorControls } from "./simulator-controls";
import { SimulatorMessage } from "./simulator-message";
import type { Scenario } from "@/types/agent-data";
import { getLocalizedText, UI_TEXT } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";

interface AgentLoopSimulatorProps {
  scenario: Scenario;
}

export function AgentLoopSimulator({ scenario }: AgentLoopSimulatorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const t = UI_TEXT[locale];

  const sim = useSimulator(scenario?.steps ?? []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [sim.visibleSteps.length]);

  if (!scenario) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-[var(--text-muted)]">
        {t.sim_no_scenario}
      </div>
    );
  }

  return (
    <section>
      <h2 className="mb-2 text-xl font-semibold text-[var(--foreground)]">
        {getLocalizedText(scenario.title, locale)}
      </h2>
      <p className="mb-4 text-sm text-[var(--text-muted)]">
        {getLocalizedText(scenario.description, locale)}
      </p>

      <div className="overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
        <div className="border-b border-[var(--card-border)] px-4 py-3">
          <SimulatorControls
            isPlaying={sim.isPlaying}
            isComplete={sim.isComplete}
            currentIndex={sim.currentIndex}
            totalSteps={sim.totalSteps}
            speed={sim.speed}
            onPlay={sim.play}
            onPause={sim.pause}
            onStep={sim.stepForward}
            onReset={sim.reset}
            onSpeedChange={sim.setSpeed}
          />
        </div>

        <div
          ref={scrollRef}
          className="flex max-h-[500px] min-h-[200px] flex-col gap-3 overflow-y-auto p-4"
        >
          {sim.visibleSteps.length === 0 && (
            <div className="flex flex-1 items-center justify-center text-sm text-[var(--text-muted)]">
              {t.sim_start_hint}
            </div>
          )}
          <AnimatePresence mode="popLayout">
            {sim.visibleSteps.map((step, i) => (
              <SimulatorMessage key={i} step={step} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
