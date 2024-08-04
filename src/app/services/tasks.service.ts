import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../components/calendar/new-task/types';
import { DatesService } from './dates.service';
import { faker } from '@faker-js/faker';
import * as uuid from "uuid";
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  mockRange = 60;

  private tasksSubject = new Subject<Task[]>();

  constructor() {
    if (!localStorage.getItem("tasks")) {
      localStorage.setItem("tasks", JSON.stringify([]));
      this.createDummyTasks();
    }
    this.tasksSubject = new Subject();
  }

  createDummyTasks() {
    console.log("Generating dummy tasks");
    const date = new Date();
    const startDate = DatesService.addDuration(date, { days: -this.mockRange });
    const endDate = DatesService.addDuration(date, { days: this.mockRange });

    let current = startDate;
    const tasks: Task[] = [];

    while (current <= endDate) {
      const numberOfTasks = Math.floor(Math.random() * 10) - 3;
      current.setHours(0, 0, 0, 0);

      if (numberOfTasks > 0) {
        for (let i = 1; i <= numberOfTasks; i++) {
          tasks.push({
            id: uuid.v4(),
            title: faker.music.songName(),
            description: faker.commerce.productDescription(),
            color: "#3B82F6",
            createdDate: current.toUTCString(),
            completed: Math.random() > 0.7,
          });
        }
      }

      current = DatesService.addDuration(current, { days: Math.abs(Math.floor(Math.random() - 3)) });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.tasksSubject.next(tasks);

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
    date.setHours(0, 0, 0, 0);
    allTasks = [...allTasks, {
      id: uuid.v4(),
      title,
      description,
      color,
      createdDate: date.toUTCString(),
      completed: false,
    }];

    localStorage.setItem("tasks", JSON.stringify(allTasks));
    this.tasksSubject.next(allTasks);
  }

  updateTask(taskId: string, task: Task) {
    let allTasks = this.getTasks();
    const index = allTasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      allTasks[index] = {
        ...task,
        id: task.id,
      };
    }
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    this.tasksSubject.next(allTasks);
  }

  deleteTask(taskId: string) {
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
    const matchedDate = date.toUTCString();
    const results = allTasks.filter(task => {
      return task.createdDate === matchedDate;
    });

    return results;
  }
}
