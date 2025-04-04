import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { HiLockClosed } from 'react-icons/hi';
import { FiMail } from 'react-icons/fi';
import { useAppDispatch } from '../../redux/hooks';
import { signInWithProvider } from '../../firebase/firebase';
import Modal from './Modal';
import './SignInModal.scss';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  redirectPath?: string;
}

const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  message = 'Sign in to continue',
  redirectPath,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (provider: 'google' | 'github') => {
    try {
      await signInWithProvider(provider, dispatch);
      if (redirectPath) {
        navigate(redirectPath);
      }
      onClose();
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const navigateToAuth = () => {
    onClose();
    navigate('/auth');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sign In Required">
      <div className="signin-modal-content">
        <div className="signin-icon">
          <HiLockClosed />
        </div>
        
        <p className="signin-message">{message}</p>
        
        <div className="signin-options">
          <button 
            className="signin-btn google"
            onClick={() => handleSignIn('google')}
          >
            <FaGoogle />
            <span>Continue with Google</span>
          </button>
          
          <button 
            className="signin-btn github"
            onClick={() => handleSignIn('github')}
          >
            <FaGithub />
            <span>Continue with GitHub</span>
          </button>
          
          <button 
            className="signin-btn email"
            onClick={navigateToAuth}
          >
            <FiMail />
            <span>Sign in with Email</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SignInModal; 