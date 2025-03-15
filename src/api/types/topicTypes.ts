import { ProgressStatus } from "../../constants/enums/progressStatus";

export interface TopicSchema {
    topic_id: number;
    user_id: string;
    title: string;
    order: number;
    content: string;
    status?: ProgressStatus;
}