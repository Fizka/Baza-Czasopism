import { Injectable } from '@angular/core';

import { UzytkownikModel } from '../Model/uzytkownik.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UzytkownicyService {

  protected uzytkownicy: UzytkownikModel[];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('assets/uzytkownicy.json').subscribe(
      (data: UzytkownikModel[]) => {
        this.uzytkownicy = data;
      }
    );
  }

  getUzytkownicy(): UzytkownikModel[] {
    return this.uzytkownicy;
  }

  getUzytkownik(id: number): UzytkownikModel {
    const index = this.uzytkownicy.findIndex( uzytkownik => uzytkownik.id === id);
    return this.uzytkownicy[index];
  }

  addUzytkownik(uzytkownik: UzytkownikModel): void {
    uzytkownik.id = this.uzytkownicy.length;
    this.uzytkownicy.push(uzytkownik);
  }

  zmienUzytkownik(uzytkownik: UzytkownikModel): void {
    const index = this.uzytkownicy.findIndex( u => u.id === uzytkownik.id);
    this.uzytkownicy.splice(index, 1, uzytkownik);
  }

  usunUzytkownik(id: number): void {
    const index = this.uzytkownicy.findIndex( uzytkownik => uzytkownik.id === id);
    this.uzytkownicy.splice(index, 1);
  }
}
