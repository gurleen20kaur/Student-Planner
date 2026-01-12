import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Task {
    id: string;
    title: string;
    completed: boolean;
    status: 'To Do' | 'Doing' | 'Done';
    dueDate?: Date;
    priority?: 'Low' | 'Medium' | 'High';
    createdAt: Date;
  }

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent {
  newTask: string = '';
  tasks: Task[] = [];
  newPriority = undefined;

  
  addTask() {
    if (this.newTask.trim()) {
      const task: Task = {
        id: crypto.randomUUID(),
        title: this.newTask.trim(),
        completed: false,
        status: 'To Do',
        dueDate: undefined,
        priority: this.newPriority,
        createdAt: new Date(),
      };
      this.tasks.push(task);
    }
    this.newTask = '';
    this.newPriority = undefined;
  }
  
  removeTask($event: Event, task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    this.tasks.splice(index, 1);
  }

  taskDone($event: Event, t: Task) {
    const checkbox = $event.target as HTMLInputElement;
    if (checkbox.checked) {
      t.status = 'Done';
    } else {
      t.status = 'Doing';
    }
  }

  get taskTitles(): string {
    return this.tasks.map(t => t.title).join(', ');
  }
}
