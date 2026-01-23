import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendar, FaUser, FaArrowRight } from "react-icons/fa";
import { blogsData } from "./blogsData";

const allBlogs = blogsData;

export default function Blogs() {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const displayedBlogs = showAll ? allBlogs : allBlogs.slice(0, 6);

  return (
    <section id="blogs" className="w-full">
      <div className="mb-12">
        <h2 className="text-5xl font-bold mb-4 text-black">Blog Posts</h2>
        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayedBlogs.map((blog) => (
          <article
            key={blog.id}
            className="glossy-button rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
          >
            <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-400 to-blue-600">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                  {blog.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition line-clamp-2">
                {blog.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">{blog.excerpt}</p>

              <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <FaUser className="text-xs" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCalendar className="text-xs" />
                  <span>{blog.date}</span>
                </div>
                <span className="ml-auto text-blue-600 font-semibold">{blog.readTime}</span>
              </div>

              <button className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group/btn" onClick={() => navigate(`/blog/${blog.id}`)}>
                Read More
                <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {!showAll && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-200"
          >
            View All Blogs ({allBlogs.length})
          </button>
        </div>
      )}

      {showAll && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(false)}
            className="px-8 py-3 bg-gray-300 text-black font-semibold rounded-xl hover:bg-gray-400 active:scale-95 transition-all duration-200"
          >
            Show Less
          </button>
        </div>
      )}
    </section>
  );
}
