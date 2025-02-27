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
    const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success', message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

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
        <div className="bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-[calc(100vh-64px)]">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl border border-purple-500/20">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        {isLogin
                            ? "Sign in to continue your learning journey"
                            : "Join our community of developers"}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {statusMessage && (
                        <div className={`text-sm text-center py-2 rounded-lg ${statusMessage.type === 'success'
                            ? 'text-green-500 bg-green-500/10'
                            : 'text-red-500 bg-red-500/10'
                            }`}>
                            {statusMessage.message}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 font-medium transition-all disabled:opacity-50"
                        >
                            {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="flex items-center justify-center py-2.5 px-4 rounded-lg text-white bg-gray-700 hover:bg-gray-600 transition-all border border-gray-600"
                        >
                            <FaGoogle className="mr-2" />
                            Google
                        </button>
                        <button
                            type="button"
                            onClick={handleGithubSignIn}
                            disabled={loading}
                            className="flex items-center justify-center py-2.5 px-4 rounded-lg text-white bg-gray-700 hover:bg-gray-600 transition-all border border-gray-600"
                        >
                            <FaGithub className="mr-2" />
                            GitHub
                        </button>
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-gray-400">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                        </span>
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-purple-500 hover:text-purple-400 font-medium"
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