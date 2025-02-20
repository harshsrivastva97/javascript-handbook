import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaUser, FaEnvelope,
    FaCog, FaShieldAlt, FaEdit, FaCheck, FaTimes,
    FaLinkedin,
    FaGithub,
    FaTwitter,
    FaGlobe,
    FaChartLine,
    FaTrophy, FaMedal, FaBookReader, FaCode,
    FaCheckCircle, FaClock, FaFireAlt
} from 'react-icons/fa';
import { getAuth, updateProfile, updateEmail, sendEmailVerification } from 'firebase/auth';
import './Profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/auth.slice';

interface UserProfile {
    displayName: string | null;
    email: string | null;
    photoUrl: string | null;
    createdAt: string;
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

interface Achievement {
    id: string;
    title: string;
    description: string;
    progress: number;
    icon: React.ReactNode;
    color: string;
}

interface Streak {
    current: number;
    best: number;
    lastActive: string;
}

const Profile: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('profile');
    const [formState, setFormState] = useState({
        displayName: '',
        email: '',
        github: '',
        linkedin: '',
        twitter: '',
        website: ''
    });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    interface EditableField {
        name: keyof typeof formState;
        isEditing: boolean;
    }

    const [editableFields, setEditableFields] = useState<EditableField[]>([
        { name: 'displayName', isEditing: false },
        { name: 'email', isEditing: false },
        { name: 'github', isEditing: true },
        { name: 'linkedin', isEditing: true },
        { name: 'twitter', isEditing: true },
        { name: 'website', isEditing: true }
    ]);
    const auth = getAuth();

    const sections: ProfileSection[] = [
        { id: 'profile', title: 'Profile Overview', icon: <FaUser /> },
        { id: 'My Progress', title: 'My Progress', icon: <FaChartLine /> },
    ];

    const [achievements, setAchievements] = useState<Achievement[]>([
        {
            id: 'problems',
            title: 'Problem Solver',
            description: 'Problems solved',
            progress: 65,
            icon: <FaCode />,
            color: '#4CAF50'
        },
        {
            id: 'courses',
            title: 'Course Progress',
            description: 'Courses completed',
            progress: 40,
            icon: <FaBookReader />,
            color: '#2196F3'
        },
        {
            id: 'streak',
            title: 'Daily Streak',
            description: 'Days active',
            progress: 80,
            icon: <FaFireAlt />,
            color: '#FF5722'
        }
    ]);

    const [streak, setStreak] = useState<Streak>({
        current: 7,
        best: 15,
        lastActive: 'Today'
    });

    useEffect(() => {
        fetchUserProfile();
    }, [auth]);

    const fetchUserProfile = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userProfile = {
                    displayName: user.displayName || 'Anonymous User',
                    email: user.email,
                    photoUrl: user.photoURL,
                    createdAt: new Date(user.metadata.creationTime!).toLocaleDateString(),
                    emailVerified: user.emailVerified,
                    socialLinks: {
                        github: '',
                        linkedin: '',
                        twitter: '',
                        website: ''
                    }
                };

                // Store user data in Redux
                dispatch(setUser({
                    displayName: user.displayName || 'Anonymous User',
                    email: user.email || '',
                    photoURL: user.photoURL || '',
                    uid: user.uid
                }));

