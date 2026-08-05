import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 grid-bg opacity-40" />
      <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Contact</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Let’s talk data systems
        </h1>
        <p className="mt-3 text-muted">
          Interested in lakehouse design, real-time replication, DR, or analytics platforms? Reach out.
        </p>

        <div className="mt-10 space-y-3">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 no-underline transition-colors hover:border-primary/40"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-fg">Email</p>
              <p className="text-sm text-muted">{profile.email}</p>
            </div>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 no-underline transition-colors hover:border-primary/40"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Linkedin className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-fg">LinkedIn</p>
              <p className="text-sm text-muted">Connect professionally</p>
            </div>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 no-underline transition-colors hover:border-primary/40"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Github className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-fg">GitHub</p>
              <p className="text-sm text-muted">@vdhushetty</p>
            </div>
          </a>
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-fg">Location</p>
              <p className="text-sm text-muted">{profile.location}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Button asChild size="lg">
            <a href={`mailto:${profile.email}`}>Send email</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
