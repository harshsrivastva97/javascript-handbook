import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogs } from '../../data/blogs/index.ts';
import './BlogPost.scss';
import { FiArrowLeft, FiClock, FiCalendar } from 'react-icons/fi';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const blog = blogs.find(b => b.link === `/${slug}`);
  
  if (!blog) {
    return <div>Blog post not found</div>;
  }

  return (
    <motion.div 
      className="blog-post"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <button 
        className="back-button"
        onClick={() => navigate('/blogs')}
      >
        <FiArrowLeft /> Back to Blogs
      </button>
      
      <div className="blog-header">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {blog.title}
        </motion.h1>
        
        <div className="blog-meta">
          <span><FiCalendar /> {blog.date}</span>
          <span><FiClock /> {blog.readTime}</span>
          <div className="tags">
            {blog.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="featured-image">
        <img src={blog.image} alt={blog.title} />
      </div>

      <div className="blog-content">
        {blog.content}
      </div>
    </motion.div>
  );
};

export default BlogPost; 