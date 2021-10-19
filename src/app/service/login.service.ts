import {Injectable} from '@angular/core';

import {UsersComponent} from './users.component';
import {UserModel} from '../models/user.model';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logIn(dane: FormGroup): boolean {
    const uzytkownik = UsersComponent.findUser(dane.get('login').value, dane.get('haslo').value);
    if (uzytkownik !== null) {
      localStorage.setItem('uzytkownik', JSON.stringify(uzytkownik));
      return true;
    }
    return false;
  }

  LogOff(): void {
    localStorage.removeItem('uzytkownik');
  }

  getUser(): UserModel {
    return JSON.parse(localStorage.getItem('uzytkownik'));
  }

  getID(): number {
    return this.getUser() ? this.getUser().id : null;
  }

  getPermission(): number {
    return (JSON.parse(localStorage.getItem('uzytkownik')) as UserModel).uprawnienia;
  }

  isLogged(): boolean {
    return !!localStorage.getItem('uzytkownik');
  }

  isAdmin(): boolean {
    if (this.isLogged()) {
      return (JSON.parse(localStorage.getItem('uzytkownik')) as UserModel).uprawnienia === 2;
    }
    return false;
  }

  isID(id: number): boolean {
    return this.getID() === id;
  }
}
