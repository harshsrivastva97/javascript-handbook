import React from "react";
import "./Blogs.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiClock, FiCalendar, FiTag } from "react-icons/fi";
import { blogs } from "../../data/blogs";

const Blogs: React.FC = () => {
  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <div className="blogs-page scrollable min-h-screen px-4 pt-12 pb-20 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold gradient-text mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          JavaScript Learning Hub
        </motion.h1>
        <motion.p
          className="text-secondary text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore in-depth articles about JavaScript concepts, best practices, and modern development techniques.
        </motion.p>
      </motion.div>

      {/* Featured Blog */}
      <motion.div
        className="max-w-7xl mx-auto mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="featured-blog rounded-xl border overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
              <div className="flex items-center text-sm" style={{ color: 'var(--primary-color)' }}>
                <FiCalendar className="mr-2" />
                Featured Post
              </div>
              <h2 className="text-2xl font-bold text-primary">{featuredBlog.title}</h2>
              <p className="text-secondary">{featuredBlog.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {featuredBlog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="blog-tag px-3 py-1 text-sm rounded-full flex items-center"
                  >
                    <FiTag className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/blogs${featuredBlog.link}`}
                className="primary-button inline-block px-6 py-3 rounded-lg font-medium transition-all"
              >
                Read Article
              </Link>
            </div>
            <div className="relative h-64 md:h-auto">
              <img
                src={featuredBlog.image}
                alt={featuredBlog.title}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Blog Grid */}
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingBlogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              className="blog-card rounded-xl border overflow-hidden transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.7 }}
            >
              <div className="relative h-48">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-primary">{blog.title}</h3>
                <p className="text-secondary line-clamp-2">{blog.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="blog-tag px-3 py-1 text-sm rounded-full flex items-center"
                    >
                      <FiTag className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/blogs${blog.link}`}
                  className="read-more inline-block font-medium transition-colors"
                >
                  Read Article →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Blogs;
