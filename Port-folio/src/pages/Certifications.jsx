import React from "react";
import { FaCertificate, FaExternalLinkAlt } from "react-icons/fa";

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
    name: "Microsoft Azure Data Scientist Associate DP-100",
    date: "December 2023",
    image: "/Images/microsoft-certified-associate-badge.png",
    link: "https://learn.microsoft.com/en-us/users/venkatsaidhushetty-2506/credentials/82571ccd8369da80?ref=https%3A%2F%2Fwww.linkedin.com%2F",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="w-full">
      <div className="mb-12">
        <h2 className="text-5xl font-bold mb-4 text-black">Certifications</h2>
        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certifications.map((cert) => (
          <a
            key={cert.name}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="glossy-button rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center"
          >
            <div className="mb-6">
              <img
                src={cert.image}
                alt={cert.name}
                className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-2 group-hover:text-blue-600 transition">
                {cert.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{cert.date}</p>
              <div className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold">
                View Credential <FaExternalLinkAlt className="text-xs" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
