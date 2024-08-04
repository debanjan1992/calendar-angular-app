import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Task } from '../calendar/new-task/types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, FormsModule, OverlayPanelModule, ButtonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  @Input({ required: true }) task!: Task;

  @Output() deleteClicked = new EventEmitter<Task>();
  @Output() toggleCompleted = new EventEmitter<Task>();
  @Output() editClicked = new EventEmitter<Task>();

}
