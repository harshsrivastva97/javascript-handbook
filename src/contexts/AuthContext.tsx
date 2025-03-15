import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useAppDispatch } from '../redux/hooks';
import { getUserProfile } from '../redux/slices/userSlice';

type UserProfile = User & {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
    username?: string;
    organization?: string;
}

interface AuthContextType {
    currentUser: UserProfile | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setCurrentUser(user);
            if (user) {
                // Sync with Redux state by fetching user profile
                try {
                    await dispatch(getUserProfile(user.uid));
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            }
            setLoading(false);
        });

        return unsubscribe;
    }, [dispatch]);

    const value = {
        currentUser,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}; 