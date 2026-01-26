import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../app.component';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-list',
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, FormsModule, MatInputModule, MatDatepickerModule, MatInputModule, MatFormFieldModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() tasksChange = new EventEmitter<Task[]>();
  newTask: string = '';
  newPriority: 'Low' | 'Medium' | 'High' | undefined = undefined;
  newDueDate: Date | undefined = undefined;
  newStatus: 'To Do' | 'Doing' | 'Done' = 'To Do';
  
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
      const updated = [...this.tasks, task];
      this.tasksChange.emit(updated);
    }
    this.newTask = '';
    this.newPriority = undefined;
    this.newDueDate = undefined;
  }
  
  removeTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index === -1) return;
    this.tasks.splice(index, 1);
    const updated = [...this.tasks];
    this.tasksChange.emit(updated);
  }

  taskDone($event: Event, t: Task) {
    const checkbox = $event.target as HTMLInputElement;
    const updated: Task[] = this.tasks.map(task =>
      task.id === t.id ? { ...task, status: checkbox.checked ? 'Done' : 'Doing', completed: checkbox.checked ? true : false } : task
    );
    this.tasksChange.emit(updated);
  }

  removeAllTasks() {
    this.tasks = [];
    this.tasksChange.emit(this.tasks);
  }

  removeCompletedTasks() { 
    this.tasks = this.tasks.filter(t => t.status !== 'Done');
    this.tasksChange.emit(this.tasks);
  }
}
