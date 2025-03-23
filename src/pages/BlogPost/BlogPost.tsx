import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBlogContent } from "../../redux/slices/blogsSlice";
import { FiTag, FiCalendar, FiUser, FiShare2, FiArrowLeft, FiClock, FiHeart, FiBookmark } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AppLoader from "../../components/AppLoader/AppLoader";
import { BlogSchema } from "../../api/types/blogTypes";
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
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadBlogContent = async () => {
      if (blogId) {
        try {
          await dispatch(fetchBlogContent(Number(blogId))).unwrap();
        } catch (error) {
          console.error("Failed to fetch blog content:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadBlogContent();
  }, [blogId, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        const element = articleRef.current;
        const totalHeight = element.clientHeight - window.innerHeight;
        const windowScrollTop = window.scrollY || document.documentElement.scrollTop;
        if (windowScrollTop === 0) {
          setReadingProgress(0);
        } else if (windowScrollTop > totalHeight) {
          setReadingProgress(100);
        } else {
          setReadingProgress((windowScrollTop / totalHeight) * 100);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { selectedBlog } = useAppSelector((state) => state.blogs);

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

  if (isLoading) {
    return (
      <div className="blog-post-loader">
        <AppLoader />
        <p>Loading amazing content...</p>
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

  return (
    <div className="blog-post-container" ref={articleRef}>
      <div className="progress-bar" style={{ width: `${readingProgress}%` }} />
      
      <article className="blog-post">
        <header className="blog-post-header">
          <div className="blog-post-meta">
            <span className="post-date">
              <FiCalendar />
              {new Date(selectedBlog.createdAt || Date.now()).toLocaleDateString()}
            </span>
            <span className="post-author">
              <FiUser />
              JavaScript Handbook
            </span>
            <button className="share-button" onClick={handleShare}>
              <FiShare2 />
              Share
            </button>
          </div>

          <h1>{selectedBlog.title}</h1>

          <div className="tags">
            {selectedBlog.tags?.map((tag, index) => (
              <span key={index} className="tag">
                <FiTag />
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="blog-post-content">
          {selectedBlog.content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {selectedBlog.content}
            </ReactMarkdown>
          ) : (
            <p>{selectedBlog.description}</p>
          )}
        </div>

        <footer className="blog-post-footer">
          <div className="engagement">
            <button 
              className={`like-button ${isLiked ? 'active' : ''}`}
              onClick={handleLike}
            >
              <FiHeart /> {isLiked ? 'Liked' : 'Like this article'}
            </button>
            <button 
              className={`bookmark-button ${isBookmarked ? 'active' : ''}`}
              onClick={handleBookmark}
            >
              <FiBookmark /> {isBookmarked ? 'Saved' : 'Save for later'}
            </button>
          </div>

          <div className="related-posts">
            <h3>You might also like</h3>
            {/* Add related posts component here */}
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogPost;
