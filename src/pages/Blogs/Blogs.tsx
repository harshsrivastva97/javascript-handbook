import React, { useState } from "react";
import "./Blogs.scss";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiClock, FiCalendar, FiTag, FiSearch, FiBookOpen } from "react-icons/fi";
import { blogs } from "../../data/blogs";

// Enhanced type for blog data with optional fields
interface BlogData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  link: string;
  tags: string[];
  date?: string;
  readTime?: string;
}

const Blogs: React.FC = () => {
  const featuredBlog = blogs[0] as BlogData;
  const remainingBlogs = blogs.slice(1) as BlogData[];
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Extract all unique tags from blogs
  const allTags = Array.from(
    new Set(blogs.flatMap(blog => blog.tags))
  );

  // Filter blogs based on search and category
  const filteredBlogs = remainingBlogs.filter(blog => {
    const matchesSearch = searchTerm === "" || 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || 
      blog.tags.includes(activeCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="blogs-page scrollable min-h-screen px-4 pt-12 pb-20 sm:px-6 lg:px-8">
      {/* Hero Section with improved animation */}
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

      {/* Search and Filter Bar */}
      <motion.div 
        className="max-w-7xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="filter-container p-4 rounded-xl border">
          <div className="search-field flex items-center mb-4 p-2 rounded-lg border">
            <FiSearch className="text-secondary mx-2" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-transparent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="category-filter">
            <div className="flex items-center mb-2">
              <FiBookOpen className="mr-2 text-primary" />
              <h3 className="font-medium">Categories</h3>
            </div>
            <div className="filter-buttons flex flex-wrap gap-2">
              <button
                className={`filter-button px-3 py-1 rounded-full text-sm ${activeCategory === "all" ? "active" : ""}`}
                onClick={() => setActiveCategory("all")}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`filter-button px-3 py-1 rounded-full text-sm ${activeCategory === tag ? "active" : ""}`}
                  onClick={() => setActiveCategory(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Blog - Enhanced with better visuals */}
      <motion.div
        className="max-w-7xl mx-auto mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="featured-blog rounded-xl border overflow-hidden shadow-lg">
          <div className="featured-label px-4 py-2">
            <span className="flex items-center text-sm font-medium" style={{ color: 'var(--primary-color)' }}>
              <FiCalendar className="mr-2" />
              Featured Post
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary">{featuredBlog.title}</h2>
              <p className="text-secondary">{featuredBlog.excerpt}</p>
              <div className="meta-info flex items-center text-sm text-secondary">
                <span className="flex items-center mr-4">
                  <FiCalendar className="mr-1" />
                  {featuredBlog.date || "May 15, 2023"}
                </span>
                <span className="flex items-center">
                  <FiClock className="mr-1" />
                  {featuredBlog.readTime || "5 min read"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 my-3">
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
            <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
              <img
                src={featuredBlog.image}
                alt={featuredBlog.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Blog Grid with improved cards and animations */}
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-2xl font-bold mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Latest Articles
        </motion.h2>
        
        {filteredBlogs.length === 0 ? (
          <motion.div 
            className="text-center py-12 text-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p>No articles found matching your criteria.</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  className="blog-card rounded-xl border overflow-hidden hover:shadow-lg transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-primary">{blog.title}</h3>
                    <p className="text-secondary line-clamp-2">{blog.excerpt}</p>
                    
                    <div className="meta-info flex items-center text-sm text-secondary">
                      <span className="flex items-center mr-4">
                        <FiCalendar className="mr-1" />
                        {blog.date || "May 15, 2023"}
                      </span>
                      <span className="flex items-center">
                        <FiClock className="mr-1" />
                        {blog.readTime || "5 min read"}
                      </span>
                    </div>
                    
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
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Blogs;
