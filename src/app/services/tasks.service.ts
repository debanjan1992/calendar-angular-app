import { Injectable } from '@angular/core';
import { Task } from '../components/calendar/new-task/types';
import { format } from 'date-fns';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { CalendarService } from './calendar.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  
  private tasksSubject = new Subject<Task[]>();

  constructor() {
    if (!localStorage.getItem("tasks")) {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
    this.tasksSubject = new Subject();
  }

  getTasks() {
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") ?? "[]");
    return tasks;
  }

  listenForTasks() {
    return this.tasksSubject.asObservable();
  }

  saveTask(date: Date, title: string, description: string, color: string) {
    let allTasks = this.getTasks();
    allTasks = [...allTasks, {
      id: Math.floor(Math.random() * 1000),
      title,
      description,
      color,
      createdDate: format(date, "dd/MM/yyyy"),
    }];

    localStorage.setItem("tasks", JSON.stringify(allTasks));
    this.tasksSubject.next(allTasks);
  }

  updateTask(taskId: number, title: string, description: string, color: string) {
    let allTasks = this.getTasks();
    const index = allTasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      allTasks[index] = {
        ...allTasks[index],
        title,
        description,
        color,
      }
    }
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    this.tasksSubject.next(allTasks);
  }

  deleteTask(taskId: number) {
    let allTasks = this.getTasks();
    const index = allTasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      allTasks.splice(index, 1);
    }
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    this.tasksSubject.next(allTasks);
  }

  getTasksForDate(date: Date) {
    const allTasks = this.getTasks();
    const matchedDate = format(date, "dd/MM/yyyy");
    return allTasks.filter(task => task.createdDate === matchedDate);
  }
}
