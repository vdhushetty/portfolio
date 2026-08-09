export default function Privacy() {
  return (
    <main className="min-h-screen pt-16">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <span className="eyebrow text-signal">Trust & privacy</span>
        <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
          What this portfolio stores—and why.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-dim">
          The interactive features collect only the information needed to operate
          conversations, prevent abuse, count approximate visitors, and verify recommendations.
        </p>

        <div className="mt-12 space-y-6">
          {[
            {
              title: "AI profile assistant",
              body:
                "Questions and the most recent conversation messages are stored to support the chat experience and enforce limits. OpenAI requests use server-side credentials, a privacy-preserving safety identifier, moderation, bounded inputs and outputs, and store:false. The assistant is instructed to separate direct portfolio evidence, adjacent technical knowledge, and unknown information.",
            },
            {
              title: "Direct messages",
              body:
                "Your name, email, message, and replies are retained so the conversation can continue. Messages may be mirrored to Venkat's private Discord channel. They are not published or sold.",
            },
            {
              title: "Visitor analytics",
              body:
                "The public counter uses a random browser identifier stored in an HttpOnly cookie. The server stores a one-way hash, visit timestamps, and aggregate events—not raw IP addresses. Known bots and repeat refreshes are excluded where practical.",
            },
            {
              title: "Verified recommendations",
              body:
                "Recommendation submissions are invitation-only. Work email is private and stored for review; published cards show only consented identity, relationship, LinkedIn profile, recommendation text, and verification metadata. Authors may request correction or removal.",
            },
            {
              title: "Abuse prevention",
              body:
                "One-way request fingerprints, short time windows, daily quotas, message-length limits, moderation, and a global AI budget protect the site and API account from automated or excessive use.",
            },
            {
              title: "Access or deletion",
              body:
                "To request access, correction, or deletion of a conversation or recommendation, email venkatsaidhushetty@gmail.com from the address associated with the submission.",
            },
          ].map((section) => (
            <section key={section.title} className="panel p-6 sm:p-7">
              <h2 className="font-display text-xl font-semibold">{section.title}</h2>
              <p className="mt-3 leading-relaxed text-dim">{section.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-10 font-mono text-xs text-faint">
          Last updated August 8, 2026.
        </p>
      </div>
    </main>
  );
}
