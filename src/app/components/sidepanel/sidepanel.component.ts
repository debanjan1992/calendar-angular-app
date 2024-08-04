import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { NewTaskComponent } from "../calendar/new-task/new-task.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidepanel',
  standalone: true,
  imports: [CalendarModule, FormsModule, ButtonModule, DialogModule, NewTaskComponent, CommonModule],
  templateUrl: './sidepanel.component.html',
  styleUrl: './sidepanel.component.scss'
})
export class SidepanelComponent {
  date = new Date();
  newTaskVisible = false;
  @Input() visible = false;
}
