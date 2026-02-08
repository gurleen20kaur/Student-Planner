import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Input, Output, EventEmitter } from '@angular/core';

import { TaskListService } from '../task.service';
import { Task, Priority, Status } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, FormsModule, MatInputModule, MatDatepickerModule, MatFormFieldModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent {
  constructor(private taskListService: TaskListService) { }
  //tasks$ = this.taskListService.tasks$;
  newTask: string = '';
  newPriority: 'Low' | 'Medium' | 'High' | undefined = undefined;
  newDueDate: Date | undefined = undefined;
  newStatus: 'To Do' | 'Doing' | 'Done' = 'To Do';

  addTask() {
    if (!this.newTask.trim()) return;
    this.taskListService.addTask(this.newTask, this.newPriority, this.newDueDate);
    
    this.newTask = '';
    this.newPriority = undefined;
    this.newDueDate = undefined;
  }
  
  removeTask(task: Task): void {
    const id = task.id;
    this.taskListService.removeTask(id);
  }

  taskDone($event: Event, t: Task) {
    const checkbox = ($event.target as HTMLInputElement).checked;
    const id = t.id;
    this.taskListService.setDone(id, checkbox);
  }

  removeAllTasks() {
    this.taskListService.removeAll();
  }

  removeCompletedTasks() {
    this.taskListService.removeCompleted();
  }
}
