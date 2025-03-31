import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle, FaGithub, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import "./Auth.scss";
import firebase from "../../firebase/firebase";
import { useAppDispatch } from "../../redux/hooks";
import { useTheme } from "../../contexts/ThemeContext";

interface AuthForm {
    email: string;
    password: string;
}

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<AuthForm>({
        email: "",
        password: "",
    });
    const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success', message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { theme } = useTheme();

    const validateForm = (): boolean => {
        if (!formData.email.includes("@")) {
            setStatusMessage({
                type: 'error',
                message: "Please enter a valid email"
            });
            return false;
        }
        if (formData.password.length < 6) {
            setStatusMessage({
                type: 'error',
                message: "Password must be at least 6 characters"
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessage(null);
        if (!validateForm()) return;
        setLoading(true);

        try {
            if (isLogin) {
                const userCredential = await firebase.signInWithEmailIdAndPassword(
                    formData.email,
                    formData.password
                );
                const token = await userCredential.user.getIdToken();
                localStorage.setItem("token", token);
                navigate("/");
            } else {
                const userCredential = await firebase.signUpWithEmailIdAndPassword(
                    formData.email,
                    formData.password,
                    dispatch
                );

                await firebase.sendVerificationEmail(userCredential.user);
                setStatusMessage({
                    type: 'success',
                    message: "A verification email has been sent. Please verify your email before logging in."
                });
                await firebase.logout();
            }
        } catch (err: any) {
            if (err.code === "auth/email-already-in-use") {
                setStatusMessage({
                    type: 'error',
                    message: "Email already in use. Please log in instead."
                });
            } else {
                setStatusMessage({
                    type: 'error',
                    message: err.message || "Authentication failed"
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleGoogleSignIn = async () => {
        setStatusMessage(null);
        setLoading(true);
        try {
            const userCredential = await firebase.signInWithProvider('google', dispatch);
            const token = await userCredential.user.getIdToken();
            localStorage.setItem("token", token);
            navigate("/");
        } catch (error: any) {
            setStatusMessage({
                type: 'error',
                message: error.message || "Google Sign-In failed"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGithubSignIn = async () => {
        setStatusMessage(null);
        setLoading(true);
        try {
            const userCredential = await firebase.signInWithProvider('github', dispatch);
            const token = await userCredential.user.getIdToken();
            localStorage.setItem("token", token);
            navigate("/");
        } catch (error: any) {
            setStatusMessage({
                type: 'error',
                message: error.message || "GitHub Sign-In failed"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`auth-container ${theme}`}>
            <div className="auth-card">
                <div className="auth-header">
                    <div className="logo-icon">
                        <span className="logo-symbol">&lt;/&gt;</span>
                    </div>
                    <h2 className="auth-title">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="auth-subtitle">
                        {isLogin
                            ? "Sign in to continue your learning journey"
                            : "Join our community of developers"}
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-fields">
                        <div className="form-field">
                            <div className="input-wrapper">
                                <FaEnvelope className="field-icon" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="auth-input"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <div className="input-wrapper">
                                <FaLock className="field-icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    className="auth-input"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="toggle-password"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {statusMessage && (
                        <div className={`status-message ${statusMessage.type}`}>
                            {statusMessage.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="submit-button"
                    >
                        {loading ? "Processing..." : (
                            <>
                                {isLogin ? "Sign In" : "Create Account"}
                                <FaArrowRight className="button-icon" />
                            </>
                        )}
                    </button>

                    <div className="divider">
                        <span>Or continue with</span>
                    </div>

                    <div className="social-buttons">
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="social-button google"
                        >
                            <FaGoogle className="social-icon" />
                            <span>Google</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleGithubSignIn}
                            disabled={loading}
                            className="social-button github"
                        >
                            <FaGithub className="social-icon" />
                            <span>GitHub</span>
                        </button>
                    </div>

                    <div className="auth-footer">
                        <span className="footer-text">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                        </span>
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="toggle-auth-mode"
                        >
                            {isLogin ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;