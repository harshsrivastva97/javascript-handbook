import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaEdit, 
  FaCheck, 
  FaTimes, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaGlobe,
  FaCog,
  FaInfoCircle,
  FaChevronLeft,
  FaSave,
  FaCheckCircle
} from 'react-icons/fa';
import { UserProfileState, BackendUserSchema } from '../../constants/types/userTypes';
import { useAuth } from '../../contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
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
    description?: string;
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
    { 
      id: 'overview', 
      title: 'Overview', 
      icon: <FaInfoCircle />,
      description: 'Your account summary and activity'
    },
    { 
      id: 'profile', 
      title: 'Profile', 
      icon: <FaUser />,
      description: 'Manage your personal information and social links'
    }
];

const EDITABLE_FIELDS: EditableField[] = [
    { name: 'displayName', isEditing: false },
    { name: 'email', isEditing: false },
    { name: 'github', isEditing: true },
    { name: 'linkedin', isEditing: true },
    { name: 'twitter', isEditing: true },
    { name: 'website', isEditing: true }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currentUser } = useAuth();
    const user = useAppSelector(state => state.userData.user);

    const [activeSection, setActiveSection] = useState<string>('profile');
    const [formState, setFormState] = useState<UserProfileState>(INITIAL_FORM_STATE);
    const [editableFields, setEditableFields] = useState<EditableField[]>(EDITABLE_FIELDS);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

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
                user_id: currentUser.uid,
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
            <motion.div 
                className="form-group"
                variants={itemVariants}
            >
                <label className="field-label">
                    {icon && <span className="field-icon">{icon}</span>}
                    {label}
                </label>
                <div className="input-wrapper">
                    <AnimatePresence mode="wait">
                        {isEditing ? (
                            <motion.div
                                key="editing"
                                className="edit-container"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
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
                                    <motion.button
                                        type="button"
                                        className="action-button confirm"
                                        onClick={() => toggleFieldEdit(fieldName)}
                                        aria-label={`Confirm ${label}`}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaCheck />
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        className="action-button cancel"
                                        onClick={() => handleCancel(fieldName)}
                                        aria-label={`Cancel ${label}`}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaTimes />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="display"
                                className="display-container"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="field-value">
                                    {value || <span className="placeholder-text">Add your {label.toLowerCase()}</span>}
                                </div>
                                <motion.button
                                    type="button"
                                    className="action-button edit"
                                    onClick={() => toggleFieldEdit(fieldName)}
                                    aria-label={`Edit ${label}`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaEdit />
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        );
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile();
    };

    // Toggle mobile sidebar
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    return (
        <div className="profile-container scrollable min-h-screen">
            <div className="profile-content">
                {/* Mobile sidebar toggle */}
                <button 
                    className="mobile-sidebar-toggle"
                    onClick={toggleMobileSidebar}
                    aria-label="Toggle sidebar"
                >
                    <FaChevronLeft className={isMobileSidebarOpen ? "open" : ""} />
                </button>

                <div className="profile-layout">
                    {/* Sidebar */}
                    <motion.aside 
                        className={`profile-sidebar ${isMobileSidebarOpen ? 'mobile-open' : ''}`}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <motion.div 
                            className="sidebar-header"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            <div className="avatar-container">
                                <motion.div 
                                    className="avatar-wrapper"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {currentUser?.photoURL ? (
                                        <img src={currentUser.photoURL} alt="Profile avatar" className="avatar" />
                                    ) : (
                                        <div className="avatar-placeholder">
                                            <FaUser />
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                            <h2 className="user-name text-xl">{currentUser?.displayName || 'User'}</h2>
                            <span className="user-email text-sm">{currentUser?.email || ''}</span>
                        </motion.div>

                        <nav className="sidebar-nav">
                            {PROFILE_SECTIONS.map((section, index) => (
                                <motion.button
                                    key={section.id}
                                    className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileSidebarOpen(false);
                                    }}
                                    aria-label={section.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="nav-icon">{section.icon}</span>
                                    <div className="nav-text">
                                        <span className="nav-title">{section.title}</span>
                                        {section.description && (
                                            <span className="nav-description">{section.description}</span>
                                        )}
                                    </div>
                                </motion.button>
                            ))}
                        </nav>
                    </motion.aside>

                    <motion.main 
                        className="profile-main"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <motion.div 
                            className="section-header"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h1 className="gradient-text text-3xl md:text-4xl">
                                {PROFILE_SECTIONS.find(s => s.id === activeSection)?.title}
                            </h1>
                            <p className="section-description">
                                {PROFILE_SECTIONS.find(s => s.id === activeSection)?.description}
                            </p>
                        </motion.div>

                        {activeSection === 'overview' && (
                            <motion.div 
                                className="profile-overview"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.div 
                                    className="overview-card"
                                    variants={itemVariants}
                                >
                                    <div className="card-header">
                                        <h3 className="card-title">Account Information</h3>
                                    </div>
                                    <div className="card-content">
                                        <div className="info-item">
                                            <span className="info-label">Display Name</span>
                                            <span className="info-value">{currentUser?.displayName || 'Not set'}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Email</span>
                                            <span className="info-value">{currentUser?.email || 'Not set'}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Account Created</span>
                                            <span className="info-value">
                                                {currentUser?.metadata?.creationTime 
                                                    ? new Date(currentUser.metadata.creationTime).toLocaleDateString() 
                                                    : 'Unknown'}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}

                        {activeSection === 'profile' && (
                            <motion.div 
                                className="profile-section"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <form
                                    onSubmit={handleSubmit}
                                    className="edit-form"
                                >
                                    <motion.div 
                                        className="profile-card"
                                        variants={itemVariants}
                                    >
                                        <h3 className="card-title">Personal Information</h3>
                                        <EditableField fieldName="displayName" label="Display Name" icon={<FaUser />} />
                                        <EditableField fieldName="email" label="Email" icon={<FaEnvelope />} />
                                    </motion.div>

                                    <motion.div 
                                        className="profile-card social-links"
                                        variants={itemVariants}
                                    >
                                        <h3 className="card-title">Social Media & Links</h3>
                                        <EditableField fieldName="github" label="GitHub" icon={<FaGithub />} />
                                        <EditableField fieldName="linkedin" label="LinkedIn" icon={<FaLinkedin />} />
                                        <EditableField fieldName="twitter" label="Twitter" icon={<FaTwitter />} />
                                        <EditableField fieldName="website" label="Website" icon={<FaGlobe />} />
                                    </motion.div>

                                    <motion.div 
                                        className="action-card"
                                        variants={itemVariants}
                                    >
                                        <AnimatePresence>
                                            {saveSuccess && (
                                                <motion.div 
                                                    className="save-success"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    <FaCheckCircle /> Profile updated successfully!
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        <motion.button
                                            type="submit"
                                            className={`save-button ${isSaving ? 'saving' : ''}`}
                                            disabled={isSaving}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            {isSaving ? (
                                                <>Saving... <FaCog className="spin-icon" /></>
                                            ) : (
                                                <>Save Changes <FaSave /></>
                                            )}
                                        </motion.button>
                                    </motion.div>
                                </form>
                            </motion.div>
                        )}
                    </motion.main>
                </div>
            </div>
        </div>
    );
};

export default Profile;