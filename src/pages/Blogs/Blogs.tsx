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
    <div className="min-h-screen bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          JavaScript Learning Hub
        </motion.h1>
        <motion.p
          className="text-gray-400 text-lg max-w-2xl mx-auto"
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
        <div className="bg-gray-800 rounded-xl border border-purple-500/20 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
              <div className="flex items-center text-sm text-purple-500">
                <FiCalendar className="mr-2" />
                Featured Post
              </div>
              <h2 className="text-2xl font-bold text-white">{featuredBlog.title}</h2>
              <p className="text-gray-400">{featuredBlog.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {featuredBlog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full flex items-center"
                  >
                    <FiTag className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/blogs${featuredBlog.link}`}
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
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
              className="bg-gray-800 rounded-xl border border-purple-500/20 overflow-hidden hover:border-purple-500/40 transition-all"
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
                <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                <p className="text-gray-400 line-clamp-2">{blog.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full flex items-center"
                    >
                      <FiTag className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/blogs${blog.link}`}
                  className="inline-block text-purple-500 hover:text-purple-400 font-medium transition-colors"
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
