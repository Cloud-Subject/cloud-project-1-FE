export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface TaskType {
  id?: number; // id có thể không có khi tạo mới
  title: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: string; // ISO string
  priority: number;
  userId?: string;
}
