import { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FiCheckCircle, FiEdit3, FiExternalLink, FiShield } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Reveal, SectionHeader } from "../components/ui";
import { apiRequest } from "../lib/api";

function Card({ item }) {
  return (
    <article className="panel panel-hover h-full p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold">{item.name}</h3>
          <p className="mt-1 text-sm text-dim">
            {item.role} · {item.company}
          </p>
        </div>
        <a
          href={item.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={"View " + item.name + " on LinkedIn"}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#0A66C2]/40 px-3 py-2 font-mono text-xs text-[#6fb7f1] transition-colors hover:border-[#0A66C2] hover:bg-[#0A66C2]/10"
        >
          <FaLinkedin />
          LinkedIn
          <FiExternalLink aria-hidden="true" />
        </a>
      </div>
      <blockquote className="mt-5 text-base leading-relaxed text-ink">
        “{item.quote}”
      </blockquote>
      {item.linkedInAttestationUrl && (
        <a
          href={item.linkedInAttestationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm text-[#6fb7f1] hover:underline"
        >
          <FaLinkedin /> View the original LinkedIn attestation
          <FiExternalLink aria-hidden="true" />
        </a>
      )}
      <p className="mt-4 text-xs text-faint">{item.relationship}</p>
      <div className="mt-5 border-t border-line pt-4">
        <div className="flex items-center gap-2 text-xs text-mint">
          <FiCheckCircle aria-hidden="true" />
          {item.verificationMethod}
          {item.verifiedAt && (
            <span className="text-faint">
              · {new Date(item.verifiedAt).toLocaleDateString()}
            </span>
          )}
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-faint">
          The LinkedIn profile above is published with the author&apos;s consent
          and reviewed before this recommendation appears.
        </p>
      </div>
    </article>
  );
}

export default function Recommendations({ mode = "all" }) {
  const [data, setData] = useState({ items: [], loading: true });
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    apiRequest("/api/attestations")
      .then((result) => {
        if (active) setData({ items: result.items || [], loading: false });
      })
      .catch(() => {
        if (active) setData({ items: [], loading: false });
      });
    return () => {
      active = false;
    };
  }, []);

  const items = mode === "featured" ? data.items.slice(0, 3) : data.items;

  return (
    <div>
      <SectionHeader
        index="// 07"
        kicker="Verified recommendations"
        title="What collaborators say."
        sub="Anyone who has worked with me can submit feedback. Nothing appears publicly until consent, identity, relationship, and LinkedIn links are reviewed."
      />

      <Reveal className="mb-8">
        <div className="panel flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-mint/30 bg-mint/5 text-mint">
              <FiShield />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold">Open submissions, moderated publication.</h3>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-dim">
                Submitters provide a private verification email and public LinkedIn
                profile. They can also link the original LinkedIn recommendation or post.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/recommend")}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-signal px-5 py-3 font-mono text-sm font-medium text-canvas"
          >
            <FiEdit3 /> Leave feedback
          </button>
        </div>
      </Reveal>

      {items.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <Reveal key={item.id}>
              <Card item={item} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="panel grid gap-5 p-7 sm:grid-cols-[auto_1fr] sm:items-center">
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-mint/30 bg-mint/5 text-xl text-mint">
              <FiShield />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold">
                Verification comes before publication.
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-dim">
                Recommendations are open for submission. Each one requires consent, a
                LinkedIn profile, a private verification email, and manual relationship
                review. Nothing anonymous or unreviewed appears here.
              </p>
            </div>
          </div>
        </Reveal>
      )}

      {mode === "featured" && data.items.length > 3 && (
        <Reveal className="mt-9 flex justify-center">
          <button
            onClick={() => navigate("/recommendations")}
            className="rounded-lg border border-line-2 px-6 py-3 font-mono text-sm text-ink hover:border-signal hover:text-signal"
          >
            View all verified recommendations
          </button>
        </Reveal>
      )}
    </div>
  );
}
