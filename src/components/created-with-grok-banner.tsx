import { useLayoutEffect } from "react";

const BANNER_HEIGHT = "2.25rem";
const BANNER_HEIGHT_VAR = "--grok-banner-h";

function readEnv(key: string): string | undefined {
  const vite = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
  const fromVite = vite?.[key];
  if (fromVite !== undefined && fromVite !== "") return fromVite;
  return undefined;
}

function envFlag(key: string, defaultValue: boolean): boolean {
  const raw = readEnv(key);
  if (raw === undefined) return defaultValue;
  const v = raw.trim().toLowerCase();
  if (v === "true" || v === "1" || v === "yes") return true;
  if (v === "false" || v === "0" || v === "no") return false;
  return defaultValue;
}

export function CreatedWithGrokBanner() {
  const showBanner = envFlag("VITE_SHOW_BUILT_WITH_GROK", false);

  useLayoutEffect(() => {
    if (!showBanner || typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty(BANNER_HEIGHT_VAR, BANNER_HEIGHT);
    return () => {
      root.style.removeProperty(BANNER_HEIGHT_VAR);
    };
  }, [showBanner]);

  if (!showBanner) return null;

  return (
    <>
      <div className="h-9 w-full shrink-0" aria-hidden />
      <div
        className="fixed top-0 left-0 right-0 z-[100] flex h-9 w-full items-center justify-center gap-4 bg-black px-3 text-[13px] leading-none text-white/90"
        data-created-with-grok-banner
      >
        <a
          href="https://grok.com?m=build"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
          aria-label="Created with Grok"
        />
        <span className="relative z-10 pointer-events-none select-none font-medium tracking-tight text-white/80">
          Created with Grok
        </span>
      </div>
    </>
  );
}
