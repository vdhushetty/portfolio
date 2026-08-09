import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiClock, FiMail, FiMessageCircle, FiShield } from "react-icons/fi";
import { Reveal, SectionHeader } from "../components/ui";

const EMAIL = "venkatsaidhushetty@gmail.com";

export default function Contact() {
  const openChat = () =>
    window.dispatchEvent(
      new CustomEvent("open-portfolio-chat", { detail: { mode: "human" } })
    );

  return (
    <div>
      <SectionHeader
        index="// 10"
        kicker="Contact"
        title="Let's build something reliable."
        sub="Message me here for a private, resumable conversation—or use email and LinkedIn."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="panel h-full p-7">
            <span className="eyebrow text-signal">Direct conversation</span>
            <h3 className="mt-3 font-display text-2xl font-semibold">
              Chat with me from this portfolio.
            </h3>
            <p className="mt-3 leading-relaxed text-dim">
              Your message is saved privately and delivered to my Discord inbox. I
              reply personally, and the response appears in the same browser conversation.
            </p>
            <button
              onClick={openChat}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-signal px-5 py-3 font-mono text-sm font-medium text-canvas hover:bg-ink"
            >
              <FiMessageCircle /> Message Venkat
            </button>
            <div className="mt-7 grid gap-3 border-t border-line pt-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <FiClock className="mt-1 text-mint" />
                <div>
                  <p className="text-sm text-ink">Usually within 24 hours</p>
                  <p className="text-xs text-faint">Pacific Time · Bellevue, WA</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiShield className="mt-1 text-mint" />
                <div>
                  <p className="text-sm text-ink">Private by default</p>
                  <p className="text-xs text-faint">Not published or used for marketing</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="panel h-full divide-y divide-line">
            <a
              href={"mailto:" + EMAIL}
              className="flex items-center gap-4 p-5 hover:bg-white/[0.02]"
            >
              <FiMail className="text-xl text-signal" />
              <div>
                <span className="eyebrow">Email</span>
                <p className="mt-1 break-all text-sm text-ink">{EMAIL}</p>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/vdhushetty/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 hover:bg-white/[0.02]"
            >
              <FaLinkedin className="text-xl text-signal" />
              <div>
                <span className="eyebrow">LinkedIn</span>
                <p className="mt-1 text-sm text-ink">Professional profile and recommendations</p>
              </div>
            </a>
            <a
              href="https://github.com/vdhushetty"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 hover:bg-white/[0.02]"
            >
              <FaGithub className="text-xl text-signal" />
              <div>
                <span className="eyebrow">GitHub</span>
                <p className="mt-1 text-sm text-ink">Code and public project activity</p>
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
