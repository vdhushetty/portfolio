import { FiExternalLink } from "react-icons/fi";
import { Reveal, SectionHeader } from "../components/ui";

const certifications = [
  {
    name: "Microsoft Certified: Azure AI Engineer Associate",
    date: "2025",
    image: "/Images/microsoft-certified-associate-badge.png",
    link: "https://learn.microsoft.com/en-us/users/venkatsaidhushetty-7235/transcript/7oj29cq635nwl95",
  },
  {
    name: "Databricks Data Engineer Associate",
    date: "April 2024",
    image: "/Images/associate-badge-de.png",
    link: "https://credentials.databricks.com/d8b38b68-a2b3-4533-9e5c-671862730734#gs.aqy8yu",
  },
  {
    name: "Microsoft Azure Data Scientist Associate (DP-100)",
    date: "December 2023",
    image: "/Images/microsoft-certified-associate-badge.png",
    link: "https://learn.microsoft.com/en-us/users/venkatsaidhushetty-2506/credentials/82571ccd8369da80",
  },
];

export default function Certifications() {
  return (
    <div>
      <SectionHeader index="// 06" kicker="Credentials" title="Verified, not self-declared." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((cert, i) => (
          <Reveal key={cert.name} delay={i * 70}>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="panel panel-hover accent-de group h-full p-7 flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-signal/10 blur-2xl group-hover:bg-signal/20 transition-colors" />
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="relative w-24 h-24 object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-display text-base font-semibold text-ink leading-snug">
                {cert.name}
              </h3>
              <p className="font-mono text-xs text-faint mt-2">{cert.date}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-signal">
                View credential <FiExternalLink />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
