import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  state = false;
  sidebarSubject = new BehaviorSubject<boolean>(this.state);

  constructor() { }

  listenForSidebarChanges() {
    return this.sidebarSubject.asObservable().pipe(
      tap(state => this.state = state)
    );
  }

  getSidebrState() {
    return this.sidebarSubject.getValue();
  }

  toggle() {
    this.sidebarSubject.next(!this.state);
  }
}
