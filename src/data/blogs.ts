export type Blog = {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
  image?: string;
};

export const blogs: Blog[] = [
  {
    id: "data-quality-frameworks",
    title: "Building Robust Data Quality Frameworks in Modern Data Pipelines",
    date: "Jan 20, 2025",
    category: "Data Engineering",
    excerpt:
      "Layered quality: schema checks, statistical monitors, business rules, and anomaly detection that scale with your lakehouse.",
    readTime: "12 min read",
    image: "/Images/Blogs/data-quality-framework.png",
  },
];
