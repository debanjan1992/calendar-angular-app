import { Injectable } from '@angular/core';
import { add, Duration, format, getDaysInMonth } from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor() { }

  static getDaysInCurrentMonth(date: Date) {
    return getDaysInMonth(date);
  }

  static getDaysInNextMonth(date: Date) {
    return (new Date(date.getFullYear(), date.getMonth(), 0)).getDate();
  }

  static getStartingDateOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  static addDuration(date: Date, duration: Duration) {
    return add(date, duration);
  }

  static getDayOfWeek(date: Date, formatStr = "E") {
    return format(date, formatStr);
  }
}
