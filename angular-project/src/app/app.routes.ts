import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { WeeklyViewComponent } from './weekly-view/weekly-view.component';


export const routes: Routes = [
  { path: 'Todo', component: TaskListComponent },
  { path: 'Calendar', component: CalendarViewComponent },
  { path: 'WeeklySchedule', component: WeeklyViewComponent }
];
