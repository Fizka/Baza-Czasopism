import * as uzytkownicyData from '../../assets/uzytkownicy.json';
import {UzytkownikModel} from '../Model/uzytkownik.model';
import {FormGroup} from '@angular/forms';

export class UzytkownicyComponent {

  protected static uzytkownicy: UzytkownikModel[] = uzytkownicyData.default;

  static getUzytkownicy(): UzytkownikModel[] {
    return this.uzytkownicy;
  }

  static getUzytkownik(id: any): UzytkownikModel {
    const index = this.uzytkownicy.findIndex(uzytkownik => uzytkownik.id === id);
    if (index !== -1) {
      return this.uzytkownicy[index];
    }
    return null;
  }

  static dodajUzytkownika(uzytkownik: UzytkownikModel): void {
    this.uzytkownicy.push(uzytkownik);
  }

  static zmienUzytkownika(uzytkownik: UzytkownikModel): void {
    const index = this.uzytkownicy.findIndex(u => u.id === uzytkownik.id);
    if (index !== -1) {
      this.uzytkownicy.splice(index, 1, uzytkownik);
    }
  }

  static usunUzytkownika(id: number): void {
    const index = this.uzytkownicy.findIndex(uzytkownik => uzytkownik.id === id);
    this.uzytkownicy.splice(index, 1);
  }

  static znajdzUzytkownika(login: string, haslo: string): UzytkownikModel {
    const index = this.uzytkownicy.findIndex(u => u.login === login && u.haslo === haslo);
    if (index !== -1) {
      return this.uzytkownicy[index];
    }
    return null;
  }

  static czyLoginZajety(login: string): boolean {
    const index = this.uzytkownicy.findIndex(u => u.login.toLowerCase() === login.toLowerCase());
    return index !== -1;
  }

  static nadajId(forma: FormGroup): FormGroup {
    forma.get('id').setValue(this.uzytkownicy.length);
    return forma;
  }
}
