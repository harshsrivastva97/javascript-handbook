export interface SnippetSchema {
    snippet_id: number;
    filename: string;
    label: string;
    difficulty: string;
    is_locked: boolean;
    order: number;
    content?: string;
}