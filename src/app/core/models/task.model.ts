export class Task {
  category: string;
  createdAt: string;
  description: string;
  dueDate: string;
  id: number;
  priority: string;
  status: string;
  title: string;
  updatedAt: string;
  userId: number;
}

export class TaskList {
  data: Task[]
}
