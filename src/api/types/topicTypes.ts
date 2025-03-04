export interface TopicSchema {
    topic_id: number;
    title: string;
    order: number;
    explanation?: string;
    codeExample?: string;
    styles?: string;
    keyPoints: string[];
    status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}