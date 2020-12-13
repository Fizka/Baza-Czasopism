// import { Injectable } from '@angular/core';
//
// import { CzasopismoModel } from '../Model/czasopismo.model';
// import {HttpClient} from '@angular/common/http';
// import {Observable} from 'rxjs';
// import {map} from 'rxjs/operators';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class CzasopismaService {
//
//   protected czasopisma: Observable<CzasopismoModel[]>;
//
//   constructor(private httpClient: HttpClient) {
//     this.fetchCzasopisma();
//   }
//
//   fetchCzasopisma() {
//     this.czasopisma = this.httpClient.get('assets/czasopisma.json').pipe(map( (data: any) => data.json));
//     this.httpClient.get('assets/czasopisma.json').subscribe(
//       (data: CzasopismoModel[]) => {
//         this.czasopisma = data;
//       }
//     );
//   }
//
//   getCzasopisma(): Observable<CzasopismoModel[]> {
//     return this.czasopisma;
//     if (this.czasopisma) {
//       return this.czasopisma;
//     }
//     return null;
//   }
//
//   getCzasopismo(id: number): CzasopismoModel {
//     if (this.czasopisma) {
//       const index = this.czasopisma.findIndex( czasopismo => czasopismo.id === id);
//       return this.czasopisma[index];
//     }
//     return null;
//   }
//
//   dodajCzasopismo(czasopismo: CzasopismoModel): void {
//     if (this.czasopisma) {
//       czasopismo.id = this.czasopisma.length;
//       this.czasopisma.push(czasopismo);
//     }
//     return null;
//   }
//
//   zmienCzasopismo(czasopismo: CzasopismoModel): void {
//     if (this.czasopisma) {
//       const index = this.czasopisma.findIndex(c => c.id === czasopismo.id);
//       this.czasopisma.splice(index, 1, czasopismo);
//     }
//     return null;
//   }
//
//   usunCzasopismo(id: number): void {
//     if (this.czasopisma) {
//       const index = this.czasopisma.findIndex(czasopismo => czasopismo.id === id);
//       this.czasopisma.splice(index, 1);
//     }
//     return null;
//   }
// }
