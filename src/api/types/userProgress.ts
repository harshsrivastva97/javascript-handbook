import { ProgressStatus } from "../../constants/enums/progressStatus";

export interface UserProgressSchema {
    user_id: string;
    topic_id: number;
    status: ProgressStatus;
}