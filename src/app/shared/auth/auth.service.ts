import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from '@app/shared/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIsAuth = false;

  showMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  doLogin(user: IUser) {
    if (user.name === 'lucas') {
      this.userIsAuth = true;
      this.showMenuEmitter.emit(true);
      this.router.navigate(['/']);
    } else {
      this.showMenuEmitter.emit(false);
    }
  }

  userAuth() {
    return this.userIsAuth;
  }
}
