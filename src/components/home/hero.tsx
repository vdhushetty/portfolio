import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { PORTRAIT_SRC } from "@/data/portrait";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-primary-dim/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {profile.location}
          </div>
          <p className="mb-2 text-sm font-medium text-muted">{profile.name}</p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-fg sm:text-5xl lg:text-6xl">
            Data Engineer
            <br />
            <span className="text-primary">& Scientist</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/projects">
                View projects <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">About me</Link>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:max-w-md">
            {profile.heroMetrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-border bg-surface/80 p-3 metric-glow sm:p-4"
              >
                <div className="font-mono text-xl font-semibold tabular-nums text-primary sm:text-2xl">
                  {m.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wide text-subtle">{m.label}</div>
                <div className="mt-0.5 text-xs text-muted">{m.hint}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait replaces Live data path */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="glow-ring overflow-hidden rounded-2xl border border-border bg-surface">
            <img
              src={PORTRAIT_SRC}
              alt={profile.name}
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-3 left-4 right-4 rounded-xl border border-border bg-bg-elevated/95 px-4 py-3 backdrop-blur-sm sm:left-6 sm:right-6">
            <p className="text-sm font-semibold text-fg">{profile.name}</p>
            <p className="text-xs text-muted">{profile.title} · {profile.yearsExperience} years</p>
          </div>
        </div>
      </div>
    </section>
  );
}
