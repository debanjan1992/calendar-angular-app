import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { CalendarService } from '../../services/calendar.service';
import { CalendarModule } from 'primeng/calendar';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, CommonModule, CalendarModule, FormsModule, AvatarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  today!: Date;

  date!: Date;

  constructor(private calendarService: CalendarService) {
    this.today = new Date();
    this.date = this.today;
  }

  ngOnInit() {
    this.today = this.calendarService.getToday();
    this.date = this.calendarService.getActiveDate();

    this.calendarService.listenForDateChange().subscribe(date => {
      this.date = date;
    });

  }

  updateDate(date: Date) {
    this.calendarService.setDate(date);
  }

  next() {
    this.calendarService.nextMonth();
  }

  previous() {
    this.calendarService.previousMonth();
  }

  goToToday() {
    this.calendarService.goToToday();
  }
}
