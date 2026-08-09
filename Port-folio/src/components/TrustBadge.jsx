import { FiCheckCircle, FiInfo } from "react-icons/fi";

export default function TrustBadge({ evidence, compact = false }) {
  if (!evidence) return null;
  const verified = /verified|credential/i.test(evidence.label);
  const Icon = verified ? FiCheckCircle : FiInfo;
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono tracking-wide " +
        (compact ? "text-[10px]" : "text-[11px]") +
        (verified
          ? " border-mint/40 text-mint"
          : " border-line-2 text-dim")
      }
      title={evidence.detail}
    >
      <Icon aria-hidden="true" />
      {evidence.label}
    </span>
  );
}
