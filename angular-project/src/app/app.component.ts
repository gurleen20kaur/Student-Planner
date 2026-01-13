import { Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { WeeklyViewComponent } from './weekly-view/weekly-view.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskListComponent, CalendarViewComponent, WeeklyViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  Username: string = 'Gurleen';
  currentTab: string = 'Daily Tasks';

  switchTab(tab: string) {
    this.currentTab = tab;
    console.log(`Switched to ${tab} view`);
  }
}
