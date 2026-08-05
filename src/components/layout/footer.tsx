import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-semibold text-fg">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.title}</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary/40 hover:text-primary"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary/40 hover:text-primary"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary/40 hover:text-primary"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
        <p className="text-xs text-subtle">
          <Link to="/" className="text-muted no-underline hover:text-primary">
            Home
          </Link>
          {" · "}
          <Link to="/projects" className="text-muted no-underline hover:text-primary">
            Projects
          </Link>
        </p>
      </div>
    </footer>
  );
}
