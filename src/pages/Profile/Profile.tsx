import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaEdit, FaCheck, FaTimes, FaLinkedin, FaGithub, FaTwitter, FaGlobe } from 'react-icons/fa';
import { getAuth, updateProfile, updateEmail, sendEmailVerification, UserProfile } from 'firebase/auth';
import './Profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../api/types/userTypes';

interface ProfileSection {
    id: string;
    title: string;
    icon: React.ReactNode;
}

const Profile: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
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
    ];

    useEffect(() => {
        fetchUserProfile();
    }, [auth]);

    const fetchUserProfile = async () => {
        try {
            const user = auth.currentUser;
            debugger
            if (user) {
                const userProfile = {
                    displayName: user.displayName || 'Anonymous User',
                    email: user.email,
                    photoUrl: user.photoURL,
                    emailVerified: user.emailVerified,
                };

                // Store user data in Redux
                dispatch(setUser({
                    displayName: user.displayName || 'Anonymous User',
                    email: user.email || '',
                    photoURL: user.photoURL || '',
                    user_id: user.user_id
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
                    </main>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile; 