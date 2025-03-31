import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  FaCode,
  FaNewspaper,
  FaBook,
  FaLaptopCode,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaMoon,
  FaSun,
  FaRocket
} from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";
import './Header.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/userSlice';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.userData.user);
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Handle clicks outside of dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Add scroll effect listener (for transparent header on home page)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
    navigate('/auth');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    {
      title: "Library",
      path: "/library",
      icon: <FaNewspaper />,
      description: "Curated JS Guide"
    },
    {
      title: "Lab",
      path: "/lab",
      icon: <FaCode />,
      description: "Interactive Space"
    },
    {
      title: "DevInsights",
      path: "/dev-insights",
      icon: <FaBook />,
      description: "Pro tips & guides"
    },
    {
      title: "Arena",
      path: "/arena",
      icon: <FaLaptopCode />,
      description: "Test your skills"
    },
    {
      title: "About",
      path: "/about",
      icon: <FaRocket />,
      description: "Our mission"
    },
  ];

  const getUserPhotoURL = () => {
    return currentUser?.photoURL || userData?.photo_url || '';
  };

  // Determine header classes based on whether we're on home page and scroll position
  const getHeaderClasses = () => {
    let classes = `header ${theme}`;
    
    if (isHomePage) {
      classes += ` ${scrolled ? 'scrolled' : 'transparent'}`;
    }
    
    return classes;
  };

  return (
    <header className={getHeaderClasses()}>
      <div className="header-container">
        <NavLink to="/" className="logo" aria-label="JavaScript Handbook Home">
          {isHomePage ? (
            <div className={`logo-home ${scrolled ? 'scrolled' : ''}`}>
              <span>JS</span>
            </div>
          ) : (
            <div className="logo-icon">
              <span className="logo-symbol">&lt;/&gt;</span>
            </div>
          )}
          <div className="logo-text-container">
            <span className="logo-text">JS Handbook</span>
            <span className="logo-tagline">Code Smarter, Execute Brilliantly</span>
          </div>
        </NavLink>

        <button 
          className="mobile-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div className={`nav-container ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <nav className="main-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="nav-icon">{link.icon}</div>
                <div className="nav-content">
                  <span className="nav-title">{link.title}</span>
                  <span className="nav-description">{link.description}</span>
                </div>
              </NavLink>
            ))}
          </nav>

          <div className="actions-group">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
            </button>

            {isLoggedIn ? (
              <div className="user-menu" ref={dropdownRef}>
                <button
                  className="user-button"
                  onClick={toggleDropdown}
                  aria-label="Open user menu"
                  aria-expanded={isDropdownOpen}
                >
                  <div className="user-avatar">
                    {getUserPhotoURL() ? (
                      <img src={getUserPhotoURL()} alt="User profile" />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                  <span className="user-name">{currentUser?.displayName || 'User'}</span>
                  <FaChevronDown className={`chevron-icon ${isDropdownOpen ? 'rotate' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <div className="dropdown-user-info">
                        <div className="dropdown-avatar">
                          {getUserPhotoURL() ? (
                            <img src={getUserPhotoURL()} alt="User profile" />
                          ) : (
                            <FaUser />
                          )}
                        </div>
                        <div className="dropdown-user-details">
                          <span className="dropdown-user-name">{currentUser?.displayName || 'User'}</span>
                          <span className="dropdown-user-email">{currentUser?.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <NavLink to="/profile" className="dropdown-item">
                      <FaUser />
                      <span>Profile</span>
                    </NavLink>
                    <button onClick={handleLogout} className="dropdown-item logout-item">
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                {isHomePage ? (
                  <div className="home-auth-buttons">
                    <button
                      className="signin-button"
                      onClick={() => navigate('/auth')}
                      aria-label="Sign in to your account"
                    >
                      Sign In
                    </button>
                    <button
                      className="signup-button"
                      onClick={() => navigate('/register')}
                      aria-label="Create a new account"
                    >
                      Sign Up
                    </button>
                  </div>
                ) : (
                  <NavLink to="/auth" className="auth-button">
                    <FaUser />
                    <span>Sign In</span>
                  </NavLink>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 