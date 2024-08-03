import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { DatesService } from './dates.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private _todayDate: Date;
  private _activeDate: Date;
  private _activeDateSubject: BehaviorSubject<Date>;

  constructor() {
    this._todayDate = new Date();
    this._todayDate.setHours(0, 0, 0, 0);

    this._activeDate = this._todayDate;
    this._activeDateSubject = new BehaviorSubject<Date>(this._activeDate);
  }

  listenForDateChange() {
    return this._activeDateSubject.asObservable().pipe(
      tap(date => this._activeDate = date)
    );
  }

  getActiveDate() {
    return this._activeDateSubject.getValue();
  }

  getToday() {
    return this._todayDate;
  }

  goToToday() {
    this._activeDateSubject.next(this._todayDate);
  }

  nextMonth() {
    const date = DatesService.addDuration(this._activeDate, { months: 1 });
    this._activeDateSubject.next(date);
  }

  setDate(date: Date) {
    this._activeDateSubject.next(date);
  }

  previousMonth() {
    const date = DatesService.addDuration(this._activeDate, { months: -1 });
    this._activeDateSubject.next(date);
  }
}
