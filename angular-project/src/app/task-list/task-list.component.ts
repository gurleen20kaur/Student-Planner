import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Task {
    title: string;
    status: 'To Do' | 'Doing' | 'Done';
    createdAt: Date;
    dueDate?: string;
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
  dueDate: string = new Date().toISOString().split('T')[0];
  

  addTask() {
    if (this.newTask.trim()) {
      const task: Task = {
        title: this.newTask.trim(),
        status: 'To Do',
        createdAt: new Date(),
        dueDate: this.dueDate
      };
      this.tasks.push(task);
    }
    this.newTask = '';
    this.dueDate = new Date().toISOString().split('T')[0];
  }
  
  removeTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  get taskTitles(): string {
    return this.tasks.map(t => t.title).join(', ');
  }
}
