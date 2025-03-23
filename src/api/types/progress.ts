import { Dispatch } from "redux";
import { ProgressStatus } from "../../constants/enums/progressStatus";
export interface ProgressSchema {
    user_id: string;
    topic_id: number;
    status: ProgressStatus;
}

export interface ProgressPayload extends ProgressSchema {
    dispatch: Dispatch;
}