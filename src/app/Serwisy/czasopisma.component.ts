import * as czasopismaData from '../../assets/czasopisma.json';
import {CzasopismoModel} from '../Model/czasopismo.model';

export class CzasopismaComponent {

  protected czasopisma: CzasopismoModel[];

  constructor() {
    this.czasopisma = czasopismaData.default;
  }

  getCzasopisma(): CzasopismoModel[] {
    return this.czasopisma;
  }

  getCzasopismo(id): CzasopismoModel {
    const index = this.czasopisma.findIndex(czasopismo => czasopismo.id.toString() === id);
    return this.czasopisma[index];
  }

  dodajCzasopismo(czasopismo: CzasopismoModel): void {
    czasopismo.id = this.czasopisma.length;
    this.czasopisma.push(czasopismo);
  }

  zmienCzasopismo(czasopismo: CzasopismoModel): void {
    const index = this.czasopisma.findIndex(c => c.id === czasopismo.id);
    if (index !== -1) {
      this.czasopisma.splice(index, 1, czasopismo);
    }
  }

  usunCzasopismo(id: number): void {
    const index = this.czasopisma.findIndex(czasopismo => czasopismo.id === id);
    this.czasopisma.splice(index, 1);
  }
}
