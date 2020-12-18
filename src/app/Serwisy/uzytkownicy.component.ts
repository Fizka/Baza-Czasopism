import * as uzytkownicyData from '../../assets/uzytkownicy.json';
import {UzytkownikModel} from '../Model/uzytkownik.model';
import {FormGroup} from '@angular/forms';
import {LogowanieService} from './logowanie.service';

export class UzytkownicyComponent {

  protected static uzytkownicy: UzytkownikModel[] = uzytkownicyData.default;

  constructor(protected logowanieService: LogowanieService) {
  }

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

  static zmienUzytkownika(uzytkownik: UzytkownikModel): boolean {
    const index = this.uzytkownicy.findIndex(u => u.id === uzytkownik.id);
    if (index !== -1) {
      this.uzytkownicy.splice(index, 1, uzytkownik);
      return true;
    }
    return false;
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

  static usunCzasopismoZUzytkownikow(id: number): void {
    let index = -1;
    this.uzytkownicy.forEach(uzytkownik => {
      index = uzytkownik.czasopisma.findIndex(el => el === id);
      if (index !== -1) {
        uzytkownik.czasopisma.splice(index, 1);
      }
    });
  }

  static usunCzasopismo(idCzasopismo: number, idUzytkownik: number): UzytkownikModel {
    let u: UzytkownikModel;
    this.uzytkownicy.forEach(uzytkownik => {
      if (uzytkownik.id === idUzytkownik) {
        const index = uzytkownik.czasopisma.findIndex(el => el === idCzasopismo);
        if (index !== -1) {
          uzytkownik.czasopisma.splice(index, 1);
        }
      }
      u = uzytkownik;
    });
    return u;
  }

  static dodajCzasopismo(idCzasopismo: number, idUzytkownik: number): UzytkownikModel {
    let u: UzytkownikModel;
    this.uzytkownicy.forEach( uzytkownik => {
      if (uzytkownik.id === idUzytkownik) {
        uzytkownik.czasopisma.push(idCzasopismo);
        u = uzytkownik;
      }
    });
    return u;
  }
}
