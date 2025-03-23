export interface BlogSchema {
    blog_id: string;
    title: string;
    description: string;
    content?: string;
    tags?: string[];
    author?: string;
    date?: string;
    readTime?: string;
    likes?: number;
    bookmarks?: number;
    createdAt: string;
}

export interface BlogsState {
    blogs: BlogSchema[];
    selectedBlog: BlogSchema | null;
    loading: boolean;
    error: string | null;
}