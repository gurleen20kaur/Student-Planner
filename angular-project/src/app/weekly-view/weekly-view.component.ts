import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAdapter, CalendarModule, provideCalendar, CalendarPreviousViewDirective, CalendarTodayDirective, CalendarNextViewDirective, CalendarMonthViewComponent, CalendarWeekViewComponent, CalendarDayViewComponent, CalendarEvent, CalendarView, CalendarDatePipe } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@Component({
  selector: 'app-weekly-view',
  imports: [CalendarModule, CommonModule, CalendarPreviousViewDirective, CalendarTodayDirective, CalendarNextViewDirective, CalendarMonthViewComponent, CalendarWeekViewComponent, CalendarDayViewComponent, CalendarDatePipe],
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
