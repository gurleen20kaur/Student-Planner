import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';


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
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, FormsModule, MatInputModule, MatDatepickerModule, MatInputModule, MatFormFieldModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent {
  newTask: string = '';
  tasks: Task[] = [];
  newPriority = undefined;
  newDueDate: Date | undefined = undefined;

  
  addTask() {
    if (this.newTask.trim()) {
      const task: Task = {
        id: crypto.randomUUID(),
        title: this.newTask.trim(),
        completed: false,
        status: 'To Do',
        dueDate: this.newDueDate,
        priority: this.newPriority,
        createdAt: new Date(),
      };
      this.tasks.push(task);
    }
    this.newTask = '';
    this.newPriority = undefined;
  }
  
  removeTask(task: Task): void {
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

  removeAllTasks() {
    this.tasks = [];
  }

  removeCompletedTasks() { 
    this.tasks = this.tasks.filter(t => t.status !== 'Done');
  }

  get taskTitles(): string {
    return this.tasks.map(t => t.title).join(', ');
  }
}
