import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidepanelComponent } from "../../components/sidepanel/sidepanel.component";
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { AppService } from '../../services/app.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [HeaderComponent, SidepanelComponent, CalendarComponent, CommonModule],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss'
})
export class CalendarPageComponent {
  sidepanelVisible = false;

  constructor(private appService: AppService) {
    this.appService.listenForSidebarChanges().subscribe(state => {
      this.sidepanelVisible = state;
    });
  }
}
