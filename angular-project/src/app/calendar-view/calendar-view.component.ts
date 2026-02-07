import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAdapter, CalendarModule, provideCalendar, CalendarPreviousViewDirective, CalendarTodayDirective, CalendarNextViewDirective, CalendarMonthViewComponent, CalendarWeekViewComponent, CalendarDayViewComponent, CalendarEvent, CalendarView, CalendarDatePipe } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CalendarModule, CommonModule, CalendarPreviousViewDirective, CalendarTodayDirective, CalendarNextViewDirective, CalendarMonthViewComponent, CalendarWeekViewComponent, CalendarDayViewComponent, CalendarDatePipe],
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
  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'An event',
    },
  ];

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}

