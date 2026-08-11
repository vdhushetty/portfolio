import { Fragment, useState } from "react";
import { FiArrowRight, FiCheck, FiMinus } from "react-icons/fi";
import TechLogo from "./TechLogo";

function StageNode({ stage, index, compact = false }) {
  return (
    <div
      className={`architecture-node ${stage.removed ? "architecture-node-removed" : ""}`}
      style={{ "--step-index": index }}
    >
      <div className={`architecture-node-icon ${compact ? "h-9 w-9" : "h-12 w-12"}`}>
        <TechLogo name={stage.logo} size={compact ? 22 : 30} />
      </div>
      <div className="min-w-0">
        <p className={`font-display font-semibold text-ink ${compact ? "text-[11px]" : "text-sm"}`}>
          {stage.label}
        </p>
        {stage.note && (
          <p className={`font-mono text-faint ${compact ? "text-[8px]" : "text-[10px]"}`}>
            {stage.note}
          </p>
        )}
        {stage.pipeline && !compact && (
          <span className="mt-1 inline-flex rounded-full border border-line px-2 py-0.5 font-mono text-[9px] text-dim">
            {stage.pipeline}
          </span>
        )}
      </div>
      {stage.removed && (
        <span className="architecture-removed-tag">
          <FiMinus /> removed
        </span>
      )}
    </div>
  );
}

