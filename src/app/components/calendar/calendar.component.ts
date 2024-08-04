import { Component, ElementRef, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DatesService } from '../../services/dates.service';
import { CommonModule } from '@angular/common';
import { DateItem, DayComponent } from './day/day.component';
import { CalendarService } from '../../services/calendar.service';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, DayComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  @ViewChildren("dayEl", { read: ElementRef }) dayEls = new QueryList<ElementRef>();
  currentDate: Date;
  days: DateItem[] = [];
  previousDays: DateItem[] = [];
  nextDays: DateItem[] = [];
  pageSize = 2;

  tasksService: TasksService;

  constructor(private calendarService: CalendarService) {
    this.currentDate = new Date();
    this.days = [];
    this.tasksService = inject(TasksService);
  }

  ngOnInit() {
    this.tasksService.listenForTasks().subscribe(_ => {
      this.initialize();
    });
    this.calendarService.listenForDateChange().subscribe(date => {
      this.currentDate = date;
      this.initialize();
    });
    this.currentDate = this.calendarService.getActiveDate();
    this.initialize();
  }

  initialize() {
    setTimeout(() => {
      this.days = [];
      this.previousDays = [];
      this.nextDays = [];
      this.populatePreviousMonth();
      this.populateCurrentMonth();
      this.populateNextMonth();
      this.days = [...this.previousDays, ...this.days, ...this.nextDays];
    }, 0);
  }

  populatePreviousMonth() {
    const startingDateOfMonth = DatesService.getStartingDateOfMonth(this.currentDate);
    const startingDayOfWeek = startingDateOfMonth.getDay();

    let start = DatesService.addDuration(startingDateOfMonth, { days: -startingDayOfWeek });
    start.setHours(0, 0, 0, 0);
    const end = DatesService.addDuration(startingDateOfMonth, { days: -1 });
    end.setHours(0, 0, 0, 0);

    while (start <= end) {
      this.previousDays.push({ date: start, items: this.tasksService.getTasksForDate(start) });
      start = DatesService.addDuration(start, { days: 1 });
    }
  }

  populateCurrentMonth() {
    const startingDateOfMonth = DatesService.getStartingDateOfMonth(this.currentDate);
    startingDateOfMonth.setHours(0, 0, 0, 0);
    const end = DatesService.addDuration(startingDateOfMonth, { days: DatesService.getDaysInCurrentMonth(startingDateOfMonth) });
    end.setHours(0, 0, 0, 0);

    let current = startingDateOfMonth;

    while (current < end) {
      this.previousDays.push({ date: current, items: this.tasksService.getTasksForDate(current) });
      current = DatesService.addDuration(current, { days: 1 });
    }
  }

  populateNextMonth() {
    const startingDateOfNextMonth = DatesService.getStartingDateOfMonth(DatesService.addDuration(this.currentDate, { months: 1 }));
    startingDateOfNextMonth.setHours(0, 0, 0, 0);
    const extraDays = 35 - this.previousDays.length + this.days.length;
    const end = DatesService.addDuration(startingDateOfNextMonth, { days: extraDays });
    end.setHours(0, 0, 0, 0);

    let current = startingDateOfNextMonth;

    while (current < end) {
      this.nextDays.push({ date: current, items: this.tasksService.getTasksForDate(current) });
      current = DatesService.addDuration(current, { days: 1 });
    }
  }

  ngAfterViewInit() {
    this.dayEls.changes.subscribe(_ => {
      setTimeout(() => {
        const averageHeight = Math.floor(this.dayEls.reduce((prev, curr) => {
          return prev + curr.nativeElement.offsetHeight
        }, 0) / this.dayEls.length);
        this.pageSize = Math.abs(Math.floor((averageHeight - 50) / 30));
      }, 0)
    });
  }
}
