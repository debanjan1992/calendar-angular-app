import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NewTaskComponent } from '../new-task/new-task.component';
import { Task } from '../new-task/types';
import { TasksService } from '../../../services/tasks.service';

export interface DateItem {
  date: Date;
  items: Task[];
}

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [CommonModule, OverlayPanelModule, NewTaskComponent],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent {
  @Input() date!: DateItem;
  @Input() index!: number;

  activeTask!: Task;
  tasksService = inject(TasksService);
  showDropZone = false;

  get isCurrent() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.date.date.toDateString() === today.toDateString();
  }

  get day() {
    if (!this.date) {
      return "null";
    }
    return this.date.date.getDate();
  }

  get showDayOfWeek() {
    return [0, 1, 2, 3, 4, 5, 6].includes(this.index);
  }

  get dayOfWeekLabel() {
    switch (this.index) {
      case 0: return "SUN";
      case 1: return "MON";
      case 2: return "TUE";
      case 3: return "WED";
      case 4: return "THU";
      case 5: return "FRI";
      case 6: return "SAT";
      default: return "";
    }
  }

  get dayLabel() {
    if (this.day === 1 && this.date !== null) {
      return format(this.date.date, "MMM") + " " + 1;
    }
    return this.day;
  }

  drop(ev: any) {
    ev.preventDefault();
    const data: Task = JSON.parse(ev.dataTransfer.getData("task"));
    this.date.items.push({ ...data, id: 0 });
    this.tasksService.deleteTask(data.id);
    this.tasksService.saveTask(this.date.date, data.title, data.description, data.color);
    this.showDropZone = false;
  }

  allowDrop(ev: any) {
    ev.preventDefault();
    this.showDropZone = true;
  }

  dragLeave(ev: any) {
    ev.preventDefault();
    this.showDropZone = false;
  }

  drag(ev: DragEvent, task: Task) {
    const index = this.date.items.findIndex(i => i.id === task.id);
    if (index !== -1) {
      ev.dataTransfer?.setData("task", JSON.stringify(task));
      this.date.items.splice(index, 1);
    }
  }

}
