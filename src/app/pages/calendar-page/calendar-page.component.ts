import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidepanelComponent } from "../../components/sidepanel/sidepanel.component";
import { CalendarComponent } from '../../components/calendar/calendar.component';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [HeaderComponent, SidepanelComponent, CalendarComponent],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss'
})
export class CalendarPageComponent {

}
