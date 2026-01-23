import React from "react";
import { FaUser, FaProjectDiagram, FaBook, FaEnvelope, FaCogs, FaChartBar, FaGraduationCap, FaBriefcase, FaPen } from "react-icons/fa";

const cards = [
  { title: "About Me", icon: <FaUser />, page: "about" },
  { title: "Skills", icon: <FaCogs />, page: "skills" },
  { title: "Certifications", icon: <FaChartBar />, page: "certifications" },
  { title: "Projects", icon: <FaProjectDiagram />, page: "projects" },
  { title: "Work Experience", icon: <FaBriefcase />, page: "work" },
  { title: "Education", icon: <FaGraduationCap />, page: "education" },
  { title: "Blogs", icon: <FaPen />, page: "blogs" },
  { title: "Contact", icon: <FaEnvelope />, page: "contact" },
];

export default function CardsSection({ scrollTo }) {
  const handleClick = (sectionId) => {
    if (scrollTo) {
      scrollTo(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {cards.map((card) => (
          <button
            key={card.title}
            onClick={() => handleClick(card.page)}
            className="glossy-button flex flex-col items-center justify-center p-8 rounded-2xl transition-all duration-300 hover:shadow-xl active:scale-95 group"
          >
            <div className="text-5xl mb-4 text-blue-600 group-hover:scale-110 transition-transform duration-300">
              {card.icon}
            </div>
            <span className="text-lg font-semibold text-black text-center">{card.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
