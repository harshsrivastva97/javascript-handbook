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
    User,
    UserCredential,
} from "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import errorMap from "../utils/errorMap";
import { register } from "../redux/slices/userSlice";
import { useAppDispatch } from "../redux/hooks";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const handleAuthError = (error: unknown): never => {
    const firebaseError = error as { code?: string; message?: string };
    const errorCode = firebaseError.code || "unknown";
    const errorMessage =
        errorMap[errorCode as keyof typeof errorMap] ||
        firebaseError.message ||
        "An unexpected error occurred";
    throw new Error(errorMessage);
};

type AuthProvider = "google" | "github";

export const signUpWithEmailIdAndPassword = async (
    email: string,
    password: string,
    dispatch: ReturnType<typeof useAppDispatch>
): Promise<UserCredential> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        dispatch(register({ email }));
        return userCredential;
    } catch (error) {
        throw handleAuthError(error);
    }
};

export const signInWithEmailIdAndPassword = async (
    email: string,
    password: string
): Promise<UserCredential> => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw handleAuthError(error);
    }
};

export const signInWithProvider = async (
    provider: AuthProvider,
    dispatch: ReturnType<typeof useAppDispatch>
): Promise<UserCredential> => {
    try {
        const providerInstance = provider === "google" ? googleProvider : githubProvider;
        const userCredential = await signInWithPopup(auth, providerInstance);
        console.log(userCredential);
        const email = userCredential.user.email;
        if (email) {
            dispatch(register({ email }));
        } else {
            console.warn("No email found for user:", userCredential.user.uid);
        }
        return userCredential;
    } catch (error) {
        throw handleAuthError(error);
    }
};

export const sendVerificationEmail = async (currentUser: User): Promise<void> => {
    try {
        await sendEmailVerification(currentUser);
    } catch (error) {
        throw handleAuthError(error);
    }
};

export const logout = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error) {
        throw handleAuthError(error);
    }
};

export default { signInWithProvider, signUpWithEmailIdAndPassword, signInWithEmailIdAndPassword, sendVerificationEmail, logout };