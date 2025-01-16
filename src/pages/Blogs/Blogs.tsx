import React from "react";
import "./Blogs.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiClock, FiCalendar } from "react-icons/fi";
import { blogs } from "../../data/blogs";
import { BlogPost } from '../../types/blog.types';

const Blogs: React.FC = () => {
  return (
    <motion.div 
      className="blogs-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="page-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1>JavaScript Learning Hub</h1>
        <p>Explore in-depth articles about JavaScript concepts, best practices, and modern development techniques.</p>
      </motion.div>

      <motion.div 
        className="blogs-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {blogs.map((blog: BlogPost, index) => (
          <motion.article
            key={blog.id}
            className="blog-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <div className="image-container">
              <img src={blog.image} alt={blog.title} loading="lazy" />
              <div className="tags">
                {blog.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="content">
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
      </motion.div>
    </motion.div>
  );
};

export default Blogs;
