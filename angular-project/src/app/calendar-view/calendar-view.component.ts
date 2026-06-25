import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  DateAdapter, CalendarModule, provideCalendar,
  CalendarPreviousViewDirective, CalendarTodayDirective, CalendarNextViewDirective,
  CalendarMonthViewComponent, CalendarDayViewComponent,
  CalendarEvent, CalendarView, CalendarDatePipe
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TaskListService } from '../task.service';
import { Task } from '../models/task.model';

// ─── Color palette ────────────────────────────────────────────────────────────
// Each color has a `primary` (border + text) and `secondary` (background fill).
// Done is checked before priority so a completed task always shows green.
function getTaskColor(task: Task): { primary: string; secondary: string } {
  if (task.status === 'Done')       return { primary: '#16a34a', secondary: '#bbf7d0' }; // green
  if (task.priority === 'High')     return { primary: '#dc2626', secondary: '#fecaca' }; // red
  if (task.priority === 'Medium')   return { primary: '#ca8a04', secondary: '#fef08a' }; // yellow
  if (task.priority === 'Low')      return { primary: '#2563eb', secondary: '#bfdbfe' }; // blue
  return                                   { primary: '#6b7280', secondary: '#e5e7eb' };  // gray (no priority)
}

// ─── Task → CalendarEvent converter ──────────────────────────────────────────
// `meta` stores the original Task so we can access all fields if the user
// clicks an event later (e.g. to show a popup with task details).
function taskToCalendarEvent(task: Task): CalendarEvent {
  return {
    start: new Date(task.dueDate!),   // dueDate as a proper Date object
    title: task.title,
    color: getTaskColor(task),
    allDay: true,                     // shows as a full-width block in the day cell
    meta: task,                       // attach original task for future use
  };
}

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [
    CommonModule, CalendarModule,
    CalendarPreviousViewDirective, CalendarTodayDirective, CalendarNextViewDirective,
    CalendarMonthViewComponent, CalendarDayViewComponent, CalendarDatePipe
  ],
  providers: [
    provideCalendar({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.css'
})
export class CalendarViewComponent {
  readonly CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate = new Date();
  activeDayIsOpen = true;

  // Starts empty — populated reactively from the service below
  events: CalendarEvent[] = [];

  constructor(private taskListService: TaskListService) {
    // takeUntilDestroyed() auto-unsubscribes when this component is destroyed.
    // Every time the task list changes (add, remove, update), this runs again
    // and rebuilds events[] so the calendar stays in sync automatically.
    this.taskListService.tasks$
      .pipe(takeUntilDestroyed())
      .subscribe(tasks => {
        this.events = tasks
          .filter(t => t.dueDate != null)   // skip tasks with no due date
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

