export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'To Do' | 'Doing' | 'Done';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  status: Status;
  dueDate?: Date;         
  priority?: Priority;
  createdAt: Date;
}
