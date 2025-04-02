export interface TaskType {
  id?: number; // id có thể không có khi tạo mới
  name_task: string;
  due_date: string;
  priority: number;
  user_id: number;
  is_done: boolean;
  description: string;
}
