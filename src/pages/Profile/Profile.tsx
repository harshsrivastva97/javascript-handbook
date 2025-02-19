import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaUser, FaEnvelope, FaCalendarAlt, FaGoogle, FaKey,
    FaCog, FaBell, FaShieldAlt, FaHistory, FaEdit,
    FaGithub, FaLinkedin, FaTwitter, FaGlobe
} from 'react-icons/fa';
import { getAuth, updateProfile, updateEmail, sendEmailVerification } from 'firebase/auth';
import './Profile.scss';

interface UserProfile {
    displayName: string | null;
    email: string | null;
    photoUrl: string | null;
    providerId: string;
    createdAt: string;
    lastLoginAt: string;
    emailVerified: boolean;
    socialLinks?: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        website?: string;
    };
}

interface ProfileSection {
    id: string;
    title: string;
    icon: React.ReactNode;
}

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        displayName: '',
        email: '',
        github: '',
        linkedin: '',
        twitter: '',
        website: ''
    });
    const auth = getAuth();

    const sections: ProfileSection[] = [
        { id: 'profile', title: 'Profile Overview', icon: <FaUser /> },
        { id: 'security', title: 'Security', icon: <FaShieldAlt /> },
        { id: 'notifications', title: 'Notifications', icon: <FaBell /> },
        { id: 'activity', title: 'Activity Log', icon: <FaHistory /> },
        { id: 'settings', title: 'Settings', icon: <FaCog /> },
    ];

    useEffect(() => {
        fetchUserProfile();
    }, [auth]);

    const fetchUserProfile = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                const provider = user.providerData[0];

                setProfile({
                    displayName: user.displayName || 'Anonymous User',
                    email: user.email,
                    photoUrl: user.photoURL,
                    providerId: provider?.providerId || 'email/password',
                    createdAt: new Date(user.metadata.creationTime!).toLocaleDateString(),
                    lastLoginAt: new Date(user.metadata.lastSignInTime!).toLocaleDateString(),
                    emailVerified: user.emailVerified,
                    socialLinks: {
                        github: '',
                        linkedin: '',
                        twitter: '',
                        website: ''
                    }
                });

                setEditForm({
                    displayName: user.displayName || '',
                    email: user.email || '',
                    github: '',
                    linkedin: '',
                    twitter: '',
                    website: ''
                });
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const user = auth.currentUser;
            if (user) {
                if (editForm.displayName !== user.displayName) {
                    await updateProfile(user, {
                        displayName: editForm.displayName
                    });
                }

                if (editForm.email !== user.email) {
                    await updateEmail(user, editForm.email);
                    await sendEmailVerification(user);
                }

                // Update social links in your database here

                await fetchUserProfile();
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="profile-loading">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <motion.div
            className="profile-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="profile-content">
                <div className="profile-layout">
                    <motion.aside
                        className="profile-sidebar"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="sidebar-header">
                            <div className="avatar-wrapper">
                                {profile?.photoUrl ? (
                                    <img src={profile.photoUrl} alt="Profile" className="avatar" />
                                ) : (
                                    <div className="avatar-placeholder">
                                        <FaUser />
                                    </div>
                                )}
                            </div>
                            <h2>{profile?.displayName}</h2>
                            <span className="email">{profile?.email}</span>
                        </div>

                        <nav className="sidebar-nav">
                            {sections.map(section => (
                                <button
                                    key={section.id}
                                    className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                                    onClick={() => setActiveSection(section.id)}
                                >
                                    {section.icon}
                                    <span>{section.title}</span>
                                </button>
                            ))}
                        </nav>
                    </motion.aside>

                    <main className="profile-main">
                        <motion.div
                            className="section-header"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h1>{sections.find(s => s.id === activeSection)?.title}</h1>
                            {activeSection === 'profile' && !isEditing && (
                                <button className="edit-button" onClick={() => setIsEditing(true)}>
                                    <FaEdit />
                                    Edit Profile
                                </button>
                            )}
                        </motion.div>

                        {activeSection === 'profile' && (
                            <div className="profile-section">
                                {isEditing ? (
                                    <form onSubmit={handleEditSubmit} className="edit-form">
                                        <div className="form-group">
                                            <label>Display Name</label>
                                            <input
                                                type="text"
                                                value={editForm.displayName}
                                                onChange={e => setEditForm(prev => ({
                                                    ...prev,
                                                    displayName: e.target.value
                                                }))}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                value={editForm.email}
                                                onChange={e => setEditForm(prev => ({
                                                    ...prev,
                                                    email: e.target.value
                                                }))}
                                            />
                                        </div>

                                        <div className="social-links">
                                            <h3>Social Links</h3>
                                            <div className="form-group">
                                                <label><FaGithub /> GitHub</label>
                                                <input
                                                    type="url"
                                                    value={editForm.github}
                                                    onChange={e => setEditForm(prev => ({
                                                        ...prev,
                                                        github: e.target.value
                                                    }))}
                                                    placeholder="Your GitHub profile URL"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label><FaLinkedin /> LinkedIn</label>
                                                <input
                                                    type="url"
                                                    value={editForm.linkedin}
                                                    onChange={e => setEditForm(prev => ({
                                                        ...prev,
                                                        linkedin: e.target.value
                                                    }))}
                                                    placeholder="Your LinkedIn profile URL"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label><FaTwitter /> Twitter</label>
                                                <input
                                                    type="url"
                                                    value={editForm.twitter}
                                                    onChange={e => setEditForm(prev => ({
                                                        ...prev,
                                                        twitter: e.target.value
                                                    }))}
                                                    placeholder="Your Twitter profile URL"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label><FaGlobe /> Website</label>
                                                <input
                                                    type="url"
                                                    value={editForm.website}
                                                    onChange={e => setEditForm(prev => ({
                                                        ...prev,
                                                        website: e.target.value
                                                    }))}
                                                    placeholder="Your personal website URL"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-actions">
                                            <button type="submit" className="save-button">
                                                Save Changes
                                            </button>
                                            <button
                                                type="button"
                                                className="cancel-button"
                                                onClick={() => setIsEditing(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="profile-info">
                                        <div className="info-card account-info">
                                            <h3>Account Information</h3>
                                            <div className="info-grid">
                                                <div className="info-item">
                                                    <FaUser className="icon" />
                                                    <div>
                                                        <span className="label">Display Name</span>
                                                        <span className="value">{profile?.displayName}</span>
                                                    </div>
                                                </div>
                                                <div className="info-item">
                                                    <FaEnvelope className="icon" />
                                                    <div>
                                                        <span className="label">Email</span>
                                                        <span className="value">{profile?.email}</span>
                                                    </div>
                                                </div>
                                                <div className="info-item">
                                                    <FaCalendarAlt className="icon" />
                                                    <div>
                                                        <span className="label">Member Since</span>
                                                        <span className="value">{profile?.createdAt}</span>
                                                    </div>
                                                </div>
                                                <div className="info-item">
                                                    {profile?.providerId === 'google.com' ?
                                                        <FaGoogle className="icon" /> :
                                                        <FaKey className="icon" />
                                                    }
                                                    <div>
                                                        <span className="label">Login Method</span>
                                                        <span className="value">
                                                            {profile?.providerId === 'google.com' ? 'Google' : 'Email/Password'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="info-card social-info">
                                            <h3>Social Links</h3>
                                            <div className="social-grid">
                                                {profile?.socialLinks && Object.entries(profile.socialLinks).map(([platform, url]) => (
                                                    url && (
                                                        <a
                                                            key={platform}
                                                            href={url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="social-link"
                                                        >
                                                            {platform === 'github' && <FaGithub />}
                                                            {platform === 'linkedin' && <FaLinkedin />}
                                                            {platform === 'twitter' && <FaTwitter />}
                                                            {platform === 'website' && <FaGlobe />}
                                                            <span>{platform}</span>
                                                        </a>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Placeholder for other sections */}
                        {activeSection === 'security' && (
                            <div className="security-section">
                                <div className="info-card">
                                    <h3>Security Settings</h3>
                                    {/* Add security settings content */}
                                </div>
                            </div>
                        )}

                        {/* Add other section content similarly */}
                    </main>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile; 