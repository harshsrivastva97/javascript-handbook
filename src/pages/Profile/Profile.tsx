import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaEdit, FaCheck, FaTimes, FaLinkedin, FaGithub, FaTwitter, FaGlobe } from 'react-icons/fa';
import './Profile.scss';
import { useSelector } from 'react-redux';
import { User, UserDataObject } from '../../api/types/userTypes';
import { useAuth } from '../../contexts/AuthContext';
import { useAppDispatch } from '../../redux/hooks';
import { getUserProfile, updateUserProfile } from '../../redux/slices/userSlice';

interface FormState {
    displayName: string;
    email: string;
    photoURL: string;
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
}

interface EditableField {
    name: keyof FormState;
    isEditing: boolean;
}

interface ProfileSection {
    id: string;
    title: string;
    icon: React.ReactNode;
}

const INITIAL_FORM_STATE: FormState = {
    displayName: '',
    email: '',
    photoURL: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: ''
};

const PROFILE_SECTIONS: ProfileSection[] = [
    { id: 'profile', title: 'Profile Overview', icon: <FaUser /> },
];

const EDITABLE_FIELDS: EditableField[] = [
    { name: 'displayName', isEditing: false },
    { name: 'email', isEditing: false },
    { name: 'github', isEditing: true },
    { name: 'linkedin', isEditing: true },
    { name: 'twitter', isEditing: true },
    { name: 'website', isEditing: true }
];

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();

    const { currentUser } = useAuth();
    const user = useSelector((state: { user: { user: User } }) => state.user.user);

    const [activeSection, setActiveSection] = useState<string>('profile');
    const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
    const [editableFields, setEditableFields] = useState<EditableField[]>(EDITABLE_FIELDS);

    const toggleFieldEdit = useCallback((fieldName: keyof FormState) => {
        setEditableFields(prev =>
            prev.map(field =>
                field.name === fieldName ? { ...field, isEditing: !field.isEditing } : field
            )
        );
    }, []);

    const isFieldEditing = useCallback(
        (fieldName: keyof FormState) => {
            return editableFields.some(field => field.name === fieldName && field.isEditing);
        },
        [editableFields]
    );

    const handleCancel = useCallback(
        (fieldName: keyof FormState) => {
            toggleFieldEdit(fieldName);
            setFormState(prev => ({
                ...prev,
                [fieldName]: currentUser?.[fieldName] || user?.[fieldName] || ''
            }));
        },
        [toggleFieldEdit, currentUser, user]
    );

    const handleInputChange = useCallback((fieldName: keyof FormState, value: string) => {
        setFormState(prev => ({ ...prev, [fieldName]: value }));
    }, []);

    const updateProfile = useCallback(() => {
        if (!currentUser?.uid) return;
        const payload: UserDataObject = {
            uid: currentUser.uid,
            ...(formState.displayName && { display_name: formState.displayName }),
            ...(formState.email && { email: formState.email }),
            ...(formState.github && { github: formState.github }),
            ...(formState.linkedin && { linkedin: formState.linkedin }),
            ...(formState.twitter && { twitter: formState.twitter }),
            ...(formState.website && { website: formState.website }),
        };
        dispatch(updateUserProfile(payload));
        setEditableFields(prev => prev.map(field => ({ ...field, isEditing: false })));
    }, [formState, currentUser, dispatch]);

    useEffect(() => {
        if (currentUser?.uid) {
            dispatch(getUserProfile(currentUser.uid));
        }
    }, []);

    useEffect(() => {
        if (!currentUser) return;
        setFormState({
            displayName: currentUser.displayName || '',
            email: currentUser.email || '',
            photoURL: currentUser.photoURL || '',
            github: user?.github || '',
            linkedin: user?.linkedin || '',
            twitter: user?.twitter || '',
            website: user?.website || ''
        });
    }, [currentUser, user]);

    const EditableField: React.FC<{
        fieldName: keyof FormState;
        label: string;
        icon?: React.ReactNode;
    }> = ({ fieldName, label, icon }) => {
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
                            onChange={e => handleInputChange(fieldName, e.target.value)}
                            disabled={!isEditing}
                            placeholder={`Your ${label}`}
                            aria-label={label}
                        />
                    ) : (
                        <div className="field-value">{formState[fieldName]}</div>
                    )}
                    {hasValue && !isEditing && (
                        <button
                            type="button"
                            className="edit-button"
                            onClick={() => toggleFieldEdit(fieldName)}
                            aria-label={`Edit ${label}`}
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
                                aria-label={`Confirm ${label}`}
                            >
                                <FaCheck />
                            </button>
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => handleCancel(fieldName)}
                                aria-label={`Cancel ${label}`}
                            >
                                <FaTimes />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

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
                                {currentUser?.photoURL ? (
                                    <img src={currentUser.photoURL} alt="Profile avatar" className="avatar" />
                                ) : (
                                    <div className="avatar-placeholder">
                                        <FaUser />
                                    </div>
                                )}
                            </div>
                            <h2>{currentUser?.displayName || 'User'}</h2>
                            <span className="email">{currentUser?.email || ''}</span>
                        </div>

                        <nav className="sidebar-nav">
                            {PROFILE_SECTIONS.map(section => (
                                <button
                                    key={section.id}
                                    className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                                    onClick={() => setActiveSection(section.id)}
                                    aria-label={section.title}
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
                            <h1>{PROFILE_SECTIONS.find(s => s.id === activeSection)?.title}</h1>
                        </motion.div>

                        {activeSection === 'profile' && (
                            <div className="profile-section">
                                <form onSubmit={e => e.preventDefault()} className="edit-form">
                                    <EditableField fieldName="displayName" label="Display Name" />
                                    <EditableField fieldName="email" label="Email" icon={<FaEnvelope />} />

                                    <div className="social-links">
                                        <h3>Social Links</h3>
                                        <EditableField fieldName="github" label="GitHub" icon={<FaGithub />} />
                                        <EditableField fieldName="linkedin" label="LinkedIn" icon={<FaLinkedin />} />
                                        <EditableField fieldName="twitter" label="Twitter" icon={<FaTwitter />} />
                                        <EditableField fieldName="website" label="Website" icon={<FaGlobe />} />
                                    </div>

                                    <div className="form-actions">
                                        <button type="submit" className="save-button" onClick={() => updateProfile()}>
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