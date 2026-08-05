import { cn } from "@/lib/utils";
import type { Skill } from "@/data/skills";
import { skillIconUri } from "@/data/skill-icon-uris";

export function SkillChip({
  skill,
  className,
  size = "md",
}: {
  skill: Skill;
  className?: string;
  size?: "sm" | "md";
}) {
  const iconBox = size === "sm" ? "h-6 w-6" : "h-7 w-7";
  const img = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]";
  const pad = size === "sm" ? "px-2 py-1 text-xs gap-1.5" : "px-2.5 py-1.5 text-sm gap-2";
  const iconSrc = skillIconUri(skill.icon);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-primary/35 hover:text-fg",
        pad,
        className,
      )}
      title={skill.name}
    >
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-md bg-bg-elevated ring-1 ring-border",
          iconBox,
        )}
      >
        {iconSrc ? (
          <img
            src={iconSrc}
            alt=""
            className={cn("object-contain", img)}
            loading="lazy"
            width={18}
            height={18}
          />
        ) : null}
      </span>
      <span className="font-medium leading-none">{skill.name}</span>
    </span>
  );
}

export function SkillIconGrid({
  skills,
  className,
}: {
  skills: Skill[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {skills.map((s) => (
        <SkillChip key={s.name} skill={s} />
      ))}
    </div>
  );
}
