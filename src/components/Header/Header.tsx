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
} from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";
import './Header.scss';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

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
    <header className="main-header">
      <div className="header-content">
        <NavLink to="/" className="logo">
          <span className="logo-symbol">&lt;/&gt;</span>
          <span className="logo-text">JS Handbook</span>
        </NavLink>

        <div className="navigation-wrapper">
          <nav className="nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-text">{link.title}</span>
              </NavLink>
            ))}
          </nav>

          <div className="auth-section">
            {isLoggedIn ? (
              <div className="profile-dropdown">
                <button className="profile-button">
                  <div className="avatar">
                    <FaUser />
                  </div>
                  <span className="profile-text">My Profile</span>
                  <FaChevronDown className="chevron" />
                </button>
                <div className="dropdown-menu">
                  <NavLink to="/profile" className="dropdown-item">
                    <FaUser />
                    <span>Profile</span>
                  </NavLink>
                  <button onClick={handleLogout} className="dropdown-item">
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <NavLink to="/auth" className="sign-in-button">
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