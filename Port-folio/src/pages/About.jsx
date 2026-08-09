import { FiMapPin, FiActivity, FiZap } from "react-icons/fi";
import { Reveal, SectionHeader } from "../components/ui";

const facts = [
  { icon: <FiMapPin />, label: "Based in", value: "Bellevue, Washington" },
  { icon: <FiActivity />, label: "Currently", value: "Sr. Databricks Data Engineer" },
  { icon: <FiZap />, label: "Available for", value: "Data engineering opportunities" },
];

export default function About() {
  return (
    <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
      <div>
        <SectionHeader
          index="// 07"
          kicker="About"
          title="The judgment behind the systems."
        />
        <Reveal delay={80}>
          <p className="text-lg text-dim leading-relaxed max-w-2xl">
            I care about the engineering decisions that survive production: clear ownership,
            observable data quality, predictable recovery, and platforms that become cheaper
            as they scale. I work comfortably across implementation and architecture, then
            translate the result into outcomes teams can measure.
          </p>
        </Reveal>
      </div>

      <Reveal delay={120} className="accent-de">
        <dl className="panel divide-y divide-line">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-center gap-4 px-5 py-4">
              <span className="text-signal text-lg">{fact.icon}</span>
              <div>
                <dt className="font-mono text-[11px] tracking-[0.16em] uppercase text-faint">
                  {fact.label}
                </dt>
                <dd className="text-ink font-medium">{fact.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}
