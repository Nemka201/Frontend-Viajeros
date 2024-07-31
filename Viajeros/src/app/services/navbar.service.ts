import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private _refreshNavbar = new Subject<void>();
  refreshNavbar$ = this._refreshNavbar.asObservable();

  emitRefreshNavbar() {
    this._refreshNavbar.next();
  }
}
