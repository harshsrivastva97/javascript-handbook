import { Difficulty } from "../../constants/enums";

export interface SnippetSchema {
    snippet_id: number;
    filename: string;
    label: string;
    difficulty: Difficulty;
    is_locked: boolean;
    order: number;
    content?: string;
}