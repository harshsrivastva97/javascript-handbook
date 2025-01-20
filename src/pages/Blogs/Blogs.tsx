import React from "react";
import "./Blogs.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiClock, FiCalendar } from "react-icons/fi";
import { blogs } from "../../data/blogs";
import { BlogPost } from '../../types/blog.types';

const Blogs: React.FC = () => {
  const featuredBlog = blogs[0]; // Assuming first blog is featured
  const remainingBlogs = blogs.slice(1);

  return (
    <div className="blogs">
      <motion.div
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            JavaScript Learning Hub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore in-depth articles about JavaScript concepts, best practices, and modern development techniques.
          </motion.p>
        </div>
      </motion.div>

      <div className="blogs-content">
        {/* Featured Blog */}
        <motion.div
          className="featured-blog"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="featured-content">
            <div className="meta">
              <span className="date">
                <FiCalendar /> Featured Post
              </span>
              <span className="read-time">
                <FiClock /> 10 min read
              </span>
            </div>
            <h2>{featuredBlog.title}</h2>
            <p>{featuredBlog.excerpt}</p>
            <div className="tags">
              {featuredBlog.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <Link to={`/blogs${featuredBlog.link}`} className="read-more">
              Read Article
            </Link>
          </div>
          <div className="featured-image">
            <img src={featuredBlog.image} alt={featuredBlog.title} />
          </div>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="blogs-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {remainingBlogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              className="blog-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.7 }}
            >
              <div className="card-image">
                <img src={blog.image} alt={blog.title} loading="lazy" />
              </div>
              <div className="card-content">
                <div className="meta">
                  <span className="read-time">
                    <FiClock /> 8 min read
                  </span>
                </div>
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
                <div className="tags">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <Link to={`/blogs${blog.link}`} className="read-more">
                  Read Article
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Blogs;
