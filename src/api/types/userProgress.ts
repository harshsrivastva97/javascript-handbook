import { ProgressStatus } from "../../utils/enums/enums";

export interface UserProgressSchema {
    user_id: string;
    topic_id: number;
    status: ProgressStatus;
}