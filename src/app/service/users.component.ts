import * as UsersDatabase from '../../assets/uzytkownicy.json';
import {UserModel} from '../models/user.model';
import {FormGroup} from '@angular/forms';

export class UsersComponent {

  protected static users: UserModel[] = UsersDatabase.default;

  static getUsers(): UserModel[] {
    return this.users;
  }

  static getUser(id: any): UserModel {
    const index = this.users.findIndex(uzytkownik => uzytkownik.id === id);
    if (index !== -1) {
      return this.users[index];
    }
    return null;
  }

  static addUse(uzytkownik: UserModel): void {
    this.users.push(uzytkownik);
  }

  static updateUser(uzytkownik: UserModel): void {
    const index = this.users.findIndex(u => u.id === uzytkownik.id);
    if (index !== -1) {
      console.log('update' + uzytkownik);
      this.users.splice(index, 1, uzytkownik);
    }
  }

  static deleteUser(id: number): void {
    const index = this.users.findIndex(uzytkownik => uzytkownik.id === id);
    this.users.splice(index, 1);
  }

  static findUser(login: string, haslo: string): UserModel {
    const index = this.users.findIndex(u => u.login === login && u.haslo === haslo);
    if (index !== -1) {
      return this.users[index];
    }
    return null;
  }

  static checkLogin(login: string): boolean {
    const index = this.users.findIndex(u => u.login.toLowerCase() === login.toLowerCase());
    return index !== -1;
  }

  static addID(forma: FormGroup): FormGroup {
    forma.get('id').setValue(this.users.length);
    return forma;
  }

  static deleteMagazine(id: number): void {
    let index = -1;
    this.users.forEach(uzytkownik => {
      index = uzytkownik.czasopisma.findIndex(el => el === id);
      if (index !== -1) {
        uzytkownik.czasopisma.splice(index, 1);
      }
    });
  }
}
