export interface BackendUserSchema {
    uid: string,
    display_name?: string,
    email?: string,
    email_verified?: boolean,
    photo_url?: string,
    provider_id?: string,
    github?: string,
    linkedin?: string,
    x_link?: string,
    website_link?: string,
}

export interface UserProfileState {
    email?: string;
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
}