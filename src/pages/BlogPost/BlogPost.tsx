import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogs } from '../../data/blogs';
import './BlogPost.scss';
import { FiArrowLeft, FiClock, FiCalendar, FiShare2 } from 'react-icons/fi';
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

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.excerpt,
        url: window.location.href,
      }).catch(console.error);
    }
  }, [blog]);

  if (!blog) {
    return (
      <div className="blog-post-page">
        <motion.div
          className="blog-post-container"
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
    <div className="blog-post-page">
      <motion.div
        className="blog-post-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="blog-navigation">
          <button className="back-button" onClick={handleBack}>
            <FiArrowLeft /> Back to Blogs
          </button>
          <button className="share-button" onClick={handleShare}>
            <FiShare2 /> Share
          </button>
        </div>

        <article className="blog-article">
          <motion.div
            className="blog-hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1>{blog.title}</h1>
            <div className="tags">
              {blog.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </motion.div>

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

          <motion.div
            className="blog-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="tags">
              <span className="label">Tags:</span>
              {blog.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <button className="share-button" onClick={handleShare}>
              <FiShare2 /> Share Article
            </button>
          </motion.div>
        </article>
      </motion.div>
    </div>
  );
};

export default BlogPost; 