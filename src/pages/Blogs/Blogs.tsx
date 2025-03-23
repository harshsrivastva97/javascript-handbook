import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBlogs } from "../../redux/slices/blogsSlice";
import { BlogSchema } from "../../api/types/blogTypes";
import { useNavigate } from "react-router-dom";
import AppLoader from "../../components/AppLoader/AppLoader";
import "./Blogs.scss";

const Blogs: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { blogs = [], loading, error } = useAppSelector((state) => state.blogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchBlogs()).unwrap();
        // Add a slight delay before showing the content for a smoother transition
        setTimeout(() => setIsVisible(true), 100);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setIsVisible(true);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleBlogSelect = useCallback((blog: BlogSchema) => {
    if (!blog?.blog_id) return;
    navigate(`/dev-insights/${blog.blog_id}`);
  }, [navigate]);

  const handleKeyPress = useCallback((event: React.KeyboardEvent, blog: BlogSchema) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleBlogSelect(blog);
    }
  }, [handleBlogSelect]);
  
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog =>
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [blogs, searchTerm]);

  const renderHeader = () => (
    <header className="blog-header">
      <div className="header-content">
        <h1>JavaScript Handbook Blog</h1>
        <p>Deep dive into JavaScript concepts, best practices, and expert insights</p>
        {!loading && (
          <div className="search-bar">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search blogs"
            />
          </div>
        )}
      </div>
    </header>
  );

  if (loading) {
    return (
      <div className="blogs-container">
        {renderHeader()}
        <div className="blog-content-grid">
          <div className="posts-grid">
            {[...Array(6)].map((_, index) => (
              <div key={`skeleton-${index}`} className="blog-card skeleton-card">
                <div className="card-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-description"></div>
                  <div className="skeleton-description"></div>
                  <div className="skeleton-description last"></div>
                  <div className="card-footer">
                    <div className="tags">
                      <div className="skeleton-tag"></div>
                      <div className="skeleton-tag"></div>
                    </div>
                    <div className="skeleton-read-more"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blogs-container">
        {renderHeader()}
        <div className="error-container">
          <h2>Error loading blogs</h2>
          <p>{error}</p>
          <button 
            className="retry-button" 
            onClick={() => dispatch(fetchBlogs())}
            aria-label="Try loading blogs again"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blogs-container">
      {renderHeader()}

      <div className="blog-content-grid">
        {!filteredBlogs.length && (
          <div className="no-results">
            <h2>No matching posts found</h2>
            <p>Try adjusting your search terms or browse all posts</p>
            <button 
              className="retry-button" 
              onClick={() => setSearchTerm("")}
              aria-label="Show all blog posts"
            >
              Show all posts
            </button>
          </div>
        )}

        <div className={`posts-grid ${isVisible ? 'visible' : ''}`}>
          {filteredBlogs.map((blog, index) => (
            <div
              key={blog.blog_id}
              className={`blog-card fade-in`}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => handleBlogSelect(blog)}
              onKeyDown={(e) => handleKeyPress(e, blog)}
              role="button"
              tabIndex={0}
              aria-label={`Read ${blog.title}`}
            >
              <div className="card-content">
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <div className="card-footer">
                  <div className="tags">
                    {blog.tags?.slice(0, 2).map((tag) => (
                      <span 
                        key={`blog-${blog.blog_id}-tag-${tag}`} 
                        className="tag"
                      >
                        <i className="fas fa-tag"></i>
                        {tag}
                      </span>
                    ))}
                    {blog.tags && blog.tags.length > 2 && (
                      <span className="tag tag-more">
                        +{blog.tags.length - 2} more
                      </span>
                    )}
                  </div>
                  <div className="read-more" aria-hidden="true">
                    <span>Read More</span>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
