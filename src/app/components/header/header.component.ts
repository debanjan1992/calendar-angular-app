import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { CalendarService } from '../../services/calendar.service';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AppService } from '../../services/app.service';
import { TasksService } from '../../services/tasks.service';
import { DialogModule } from 'primeng/dialog';
import { NewTaskComponent } from '../calendar/new-task/new-task.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, CommonModule, CalendarModule, FormsModule, AvatarModule, OverlayPanelModule, DialogModule, NewTaskComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() profileClicked = new EventEmitter<void>();
  today!: Date;

  date!: Date;
  newTaskVisible = false;

  constructor(private calendarService: CalendarService, private appService: AppService, private tasksService: TasksService) {
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

  toggleSidepanel() {
    this.appService.toggle();
  }

  generate() {
    this.tasksService.createDummyTasks();
  }
}
