import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../components/calendar/new-task/types';
import { DatesService } from './dates.service';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasksSubject = new Subject<Task[]>();

  constructor() {
    if (!localStorage.getItem("tasks")) {
      localStorage.setItem("tasks", JSON.stringify([]));
      this.createDummyTasks();
    }
    this.tasksSubject = new Subject();
  }

  createDummyTasks() {
    const date = new Date();
    const startDate = DatesService.addDuration(date, { days: -90 });
    const endDate = DatesService.addDuration(date, { days: 90 });

    let current = startDate;
    const tasks: Task[] = [];

    while (current <= endDate) {
      const numberOfTasks = Math.floor(Math.random() * 10) - 3;

      if (numberOfTasks > 0) {
        for (let i = 1; i <= numberOfTasks; i++) {
          tasks.push({
            id: faker.number.int({ min: 100000 }),
            title: faker.music.songName(),
            description: faker.commerce.productDescription(),
            color: "#3B82F6",
            createdDate: current.toLocaleDateString(),
            completed: Math.random() > 0.7,
          })
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
    allTasks = [...allTasks, {
      id: Math.floor(Math.random() * 1000),
      title,
      description,
      color,
      createdDate: date.toLocaleDateString(),
      completed: false,
    }];

    localStorage.setItem("tasks", JSON.stringify(allTasks));
    this.tasksSubject.next(allTasks);
  }

  updateTask(taskId: number, task: Task) {
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
    const matchedDate = date.toLocaleDateString();
    return allTasks.filter(task => task.createdDate === matchedDate);
  }
}
