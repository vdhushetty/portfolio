// src/Footer.jsx
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-black mb-4">Venkat Sai Dhushetty</h3>
            <p className="text-gray-600">Data Engineer | Data Analyst | Data Scientist</p>
          </div>
          <div>
            <h4 className="font-semibold text-black mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <a href="#home" className="text-gray-600 hover:text-blue-600 transition">Home</a>
              <a href="#projects" className="text-gray-600 hover:text-blue-600 transition">Projects</a>
              <a href="#blogs" className="text-gray-600 hover:text-blue-600 transition">Blogs</a>
              <a href="#skills" className="text-gray-600 hover:text-blue-600 transition">Skills</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition">Contact</a>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold text-black mb-4">Follow Me</h4>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/vdhushetty/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 text-2xl transition transform hover:scale-110">
                <FaLinkedin />
              </a>
              <a href="https://github.com/vdhushetty" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black text-2xl transition transform hover:scale-110">
                <FaGithub />
              </a>
              <a href="mailto:venkatsaidhushetty@gmail.com" className="text-gray-600 hover:text-red-600 text-2xl transition transform hover:scale-110">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-8">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Venkat Sai Dhushetty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
