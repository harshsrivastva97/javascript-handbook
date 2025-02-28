import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
} from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";
import './Header.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/auth');
  };

  const handleDropdownOpen = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300); // 300ms delay before closing
    setDropdownTimeout(timeout as NodeJS.Timeout);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  const navLinks = [
    {
      title: "Read",
      path: "/read",
      icon: <FaNewspaper />,
    },
    {
      title: "Practice",
      path: "/practice",
      icon: <FaCode />,
    },
    {
      title: "Blogs",
      path: "/blogs",
      icon: <FaBook />,
    },
    {
      title: "Exercises",
      path: "/exercises",
      icon: <FaLaptopCode />,
    },
    {
      title: "About",
      path: "/about",
      icon: <FaHeart />,
    },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="logo">
          <span className="logo-symbol">&lt;/&gt;</span>
          <span className="logo-text">JS Handbook</span>
        </NavLink>

        <div className="nav-wrapper">
          <nav className="main-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                {link.icon}
                <span>{link.title}</span>
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
              <div
                className="user-menu"
                onMouseEnter={handleDropdownOpen}
                onMouseLeave={handleDropdownClose}
              >
                <button
                  className="user-button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="user-avatar">
                    {currentUser?.photoURL ? (
                      <img src={currentUser.photoURL} alt="User avatar" />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                  <span className={`user-name ${theme}`}>{currentUser?.displayName}</span>
                  <FaChevronDown className={`chevron-icon ${isDropdownOpen ? 'rotate' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div
                    className="dropdown-menu"
                    onMouseEnter={handleDropdownOpen}
                    onMouseLeave={handleDropdownClose}
                  >
                    <NavLink to="/profile" className="dropdown-item">
                      <FaUser />
                      <span>Profile</span>
                    </NavLink>
                    <button onClick={handleLogout} className="dropdown-item">
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