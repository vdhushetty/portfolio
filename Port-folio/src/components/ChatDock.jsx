import { useEffect, useRef, useState } from "react";
import {
  FiCpu,
  FiChevronDown,
  FiExternalLink,
  FiMessageCircle,
  FiSend,
  FiUser,
  FiX,
} from "react-icons/fi";
import { apiRequest } from "../lib/api";

const humanConversationKey = "portfolio_human_conversation";
const aiConversationKey = "portfolio_ai_conversation";

function Message({ message }) {
  const mine = message.author === "visitor" || message.role === "user";
  return (
    <div className={"flex " + (mine ? "justify-end" : "justify-start")}>
      <div
        className={
          "max-w-[86%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed " +
          (mine
            ? "bg-signal text-canvas"
            : "border border-line bg-surface text-ink")
        }
      >
        {message.body || message.text}
      </div>
    </div>
  );
}

export default function ChatDock() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("ai");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [aiMessages, setAiMessages] = useState([]);
  const [aiConversationId, setAiConversationId] = useState(
    () => sessionStorage.getItem(aiConversationKey) || ""
  );
  const [humanConversationId, setHumanConversationId] = useState(
    () => localStorage.getItem(humanConversationKey) || ""
  );
  const [humanMessages, setHumanMessages] = useState([]);
  const [humanForm, setHumanForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [humanStatus, setHumanStatus] = useState("");
  const feedRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      setMode(event.detail?.mode || "human");
      setOpen(true);
    };
    window.addEventListener("open-portfolio-chat", handler);
    return () => window.removeEventListener("open-portfolio-chat", handler);
  }, []);

  useEffect(() => {
    feedRef.current?.scrollTo({
      top: feedRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [aiMessages, humanMessages, busy, open]);

  useEffect(() => {
    if (!open || mode !== "human" || !humanConversationId) return;
    let active = true;
    const poll = async () => {
      try {
        const result = await apiRequest(
          "/api/chat?conversationId=" + encodeURIComponent(humanConversationId)
        );
        if (!active) return;
        setHumanMessages(result.messages || []);
        setHumanStatus(result.conversation?.status || "");
      } catch (requestError) {
        if (requestError.status === 404) {
          localStorage.removeItem(humanConversationKey);
          if (active) setHumanConversationId("");
        }
      }
    };
    poll();
    const timer = setInterval(poll, 5_000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [open, mode, humanConversationId]);

  const askAi = async (event) => {
    event.preventDefault();
    const question = input.trim();
    if (!question || busy) return;
    setInput("");
    setError("");
    setAiMessages((current) => [...current, { role: "user", text: question }]);
    setBusy(true);
    try {
      const result = await apiRequest("/api/assistant", {
        method: "POST",
        body: JSON.stringify({ question, conversationId: aiConversationId || undefined }),
      });
      setAiConversationId(result.conversationId);
      sessionStorage.setItem(aiConversationKey, result.conversationId);
      setAiMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: result.answer,
          evidence: result.evidence,
          sources: result.sources,
        },
      ]);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  };

  const startHuman = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const result = await apiRequest("/api/chat", {
        method: "POST",
        body: JSON.stringify({ action: "start", ...humanForm }),
      });
      setHumanConversationId(result.conversationId);
      localStorage.setItem(humanConversationKey, result.conversationId);
      setHumanMessages([result.message]);
      setHumanStatus(result.status);
      setHumanForm((current) => ({ ...current, message: "" }));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  };

  const sendHuman = async (event) => {
    event.preventDefault();
    const message = input.trim();
    if (!message || busy) return;
    setInput("");
    setBusy(true);
    setError("");
    try {
      const result = await apiRequest("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          action: "message",
          conversationId: humanConversationId,
          message,
        }),
      });
      setHumanMessages((current) => [...current, result.message]);
      setHumanStatus(result.status);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  };

  const latestAi = [...aiMessages].reverse().find((item) => item.role === "assistant");

  return (
    <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
      {open && (
        <section
          role="dialog"
          aria-label="Chat with Venkat's portfolio"
          className="mb-3 flex h-[min(680px,calc(100vh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line-2 bg-canvas-2 shadow-2xl"
        >
          <header className="border-b border-line px-4 pt-4">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <span className="eyebrow text-signal">Conversation</span>
                <h2 className="mt-1 font-display text-lg font-semibold">
                  Ask AI or message me
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-line text-dim hover:text-ink"
                aria-label="Close chat"
              >
                <FiX />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1 rounded-lg bg-canvas p-1">
              {[
                { id: "ai", label: "Ask AI", icon: <FiCpu /> },
                { id: "human", label: "Message Venkat", icon: <FiUser /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setMode(tab.id);
                    setError("");
                  }}
                  className={
                    "flex items-center justify-center gap-2 rounded-md px-3 py-2 font-mono text-xs transition-colors " +
                    (mode === tab.id
                      ? "bg-surface text-signal"
                      : "text-dim hover:text-ink")
                  }
                  aria-pressed={mode === tab.id}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </header>

          {mode === "ai" ? (
            <>
              <div ref={feedRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {!aiMessages.length && (
                  <div className="panel p-4">
                    <p className="text-sm text-ink">
                      Ask about my projects, experience, skills, credentials, or role fit.
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-faint">
                      AI-generated from my published portfolio. Direct experience,
                      adjacent knowledge, and unknowns are labeled separately.
                    </p>
                  </div>
                )}
                {aiMessages.map((message, index) => (
                  <Message key={index} message={message} />
                ))}
                {latestAi?.evidence && (
                  <div className="rounded-lg border border-line bg-white/[0.02] px-3 py-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
                      Evidence: {latestAi.evidence}
                    </span>
                    {latestAi.sources?.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        {latestAi.sources.map((source) => (
                          <a
                            key={source.id}
                            href={source.url}
                            className="inline-flex items-center gap-1 text-xs text-signal hover:underline"
                          >
                            {source.title} <FiExternalLink />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {busy && <p className="font-mono text-xs text-faint">Checking published evidence...</p>}
              </div>
              <form onSubmit={askAi} className="border-t border-line p-3">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    maxLength={600}
                    placeholder="What can Venkat do with Databricks?"
                    className="min-w-0 flex-1 rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm text-ink placeholder:text-faint focus:border-signal focus:outline-none"
                  />
                  <button
                    disabled={busy || !input.trim()}
                    className="grid w-11 place-items-center rounded-lg bg-signal text-canvas disabled:opacity-50"
                    aria-label="Ask question"
                  >
                    <FiSend />
                  </button>
                </div>
                <p className="mt-2 font-mono text-[10px] text-faint">
                  6 questions / 10 min · 20 / day · 600 characters
                </p>
              </form>
            </>
          ) : humanConversationId ? (
            <>
              <div ref={feedRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                <div className="rounded-lg border border-mint/30 bg-mint/5 px-3 py-2 text-xs text-mint">
                  {humanStatus === "replied"
                    ? "Venkat replied. This conversation remains available on this browser."
                    : "Delivered to Venkat's private inbox. Usually replies within 24 hours."}
                </div>
                {humanMessages.map((message) => (
                  <Message key={message.id || message.createdAt} message={message} />
                ))}
              </div>
              <form onSubmit={sendHuman} className="border-t border-line p-3">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    maxLength={2000}
                    placeholder="Continue the conversation..."
                    className="min-w-0 flex-1 rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm text-ink placeholder:text-faint focus:border-signal focus:outline-none"
                  />
                  <button
                    disabled={busy || !input.trim()}
                    className="grid w-11 place-items-center rounded-lg bg-signal text-canvas disabled:opacity-50"
                    aria-label="Send message"
                  >
                    <FiSend />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <form onSubmit={startHuman} className="flex-1 space-y-3 overflow-y-auto p-4">
              <div className="rounded-lg border border-line bg-white/[0.02] p-3">
                <p className="text-sm text-ink">This goes to my private Discord inbox.</p>
                <p className="mt-1 text-xs text-faint">
                  I reply personally. Your email is kept private and is used only for this conversation.
                </p>
              </div>
              <input
                required
                value={humanForm.name}
                onChange={(event) =>
                  setHumanForm((current) => ({ ...current, name: event.target.value }))
                }
                maxLength={100}
                placeholder="Your name"
                className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm text-ink placeholder:text-faint focus:border-signal focus:outline-none"
              />
              <input
                required
                type="email"
                value={humanForm.email}
                onChange={(event) =>
                  setHumanForm((current) => ({ ...current, email: event.target.value }))
                }
                maxLength={254}
                placeholder="Your email"
                className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm text-ink placeholder:text-faint focus:border-signal focus:outline-none"
              />
              <textarea
                required
                value={humanForm.message}
                onChange={(event) =>
                  setHumanForm((current) => ({ ...current, message: event.target.value }))
                }
                maxLength={2000}
                rows={6}
                placeholder="What would you like to discuss?"
                className="w-full resize-none rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm text-ink placeholder:text-faint focus:border-signal focus:outline-none"
              />
              <button
                disabled={busy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-signal px-4 py-3 font-mono text-sm text-canvas disabled:opacity-50"
              >
                <FiSend /> Send to Venkat
              </button>
            </form>
          )}

          {error && (
            <div className="border-t border-rose/30 bg-rose/5 px-4 py-2.5 text-xs text-rose">
              {error}
            </div>
          )}
        </section>
      )}

      <button
        onClick={() => setOpen((value) => !value)}
        className="ml-auto flex h-14 items-center gap-2 rounded-full border border-signal/40 bg-signal px-5 font-mono text-sm font-semibold text-canvas shadow-[0_12px_38px_-14px_rgba(63,224,255,0.8)] transition-transform hover:scale-[1.03]"
        aria-expanded={open}
        aria-label={open ? "Close conversation" : "Open conversation"}
      >
        {open ? <FiChevronDown /> : <FiMessageCircle />}
        <span>{open ? "Close" : "Chat with me"}</span>
      </button>
    </div>
  );
}
