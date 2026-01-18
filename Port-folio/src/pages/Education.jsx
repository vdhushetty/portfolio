// src/pages/Education.jsx
import { FaGraduationCap } from "react-icons/fa";

const education = [
  {
    degree: "Master of Science in Robotics and Autonomous Systems",
    school: "Arizona State University",
    location: "Tempe, AZ",
    coursework: ["Machine Learning", "Computer Vision", "Autonomous Systems", "Robotics Programming"],
  },
  {
    degree: "Bachelor of Technology in Engineering",
    school: "Jawaharlal Nehru Technological University",
    location: "India",
    coursework: ["Data Structures", "Algorithms", "Database Systems", "Software Engineering"],
  },
];

export default function Education() {
  return (
    <section id="education" className="w-full">
      <div className="mb-12">
        <h2 className="text-5xl font-bold mb-4 text-black">Education</h2>
        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
      </div>

      <div className="space-y-8">
        {education.map((edu, index) => (
          <div
            key={index}
            className="glossy-button rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group border-l-4 border-blue-600"
          >
            <div className="flex items-start gap-6">
              <FaGraduationCap className="text-5xl text-blue-600 group-hover:scale-110 transition-transform mt-2" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black mb-2 group-hover:text-blue-600 transition">
                  {edu.degree}
                </h3>
                <p className="text-lg text-gray-700 mb-1 font-semibold">{edu.school}</p>
                <p className="text-gray-600 mb-4">{edu.location}</p>
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-2">Relevant Coursework:</p>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full font-medium"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
