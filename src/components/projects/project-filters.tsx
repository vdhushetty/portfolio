import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/data/projects";

export function ProjectFilters({
  query,
  onQuery,
  tags,
  activeTag,
  onTag,
  category,
  onCategory,
}: {
  query: string;
  onQuery: (v: string) => void;
  tags: string[];
  activeTag: string | null;
  onTag: (tag: string | null) => void;
  category: ProjectCategory | "all";
  onCategory: (c: ProjectCategory | "all") => void;
}) {
  const cats: { id: ProjectCategory | "all"; label: string }[] = [
    { id: "all", label: "All" },
    { id: "professional", label: "Professional" },
    { id: "academic", label: "Academic" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onCategory(c.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              category === c.id
                ? "border-primary/40 bg-primary/15 text-primary"
                : "border-border bg-surface text-muted hover:text-fg",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search projects…"
          className="h-12 w-full rounded-xl border border-border bg-surface pl-10 pr-4 text-sm text-fg outline-none ring-primary/40 placeholder:text-subtle focus:border-primary/40 focus:ring-2"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => onTag(null)} className="rounded-full">
          <Badge active={!activeTag}>All tech</Badge>
        </button>
        {tags.map((tag) => (
          <button key={tag} type="button" onClick={() => onTag(tag)} className="rounded-full">
            <Badge active={activeTag === tag}>{tag}</Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
