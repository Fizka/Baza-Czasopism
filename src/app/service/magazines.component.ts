import * as magazinesDatabase from '../../assets/czasopisma.json';
import {MagazineModel} from '../models/magazine.model';
import {FormGroup} from '@angular/forms';

export class MagazinesComponent {

  protected static magazines: MagazineModel[] = magazinesDatabase.default;

  static getMagazines(): MagazineModel[] {
    return this.magazines;
  }

  static getMagazine(id: any): MagazineModel {
    const index = this.magazines.findIndex(czasopismo => czasopismo.id.toString() === id);
    return this.magazines[index];
  }

  static addMagazine(czasopismo: MagazineModel): void {
    this.magazines.push(czasopismo);
  }

  static updateMagazine(czasopismo: MagazineModel): void {
    const index = this.magazines.findIndex(c => c.id === czasopismo.id);
    if (index !== -1) {
      this.magazines.splice(index, 1, czasopismo);
    }
  }

  static deleteMagazine(id: number): void {
    const index = this.magazines.findIndex(czasopismo => czasopismo.id === id);
    this.magazines.splice(index, 1);
  }

  static addID(forma: FormGroup): FormGroup {
    forma.get('id').setValue(this.magazines.length);
    return forma;
  }
}
