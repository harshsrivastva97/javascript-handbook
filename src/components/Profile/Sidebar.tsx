import React, { useState, useEffect } from 'react';
import { 
  FaInfoCircle,
  FaUserFriends,
  FaMedal,
  FaCrown,
  FaArrowRight,
  FaRocket,
  FaUser,
  FaStar,
  FaChevronRight,
  FaMagic
} from 'react-icons/fa';

// Import the EditableField component
import EditableField from '../EditableField';

// Import the sidebar SCSS file
import './scss/Sidebar.scss';
import { ProfileSection } from '../../constants/interfaces/profile';

interface SidebarProps {
  currentUser: any;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
  profileSections: ProfileSection[];
  onUpdateDisplayName?: (newName: string) => Promise<void> | void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  activeSection,
  setActiveSection,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
  profileSections,
  onUpdateDisplayName
}) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [animateAvatar, setAnimateAvatar] = useState(false);
  const [showStars, setShowStars] = useState(false);
  
  // Create a small animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateAvatar(true);
      setTimeout(() => setAnimateAvatar(false), 1000);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Randomly trigger star animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setShowStars(true);
        setTimeout(() => setShowStars(false), 1500);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className={`profile-sidebar ${isMobileSidebarOpen ? 'mobile-open' : ''}`}>
      {showStars && (
        <div className="floating-stars">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className="star" 
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random() * 1}s`
              }}
            >
              <FaStar />
            </span>
          ))}
        </div>
      )}
      
      <div className="sidebar-header">
        <div className={`avatar-container ${animateAvatar ? 'pulse-animation' : ''}`}>
          <div 
            className="avatar-wrapper"
            onClick={() => {
              setAnimateAvatar(true);
              setTimeout(() => setAnimateAvatar(false), 1000);
            }}
          >
            {currentUser?.photoURL ? (
              <img src={currentUser.photoURL} alt="Profile avatar" className="avatar" />
            ) : (
              <div className="avatar-placeholder">
                <FaUser />
              </div>
            )}
          </div>
        </div>
        
        <div className="user-name-container">
          <EditableField
            value={currentUser?.displayName || 'User'}
            onChange={(newName) => {
              if (onUpdateDisplayName && newName.trim() !== '') {
                onUpdateDisplayName(newName);
                // Show stars animation on successful name change
                setShowStars(true);
                setTimeout(() => setShowStars(false), 1500);
              }
            }}
            placeholder="Click to edit name"
            className="user-name-editable"
          />
        </div>
        
        <span className="user-email">
          {currentUser?.email || ''}
        </span>
        <div className="user-status">
          <span className="status-indicator"></span>
          <span className="status-text">Active</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {profileSections.map((section) => (
          <button
            key={section.id}
            className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => {
              setActiveSection(section.id);
              setIsMobileSidebarOpen(false);
              
              // Show stars when section changes
              if (activeSection !== section.id) {
                setShowStars(true);
                setTimeout(() => setShowStars(false), 1500);
              }
            }}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
            aria-label={section.title}
          >
            <div className="nav-content">
              <div 
                className="icon-container"
                style={{ 
                  background: activeSection === section.id || hoveredSection === section.id ? 
                    `linear-gradient(135deg, ${section.accentColor || '#ff7b00'}, #ff00aa)` : 
                    'linear-gradient(135deg, rgba(255, 123, 0, 0.7) 0%, rgba(255, 0, 170, 0.7) 100%)' 
                }}
              >
                <span className="nav-icon">{section.icon}</span>
              </div>
              <div className="nav-text">
                <span className="nav-title">{section.title}</span>
                {section.subtitle && (
                  <span className="nav-subtitle">{section.subtitle}</span>
                )}
              </div>
            </div>
            
            <span className="nav-arrow">
              <FaChevronRight />
            </span>
            
            {activeSection === section.id && (
              <div className="active-indicator"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div 
          className="upgrade-banner"
          onClick={() => {
            setShowStars(true);
            setTimeout(() => setShowStars(false), 1500);
          }}
        >
          <div className="upgrade-icon">
            <FaMagic />
          </div>
          <div className="upgrade-text">
            <h4>Upgrade Account</h4>
            <p>Unlock premium features</p>
          </div>
        </div>
      </div>
      
      <button 
        className={`mobile-sidebar-toggle`}
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        aria-label={isMobileSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <FaChevronRight className={isMobileSidebarOpen ? 'open' : ''} />
      </button>
    </aside>
  );
};

export default Sidebar; 