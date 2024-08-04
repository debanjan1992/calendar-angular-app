import { ChangeDetectorRef, Component, ElementRef, inject, Input, QueryList, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { format, toDate } from 'date-fns';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { Task } from '../new-task/types';
import { TasksService } from '../../../services/tasks.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TaskComponent } from '../../task/task.component';

export interface DateItem {
  date: Date;
  items: Task[];
}

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [CommonModule, OverlayPanelModule, ContextMenuModule, TaskComponent],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent {
  @Input() date!: DateItem;
  @Input() index!: number;
  @Input() pageSize!: number;

  activeTask!: Task;
  tasksService = inject(TasksService);
  showDropZone = false;
  showUntitled = false;
  @ViewChild('vcr', { static: true, read: ViewContainerRef }) vcRef!: ViewContainerRef;
  @ViewChild('op', { static: true, read: OverlayPanel }) overlayPanelRef!: OverlayPanel;

  constructor(private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.initializePageSize();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['date'] && !changes['date'].firstChange) {
      this.initializePageSize();
    }
  }

  initializePageSize() {
    setTimeout(() => {
      const size = Math.floor((this.elementRef.nativeElement.offsetHeight - 80) / 22);
      this.pageSize = size <= 0 ? 1 : size;
    }, 0)
  }

  get isCurrent() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.date.date.toISOString() === today.toISOString();
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

  get items() {
    return this.date.items.slice(0, this.pageSize);
  }

  drop(ev: any) {
    ev.preventDefault();
    const data: Task = JSON.parse(ev.dataTransfer.getData("task"));

    this.showDropZone = false;
    this.tasksService.updateTask(data.id, { ...data, createdDate: this.date.date.toISOString() });
    const isTaskPresent = this.date.items.find(t => t.id === data.id);
    this.date.items.push({ ...data });
    if (!isTaskPresent) {
      this.messageService.add({ severity: 'success', summary: 'Task updated!' });
    }
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
    }
  }

  onDeleteClicked(task: Task, event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this task?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.tasksService.deleteTask(task.id);
        this.messageService.add({ severity: 'success', summary: 'Task deleted!' });
        this.overlayPanelRef.hide();
      },
      reject: () => {
        this.overlayPanelRef.hide();
      }
    });
  }

  onEditClicked(task: Task, event: any) {
    this.vcRef.clear();

    import("../../calendar/new-task/new-task.component").then(c => {
      const component = this.vcRef.createComponent(c.NewTaskComponent);
      component.instance.date = this.date.date;
      component.instance.task = task;
      component.instance.editMode = true;
      component.instance.dismiss.subscribe(() => {
        this.overlayPanelRef.hide();
      });
      this.changeDetectorRef.detectChanges();
      this.overlayPanelRef.show(event);
    });
  }

  onTaskToggle(task: Task, event: any) {
    this.overlayPanelRef.hide();
    task.completed = !task.completed;
    this.tasksService.updateTask(task.id, task);
  }

  showTaskDetails(event: any, task: any) {
    this.vcRef.clear();
    import("../../task-details/task-details.component").then(c => {
      const component = this.vcRef.createComponent(c.TaskDetailsComponent);
      component.instance.task = task;
      component.instance.deleteClicked.subscribe(task => this.onDeleteClicked(task, event));
      component.instance.editClicked.subscribe(task => this.onEditClicked(task, event));
      component.instance.toggleCompleted.subscribe(task => this.onTaskToggle(task, event));

      this.changeDetectorRef.detectChanges();
      this.overlayPanelRef.show(event);
    });
  }

  showNewTaskOverlay(event: any) {
    this.vcRef.clear();
    this.showUntitled = true;
    import("../../calendar/new-task/new-task.component").then(c => {
      const component = this.vcRef.createComponent(c.NewTaskComponent);
      component.instance.date = this.date.date;
      component.instance.dismiss.subscribe(() => {
        this.overlayPanelRef.hide();
        this.showUntitled = false;
      });
      this.changeDetectorRef.detectChanges();
      this.overlayPanelRef.show(event);
    });
  }

  showMorePopup(event: Event) {
    this.vcRef.clear();
    import("../../more-view/more-view.component").then(c => {
      const component = this.vcRef.createComponent(c.MoreViewComponent);
      component.instance.items = this.date.items;
      component.instance.date = this.date.date;
      component.instance.dismiss.subscribe(() => {
        this.overlayPanelRef.hide();
      });
      component.instance.taskClicked.subscribe(data => {
        this.showTaskDetails(data.e, data.task);
      })
      this.changeDetectorRef.detectChanges();
      this.overlayPanelRef.show(event);
    });
  }
}
