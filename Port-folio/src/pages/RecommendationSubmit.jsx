import { useState } from "react";
import { FiCheckCircle, FiShield } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { apiRequest } from "../lib/api";

const initial = {
  name: "",
  role: "",
  company: "",
  relationship: "",
  linkedInUrl: "",
  linkedInAttestationUrl: "",
  workEmail: "",
  quote: "",
  consent: false,
  website: "",
};

export default function RecommendationSubmit() {
  const { token } = useParams();
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (name, value) =>
    setForm((current) => ({ ...current, [name]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await apiRequest("/api/attestations", {
        method: "POST",
        body: JSON.stringify({ ...form, token: token || undefined }),
      });
      setStatus("success");
    } catch (requestError) {
      setError(requestError.message);
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <main className="min-h-screen pt-16 grid place-items-center px-4">
        <div className="panel max-w-xl p-8 text-center">
          <FiCheckCircle className="mx-auto text-4xl text-mint" />
          <h1 className="mt-5 font-display text-3xl font-semibold">Thank you.</h1>
          <p className="mt-3 text-dim">
            Your recommendation is pending identity and relationship review. It will
            be published only after that review is complete.
          </p>
        </div>
      </main>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-line bg-canvas px-4 py-3 text-ink placeholder:text-faint focus:border-signal focus:outline-none";

  return (
    <main className="min-h-screen pt-16">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <span className="eyebrow text-mint">
            {token ? "Private invitation" : "Public attestation"}
          </span>
          <h1 className="mt-3 font-display text-4xl font-semibold">
            Recommend working with Venkat.
          </h1>
          <p className="mt-4 max-w-2xl text-dim">
            Anyone who has worked with me can submit feedback. Be specific about the
            work you observed. Your email is stored privately for verification and is
            never displayed.
          </p>
        </div>

        <form onSubmit={submit} className="panel space-y-4 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <input required className={inputClass} maxLength={100} placeholder="Full name" value={form.name} onChange={(e) => update("name", e.target.value)} />
            <input required className={inputClass} maxLength={120} placeholder="Current role" value={form.role} onChange={(e) => update("role", e.target.value)} />
            <input required className={inputClass} maxLength={120} placeholder="Company" value={form.company} onChange={(e) => update("company", e.target.value)} />
            <input required type="email" className={inputClass} maxLength={254} placeholder="Email for verification (private)" value={form.workEmail} onChange={(e) => update("workEmail", e.target.value)} />
          </div>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-ink">
              LinkedIn profile URL <span className="text-mint">(published)</span>
            </span>
            <input required type="url" className={inputClass} maxLength={300} placeholder="https://www.linkedin.com/in/your-profile" value={form.linkedInUrl} onChange={(e) => update("linkedInUrl", e.target.value)} />
            <span className="mt-2 block text-xs leading-relaxed text-faint">
              This link will appear beside your recommendation so visitors can
              verify your professional identity. It is reviewed before publication.
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-ink">
              Original LinkedIn recommendation or post <span className="text-faint">(optional)</span>
            </span>
            <input type="url" className={inputClass} maxLength={300} placeholder="https://www.linkedin.com/..." value={form.linkedInAttestationUrl} onChange={(e) => update("linkedInAttestationUrl", e.target.value)} />
            <span className="mt-2 block text-xs leading-relaxed text-faint">
              If this feedback already exists on LinkedIn, link the original so visitors
              can compare the published attestation with its source.
            </span>
          </label>
          <input required className={inputClass} maxLength={240} placeholder="How did you work together?" value={form.relationship} onChange={(e) => update("relationship", e.target.value)} />
          <textarea required className={inputClass + " resize-none"} minLength={60} maxLength={900} rows={7} placeholder="What did you observe about Venkat's work, judgment, or impact?" value={form.quote} onChange={(e) => update("quote", e.target.value)} />
          <label className="flex items-start gap-3 rounded-lg border border-line bg-white/[0.02] p-4 text-sm text-dim">
            <input required type="checkbox" className="mt-1" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} />
            <span>
              I confirm this is my own statement and consent to publishing my name,
              role, company, LinkedIn link, relationship, and recommendation.
            </span>
          </label>
          <div className="flex items-center gap-2 text-xs text-faint">
            <FiShield /> Identity, consent, rate limits, and manual review are recorded.
          </div>
          <input
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-px w-px opacity-0"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
          />
          {error && <p className="text-sm text-rose">{error}</p>}
          <button disabled={status === "sending"} className="w-full rounded-lg bg-signal px-5 py-3 font-mono text-sm font-medium text-canvas disabled:opacity-50">
            {status === "sending" ? "Submitting..." : "Submit for verification"}
          </button>
        </form>
      </div>
    </main>
  );
}
