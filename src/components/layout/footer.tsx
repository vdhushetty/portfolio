import { Link } from '@tanstack/react-router'
import { profile } from '@/data/profile'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-sm font-semibold text-foreground">
            {profile.name}
          </p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Building reliable data platforms and thoughtful interfaces.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="transition hover:text-foreground"
          >
            Email
          </a>
          <Link to="/" className="transition hover:text-foreground">
            Home
          </Link>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}. Crafted with care.
      </div>
    </footer>
  )
}
