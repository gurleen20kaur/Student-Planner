import { Injectable } from '@angular/core';
import { Task, Priority, Status } from './models/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskListService {
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);
  readonly tasks$ = this.tasksSubject.asObservable();

  get tasks(): Task[] {
    return this.tasksSubject.value;
  }

  addTask(title: string, priority?: Priority, dueDate?: Date) {
    const task: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      status: 'To Do',
      dueDate,
      priority,
      createdAt: new Date(),
    };

    this.tasksSubject.next([...this.tasks, task]);
  }

  removeTask(id: string) {
    this.tasksSubject.next(this.tasks.filter(t => t.id !== id));
  }

  setDone(id: string, checked: boolean) {
    const updated: Task[] = this.tasks.map(t =>
      t.id === id
        ? {
          ...t,
          status: checked ? 'Done' : 'Doing',
          completed: checked,
        }
        : t
    );
    this.tasksSubject.next(updated);
  }

  removeAll() {
    this.tasksSubject.next([]);
  }

  removeCompleted() {
    this.tasksSubject.next(this.tasks.filter(t => t.status !== 'Done'));
  }
}

