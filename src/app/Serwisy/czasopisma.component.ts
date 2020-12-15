import * as czasopismaData from '../../assets/czasopisma.json';
import {CzasopismoModel} from '../Model/czasopismo.model';
import {FormGroup} from '@angular/forms';

export class CzasopismaComponent {

  protected static czasopisma: CzasopismoModel[] = czasopismaData.default;

  static getCzasopisma(): CzasopismoModel[] {
    return this.czasopisma;
  }

  static getCzasopismo(id: any): CzasopismoModel {
    const index = this.czasopisma.findIndex(czasopismo => czasopismo.id.toString() === id);
    return this.czasopisma[index];
  }

  static dodajCzasopismo(czasopismo: CzasopismoModel): void {
    this.czasopisma.push(czasopismo);
  }

  static zmienCzasopismo(czasopismo: CzasopismoModel): void {
    const index = this.czasopisma.findIndex(c => c.id === czasopismo.id);
    if (index !== -1) {
      this.czasopisma.splice(index, 1, czasopismo);
    }
  }

  static usunCzasopismo(id: number): void {
    const index = this.czasopisma.findIndex(czasopismo => czasopismo.id === id);
    this.czasopisma.splice(index, 1);
  }

  static nadajId(forma: FormGroup): FormGroup {
    forma.get('id').setValue(this.czasopisma.length);
    return forma;
  }
}
