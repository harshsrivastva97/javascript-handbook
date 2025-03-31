import { LibrarySchema } from "../api/types/libraryTypes";
import { ProgressStatus } from "../constants/enums";

export const calculateProgress = (topics: LibrarySchema[] | undefined): number => {
  if (!topics?.length) return 0;
  const completed = topics.filter((topic: LibrarySchema) => topic.status === ProgressStatus.COMPLETED).length;
  return Math.round((completed / topics.length) * 100);
}; 