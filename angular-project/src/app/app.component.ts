import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { WeeklyViewComponent } from './weekly-view/weekly-view.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Task } from './models/task.model';

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
