import React, { useEffect, useState, useCallback } from 'react';
import {
    FaUser, FaEnvelope, FaGithub, FaLinkedin, FaGlobe,
    FaCheckCircle, FaPencilAlt, FaTimes, FaBuilding
} from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";
import { UserProfileState, UserSchema } from '../../constants/interfaces/user';
import { useAuth } from '../../contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserProfile, updateUserProfile } from '../../redux/slices/userSlice';
import './Profile.scss';

const INITIAL_FORM_STATE: UserProfileState = {
    displayName: '',
    email: '',
    photoURL: '',
    organization: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: ''
};

const EDITABLE_FIELDS = [
    { name: 'displayName' as keyof UserProfileState, isEditing: false },
    { name: 'organization' as keyof UserProfileState, isEditing: true },
    { name: 'github' as keyof UserProfileState, isEditing: true },
    { name: 'linkedin' as keyof UserProfileState, isEditing: true },
    { name: 'twitter' as keyof UserProfileState, isEditing: true },
    { name: 'website' as keyof UserProfileState, isEditing: true }
];

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currentUser } = useAuth();
    const user = useAppSelector(state => state.userData.user);

    const [formState, setFormState] = useState<UserProfileState>(INITIAL_FORM_STATE);
    const [editableFields, setEditableFields] = useState(EDITABLE_FIELDS);
    const [fieldSaving, setFieldSaving] = useState<{ [key: string]: boolean }>({});
    const [fieldSuccess, setFieldSuccess] = useState<{ [key: string]: boolean }>({});

    // Toggle field edit state and save if needed
    const toggleFieldEdit = useCallback(async (fieldName: keyof UserProfileState) => {
        const isCurrentlyEditing = editableFields.some(field => field.name === fieldName && field.isEditing);
        
        // If we're currently editing and toggling off, save the field
        if (isCurrentlyEditing && currentUser?.uid) {
            setFieldSaving(prev => ({ ...prev, [fieldName]: true }));
            
            try {
                // Create the payload with just the field being updated
                const payload: UserSchema = {
                    user_id: currentUser.uid,
                };
                
                // Map the field name to the correct backend property name
                if (fieldName === 'displayName' && formState.displayName) {
                    payload.display_name = formState.displayName;
                } else if (fieldName === 'organization' && formState.organization) {
                    payload.organization = formState.organization;
                } else if (fieldName === 'github' && formState.github) {
                    payload.github = formState.github;
                } else if (fieldName === 'linkedin' && formState.linkedin) {
                    payload.linkedin = formState.linkedin;
                } else if (fieldName === 'twitter' && formState.twitter) {
                    payload.x_link = formState.twitter;
                } else if (fieldName === 'website' && formState.website) {
                    payload.website = formState.website;
                }
                
                await dispatch(updateUserProfile(payload)).unwrap();
                
                // Show success indicator
                setFieldSuccess(prev => ({ ...prev, [fieldName]: true }));
                setTimeout(() => {
                    setFieldSuccess(prev => ({ ...prev, [fieldName]: false }));
                }, 2000);
            } catch (error) {
                console.error(`Failed to update ${fieldName}:`, error);
            } finally {
                setFieldSaving(prev => ({ ...prev, [fieldName]: false }));
            }
        }
        
        // Toggle the edit state
        setEditableFields(prev =>
            prev.map(field =>
                field.name === fieldName ? { ...field, isEditing: !field.isEditing } : field
            )
        );
    }, [editableFields, currentUser, formState, dispatch]);

    // Check if a field is in edit mode
    const isFieldEditing = useCallback(
        (fieldName: keyof UserProfileState) => {
            return editableFields.some(field => field.name === fieldName && field.isEditing);
        },
        [editableFields]
    );

    // Handle canceling edit for a field
    const handleCancel = useCallback(
        (fieldName: keyof UserProfileState) => {
            // Just toggle off edit mode without saving
            setEditableFields(prev =>
                prev.map(field =>
                    field.name === fieldName ? { ...field, isEditing: false } : field
                )
            );

            // Reset the field value to the original
            let userValue = '';
            if (fieldName === 'twitter') {
                userValue = user?.x_link?.toString() || '';
            } else if (fieldName === 'website') {
                userValue = user?.website?.toString() || '';
            } else {
                const value = user?.[fieldName as keyof typeof user];
                userValue = value !== undefined && value !== null ? String(value) : '';
            }

            setFormState(prev => ({
                ...prev,
                [fieldName]: currentUser?.[fieldName as keyof typeof currentUser]?.toString() || userValue || ''
            }));
        },
        [currentUser, user]
    );

    // Handle input changes
    const handleInputChange = useCallback((fieldName: keyof UserProfileState, value: string) => {
        setFormState(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    }, []);

    // Load user profile on component mount
    useEffect(() => {
        if (currentUser?.uid) {
            dispatch(getUserProfile(currentUser.uid));
        }
    }, [currentUser?.uid, dispatch]);

    // Update form state when user data changes
    useEffect(() => {
        if (!currentUser) return;

        setFormState(prev => ({
            ...prev,
            displayName: currentUser.displayName || prev.displayName || '',
            email: currentUser.email || prev.email || '',
            photoURL: currentUser.photoURL || user?.photo_url || prev.photoURL || '',
            organization: user?.organization || prev.organization || '',
            github: user?.github || prev.github || '',
            linkedin: user?.linkedin || prev.linkedin || '',
            twitter: user?.x_link || prev.twitter || '',
            website: user?.website || prev.website || ''
        }));
    }, [currentUser, user]);

    // Field configuration for rendering
    const fieldConfig = [
        { name: 'displayName' as keyof UserProfileState, label: 'Display Name', icon: <FaUser /> },
        { name: 'organization' as keyof UserProfileState, label: 'Organization', icon: <FaBuilding /> },
        { name: 'github' as keyof UserProfileState, label: 'GitHub', icon: <FaGithub /> },
        { name: 'linkedin' as keyof UserProfileState, label: 'LinkedIn', icon: <FaLinkedin /> },
        { name: 'twitter' as keyof UserProfileState, label: 'X account', icon: <FaSquareXTwitter /> },
        { name: 'website' as keyof UserProfileState, label: 'Website', icon: <FaGlobe /> }
    ];

    // Render a field (used in the grid)
    const renderField = (field: typeof fieldConfig[0]) => (
        <div key={`field-${field.name}`} className="profile-field">
            <div className="field-header">
                <span className="field-icon">{field.icon}</span>
                <span className="field-label">{field.label}</span>
                {fieldSuccess[field.name] && (
                    <span className="field-success">
                        <FaCheckCircle />
                    </span>
                )}
            </div>
            <div className="field-content">
                {isFieldEditing(field.name) ? (
                    <div className="edit-controls">
                        <input
                            type="text"
                            value={(formState[field.name] || '') as string}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            className="field-input"
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                        />
                        <div className="edit-actions">
                            <button
                                type="button"
                                className={`action-button save ${fieldSaving[field.name] ? 'saving' : ''}`}
                                onClick={() => toggleFieldEdit(field.name)}
                                disabled={fieldSaving[field.name]}
                                aria-label="Save"
                            >
                                {fieldSaving[field.name] ? (
                                    <span className="button-spinner"></span>
                                ) : (
                                    <FaCheckCircle />
                                )}
                            </button>
                            <button
                                type="button"
                                className="action-button cancel"
                                onClick={() => handleCancel(field.name)}
                                disabled={fieldSaving[field.name]}
                                aria-label="Cancel"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="display-field">
                        <span className="field-value">
                            {(formState[field.name] || '') as string || `Add your ${field.label.toLowerCase()}`}
                        </span>
                        <button
                            type="button"
                            className="edit-button"
                            onClick={() => toggleFieldEdit(field.name)}
                            aria-label={`Edit ${field.label}`}
                        >
                            <FaPencilAlt />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="avatar-section">
                    {(currentUser?.photoURL || user?.photo_url) ? (
                        <img src={currentUser?.photoURL || user?.photo_url} alt="Profile" className="avatar" />
                    ) : (
                        <div className="avatar-placeholder">
                            <FaUser />
                        </div>
                    )}
                </div>
                <div className="user-details">
                    <h1 className="user-name">{formState.displayName || 'User'}</h1>
                    <div className="user-email">
                        <FaEnvelope className="email-icon" /> {formState.email || 'email@example.com'}
                    </div>
                    <div className="user-status">
                        <span className="status-indicator"></span>
                        <span className="status-text">Active</span>
                    </div>
                </div>
            </div>

            <div className="profile-grid">
                {fieldConfig.map(renderField)}
            </div>
        </div>
    );
};

export default Profile;