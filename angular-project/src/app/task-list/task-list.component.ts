import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  newTask: string = '';
  tasks: string[] = [];

  addTask() {
    if (this.newTask) {
      this.tasks.push(this.newTask.trim());
      //this.newTask = '';
    }
  }
  removeTask(index: number): void {
    this.tasks.splice(index, 1);
  }
}
