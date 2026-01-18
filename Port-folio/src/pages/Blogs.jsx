import React, { useState } from "react";
import { FaCalendar, FaUser, FaArrowRight } from "react-icons/fa";

const allBlogs = [
  {
    id: 1,
    title: "Getting Started with Azure AI Services",
    author: "Venkat Sai",
    date: "Jan 15, 2025",
    category: "Azure",
    image: "https://via.placeholder.com/400x200?text=Azure+AI",
    excerpt: "Learn how to leverage Azure AI services to build intelligent applications with minimal effort.",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Data Pipeline Optimization Techniques",
    author: "Venkat Sai",
    date: "Jan 10, 2025",
    category: "Data Engineering",
    image: "https://via.placeholder.com/400x200?text=Data+Pipeline",
    excerpt: "Explore best practices for optimizing ETL pipelines and improving data processing efficiency.",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Machine Learning Model Deployment",
    author: "Venkat Sai",
    date: "Jan 5, 2025",
    category: "Machine Learning",
    image: "https://via.placeholder.com/400x200?text=ML+Deployment",
    excerpt: "A comprehensive guide to deploying ML models to production using modern MLOps practices.",
    readTime: "8 min read",
  },
  {
    id: 4,
    title: "Real-time Analytics with Kafka and Spark",
    author: "Venkat Sai",
    date: "Dec 28, 2024",
    category: "Big Data",
    image: "https://via.placeholder.com/400x200?text=Kafka+Spark",
    excerpt: "Build real-time analytics pipelines using Apache Kafka and Spark for streaming data.",
    readTime: "9 min read",
  },
  {
    id: 5,
    title: "Cloud Data Warehouse Best Practices",
    author: "Venkat Sai",
    date: "Dec 20, 2024",
    category: "Cloud",
    image: "https://via.placeholder.com/400x200?text=Data+Warehouse",
    excerpt: "Design and implement scalable cloud data warehouses with Snowflake and Azure Synapse.",
    readTime: "6 min read",
  },
  {
    id: 6,
    title: "Natural Language Processing with Transformers",
    author: "Venkat Sai",
    date: "Dec 15, 2024",
    category: "NLP",
    image: "https://via.placeholder.com/400x200?text=NLP",
    excerpt: "Deep dive into transformer models and their applications in modern NLP tasks.",
    readTime: "10 min read",
  },
  {
    id: 7,
    title: "Building Scalable APIs with Node.js",
    author: "Venkat Sai",
    date: "Dec 10, 2024",
    category: "Backend",
    image: "https://via.placeholder.com/400x200?text=Node+API",
    excerpt: "Master the art of building production-ready REST and GraphQL APIs with Node.js.",
    readTime: "7 min read",
  },
  {
    id: 8,
    title: "Advanced SQL Optimization Strategies",
    author: "Venkat Sai",
    date: "Dec 5, 2024",
    category: "Database",
    image: "https://via.placeholder.com/400x200?text=SQL",
    excerpt: "Learn advanced SQL techniques to optimize complex queries and improve performance.",
    readTime: "8 min read",
  },
  {
    id: 9,
    title: "Docker and Kubernetes for Beginners",
    author: "Venkat Sai",
    date: "Nov 28, 2024",
    category: "DevOps",
    image: "https://via.placeholder.com/400x200?text=Docker+K8s",
    excerpt: "Containerize your applications and orchestrate them with Kubernetes effectively.",
    readTime: "9 min read",
  },
  {
    id: 10,
    title: "Data Visualization with Power BI",
    author: "Venkat Sai",
    date: "Nov 20, 2024",
    category: "BI",
    image: "https://via.placeholder.com/400x200?text=Power+BI",
    excerpt: "Create stunning interactive dashboards and reports using Microsoft Power BI.",
    readTime: "6 min read",
  },
];

export default function Blogs() {
  const [showAll, setShowAll] = useState(false);
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

              <button className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group/btn">
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
