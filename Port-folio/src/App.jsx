import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import Navigation from "./components/Navigation";
import ScrollProgress from "./components/ScrollProgress";
import CommandPalette from "./components/CommandPalette";
import ChatDock from "./components/ChatDock";

import Hero from "./pages/Hero";
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
import Recommendations from "./pages/Recommendations";
import RecommendationSubmit from "./pages/RecommendationSubmit";
import Recruiter from "./pages/Recruiter";
import Privacy from "./pages/Privacy";

const SECTIONS = [
  "home",
  "projects",
  "blogs",
  "work",
  "skills",
  "recommendations",
  "education",
  "certifications",
  "about",
  "contact",
];

function Section({ id, children, narrow = false, tint = false }) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-16 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 ${
        tint ? "bg-canvas-2" : ""
      }`}
    >
      <div className={`mx-auto ${narrow ? "max-w-4xl" : "max-w-7xl"}`}>{children}</div>
    </section>
  );
}

function Portfolio() {
  return (
    <>
      <Hero />
      <Section id="projects">
        <Projects mode="featured" />
      </Section>
      <Section id="blogs" tint>
        <Blogs mode="featured" />
      </Section>
      <Section id="work">
        <Work mode="featured" />
      </Section>
      <Section id="skills" tint>
        <Skills />
      </Section>
      <Section id="recommendations">
        <Recommendations mode="featured" />
      </Section>
      <Section id="education" tint>
        <Education />
      </Section>
      <Section id="certifications">
        <Certifications />
      </Section>
      <Section id="about" tint>
        <About />
      </Section>
      <Section id="contact" narrow>
        <Contact />
      </Section>
    </>
  );
}

function PageShell({ children }) {
  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        {children}
      </div>
    </main>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navType = useNavigationType();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    if (location.hash) {
      const target = location.hash.slice(1);
      const timer = setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "instant", block: "start" });
      }, 60);
      return () => clearTimeout(timer);
    }
    if (navType === "PUSH") window.scrollTo(0, 0);
  }, [location.pathname, location.hash, isHome, navType]);

  useEffect(() => {
    if (isHome) return;
    window.scrollTo(0, 0);
  }, [location.pathname, isHome]);

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      let current = "home";
      for (const id of SECTIONS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navigation activeSection={isHome ? activeSection : null} />
      <ScrollProgress />
      <CommandPalette />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route
          path="/projects"
          element={
            <PageShell>
              <Projects key={`projects-${location.search}`} />
            </PageShell>
          }
        />
        <Route
          path="/writing"
          element={
            <PageShell>
              <Blogs />
            </PageShell>
          }
        />
        <Route
          path="/experience"
          element={
            <PageShell>
              <Work />
            </PageShell>
          }
        />
        <Route
          path="/recommendations"
          element={
            <PageShell>
              <Recommendations />
            </PageShell>
          }
        />
        <Route path="/recommend/:token" element={<RecommendationSubmit />} />
        <Route path="/recruiter" element={<Recruiter />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="*" element={<Portfolio />} />
      </Routes>
      <Footer />
      <ChatDock />
    </div>
  );
}
