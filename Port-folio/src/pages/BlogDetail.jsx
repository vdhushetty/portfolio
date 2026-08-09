import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { blogsData } from "./blogsData";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const blog = blogsData.find((b) => b.id === parseInt(id, 10));

  if (!blog) {
    return (
      <div className="min-h-screen grid place-items-center px-4 pt-16">
        <div className="text-center">
          <h1 className="font-display text-4xl font-semibold mb-3">Post not found</h1>
          <p className="text-dim mb-8">This article doesn't exist.</p>
          <button
            onClick={() => navigate("/writing")}
            className="rounded-lg bg-signal px-6 py-3 font-mono text-sm text-canvas hover:bg-white transition-colors"
          >
            Back to writing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 accent-de">
      {/* Header */}
      <div className="relative border-b border-line overflow-hidden">
        <div className="absolute inset-0 -z-10 grid-bg" />
        <div className="absolute inset-0 -z-10 signal-wash" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <button
            onClick={() => navigate("/writing")}
            className="inline-flex items-center gap-2 font-mono text-sm text-dim hover:text-signal transition-colors mb-8"
          >
            <FiArrowLeft /> Back to writing
          </button>
          <span className="eyebrow text-signal">{blog.category}</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold leading-tight">
            {blog.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-faint">
            <span>{blog.author}</span>
            <span>{blog.date}</span>
            <span>{blog.readTime}</span>
          </div>
        </div>
      </div>

      {/* Featured image */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
        <div className="panel p-3 overflow-hidden">
          <img src={blog.image} alt={blog.title} className="w-full rounded-lg" />
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
        <style>{`
          .blog-content { color: var(--color-dim); }
          .blog-content h2 { font-family: var(--font-display); font-size: 1.9rem; font-weight: 600; color: var(--color-ink); margin: 2.75rem 0 1.1rem; letter-spacing: -0.02em; }
          .blog-content h3 { font-family: var(--font-display); font-size: 1.4rem; font-weight: 600; color: var(--color-ink); margin: 2rem 0 0.85rem; }
          .blog-content h4 { font-family: var(--font-display); font-size: 1.1rem; font-weight: 600; color: #cdd8ec; margin: 1.5rem 0 0.6rem; }
          .blog-content p { margin-bottom: 1.1rem; line-height: 1.85; }
          .blog-content ul { list-style: none; margin: 0 0 1.4rem; padding: 0; }
          .blog-content li { position: relative; padding-left: 1.4rem; margin-bottom: 0.6rem; line-height: 1.75; }
          .blog-content li::before { content: "▹"; position: absolute; left: 0; color: var(--color-signal); font-family: var(--font-mono); font-size: 0.8rem; top: 0.15rem; }
          .blog-content strong { color: var(--color-ink); font-weight: 600; }
          .blog-content pre { margin: 1.4rem 0; }
        `}</style>
      </article>

      {/* CTA */}
      <div className="border-t border-line">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h3 className="font-display text-2xl font-semibold mb-3">Enjoyed the read?</h3>
          <p className="text-dim mb-8">Let's talk data engineering — pipelines, quality, or scale.</p>
          <button
            onClick={() => navigate("/#contact")}
            className="rounded-lg bg-signal px-7 py-3 font-mono text-sm text-canvas hover:bg-white transition-colors"
          >
            Get in touch
          </button>
        </div>
      </div>
    </div>
  );
}
