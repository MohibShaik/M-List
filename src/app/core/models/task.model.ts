export class Task {
  task_uid: number;
  task_title: string;
  task_description: string;
  task_category_id: number;
  task_category: string;
  task_due_date: string;
  task_priority: string;
  created_user_uid: number;
  is_active?: boolean;
  is_complete?: boolean;
  updatedAt: string;
  createdAt: string
}

export class TaskList {
  data: Task[]
}
