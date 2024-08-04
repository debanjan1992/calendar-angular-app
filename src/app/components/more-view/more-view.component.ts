import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../calendar/new-task/types';
import { CommonModule } from '@angular/common';
import { TaskComponent } from "../task/task.component";

@Component({
  selector: 'app-more-view',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './more-view.component.html',
  styleUrl: './more-view.component.scss'
})
export class MoreViewComponent {
  @Output() dismiss = new EventEmitter<void>();
  @Input() items!: Task[];
  @Input() date!: Date;

  drag(ev: DragEvent, task: Task) {
    const index = this.items.findIndex(i => i.id === task.id);
    if (index !== -1) {
      ev.dataTransfer?.setData("task", JSON.stringify(task));
    }
  }

}
