import { ProgressStatus } from "../../constants/enums/progressStatus";

export interface TopicSchema {
    topic_id: number;
    user_id: string;
    title: string;
    order: number;
    explanation?: string;
    codeExample?: string;
    keyPoints: string[];
    status?: ProgressStatus;
}