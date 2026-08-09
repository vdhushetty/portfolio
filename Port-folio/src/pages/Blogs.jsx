import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { blogsData } from "./blogsData";
import { Reveal, SectionHeader } from "../components/ui";

function BlogCard({ blog, featured = false }) {
  const navigate = useNavigate();

  return (
    <Reveal>
      <article
        onClick={() => navigate(`/blog/${blog.id}`)}
        className={`panel panel-hover accent-de group h-full overflow-hidden cursor-pointer ${
          featured ? "grid md:grid-cols-[0.9fr_1.1fr]" : "flex flex-col"
        }`}
      >
        <div
          className={`relative overflow-hidden border-line ${
            featured ? "min-h-64 md:border-r" : "h-44 border-b"
          }`}
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.16em] uppercase text-signal bg-canvas/80 border border-line rounded px-2 py-1">
            {blog.category}
          </span>
        </div>

        <div
          className={`flex flex-col ${
            featured ? "p-7 sm:p-9 justify-center" : "p-6 flex-1"
          }`}
        >
          {featured && <span className="eyebrow text-signal mb-3">Featured article</span>}
          <h3
            className={`${
              featured ? "text-2xl" : "text-lg"
            } font-display font-semibold text-ink leading-snug group-hover:text-signal transition-colors`}
          >
            {blog.title}
          </h3>
          <p
            className={`mt-3 text-dim leading-relaxed ${
              featured ? "text-base" : "text-sm line-clamp-3 flex-1"
            }`}
          >
            {blog.excerpt}
          </p>
          <div className="mt-5 pt-4 border-t border-line flex items-center justify-between">
            <span className="font-mono text-xs text-faint">
              {blog.date} · {blog.readTime}
            </span>
            <FiArrowRight className="text-signal group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Blogs({ mode = "all" }) {
  const navigate = useNavigate();
  const featured = mode === "featured";
  const displayed = featured ? blogsData.slice(0, 1) : blogsData;

  return (
    <div>
      <SectionHeader
        index="// 02"
        kicker="Writing"
        title={featured ? "The thinking behind the systems." : "Notes from the data trenches."}
        sub="Long-form pieces on the patterns behind reliable data systems."
      />

      <div className={featured ? "max-w-5xl" : "grid md:grid-cols-2 lg:grid-cols-3 gap-5"}>
        {displayed.map((blog) => (
          <BlogCard key={blog.id} blog={blog} featured={featured} />
        ))}
      </div>

      {featured && (
        <Reveal className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/writing")}
            className="group inline-flex items-center gap-2 rounded-lg border border-line-2 px-6 py-3 font-mono text-sm text-ink hover:border-signal hover:text-signal transition-colors"
          >
            View all writing
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Reveal>
      )}
    </div>
  );
}
