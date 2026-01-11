import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Task {
    title: string;
    completed: boolean;
    status: 'To Do' | 'Doing' | 'Done';
    DueDate?: Date;
    Priority?: 'Low' | 'Medium' | 'High';
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
        title: this.newTask.trim(),
        completed: false,
        status: 'To Do',
        DueDate: undefined,
        Priority: this.newPriority,
        createdAt: new Date(),
      };
      this.tasks.push(task);
    }
    this.newTask = '';
  }
  
  removeTask(index: number): void {
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