function FlowLane({ lane, compact = false, accent = "#3fe0ff" }) {
  return (
    <div className={`architecture-lane ${compact ? "architecture-lane-compact" : ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: lane.tone }}>
            {lane.eyebrow}
          </p>
          <h3 className={`font-display font-semibold text-ink ${compact ? "text-sm" : "text-lg"}`}>
            {lane.title}
          </h3>
        </div>
        <span className="rounded-full border border-line bg-white/[0.025] px-3 py-1 font-mono text-[10px] text-dim">
          {lane.badge}
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className={`flex min-w-max items-center ${compact ? "gap-1 px-3 py-3" : "gap-2 px-5 py-6"}`}>
          {lane.stages.map((stage, index) => (
            <Fragment key={`${lane.eyebrow}-${stage.label}-${index}`}>
              {index > 0 && (
                <div className="architecture-connector" style={{ color: stage.removed ? "#f4b65d" : accent }}>
                  {stage.connector && !compact && <span>{stage.connector}</span>}
                  <svg viewBox="0 0 54 14" aria-hidden="true">
                    <path d="M1 7H46" />
                    <path d="m41 2 6 5-6 5" />
                  </svg>
                </div>
              )}
              <StageNode stage={stage} index={index} compact={compact} />
            </Fragment>
          ))}
        </div>
      </div>

      {!compact && lane.summary && (
        <p className="border-t border-line px-5 py-3 text-sm leading-relaxed text-dim">{lane.summary}</p>
      )}
    </div>
  );
}

export function ArchitectureEvolutionThumbnail({ story, accent = "#3fe0ff", immersive = false }) {
  if (!story) return null;
  const oldStages = story.before.stages.filter((stage) => ["d365", "azure", "datafactory", "databricks"].includes(stage.logo)).slice(0, 4);
  const newStages = story.after.stages.filter((stage) => ["d365", "azure", "databricks", "deltalake", "powerbi"].includes(stage.logo)).slice(0, 5);
  const removedStages = story.before.stages.filter((stage) => stage.removed);
  const directStages = story.after.stages.filter((stage) => ["azure", "databricks", "deltalake", "powerbi"].includes(stage.logo)).slice(-4);

  return (
    <div
      className={`architecture-thumbnail h-full w-full px-4 py-4 ${immersive ? "architecture-thumbnail-immersive" : ""}`}
      aria-label="Architecture optimized from three pipelines to two"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-amber-300">Before</p>
          <p className="font-display text-sm font-semibold text-ink">3 serverless pipelines</p>
        </div>
        <div className="architecture-refactor-pill">
          <FiMinus /> one pipeline
        </div>
        <div className="text-right">
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-mint">After</p>
          <p className="font-display text-sm font-semibold text-ink">2 job-compute workflows</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="flex items-center justify-center -space-x-1.5">
          {oldStages.map((stage, index) => (
            <div key={`${stage.label}-${index}`} className="architecture-logo-stack architecture-logo-stack-old" style={{ "--step-index": index }}>
              <TechLogo name={stage.logo} size={20} />
            </div>
          ))}
        </div>
        <FiArrowRight className="architecture-thumbnail-arrow" style={{ color: accent }} />
        <div className="flex items-center justify-center -space-x-1.5">
          {newStages.map((stage, index) => (
            <div key={`${stage.label}-${index}`} className="architecture-logo-stack architecture-logo-stack-new" style={{ "--step-index": index }}>
              <TechLogo name={stage.logo} size={20} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
        <div className="bg-[#101a2d] px-2 py-2 text-center">
          <p className="font-mono text-sm text-signal">3 → 2</p>
          <p className="font-mono text-[7px] uppercase tracking-wider text-faint">pipelines</p>
        </div>
        <div className="bg-[#101a2d] px-2 py-2 text-center">
          <p className="font-mono text-sm text-mint">−90%</p>
          <p className="font-mono text-[7px] uppercase tracking-wider text-faint">compute cost</p>
        </div>
        <div className="bg-[#101a2d] px-2 py-2 text-center">
          <p className="font-mono text-sm text-ink">CSV → Delta</p>
          <p className="font-mono text-[7px] uppercase tracking-wider text-faint">direct path</p>
        </div>
      </div>

      {immersive && (
        <div className="architecture-video-route" aria-hidden="true">
          <div className="architecture-removed-strip">
            {removedStages.map((stage, index) => (
              <span key={stage.label} style={{ "--step-index": index }}>
                <FiMinus /> {stage.label}
              </span>
            ))}
          </div>
          <div className="architecture-direct-path">
            {directStages.map((stage, index) => (
              <Fragment key={stage.label}>
                {index > 0 && (
                  <svg viewBox="0 0 58 14">
                    <path d="M1 7H50" />
                    <path d="m45 2 6 5-6 5" />
                  </svg>
                )}
                <div className="architecture-direct-node" style={{ "--step-index": index }}>
                  <span><TechLogo name={stage.logo} size={24} /></span>
                  <p>{stage.label}</p>
                </div>
              </Fragment>
            ))}
          </div>
          <p>Direct CSV ingestion · managed Delta · CDC · dashboard</p>
        </div>
      )}
    </div>
  );
}

const thumbnailItems = (stages = []) =>
  stages
    .flatMap((stage) => {
      if (Array.isArray(stage)) return stage;
      if (stage?.items) return stage.items;
      return stage ? [stage] : [];
    })
    .filter((item) => item?.logo || item?.text || item?.label);

const stageSummary = (stage) => {
  if (!stage) return "System input";
  if (stage.note) return stage.note;
  const labels = thumbnailItems([stage])
    .map((item) => item.label || item.text)
    .filter(Boolean);
  return labels.slice(0, 2).join(" + ") || stage.title || "System stage";
};

function ThumbnailLogo({ item, index, outcome = false }) {
  return (
    <div
      className={`architecture-logo-stack ${outcome ? "architecture-logo-stack-new" : ""}`}
      style={{ "--step-index": index }}
    >
      {item.logo ? (
        <TechLogo name={item.logo} size={20} />
      ) : (
        <span className="font-mono text-[8px] font-semibold text-[#0c1a2e]">
          {(item.text || item.label || "DATA").slice(0, 4)}
        </span>
      )}
    </div>
  );
}

// D365-style source-to-outcome thumbnail used by every standard project card.
export function ProjectArchitectureThumbnail({ project, accent = "#3fe0ff" }) {
  const stages = (project.arch || []).filter((stage) => !stage?.detailOnly);
  const items = thumbnailItems(stages);
  const splitAt = Math.max(1, Math.ceil(items.length / 2));
  const inputItems = items.slice(0, splitAt).slice(0, 4);
  const outcomeItems = items.slice(splitAt).slice(-5);
  const firstStage = stages[0];
  const lastStage = stages.at(-1);
  const startLabel = firstStage?.title || "Input";
  const endLabel = lastStage?.title || "Outcome";
  const fallbackFacts = [
    { value: project.video?.scenes?.length || 6, label: "story scenes" },
    { value: project.tech?.length || items.length, label: "core tools" },
  ];
  const facts = [...(project.metrics || []).slice(0, 2), ...fallbackFacts].slice(0, 2);

  return (
    <div
      className="architecture-thumbnail h-full w-full px-4 py-4"
      aria-label={`${startLabel} to ${endLabel} architecture for ${project.title}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 max-w-[38%]">
          <p className="font-mono text-[8px] uppercase tracking-[0.2em]" style={{ color: accent }}>
            {startLabel}
          </p>
          <p className="truncate font-display text-sm font-semibold text-ink">
            {stageSummary(firstStage)}
          </p>
        </div>
        <div
          className="architecture-refactor-pill"
          style={{
            borderColor: `color-mix(in srgb, ${accent} 34%, transparent)`,
            background: `color-mix(in srgb, ${accent} 9%, transparent)`,
            color: accent,
          }}
        >
          <FiArrowRight /> {Math.max(stages.length, 2)} stages
        </div>
        <div className="min-w-0 max-w-[38%] text-right">
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-mint">
            {endLabel}
          </p>
          <p className="truncate font-display text-sm font-semibold text-ink">
            {stageSummary(lastStage)}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="flex items-center justify-center -space-x-1.5">
          {inputItems.map((item, index) => (
            <ThumbnailLogo key={`${item.label || item.text || item.logo}-${index}`} item={item} index={index} />
          ))}
        </div>
        <FiArrowRight className="architecture-thumbnail-arrow" style={{ color: accent }} />
        <div className="flex items-center justify-center -space-x-1.5">
          {outcomeItems.map((item, index) => (
            <ThumbnailLogo
              key={`${item.label || item.text || item.logo}-${index}`}
              item={item}
              index={index}
              outcome
            />
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
        {facts.map((fact, index) => (
          <div key={`${fact.label}-${index}`} className="min-w-0 bg-[#101a2d] px-2 py-2 text-center">
            <p className="truncate font-mono text-sm" style={{ color: index === 0 ? accent : "#3fe0a3" }}>
              {fact.value}
            </p>
            <p className="truncate font-mono text-[7px] uppercase tracking-wider text-faint">
              {fact.label}
            </p>
          </div>
        ))}
        <div className="min-w-0 bg-[#101a2d] px-2 py-2 text-center">
          <p className="truncate font-mono text-[11px] text-ink">
            {startLabel} → {endLabel}
          </p>
          <p className="font-mono text-[7px] uppercase tracking-wider text-faint">system path</p>
        </div>
      </div>
    </div>
  );
}

export default function ArchitectureEvolution({ story, accent = "#3fe0ff" }) {
  const [view, setView] = useState("compare");
  if (!story) return null;

  const lanes = view === "before" ? [story.before] : view === "after" ? [story.after] : [story.before, story.after];

  return (
    <section aria-labelledby="architecture-evolution-title">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-signal">Architecture decision record</p>
          <h2 id="architecture-evolution-title" className="mt-2 font-display text-2xl font-semibold">
            Remove movement that adds no business value.
          </h2>
          <p className="mt-2 max-w-3xl text-dim">
            The redesign keeps the 30-minute D365 export contract, but removes the CSV-to-Parquet copy layer and lands source files directly in Databricks managed tables.
          </p>
        </div>
        <div className="inline-flex rounded-lg border border-line bg-surface p-1" role="group" aria-label="Architecture view">
          {[
            ["compare", "Compare"],
            ["before", "Before"],
            ["after", "After"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`rounded-md px-3 py-2 font-mono text-[11px] transition-colors ${
                view === key ? "bg-white/[0.08] text-ink" : "text-faint hover:text-ink"
              }`}
              aria-pressed={view === key}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div key={view} className={`grid gap-5 ${lanes.length === 2 ? "xl:grid-cols-2" : ""}`}>
        {lanes.map((lane) => (
          <FlowLane key={lane.eyebrow} lane={lane} accent={accent} />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
        {story.impacts.map((impact) => (
          <div key={impact.label} className="bg-surface px-5 py-5">
            <div className="flex items-center gap-2">
              <FiCheck className="text-mint" />
              <span className="font-mono text-xl" style={{ color: impact.color || accent }}>{impact.value}</span>
            </div>
            <p className="mt-1 text-xs text-dim">{impact.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
