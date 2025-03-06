import { ProgressStatus } from "../../constants/enums/progressStatus";

export interface TopicSchema {
    topic_id: number;
    user_id: string;
    title: string;
    order: number;
    explanation?: string;
    code_example?: string;
    key_points: string[];
    common_mistakes: string[];
    pro_tips: string[];
    status?: ProgressStatus;
}