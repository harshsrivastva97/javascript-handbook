import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaGlobe,
  FaSave, 
  FaCog,
  FaCheckCircle
} from 'react-icons/fa';
import { UserProfileState } from '../../constants/interfaces/user';
import EditableField from '../EditableField';
import './scss/Info.scss';

interface InfoProps {
  formState: UserProfileState;
  isSaving: boolean;
  saveSuccess: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleInputChange: (fieldName: keyof UserProfileState, value: string) => void;
  toggleFieldEdit: (fieldName: keyof UserProfileState) => void;
  handleCancel: (fieldName: keyof UserProfileState) => void;
  isFieldEditing: (fieldName: keyof UserProfileState) => boolean;
}

// Animation variants
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

const Info: React.FC<InfoProps> = ({
  formState,
  isSaving,
  saveSuccess,
  handleSubmit,
  handleInputChange,
  handleCancel,
}) => {
  // Function to handle the EditableField changes
  const handleFieldChange = (fieldName: keyof UserProfileState, value: string) => {
    handleInputChange(fieldName, value);
  };

  // Field configuration for easy rendering
  const fieldConfig = [
    { section: 'Personal Information', fields: [
      { name: 'displayName' as keyof UserProfileState, label: 'Display Name', icon: <FaUser /> },
      { name: 'email' as keyof UserProfileState, label: 'Email', icon: <FaEnvelope /> }
    ]},
    { section: 'Social Media & Links', fields: [
      { name: 'github' as keyof UserProfileState, label: 'GitHub', icon: <FaGithub /> },
      { name: 'linkedin' as keyof UserProfileState, label: 'LinkedIn', icon: <FaLinkedin /> },
      { name: 'twitter' as keyof UserProfileState, label: 'Twitter', icon: <FaTwitter /> },
      { name: 'website' as keyof UserProfileState, label: 'Website', icon: <FaGlobe /> }
    ]}
  ];

  return (
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
        {fieldConfig.map((section, index) => (
          <motion.div 
            key={`section-${index}`}
            className={`profile-card ${section.section.toLowerCase().replace(/\s+/g, '-')}`}
            variants={itemVariants}
          >
            <h3 className="card-title">{section.section}</h3>
            
            {section.fields.map(field => (
              <motion.div 
                key={`field-${field.name}`}
                className="form-group"
                variants={itemVariants}
              >
                <label className="field-label">
                  {field.icon && <span className="field-icon">{field.icon}</span>}
                  {field.label}
                </label>
                <div className="input-wrapper modern">
                  <EditableField 
                    value={(formState[field.name] || '') as string}
                    onChange={(newValue) => handleFieldChange(field.name, newValue)}
                    placeholder={`Add your ${field.label.toLowerCase()}`}
                    className="profile-editable-field"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ))}

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
  );
};

export default Info;
