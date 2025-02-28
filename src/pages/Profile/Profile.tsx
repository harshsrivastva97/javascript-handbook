import React, { useEffect, useState, useCallback } from 'react';
import { FaUser, FaEnvelope, FaEdit, FaCheck, FaTimes, FaLinkedin, FaGithub, FaTwitter, FaGlobe } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { UserProfileState, BackendUserSchema } from '../../api/types/userTypes';
import { useAuth } from '../../contexts/AuthContext';
import { useAppDispatch } from '../../redux/hooks';
import { getUserProfile, updateUserProfile } from '../../redux/slices/userSlice';
import './Profile.scss';

interface EditableField {
    name: keyof UserProfileState;
    isEditing: boolean;
}

interface ProfileSection {
    id: string;
    title: string;
    icon: React.ReactNode;
}

const INITIAL_FORM_STATE: UserProfileState = {
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
    const user = useSelector((state: { user: { user: BackendUserSchema } }) => state.user.user);

    const [activeSection, setActiveSection] = useState<string>('profile');
    const [formState, setFormState] = useState<UserProfileState>(INITIAL_FORM_STATE);
    const [editableFields, setEditableFields] = useState<EditableField[]>(EDITABLE_FIELDS);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

    const toggleFieldEdit = useCallback((fieldName: keyof UserProfileState) => {
        setEditableFields(prev =>
            prev.map(field =>
                field.name === fieldName ? { ...field, isEditing: !field.isEditing } : field
            )
        );
    }, []);

    const isFieldEditing = useCallback(
        (fieldName: keyof UserProfileState) => {
            return editableFields.some(field => field.name === fieldName && field.isEditing);
        },
        [editableFields]
    );

    const handleCancel = useCallback(
        (fieldName: keyof UserProfileState) => {
            toggleFieldEdit(fieldName);

            let userValue = '';
            if (fieldName === 'twitter') {
                userValue = user?.x_link?.toString() || '';
            } else if (fieldName === 'website') {
                userValue = user?.website_link?.toString() || '';
            } else {
                const value = user?.[fieldName as keyof typeof user];
                userValue = value !== undefined && value !== null ? String(value) : '';
            }

            setFormState(prev => ({
                ...prev,
                [fieldName]: currentUser?.[fieldName as keyof typeof currentUser]?.toString() || userValue || ''
            }));
        },
        [toggleFieldEdit, currentUser, user]
    );

    const handleInputChange = useCallback((fieldName: keyof UserProfileState, value: string) => {
        setFormState(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    }, []);

    const updateProfile = useCallback(async () => {
        if (!currentUser?.uid) return;

        setIsSaving(true);
        try {
            const payload: BackendUserSchema = {
                uid: currentUser.uid,
                ...(formState.displayName && { display_name: formState.displayName }),
                ...(formState.email && { email: formState.email }),
                ...(formState.github && { github: formState.github }),
                ...(formState.linkedin && { linkedin: formState.linkedin }),
                ...(formState.twitter && { twitter: formState.twitter }),
                ...(formState.website && { website: formState.website }),
            };

            await dispatch(updateUserProfile(payload)).unwrap();
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error('Failed to update profile:', error);
        } finally {
            setIsSaving(false);
            setEditableFields(prev => prev.map(field => ({ ...field, isEditing: false })));
        }
    }, [formState, currentUser, dispatch]);

    useEffect(() => {
        if (currentUser?.uid) {
            dispatch(getUserProfile(currentUser.uid));
        }
    }, [currentUser?.uid, dispatch]);

    useEffect(() => {
        if (!currentUser) return;

        setFormState(prev => ({
            ...prev,
            displayName: currentUser.displayName || prev.displayName || '',
            email: currentUser.email || prev.email || '',
            photoURL: currentUser.photoURL || prev.photoURL || '',
            github: user?.github || prev.github || '',
            linkedin: user?.linkedin || prev.linkedin || '',
            twitter: user?.x_link || prev.twitter || '',
            website: user?.website_link || prev.website || ''
        }));
    }, [currentUser, user]);

    const EditableField: React.FC<{
        fieldName: keyof UserProfileState;
        label: string;
        icon?: React.ReactNode;
    }> = React.memo(({ fieldName, label, icon }) => {
        const isEditing = isFieldEditing(fieldName);
        const value = formState[fieldName];

        return (
            <div className="form-group">
                <label className="field-label">
                    {icon && <span className="field-icon">{icon}</span>}
                    {label}
                </label>
                <div className="input-wrapper">
                    {isEditing ? (
                        <div
                            key="editing"
                            className="edit-container"
                        >
                            <input
                                type={fieldName === 'email' ? 'email' : 'text'}
                                value={value as string}
                                onChange={(e) => handleInputChange(fieldName, e.target.value)}
                                placeholder={`Your ${label}`}
                                aria-label={label}
                                className="field-input"
                            />
                            <div className="action-buttons">
                                <button
                                    type="button"
                                    className="action-button confirm"
                                    onClick={() => toggleFieldEdit(fieldName)}
                                    aria-label={`Confirm ${label}`}
                                >
                                    <FaCheck />
                                </button>
                                <button
                                    type="button"
                                    className="action-button cancel"
                                    onClick={() => handleCancel(fieldName)}
                                    aria-label={`Cancel ${label}`}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            key="display"
                            className="display-container"
                        >
                            <div className="field-value">
                                {value || <span className="placeholder-text">Your {label}</span>}
                            </div>
                            <button
                                type="button"
                                className="action-button edit"
                                onClick={() => toggleFieldEdit(fieldName)}
                                aria-label={`Edit ${label}`}
                            >
                                <FaEdit />
                            </button>
                        </div>
                    )}
                </div>
            </div >
        );
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile();
    };

    return (
        <div className="profile-container">
            <div className="profile-content">
                <div className="profile-layout">
                    <aside className="profile-sidebar">
                        <div className="sidebar-header">
                            <div className="avatar-container">
                                <div className="avatar-wrapper">
                                    {currentUser?.photoURL ? (
                                        <img src={currentUser.photoURL} alt="Profile avatar" className="avatar" />
                                    ) : (
                                        <div className="avatar-placeholder">
                                            <FaUser />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <h2 className="user-name text-2xl">{currentUser?.displayName || 'User'}</h2>
                            <span className="user-email text-sm">{currentUser?.email || ''}</span>
                        </div>

                        <nav className="sidebar-nav">
                            {PROFILE_SECTIONS.map(section => (
                                <button
                                    key={section.id}
                                    className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                                    onClick={() => setActiveSection(section.id)}
                                    aria-label={section.title}
                                >
                                    <span className="nav-icon">{section.icon}</span>
                                    <span>{section.title}</span>
                                </button>
                            ))}
                        </nav>
                    </aside>

                    <main className="profile-main">
                        <div className="section-header">
                            <h1 className="gradient-text">
                                {PROFILE_SECTIONS.find(s => s.id === activeSection)?.title}
                            </h1>
                        </div>

                        {activeSection === 'profile' && (
                            <div className="profile-section">
                                <form
                                    onSubmit={handleSubmit}
                                    className="edit-form"
                                >
                                    <div className="profile-card">
                                        <h3 className="card-title">Personal Information</h3>
                                        <EditableField fieldName="displayName" label="Display Name" icon={<FaUser />} />
                                        <EditableField fieldName="email" label="Email" icon={<FaEnvelope />} />
                                    </div>

                                    <div className="profile-card social-links">
                                        <h3 className="card-title">Social Media & Links</h3>
                                        <EditableField fieldName="github" label="GitHub" icon={<FaGithub />} />
                                        <EditableField fieldName="linkedin" label="LinkedIn" icon={<FaLinkedin />} />
                                        <EditableField fieldName="twitter" label="Twitter" icon={<FaTwitter />} />
                                        <EditableField fieldName="website" label="Website" icon={<FaGlobe />} />
                                    </div>

                                    <div className="action-card">
                                        {saveSuccess && (
                                            <div className="save-success">
                                                Profile updated successfully!
                                            </div>
                                        )}
                                        <button
                                            type="submit"
                                            className={`save-button ${isSaving ? 'saving' : ''}`}
                                            disabled={isSaving}
                                        >
                                            {isSaving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Profile;