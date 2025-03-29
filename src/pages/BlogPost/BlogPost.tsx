import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBlogContent, fetchBlogs } from "../../redux/slices/blogsSlice";
import { FiTag, FiShare2, FiArrowLeft, FiHeart, FiBookmark, FiCopy, FiCheck, FiChevronUp, FiArrowRight } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AppLoader from "../../components/AppLoader/AppLoader";
import "./BlogPost.scss";

const BlogPost: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const blogId = params.slug;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadBlogContent = async () => {
      if (blogId) {
        try {
          await dispatch(fetchBlogContent(Number(blogId))).unwrap();
          dispatch(fetchBlogs());
        } catch (error) {
          console.error("Failed to fetch blog content:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadBlogContent();
    
    // Reset scroll position when viewing a new blog post
    window.scrollTo(0, 0);
  }, [blogId, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      // Update reading progress
      if (articleRef.current) {
        const element = articleRef.current;
        const totalHeight = element.clientHeight - window.innerHeight;
        const windowScrollTop = window.scrollY || document.documentElement.scrollTop;
        if (windowScrollTop === 0) {
          setReadingProgress(0);
          setShowScrollTop(false);
        } else if (windowScrollTop > totalHeight) {
          setReadingProgress(100);
          setShowScrollTop(true);
        } else {
          setReadingProgress((windowScrollTop / totalHeight) * 100);
          setShowScrollTop(windowScrollTop > 300);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { selectedBlog, blogs } = useAppSelector((state) => state.blogs);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedBlog?.title || 'Blog Post',
          text: selectedBlog?.description || '',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // TODO: Implement like functionality with backend
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark functionality with backend
  };

  const getReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/)?.length || 0;
    return Math.ceil(words / wordsPerMinute);
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Get 3 random blogs that aren't the current blog
  const relatedBlogs = useMemo(() => {
    if (!blogs || blogs.length === 0 || !selectedBlog) return [];
    
    // Filter out the current blog
    const otherBlogs = blogs.filter(blog => blog.blog_id !== selectedBlog.blog_id);
    
    // If we have less than 3 other blogs, return all of them
    if (otherBlogs.length <= 3) return otherBlogs;
    
    // Otherwise, pick 3 random blogs
    const shuffled = [...otherBlogs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [blogs, selectedBlog]);

  if (isLoading) {
    return (
      <div className="blog-post-loader">
        <AppLoader text="Loading amazing content..." />
      </div>
    );
  }

  if (!selectedBlog) {
    return (
      <div className="blog-post-error">
        <h2>Oops! Blog post not found</h2>
        <p>The blog post you're looking for seems to have wandered off...</p>
        <button onClick={() => navigate(-1)} className="back-button">
          <FiArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  const readingTime = getReadingTime(selectedBlog.content || selectedBlog.description || '');

  return (
    <div className="blog-post-container" ref={articleRef}>
      <div className="progress-bar" style={{ width: `${readingProgress}%` }} />
      
      <button className="back-nav-button" onClick={() => navigate(-1)}>
        <FiArrowLeft />
      </button>
      
      <article className="blog-post">
        <div className="tags-container">
          <div className="tags">
            {selectedBlog.tags?.map((tag, index) => (
              <span key={index} className="tag" style={{ animationDelay: `${index * 0.1}s` }}>
                <FiTag />
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="blog-post-content" ref={contentRef}>
          {selectedBlog.content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {selectedBlog.content}
            </ReactMarkdown>
          ) : (
            <p>{selectedBlog.description}</p>
          )}
        </div>

        <div className="floating-actions">
          <button 
            className={`action-button like-button ${isLiked ? 'active' : ''}`}
            onClick={handleLike}
            aria-label="Like article"
          >
            <FiHeart />
            <span className="action-tooltip">
              {isLiked ? 'Liked' : 'Like'}
            </span>
          </button>
          <button 
            className={`action-button bookmark-button ${isBookmarked ? 'active' : ''}`}
            onClick={handleBookmark}
            aria-label="Bookmark article"
          >
            <FiBookmark />
            <span className="action-tooltip">
              {isBookmarked ? 'Saved' : 'Save'}
            </span>
          </button>
          <button 
            className="action-button share-button"
            onClick={handleShare}
            aria-label="Share article"
          >
            <FiShare2 />
            <span className="action-tooltip">Share</span>
          </button>
          <button 
            className={`action-button copy-button ${copied ? 'copied' : ''}`}
            onClick={handleCopyLink}
            aria-label="Copy link"
          >
            {copied ? <FiCheck /> : <FiCopy />}
            <span className="action-tooltip">
              {copied ? 'Copied!' : 'Copy link'}
            </span>
          </button>
          {showScrollTop && (
            <button 
              className="action-button scroll-top-button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <FiChevronUp />
              <span className="action-tooltip">Top</span>
            </button>
          )}
        </div>

        <footer className="blog-post-footer">
          <div className="author-card">
            <div className="author-avatar">JS</div>
            <div className="author-info">
              <h3>JavaScript Handbook</h3>
              <p>Empowering developers to master JavaScript with expert insights and practical guides.</p>
            </div>
          </div>
          
          <div className="related-posts">
            <h3>You might also like</h3>
            {relatedBlogs.length > 0 ? (
              <div className="related-posts-grid">
                {relatedBlogs.map(blog => (
                  <Link to={`/dev-insights/${blog.blog_id}`} key={blog.blog_id} className="related-post-card">
                    <h4>{blog.title}</h4>
                    <p>{blog.description.length > 100 
                      ? `${blog.description.substring(0, 100)}...` 
                      : blog.description}
                    </p>
                    <div className="card-footer">
                      {blog.tags && blog.tags.length > 0 && (
                        <span className="tag">
                          <FiTag /> {blog.tags[0]}
                        </span>
                      )}
                      <span className="read-more">
                        Read article <FiArrowRight />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="related-posts-placeholder">
                <p>No related articles found</p>
              </div>
            )}
          </div>
          
          <div className="article-actions">
            <button 
              className={`like-button-large ${isLiked ? 'active' : ''}`}
              onClick={handleLike}
            >
              <FiHeart /> {isLiked ? 'You liked this article' : 'Like this article'}
            </button>
            <button 
              className={`bookmark-button-large ${isBookmarked ? 'active' : ''}`}
              onClick={handleBookmark}
            >
              <FiBookmark /> {isBookmarked ? 'Saved for later' : 'Save for later'}
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogPost;
