import React from "react";
import "./Blogs.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiClock, FiCalendar } from "react-icons/fi";
import { blogs } from "../../data/blogs/index.ts";

const Blogs: React.FC = () => {
  return (
    <div className="blogs-container">
      <motion.div 
        className="page-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>JavaScript Learning Hub</h1>
        <p>Explore in-depth articles about JavaScript concepts, best practices, and modern development techniques.</p>
      </motion.div>

      {blogs.map((blog, index) => (
        <motion.article
          key={blog.id}
          className="blog-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{
            y: -5,
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          }}
        >
          <div className="image-container">
            <img src={blog.image} alt={blog.title} />
            <div className="tags">
              {blog.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="content">
            <div className="meta">
              <span><FiCalendar /> {blog.date}</span>
              <span><FiClock /> {blog.readTime}</span>
            </div>
            <h2>{blog.title}</h2>
            <p>{blog.excerpt}</p>
            <Link 
              to={`/blogs${blog.link}`} 
              className="read-more"
            >
              Read More
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  );
};

export default Blogs;
