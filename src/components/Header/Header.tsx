import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaRocket,
  FaCode,
  FaLightbulb,
  FaBook,
  FaPencilAlt,
  FaHeart,
} from "react-icons/fa";
import './Header.scss';

const Header: React.FC = () => {
  const navLinks = [
    {
      title: "Topics",
      path: "/topics",
      icon: <FaRocket />,
    },
    {
      title: "Concepts",
      path: "/concepts",
      icon: <FaLightbulb />,
    },
    {
      title: "Code Vault",
      path: "/code-vault",
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
      icon: <FaPencilAlt />,
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
          JS Handbook
        </NavLink>
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
      </div>
    </header>
  );
};

export default Header; 