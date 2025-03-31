import { ProgressStatus } from "../enums";

export interface User {
  user_id: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export interface Topic {
  id: number;
  title: string;
  status: ProgressStatus;
} 