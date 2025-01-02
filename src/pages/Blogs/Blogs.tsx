import React from "react";
import "./Blogs.scss";
import { motion } from "framer-motion";

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  link: string;
  image: string;
}

const Blogs: React.FC = () => {
  const blogs: Blog[] = [
    {
      id: 1,
      title: "Understanding JavaScript Promises",
      excerpt:
        "A comprehensive guide to working with Promises in JavaScript...",
      date: "2024-03-15",
      readTime: "5 min read",
      tags: ["JavaScript", "Async", "Programming"],
      link: "https://example.com/js-promises",
      image: "https://via.placeholder.com/300x200?text=JavaScript",
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      excerpt:
        "Everything you need to know about React Hooks and their usage...",
      date: "2024-03-10",
      readTime: "8 min read",
      tags: ["React", "Hooks", "Frontend"],
      link: "https://example.com/react-hooks",
      image: "https://via.placeholder.com/300x200?text=React",
    },
  ];

  return (
    <div className="blogs-container">
      {blogs.map((blog) => (
        <motion.article
          key={blog.id}
          className="blog-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          }}
        >
          <img src={blog.image} alt={blog.title} />
          <div className="content">
            <h2>{blog.title}</h2>
            <p>{blog.excerpt}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More
            </motion.button>
          </div>
        </motion.article>
      ))}
    </div>
  );
};

export default Blogs;
