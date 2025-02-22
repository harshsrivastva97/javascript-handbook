import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogs } from '../../data/blogs';
import './BlogPost.scss';
import { FiArrowLeft, FiClock, FiCalendar, FiShare2, FiUser } from 'react-icons/fi';
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl w-full space-y-8 bg-gray-800 p-8 rounded-xl border border-purple-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            className="flex items-center text-gray-400 hover:text-purple-500 transition-colors"
            onClick={handleBack}
          >
            <FiArrowLeft className="mr-2" /> Back to Blogs
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Blog post not found</h2>
            <p className="text-gray-400">The blog post you're looking for doesn't exist or has been moved.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <button
            className="flex items-center text-gray-400 hover:text-purple-500 transition-colors"
            onClick={handleBack}
          >
            <FiArrowLeft className="mr-2" /> Back to Blogs
          </button>
          <button
            className="flex items-center text-gray-400 hover:text-purple-500 transition-colors"
            onClick={handleShare}
          >
            <FiShare2 className="mr-2" /> Share
          </button>
        </div>

        <article className="bg-gray-800 rounded-xl border border-purple-500/20 overflow-hidden">
          <motion.div
            className="p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
              {blog.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm bg-gray-700 text-purple-400 border border-purple-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="w-full aspect-video relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className="p-8 prose prose-invert max-w-none"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            dangerouslySetInnerHTML={createMarkup(blog.content)}
          />

          <motion.div
            className="p-8 border-t border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-400">Tags:</span>
                {blog.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm bg-gray-700 text-purple-400 border border-purple-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                className="flex items-center px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
                onClick={handleShare}
              >
                <FiShare2 className="mr-2" />
                Share Article
              </button>
            </div>
          </motion.div>
        </article>
      </motion.div>
    </div>
  );
};

export default BlogPost; 