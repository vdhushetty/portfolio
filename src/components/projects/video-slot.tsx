import { Play } from "lucide-react";

export function VideoSlot({
  title,
  videoUrl,
  poster,
}: {
  title: string;
  videoUrl: string | null;
  poster?: string;
}) {
  // For now: all walkthroughs are "Coming soon" (ignore videoUrl until real clips land)
  void videoUrl;
  return (
    <div className="relative flex aspect-video flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-dashed border-border-strong bg-bg-elevated">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      {poster && (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
      )}
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
        <Play className="h-7 w-7 fill-current" />
      </div>
      <div className="relative px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Coming soon</p>
        <p className="mt-1 text-xs text-muted">
          {title && title !== "Coming soon"
            ? title
            : "Project walkthrough video will be added here."}
        </p>
      </div>
    </div>
  );
}
