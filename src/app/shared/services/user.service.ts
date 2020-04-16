import { Injectable, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { IUser } from '@app/shared/models/user.interface';
import { ERole } from '@app/shared/models/enum/role.enum';

@Injectable()
export class UserService {

  users: IUser[] = [
    { id: 1, name: 'Lucas', password: 'xxxx', email: 'lucasreinaldi@gmail.com', role: 'Administrador'},
    { id: 2, name: 'Sidaum', password: 'xxxx', email: 'sidaum@gmail.com', role: 'Usuário' },
    { id: 3, name: 'Calima', password: 'xxxx', email: 'calima@gmail.com', role: 'Usuário'},
    { id: 4, name: 'Cauezada', password: 'xxxx', email: 'cauezada@gmail.com', role: 'Visualizador'}
  ];

  addUserEvent = new EventEmitter<IUser[]>();
  id = this.users.length;

  roles: any = ['Visualizador', 'Usuário', 'Administrador'];

  constructor(
  ) { }

  getUsers(): IUser[] {
    return this.users;
  }

  getUser(id: number): IUser {
    return this.users.find(user => user.id === id);
  }

  getRoles() {
    return this.roles;
  }

  addUser(user: IUser) {
    user.id = ++this.id;
    this.users.push(user);
    this.addUserEvent.emit(this.users);
  }

  deleteUser(id: number) {
    const index = this.users.findIndex(d => d.id === id);
    this.users.splice(index, 1);
    this.addUserEvent.emit(this.users);
  }
}
