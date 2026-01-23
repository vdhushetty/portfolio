import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendar, FaUser, FaClock } from "react-icons/fa";
import { blogsData } from "./blogsData";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const blog = blogsData.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/#blogs")}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-50 to-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate("/#blogs")}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg mb-8"
          >
            <FaArrowLeft className="text-lg" /> Back to Blogs
          </button>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{blog.title}</h1>

          {/* Blog Meta Info */}
          <div className="flex flex-wrap gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <FaUser className="text-blue-600" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendar className="text-blue-600" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-blue-600" />
              <span>{blog.readTime}</span>
            </div>
            <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
              {blog.category}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-3xl mx-auto px-4 py-8 flex justify-center">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-96 object-contain rounded-2xl shadow-lg mb-12"
        />
      </div>

      {/* Blog Content */}
      <article className="max-w-3xl mx-auto px-4 pb-20">
        <div className="prose prose-lg max-w-none">
          <div
            className="blog-content text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: blog.content
                .replace(/<h2>/g, '<h2 className="text-4xl font-bold mt-12 mb-6 text-black">')
                .replace(/<h3>/g, '<h3 className="text-2xl font-bold mt-8 mb-4 text-black">')
                .replace(/<h4>/g, '<h4 className="text-xl font-bold mt-6 mb-3 text-black">')
                .replace(/<p>/g, '<p className="mb-4">')
                .replace(/<ul>/g, '<ul className="list-disc list-inside mb-4 space-y-2">')
                .replace(/<li>/g, '<li className="text-gray-700">')
                .replace(/<pre>/g, '<pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">')
                .replace(/<code>/g, '<code className="font-mono text-sm">'),
            }}
          />
        </div>

        {/* CSS for custom styling */}
        <style>{`
          .blog-content h2 {
            font-size: 2.25rem;
            font-weight: 700;
            margin-top: 3rem;
            margin-bottom: 1.5rem;
            color: #000;
          }

          .blog-content h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-top: 2rem;
            margin-bottom: 1rem;
            color: #000;
          }

          .blog-content h4 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            color: #000;
          }

          .blog-content p {
            margin-bottom: 1rem;
            color: #374151;
            line-height: 1.8;
          }

          .blog-content ul {
            list-style-type: disc;
            margin-left: 2rem;
            margin-bottom: 1rem;
            space-y: 0.5rem;
          }

          .blog-content li {
            color: #374151;
            margin-bottom: 0.5rem;
            line-height: 1.8;
          }

          .blog-content strong {
            font-weight: 600;
            color: #1a1a1a;
          }

          .blog-content pre {
            background-color: #111827;
            color: #f3f4f6;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin-bottom: 1rem;
            font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
            font-size: 0.875rem;
          }

          .blog-content code {
            font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
            font-size: 0.875rem;
          }
        `}</style>
      </article>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Interested in My Work?</h3>
          <p className="text-lg mb-8 text-blue-100">
            Let's discuss how these data engineering practices can transform your organization.
          </p>
          <button
            onClick={() => navigate("/#contact")}
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
}
