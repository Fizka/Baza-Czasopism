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
      localStorage.setItem('zalogowany', JSON.stringify(true));
      return true;
    }
    return false;
  }

  wyloguj(): void {
    localStorage.setItem('zalogowany', JSON.stringify(false));
    localStorage.removeItem('uzytkownik');
  }

  aktualizujUzytkownika(uzytkownik: UzytkownikModel): void {
    localStorage.setItem('uzytkownik', JSON.stringify(uzytkownik));
  }

  pobierzUzytkownika(): UzytkownikModel {
    return JSON.parse(localStorage.getItem('uzytkownik'));
  }

  pobierzId(): number {
    return this.pobierzUzytkownika() ? this.pobierzUzytkownika().id : null;
  }

  czyZalogowany(): boolean {
    return JSON.parse(localStorage.getItem('zalogowany'));
  }

  isAdmin(): boolean {
    if (this.czyZalogowany()) {
      return (JSON.parse(localStorage.getItem('uzytkownik')) as UzytkownikModel).uprawnienia.toString() === '2';
    }
    return false;
  }

  czyRowneId(id: number): boolean {
    return this.pobierzId() === id;
  }
}
