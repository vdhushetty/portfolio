// src/pages/Contact.jsx
import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const submit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 600);
  };

  return (
    <section id="contact" className="w-full">
      <div className="mb-12">
        <h2 className="text-5xl font-bold mb-4 text-black">Get In Touch</h2>
        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <p className="text-lg text-gray-700 mb-8">
            I'd love to hear from you! Whether you have a question or want to collaborate, feel free to reach out.
          </p>

          <div className="space-y-6">
            <div className="glossy-button p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="flex items-start">
                <FaEnvelope className="text-3xl text-blue-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-black mb-1">Email</h4>
                  <a
                    href="mailto:your@email.com"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    your.email@example.com
                  </a>
                </div>
              </div>
            </div>

            <div className="glossy-button p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="flex items-start">
                <FaPhone className="text-3xl text-blue-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-black mb-1">Phone</h4>
                  <a
                    href="tel:+1234567890"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>

            <div className="glossy-button p-6 rounded-xl hover:shadow-lg transition-all">
              <div>
                <h4 className="font-semibold text-black mb-4">Connect With Me</h4>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-110 duration-200"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition transform hover:scale-110 duration-200"
                  >
                    <FaGithub className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form onSubmit={submit} className="space-y-5">
            <div>
              <input
                className="w-full rounded-xl border border-gray-300 px-5 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div>
              <input
                className="w-full rounded-xl border border-gray-300 px-5 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                placeholder="Your Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <textarea
                className="w-full rounded-xl border border-gray-300 px-5 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition resize-none"
                rows={6}
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-95 disabled:opacity-60 transition-all duration-200"
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            {status === "success" && (
              <div className="p-4 bg-green-100 border border-green-400 text-green-800 rounded-xl text-center font-semibold">
                ✓ Message sent successfully!
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
