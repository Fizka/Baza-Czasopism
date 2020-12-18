import {Injectable} from '@angular/core';

import {UzytkownicyComponent} from './uzytkownicy.component';
import {UzytkownikModel} from '../Model/uzytkownik.model';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LogowanieService {

  zaloguj(dane: FormGroup): boolean {
    const uzytkownik = UzytkownicyComponent.znajdzUzytkownika(dane.get('login').value, dane.get('haslo').value);
    if (uzytkownik !== null) {
      localStorage.setItem('uzytkownik', JSON.stringify(uzytkownik));
      return true;
    }
    return false;
  }

  wyloguj(): void {
    localStorage.removeItem('uzytkownik');
  }

  pobierzUzytkownika(): UzytkownikModel {
    return JSON.parse(localStorage.getItem('uzytkownik'));
  }

  pobierzId(): number {
    return this.pobierzUzytkownika() ? this.pobierzUzytkownika().id : null;
  }

  uprawnienia(): number {
    return (JSON.parse(localStorage.getItem('uzytkownik')) as UzytkownikModel).uprawnienia;
  }

  czyZalogowany(): boolean {
    return !!localStorage.getItem('uzytkownik');
  }

  isAdmin(): boolean {
    if (this.czyZalogowany()) {
      return (JSON.parse(localStorage.getItem('uzytkownik')) as UzytkownikModel).uprawnienia === 2;
    }
    return false;
  }

  czyRowneId(id: number): boolean {
    return this.pobierzId() === id;
  }
}
