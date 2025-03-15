import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaInfoCircle, FaUserFriends, FaMedal, FaCrown } from 'react-icons/fa';
import { UserProfileState, BackendUserSchema } from '../../constants/interfaces/user';
import { useAuth } from '../../contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserProfile, updateUserProfile } from '../../redux/slices/userSlice';
import { useLocation } from 'react-router-dom';

// Import the components we created
import Sidebar from '../../components/Profile/Sidebar';
import Info from '../../components/Profile/Info';
import Friends from '../../components/Profile/Friends';
import Badges from '../../components/Profile/Badges';
import Subscriptions from '../../components/Profile/Subscriptions';
import { ProfileSection } from '../../constants/interfaces/profile';
import './Profile.scss';

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
        id: 'myinfo',
        title: 'My Info',
        subtitle: 'Broaden your reach',
        icon: <FaInfoCircle />,
        accentColor: 'var(--gradient-purple)',
        description: 'Manage your personal information and expand your presence'
    },
    {
        id: 'friends',
        title: 'Friends',
        subtitle: 'Get connected',
        icon: <FaUserFriends />,
        accentColor: 'var(--gradient-blue)',
        description: 'Connect with others and grow your network'
    },
    {
        id: 'badges',
        title: 'Badges',
        subtitle: 'Your achievements',
        icon: <FaMedal />,
        accentColor: 'var(--gradient-gold)',
        description: 'Showcase your accomplishments and milestones'
    },
    {
        id: 'subscriptions',
        title: 'Subscriptions',
        subtitle: 'Premium features',
        icon: <FaCrown />,
        accentColor: 'var(--gradient-green)',
        description: 'Manage your subscription plans and benefits'
    }
];

const EDITABLE_FIELDS = [
    { name: 'displayName' as keyof UserProfileState, isEditing: false },
    { name: 'email' as keyof UserProfileState, isEditing: false },
    { name: 'github' as keyof UserProfileState, isEditing: true },
    { name: 'linkedin' as keyof UserProfileState, isEditing: true },
    { name: 'twitter' as keyof UserProfileState, isEditing: true },
    { name: 'website' as keyof UserProfileState, isEditing: true }
];

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currentUser } = useAuth();
    const user = useAppSelector(state => state.userData.user);
    const location = useLocation();

    // Create refs for each section
    const sectionRefs = {
        myinfo: useRef<HTMLDivElement>(null),
        friends: useRef<HTMLDivElement>(null),
        badges: useRef<HTMLDivElement>(null),
        subscriptions: useRef<HTMLDivElement>(null)
    };

    const [activeSection, setActiveSection] = useState<string>('myinfo');
    const [formState, setFormState] = useState<UserProfileState>(INITIAL_FORM_STATE);
    const [editableFields, setEditableFields] = useState(EDITABLE_FIELDS);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

    // Toggle field edit state
    const toggleFieldEdit = useCallback((fieldName: keyof UserProfileState) => {
        setEditableFields(prev =>
            prev.map(field =>
                field.name === fieldName ? { ...field, isEditing: !field.isEditing } : field
            )
        );
    }, []);

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

    // Handle input changes
    const handleInputChange = useCallback((fieldName: keyof UserProfileState, value: string) => {
        setFormState(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    }, []);

    // Update user profile
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
            photoURL: currentUser.photoURL || prev.photoURL || '',
            github: user?.github || prev.github || '',
            linkedin: user?.linkedin || prev.linkedin || '',
            twitter: user?.x_link || prev.twitter || '',
            website: user?.website_link || prev.website || ''
        }));
    }, [currentUser, user]);

    // Form submission handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile();
    };

    // Toggle mobile sidebar
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    // Scroll to section when sidebar item is clicked
    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        
        const sectionRef = sectionRefs[sectionId as keyof typeof sectionRefs];
        if (sectionRef && sectionRef.current) {
            // Get the main content container
            const scrollContainer = document.querySelector('.profile-main');
            if (scrollContainer) {
                // Calculate the position of the section relative to the scroll container
                const sectionTop = sectionRef.current.offsetTop;
                
                // Smooth scroll to the section with offset
                scrollContainer.scrollTo({
                    top: sectionTop - 60, // Add offset for better spacing
                    behavior: 'smooth'
                });
            }
        }
        
        // Close mobile sidebar after selection
        setIsMobileSidebarOpen(false);
    };

    // Check for hash in URL and scroll to the corresponding section when component mounts
    useEffect(() => {
        if (location.hash) {
            const sectionId = location.hash.substring(1); // Remove the # character
            if (sectionRefs[sectionId as keyof typeof sectionRefs]) {
                // Set a small timeout to ensure the component is fully rendered
                setTimeout(() => {
                    scrollToSection(sectionId);
                }, 300);
            }
        }
    }, [location.hash]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="profile-container">
            <div className="profile-content">
                <div className="profile-layout">
                    {/* Sidebar Component */}
                    <Sidebar
                        currentUser={currentUser}
                        activeSection={activeSection}
                        setActiveSection={scrollToSection}
                        isMobileSidebarOpen={isMobileSidebarOpen}
                        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
                        profileSections={PROFILE_SECTIONS}
                    />

                    {/* Main Content Area */}
                    <div className="profile-main">
                        {/* My Info Section */}
                        <div ref={sectionRefs.myinfo} id="myinfo" className="profile-section">
                            <div className="section-header">
                                <h1>My <span className="gradient-text">Info</span></h1>
                                <p className="section-description">
                                    {PROFILE_SECTIONS.find(section => section.id === 'myinfo')?.description}
                                </p>
                            </div>
                            <Info
                                formState={formState}
                                handleInputChange={handleInputChange}
                                handleSubmit={handleSubmit}
                                isFieldEditing={isFieldEditing}
                                toggleFieldEdit={toggleFieldEdit}
                                handleCancel={handleCancel}
                                isSaving={isSaving}
                                saveSuccess={saveSuccess}
                            />
                        </div>

                        {/* Friends Section */}
                        <div ref={sectionRefs.friends} id="friends" className="profile-section">
                            <div className="section-header">
                                <h1>My <span className="gradient-text">Friends</span></h1>
                                <p className="section-description">
                                    {PROFILE_SECTIONS.find(section => section.id === 'friends')?.description}
                                </p>
                            </div>
                            <Friends />
                        </div>

                        {/* Badges Section */}
                        <div ref={sectionRefs.badges} id="badges" className="profile-section">
                            <div className="section-header">
                                <h1>My <span className="gradient-text">Badges</span></h1>
                                <p className="section-description">
                                    {PROFILE_SECTIONS.find(section => section.id === 'badges')?.description}
                                </p>
                            </div>
                            <Badges />
                        </div>

                        {/* Subscriptions Section */}
                        <div ref={sectionRefs.subscriptions} id="subscriptions" className="profile-section">
                            <div className="section-header">
                                <h1>My <span className="gradient-text">Subscriptions</span></h1>
                                <p className="section-description">
                                    {PROFILE_SECTIONS.find(section => section.id === 'subscriptions')?.description}
                                </p>
                            </div>
                            <Subscriptions />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile sidebar toggle button */}
            <button
                className="mobile-sidebar-toggle"
                onClick={toggleMobileSidebar}
                aria-label={isMobileSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
                <FaChevronLeft className={isMobileSidebarOpen ? 'open' : ''} />
            </button>
        </div>
    );
};

export default Profile;