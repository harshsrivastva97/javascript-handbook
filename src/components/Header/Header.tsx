import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  FaCode,
  FaNewspaper,
  FaBook,
  FaHeart,
  FaLaptopCode,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaMoon,
  FaSun,
  FaBookmark,
  FaCrown,
  FaMedal,
  FaUserFriends,
} from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";
import './Header.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/slices/userSlice';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

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
      title: "Read",
      path: "/read",
      icon: <FaNewspaper />,
      description: "Interactive learning paths"
    },
    {
      title: "Practice",
      path: "/practice",
      icon: <FaCode />,
      description: "Write, test, perfect"
    },
    {
      title: "Blogs",
      path: "/blogs",
      icon: <FaBook />,
      description: "Pro tips & deep dives"
    },
    {
      title: "Exercises",
      path: "/exercises",
      icon: <FaLaptopCode />,
      description: "Level up your skills"
    },
    {
      title: "About",
      path: "/about",
      icon: <FaHeart />,
      description: "The JS journey"
    },
  ];

  return (
    <header className={`header ${theme}`}>
      <div className="flex align-center justify-between px-4 py-1">
        <NavLink to="/" className="logo">
          <div className="logo-icon">
            <span className="logo-symbol">&lt;/&gt;</span>
          </div>
          <div className="logo-text-container">
            <span className="logo-text">JS Handbook</span>
            <span className="logo-tagline">Code Smarter, Execute Brilliantly</span>
          </div>
        </NavLink>

        <div className="mobile-toggle" onClick={toggleMobileMenu}>
          <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={`nav-wrapper ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <nav className="main-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
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
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>

            {isLoggedIn ? (
              <div className="user-menu" ref={dropdownRef}>
                <button
                  className="user-button"
                  onClick={toggleDropdown}
                >
                  <div className="user-avatar">
                    {currentUser?.photoURL ? (
                      <img src={currentUser.photoURL} alt="User avatar" />
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
                          {currentUser?.photoURL ? (
                            <img src={currentUser.photoURL} alt="User avatar" />
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
              <NavLink to="/auth" className="auth-button">
                <FaUser />
                <span>Sign In</span>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 