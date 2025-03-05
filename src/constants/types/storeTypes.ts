import { User } from "firebase/auth";

export interface RootState {
    auth: {
        user: User | null;
        isAuthenticated: boolean;
        loading: boolean;
        error: string | null;
    };
    // ... other slices
} 