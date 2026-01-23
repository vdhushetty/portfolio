import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import TypewriterText from "./components/TypewriterText";
import { FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt } from "react-icons/fa";
import CardsSection from "./components/CardsSection";

// Import all page components
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import BlogDetail from "./pages/BlogDetail";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import Education from "./pages/Education";
import Work from "./pages/Work";
import Blogs from "./pages/Blogs";
import Footer from "./pages/Footer";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  // Check if we're on a project detail page or blog detail page
  const isProjectDetail = location.pathname.startsWith("/project/");
  const isBlogDetail = location.pathname.startsWith("/blog/");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "certifications", "projects", "work", "education", "blogs", "contact"];
      let current = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= 100) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Render project detail page or blog detail page
  if (isProjectDetail || isBlogDetail) {
    return (
      <>
        <Navigation activeSection={activeSection} />
        <Routes>
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
        <Footer />
      </>
    );
  }

  // Render main portfolio page
  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation activeSection={activeSection} />

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="max-w-6xl w-full">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="text-6xl md:text-7xl font-bold mb-4">
                  <TypewriterText text="VENKAT SAI DHUSHETTY" className="text-blue-600" />
                </h1>
                <p className="text-2xl text-gray-700 mt-6 font-light">
                  Data Engineer | Data Analyst | Data Scientist
                </p>
              </div>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                I build scalable data pipelines, insightful dashboards, and machine learning solutions to turn data into business value. With 8+ years of experience in big data, cloud platforms, and AI.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="glossy-button px-8 py-3 bg-blue-600 text-black font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-lg"
                >
                  View My Work
                </button>
                <button
                  onClick={() => scrollToSection("blogs")}
                  className="glossy-button px-8 py-3 bg-blue-600 text-black font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-lg"
                >
                  Read My Blogs
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="glossy-button px-8 py-3 bg-gray-200 text-black font-semibold rounded-xl hover:bg-gray-300 active:scale-95 transition-all duration-200 shadow-lg border border-gray-300"
                >
                  Get In Touch
                </button>
              </div>

              <div className="flex gap-6 text-2xl">
                <a href="https://www.linkedin.com/in/vdhushetty/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:scale-110 transition-transform duration-200">
                  <FaLinkedin />
                </a>
                <a href="https://github.com/vdhushetty" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:scale-110 transition-transform duration-200">
                  <FaGithub />
                </a>
                <a href="mailto:venkatsaidhushetty@gmail.com" className="text-red-500 hover:scale-110 transition-transform duration-200">
                  <FaEnvelope />
                </a>
              </div>
            </div>

            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl blur-xl opacity-30"></div>
                <img
                  src="/Images/mypic.png"
                  alt="Profile"
                  className="relative w-full h-auto rounded-3xl shadow-2xl border-4 border-white"
                />
              </div>
            </div>
          </div>

          {/* Quick Navigation Cards */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-12 text-black">Explore My Portfolio</h2>
            <CardsSection scrollTo={scrollToSection} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-12 px-4 bg-white">
        <div className="max-w-4xl w-full">
          <About />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl w-full">
          <Skills />
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="min-h-screen flex items-center justify-center py-12 px-4 bg-white">
        <div className="max-w-6xl w-full">
          <Certifications />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl w-full">
          <Projects />
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="min-h-screen flex items-center justify-center py-12 px-4 bg-white">
        <div className="max-w-6xl w-full">
          <Work />
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl w-full">
          <Education />
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="min-h-screen flex items-center justify-center py-20 px-4 bg-white">
        <div className="max-w-6xl w-full">
          <Blogs />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-20 px-4 bg-white">
        <div className="max-w-4xl w-full">
          <Contact />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;