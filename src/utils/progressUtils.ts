import { TopicSchema } from "../api/types/topicTypes";
import { ProgressStatus } from "../constants/enums/progressStatus";

export const calculateProgress = (topics: TopicSchema[] | undefined): number => {
  if (!topics?.length) return 0;
  const completed = topics.filter((topic: TopicSchema) => topic.status === ProgressStatus.COMPLETED).length;
  return Math.round((completed / topics.length) * 100);
}; 