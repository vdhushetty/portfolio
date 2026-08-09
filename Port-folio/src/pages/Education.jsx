import { FaGraduationCap } from "react-icons/fa";
import { Reveal, SectionHeader } from "../components/ui";

const education = [
  {
    degree: "M.S. Robotics & Autonomous Systems",
    school: "Arizona State University",
    location: "Tempe, AZ",
    coursework: ["Machine Learning", "Computer Vision", "Autonomous Systems", "Robotics Programming"],
  },
  {
    degree: "B.Tech in Engineering",
    school: "Jawaharlal Nehru Technological University",
    location: "India",
    coursework: ["Data Structures", "Algorithms", "Database Systems", "Software Engineering"],
  },
];

export default function Education() {
  return (
    <div>
      <SectionHeader index="// 05" kicker="Education" title="Foundations." />
      <div className="grid md:grid-cols-2 gap-5">
        {education.map((edu, i) => (
          <Reveal key={edu.school} delay={i * 80}>
            <div className="panel panel-hover accent-de h-full p-7 group">
              <FaGraduationCap className="text-3xl text-signal mb-5 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-xl font-semibold text-ink">{edu.degree}</h3>
              <p className="mt-1 text-dim">{edu.school}</p>
              <p className="font-mono text-xs text-faint mt-0.5">{edu.location}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {edu.coursework.map((c) => (
                  <span key={c} className="chip text-xs">{c}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
