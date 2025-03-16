export interface BackendUserSchema {
    user_id: string,
    display_name?: string,
    username?: string,
    email?: string,
    email_verified?: boolean,
    photo_url?: string,
    provider_id?: string,
    organization?: string,
    github?: string,
    linkedin?: string,
    x_link?: string,
    website?: string,
}

export interface UserProfileState {
    email?: string;
    displayName?: string;
    username?: string;
    photoURL?: string;
    emailVerified?: boolean;
    organization?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
}