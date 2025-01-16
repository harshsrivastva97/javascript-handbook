import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogs } from '../../data/blogs';
import './BlogPost.scss';
import { FiArrowLeft } from 'react-icons/fi';
import DOMPurify from 'dompurify';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const blog = blogs.find(b => b.link === `/${slug}`);

  const createMarkup = useCallback((html: string) => {
    return { __html: DOMPurify.sanitize(html) };
  }, []);

  const handleBack = useCallback(() => {
    navigate('/blogs');
  }, [navigate]);

  if (!blog) {
    return (
      <div className="blog-post-wrapper">
        <motion.div 
          className="blog-post"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button className="back-button" onClick={handleBack}>
            <FiArrowLeft /> Back to Blogs
          </button>
          <div className="not-found">
            <h2>Blog post not found</h2>
            <p>The blog post you're looking for doesn't exist or has been moved.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="blog-post-wrapper">
      <motion.div
        className="blog-post"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button
          className="back-button"
          onClick={handleBack}
        >
          <FiArrowLeft /> Back to Blogs
        </button>

        <article>
          <header className="blog-header">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {blog.title}
            </motion.h1>

            <motion.div 
              className="blog-meta"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="tags">
                {blog.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          </header>

          <motion.div 
            className="featured-image"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <img src={blog.image} alt={blog.title} />
          </motion.div>

          <motion.div 
            className="blog-content"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            dangerouslySetInnerHTML={createMarkup(blog.content)}
          />
        </article>
      </motion.div>
    </div>
  );
};

export default BlogPost; 