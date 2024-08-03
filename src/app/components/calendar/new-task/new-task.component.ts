import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { TasksService } from '../../../services/tasks.service';
import { Task } from './types';
import { toDate } from "date-fns";

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, InputTextareaModule, CalendarModule, ButtonModule, ColorPickerModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {
  @Input() date!: Date;
  @Output() dismiss: EventEmitter<void>;
  @Input() editMode: boolean;
  @Input() task!: Task;

  taskTitle: string;
  taskDescription: string;
  taskColor: string;
  taskDate: Date;

  constructor(private tasksService: TasksService) {
    this.taskTitle = "";
    this.taskDescription = "";
    this.taskDate = this.date;
    this.taskColor = "#3B82F6";
    this.editMode = false;
    this.dismiss = new EventEmitter();
  }

  ngOnInit() {
    if (!this.editMode) {
      this.taskDate = this.date;
    } else {
      this.taskTitle = this.task?.title;
      this.taskDescription = this.task?.description;
      this.taskDate = toDate(this.task?.createdDate);
      this.taskColor = this.task?.color ?? "#3B82F6";
    }
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  save() {
    this.tasksService.saveTask(this.date, this.taskTitle, this.taskDescription, this.taskColor);
    this.dismiss.emit();
  }

  delete() {
    this.tasksService.deleteTask(this.task.id);
    this.dismiss.emit();
  }

  update() {
    this.tasksService.updateTask(this.task.id, this.taskTitle, this.taskDescription, this.taskColor);
    this.dismiss.emit();
  }
}
