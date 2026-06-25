import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  DateAdapter, CalendarModule, provideCalendar,
  CalendarPreviousViewDirective, CalendarTodayDirective, CalendarNextViewDirective,
  CalendarWeekViewComponent, CalendarDayViewComponent,
  CalendarEvent, CalendarView, CalendarDatePipe
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TaskListService } from '../task.service';
import { Task } from '../models/task.model';

// ─── Color palette ────────────────────────────────────────────────────────────
// Done is checked FIRST — a completed High-priority task shows green, not red.
function getTaskColor(task: Task): { primary: string; secondary: string } {
  if (task.status === 'Done')       return { primary: '#16a34a', secondary: '#bbf7d0' }; // green
  if (task.priority === 'High')     return { primary: '#dc2626', secondary: '#fecaca' }; // red
  if (task.priority === 'Medium')   return { primary: '#ca8a04', secondary: '#fef08a' }; // yellow
  if (task.priority === 'Low')      return { primary: '#2563eb', secondary: '#bfdbfe' }; // blue
  return                                   { primary: '#6b7280', secondary: '#e5e7eb' };  // gray
}

// ─── Task → CalendarEvent converter ──────────────────────────────────────────
function taskToCalendarEvent(task: Task): CalendarEvent {
  return {
    start: new Date(task.dueDate!),
    title: task.title,
    color: getTaskColor(task),
    allDay: true,
    meta: task,
  };
}

@Component({
  selector: 'app-weekly-view',
  imports: [
    CommonModule, CalendarModule,
    CalendarPreviousViewDirective, CalendarTodayDirective, CalendarNextViewDirective,
    CalendarWeekViewComponent, CalendarDayViewComponent, CalendarDatePipe
  ],
  providers: [
    provideCalendar({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  templateUrl: './weekly-view.component.html',
  styleUrl: './weekly-view.component.css'
})
export class WeeklyViewComponent {
  readonly CalendarView = CalendarView;
  view: CalendarView = CalendarView.Week;
  viewDate = new Date();
  activeDayIsOpen = true;

  // Starts empty — populated reactively from the service
  events: CalendarEvent[] = [];

  constructor(private taskListService: TaskListService) {
    this.taskListService.tasks$
      .pipe(takeUntilDestroyed())
      .subscribe(tasks => {
        this.events = tasks
          .filter(t => t.dueDate != null)
          .map(taskToCalendarEvent);
      });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
