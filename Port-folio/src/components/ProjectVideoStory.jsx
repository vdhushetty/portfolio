import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy, FiDownload, FiFilm, FiPlay } from "react-icons/fi";
import { ArchitectureEvolutionThumbnail } from "./ArchitectureEvolution";

function sceneStartSeconds(scene) {
  const start = scene?.time?.split(/[–-]/)[0]?.trim();
  const [minutes = "0", seconds = "0"] = start?.split(":") || [];
  return Number(minutes) * 60 + Number(seconds);
}

export default function ProjectVideoStory({ video, architecture, accent = "#3fe0ff" }) {
  const [activeScene, setActiveScene] = useState(0);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef();
  const videoRef = useRef();
  const sceneCount = video?.scenes?.length || 0;

  useEffect(() => {
    if (video?.src || !sceneCount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(
      () => setActiveScene((current) => (current + 1) % sceneCount),
      4500,
    );
    return () => window.clearInterval(timer);
  }, [sceneCount, video?.src]);

  useEffect(() => () => window.clearTimeout(copyTimeoutRef.current), []);

  if (!video) return null;
  const scene = video.scenes?.[activeScene];

  const copyScript = async () => {
    await navigator.clipboard.writeText(video.script);
    setCopied(true);
    window.clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 1800);
  };

  const selectScene = (index) => {
    setActiveScene(index);
    if (videoRef.current) videoRef.current.currentTime = sceneStartSeconds(video.scenes[index]) + 1;
  };

  const syncSceneToPlayback = (event) => {
    const currentTime = event.currentTarget.currentTime;
    let nextScene = 0;
    for (let index = 0; index < video.scenes.length; index += 1) {
      if (sceneStartSeconds(video.scenes[index]) <= currentTime) nextScene = index;
      else break;
    }
    setActiveScene((current) => (current === nextScene ? current : nextScene));
  };

  return (
    <section aria-labelledby="project-video-title">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-signal">2–3 minute walkthrough</p>
          <h2 id="project-video-title" className="mt-2 font-display text-2xl font-semibold">
            {video.title}
          </h2>
          <p className="mt-2 max-w-3xl text-dim">{video.description}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[10px] text-dim">
          <FiFilm style={{ color: accent }} />
          {video.duration} · {video.scenes.length} scenes
        </div>
      </div>

      <div className="panel overflow-hidden lg:grid lg:grid-cols-[1.25fr_.75fr]">
        <div className="video-story-stage relative min-h-[330px] overflow-hidden border-b border-line lg:border-b-0 lg:border-r">
          {video.src ? (
            <>
              <video
                ref={videoRef}
                className="h-full w-full bg-[#080c15] object-contain"
                controls
                poster={video.poster}
                preload="metadata"
                onTimeUpdate={syncSceneToPlayback}
              >
                <source src={video.src} type="video/mp4" />
                {video.captions && <track kind="captions" src={video.captions} srcLang="en" label="English" default />}
              </video>
              {video.draftLabel && (
                <span className="absolute left-3 top-3 rounded-full border border-amber-300/30 bg-[#07111f]/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-amber-200 backdrop-blur">
                  {video.draftLabel}
                </span>
              )}
            </>
          ) : (
            <>
              <ArchitectureEvolutionThumbnail story={architecture} accent={accent} immersive />
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-[#07111f]/90 p-4 shadow-2xl backdrop-blur">
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.05] text-signal">
                    <FiPlay className="ml-0.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                      Scene {String(activeScene + 1).padStart(2, "0")} · {scene?.time}
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-white">{scene?.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">{scene?.onscreen}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-1" aria-hidden="true">
                  {video.scenes.map((item, index) => (
                    <span
                      key={item.time}
                      className={`h-1 flex-1 rounded-full ${index === activeScene ? "video-scene-progress-active" : "bg-white/10"}`}
                      style={index === activeScene ? { background: accent } : undefined}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-surface p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Storyboard</p>
            <span className="font-mono text-[9px] text-mint">HyperFrames-ready</span>
          </div>
          <div className="space-y-1.5">
            {video.scenes.map((item, index) => (
              <button
                key={item.time}
                onClick={() => selectScene(index)}
                className={`w-full rounded-lg border px-3 py-2.5 text-left transition-colors ${
                  activeScene === index
                    ? "border-signal/50 bg-signal/[0.06]"
                    : "border-transparent hover:border-line hover:bg-white/[0.025]"
                }`}
                aria-pressed={activeScene === index}
              >
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-[9px] text-faint">{item.time}</span>
                  <span className="font-display text-sm font-semibold text-ink">{item.title}</span>
                </span>
                <span className="mt-1 block text-[11px] leading-relaxed text-dim">{item.motion}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <details className="panel mt-5 overflow-hidden">
        <summary className="cursor-pointer px-5 py-4 font-display font-semibold text-ink hover:text-signal">
          Read and copy the full narration script
        </summary>
        <div className="border-t border-line p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={copyScript}
              className="inline-flex items-center gap-2 rounded-lg border border-line-2 px-4 py-2 font-mono text-[11px] text-ink hover:border-signal hover:text-signal"
            >
              {copied ? <FiCheck /> : <FiCopy />} {copied ? "Copied" : "Copy script"}
            </button>
            {video.scriptPath && (
              <a
                href={video.scriptPath}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-line-2 px-4 py-2 font-mono text-[11px] text-ink hover:border-signal hover:text-signal"
              >
                <FiDownload /> Download .txt
              </a>
            )}
          </div>
          <div className="max-w-4xl whitespace-pre-line text-sm leading-7 text-dim">{video.script}</div>
        </div>
      </details>
    </section>
  );
}