                setProfile(userProfile);
                setFormState({
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
                if (formState.displayName !== user.displayName) {
                    await updateProfile(user, {
                        displayName: formState.displayName
                    });
                }

                if (formState.email !== user.email) {
                    await updateEmail(user, formState.email);
                    await sendEmailVerification(user);
                }

                // Update social links in your database here

                await fetchUserProfile();
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        // Implement password change logic here
        setPasswordForm({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    const toggleFieldEdit = (fieldName: EditableField['name']) => {
        setEditableFields(prev =>
            prev.map(field =>
                field.name === fieldName
                    ? { ...field, isEditing: !field.isEditing }
                    : field
            )
        );
    };

    const isFieldEditing = (fieldName: EditableField['name']) => {
        return editableFields.find(field => field.name === fieldName)?.isEditing;
    };

    const renderEditableField = (
        fieldName: EditableField['name'],
        label: string,
        icon?: React.ReactNode
    ) => {
        const isEditing = isFieldEditing(fieldName);
        const hasValue = formState[fieldName] !== '';

        return (
            <div className="form-group">
                <label>{icon} {label}</label>
                <div className="input-wrapper">
                    {(!hasValue || isEditing) ? (
                        <input
                            type={fieldName === 'email' ? 'email' : 'text'}
                            value={formState[fieldName]}
                            onChange={e => setFormState(prev => ({
                                ...prev,
                                [fieldName]: e.target.value
                            }))}
                            disabled={!isEditing}
                            placeholder={`Your ${label}`}
                        />
                    ) : (
                        <div className="field-value">
                            {formState[fieldName]}
                        </div>
                    )}
                    {hasValue && !isEditing && (
                        <button
                            type="button"
                            className="edit-button"
                            onClick={() => toggleFieldEdit(fieldName)}
                        >
                            <FaEdit />
                        </button>
                    )}
                    {hasValue && isEditing && (
                        <div className="edit-actions">
                            <button
                                type="button"
                                className="confirm-button"
                                onClick={() => toggleFieldEdit(fieldName)}
                            >
                                <FaCheck />
                            </button>
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => {
                                    toggleFieldEdit(fieldName);
                                    // Reset to original value
                                    setFormState(prev => ({
                                        ...prev,
                                        [fieldName]: profile?.[fieldName as keyof UserProfile] || ''
                                    }));
                                }}
                            >
                                <FaTimes />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
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
                        </motion.div>

                        {activeSection === 'profile' && (
                            <div className="profile-section">
                                <form onSubmit={handleEditSubmit} className="edit-form">
                                    {renderEditableField('displayName', 'Display Name')}
                                    {renderEditableField('email', 'Email', <FaEnvelope />)}

                                    <div className="social-links">
                                        <h3>Social Links</h3>
                                        {renderEditableField('github', 'GitHub', <FaGithub />)}
                                        {renderEditableField('linkedin', 'LinkedIn', <FaLinkedin />)}
                                        {renderEditableField('twitter', 'Twitter', <FaTwitter />)}
                                        {renderEditableField('website', 'Website', <FaGlobe />)}
                                    </div>

                                    <div className="form-actions">
                                        <button type="submit" className="save-button">
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeSection === 'My Progress' && (
                            <div className="progress-section">
                                <div className="stats-grid">
                                    {achievements.map(achievement => (
                                        <motion.div
                                            key={achievement.id}
                                            className="achievement-card"
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="achievement-icon" style={{ backgroundColor: achievement.color }}>
                                                {achievement.icon}
                                            </div>
                                            <div className="achievement-info">
                                                <h3>{achievement.title}</h3>
                                                <p>{achievement.description}</p>
                                                <div className="progress-bar-container">
                                                    <div
                                                        className="progress-bar"
                                                        style={{
                                                            width: `${achievement.progress}%`,
                                                            backgroundColor: achievement.color
                                                        }}
                                                    />
                                                </div>
                                                <span className="progress-text">{achievement.progress}%</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="streak-section">
                                    <motion.div
                                        className="streak-card"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="streak-header">
                                            <FaFireAlt className="streak-icon" />
                                            <h3>Coding Streak</h3>
                                        </div>
                                        <div className="streak-stats">
                                            <div className="streak-stat">
                                                <span className="streak-value">{streak.current}</span>
                                                <span className="streak-label">Current Streak</span>
                                            </div>
                                            <div className="streak-stat">
                                                <span className="streak-value">{streak.best}</span>
                                                <span className="streak-label">Best Streak</span>
                                            </div>
                                            <div className="streak-stat">
                                                <span className="streak-value">{streak.lastActive}</span>
                                                <span className="streak-label">Last Active</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="recent-activity">
                                    <h3>Recent Activity</h3>
                                    <motion.div
                                        className="activity-timeline"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {[
                                            { icon: <FaCheckCircle />, text: 'Completed "Advanced JavaScript" course', time: '2 hours ago' },
                                            { icon: <FaTrophy />, text: 'Earned "Problem Solver" badge', time: '1 day ago' },
                                            { icon: <FaCode />, text: 'Solved 3 coding challenges', time: '2 days ago' },
                                        ].map((activity, index) => (
                                            <div key={index} className="activity-item">
                                                <div className="activity-icon">{activity.icon}</div>
                                                <div className="activity-content">
                                                    <p>{activity.text}</p>
                                                    <span>{activity.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile; 