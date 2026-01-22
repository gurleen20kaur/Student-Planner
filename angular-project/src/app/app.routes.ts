import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { WeeklyViewComponent } from './weekly-view/weekly-view.component';
import { DashBoardComponent } from './dash-board/dash-board.component'; 

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: DashBoardComponent },
  { path: 'todo', component: TaskListComponent },
  { path: 'calendar', component: CalendarViewComponent },
  { path: 'weekly-schedule', component: WeeklyViewComponent }
];
