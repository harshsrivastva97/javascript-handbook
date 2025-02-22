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
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
          >
            <span className="text-2xl">&lt;/&gt;</span>
            <span>JS Handbook</span>
          </NavLink>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg flex items-center gap-2 transition-all
                    ${isActive
                      ? 'bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`
                  }
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.title}</span>
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center">
              {isLoggedIn ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all">
                    <FaUser className="text-lg" />
                    <span className="hidden sm:inline">My Profile</span>
                    <FaChevronDown className="text-sm transition-transform group-hover:rotate-180" />
                  </button>

                  <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <NavLink
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      <FaUser />
                      <span>Profile</span>
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <NavLink
                  to="/auth"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  <FaUser className="text-lg" />
                  <span className="hidden sm:inline">Sign In</span>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 