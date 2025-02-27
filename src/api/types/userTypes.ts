export interface UserDataObject {
    uid: string,
    display_name?: string,
    email?: string,
    email_verified?: boolean,
    photo_url?: string,
    provider_id?: string,
    github?: string,
    linkedin?: string,
    twitter?: string,
    website?: string,
}

export interface User {
    uid: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
}