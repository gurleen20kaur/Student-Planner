import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { WeeklyViewComponent } from './weekly-view/weekly-view.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  status: 'To Do' | 'Doing' | 'Done';
  dueDate?: Date;
  priority?: 'Low' | 'Medium' | 'High';
  createdAt: Date;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive,TaskListComponent, CalendarViewComponent, WeeklyViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  userName: string = 'Gurleen';
  tasks: Task[] = [];

  onTasksChange(updated: Task[]) {
    this.tasks = updated;
  }
}
