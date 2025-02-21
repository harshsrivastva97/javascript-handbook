import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle, FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Auth.scss";
import firebase from "../../firebase/firebase";
import { useAppDispatch } from "../../redux/hooks";

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
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const validateForm = (): boolean => {
        if (!formData.email.includes("@")) {
            setError("Please enter a valid email");
            return false;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
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
                setError("A verification email has been sent. Please verify your email before logging in.");
                await firebase.logout();
            }
        } catch (err: any) {
            if (err.code === "auth/email-already-in-use") {
                setError("Email already in use. Please log in instead.");
            } else {
                setError(err.message || "Authentication failed");
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
        setError(null);
        setLoading(true);
        try {
            const userCredential = await firebase.signInWithProvider('google', dispatch);
            const token = await userCredential.user.getIdToken();
            localStorage.setItem("token", token);
            navigate("/");
        } catch (error: any) {
            setError(error.message || "Google Sign-In failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGithubSignIn = async () => {
        setError(null);
        setLoading(true);
        try {
            const userCredential = await firebase.signInWithProvider('github', dispatch);
            const token = await userCredential.user.getIdToken();
            localStorage.setItem("token", token);
            navigate("/");
        } catch (error: any) {
            setError(error.message || "GitHub Sign-In failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <div className="auth-container">
                <div className="auth-content">
                    <div className="auth-header">
                        <h1>
                            {isLogin ? "Sign in to your account" : "Create a new account"}
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <FaEnvelope className="input-icon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="input-group password-group">
                            <FaLock className="input-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle Password Visibility"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {error && <div className="error-message mb-2 text-red-500 text-center">{error}</div>}

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
                        </button>

                        <div className="auth-toggle">
                            {isLogin
                                ? "Don't have an account yet?"
                                : "Already have an account?"}
                            <button type="button" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? "Sign up" : "Login"}
                            </button>
                        </div>
                    </form>

                    <div className="auth-providers">
                        <div className="or-separator">
                            <span>OR</span>
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                className="w-1/2 flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded"
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                            >
                                <FaGoogle className="mr-2" />
                                Google
                            </button>
                            <button
                                type="button"
                                className="w-1/2 flex items-center justify-center bg-gray-800 text-white py-2 px-4 rounded"
                                onClick={handleGithubSignIn}
                                disabled={loading}
                            >
                                <FaGithub className="mr-2" />
                                GitHub
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Auth;