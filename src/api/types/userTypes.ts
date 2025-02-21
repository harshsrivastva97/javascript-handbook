export interface User {
    user_id: string;
    email: string;
    displayName: string;
    photoURL: string;
    createdAt?: string;
    socialLinks?: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        website?: string;
    };
}

export interface RegisterRequest {
    email: string;
}

export interface RegisterResponse {
    user: User;
    token: string;
}

export interface ProfileUpdateRequest {
    username?: string;
    email?: string;
}