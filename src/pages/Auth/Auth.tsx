import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaEnvelope,
    FaLock,
    FaGoogle,
    FaGithub,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    GithubAuthProvider,
    sendEmailVerification,
} from "firebase/auth";
import "./Auth.scss";

interface AuthForm {
    email: string;
    password: string;
}

// Firebase configuration and initialization
const firebaseConfig = {
    apiKey: "AIzaSyANEfmTY7TQ3QuZjTS_ppZzgCicg9wqbIU",
    authDomain: "javascripthandbook.firebaseapp.com",
    projectId: "javascripthandbook",
    storageBucket: "javascripthandbook.firebasestorage.app",
    messagingSenderId: "146490970959",
    appId: "1:146490970959:web:2f56d6f2272703fd042b3a",
    measurementId: "G-5CK5ZNR83Z",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

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
                // Sign In Flow
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                );

                if (!userCredential.user.emailVerified) {
                    // If the email is not verified, sign out and prompt the user.
                    await signOut(auth);
                    setError("Please verify your email address before logging in.");
                } else {
                    const token = await userCredential.user.getIdToken();
                    localStorage.setItem("token", token);
                    navigate("/");
                }
            } else {
                // Sign Up Flow
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                );

                // Send verification email and sign out to prevent unverified access.
                await sendEmailVerification(userCredential.user);
                setError("A verification email has been sent. Please verify your email before logging in.");
                await signOut(auth);
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
            const userCredential = await signInWithPopup(auth, googleProvider);
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
            const userCredential = await signInWithPopup(auth, githubProvider);
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
            <motion.div
                className="auth-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="auth-content">
                    <motion.div
                        className="auth-header"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1>JavaScript Handbook</h1>
                        <p>
                            {isLogin
                                ? "Sign In to have a better experience"
                                : "Start today"}
                        </p>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
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

                        {error && <div className="error-message">{error}</div>}

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
                    </motion.form>

                    <motion.div
                        className="auth-providers"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
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
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Auth;