import { CzasopismoModel } from '../Model/czasopismo.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {UzytkownikModel} from '../Model/uzytkownik.model';
import {validatorHasla} from '../Komponenty/detale-uzytkownik/detale-uzytkownik.component';

export class FormsHelper {

  getModelCzasopismo(czasopismoForm: FormGroup): CzasopismoModel {
    const czasopismo = new CzasopismoModel();
    czasopismo.id = czasopismoForm.get('id').value;
    czasopismo.tytul = czasopismoForm.get('tytul').value;
    czasopismo.wydawca = czasopismoForm.get('wydawca').value;
    czasopismo.issn = czasopismoForm.get('issn').value;
    czasopismo.redakcja = czasopismoForm.get('redakcja').value;
    czasopismo.czestotliwosc = czasopismoForm.get('czestotliwosc').value;
    czasopismo.rokWydania = czasopismoForm.get('rokWydania').value;
    czasopismo.witrynaWww = czasopismoForm.get('witrynaWww').value;
    czasopismo.pelneTekstyLokalnie = czasopismoForm.get('pelneTekstyLokalnie').value;
    return czasopismo;
  }

  setValuesCzasopismo(detale: CzasopismoModel, forma: FormGroup): FormGroup {
    forma.get('id').setValue(detale.id);
    forma.get('tytul').setValue(detale.tytul);
    forma.get('wydawca').setValue(detale.wydawca);
    forma.get('issn').setValue(detale.issn);
    forma.get('redakcja').setValue(detale.redakcja);
    forma.get('czestotliwosc').setValue(detale.czestotliwosc);
    forma.get('rokWydania').setValue(detale.rokWydania);
    forma.get('witrynaWww').setValue(detale.witrynaWww);
    forma.get('pelneTekstyLokalnie').setValue(detale.pelneTekstyLokalnie);
    return forma;
  }

  generateFormCzasopismo(widokDetali: boolean): FormGroup {
    return new FormGroup({
      id: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      tytul: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      wydawca: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      issn: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      redakcja: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      czestotliwosc: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      rokWydania: new FormControl({value: 0, disabled: widokDetali}, Validators.required),
      witrynaWww: new FormControl({value: '', disabled: widokDetali}),
      pelneTekstyLokalnie: new FormControl({value: false, disabled: widokDetali}, Validators.required),
    });
  }

  getModelUzytkownik(uzytkownikForm: FormGroup): UzytkownikModel {
    const uzytkownik = new UzytkownikModel();
    uzytkownik.id = uzytkownikForm.get('id').value;
    uzytkownik.login = uzytkownikForm.get('login').value;
    uzytkownik.haslo = uzytkownikForm.get('haslo').value;
    uzytkownik.username = uzytkownikForm.get('username').value;
    uzytkownik.imie = uzytkownikForm.get('imie').value;
    uzytkownik.czasopisma = [];
    uzytkownik.uprawnienia = uzytkownikForm.get('uprawnienia').value;
    return uzytkownik;
  }

  setValuesUzytkownik(detale: UzytkownikModel, forma: FormGroup): FormGroup {
    forma.get('id').setValue(detale.id);
    forma.get('login').setValue(detale.login);
    forma.get('haslo').setValue(detale.haslo);
    forma.get('username').setValue(detale.username);
    forma.get('imie').setValue(detale.imie);
    forma.get('uprawnienia').setValue(detale.uprawnienia !== 0 ? detale.uprawnienia : 1);
    return forma;
  }

  generateFormUzytkownik(widokDetali: boolean): FormGroup {
    return new FormGroup({
      id: new FormControl({value: '', disabled: widokDetali}),
      login: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      haslo: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      username: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      imie: new FormControl({value: '', disabled: widokDetali}, Validators.required),
      uprawnienia: new FormControl({value: 0, disabled: widokDetali}),
    });
  }

}
