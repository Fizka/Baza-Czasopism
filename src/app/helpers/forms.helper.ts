import {MagazineModel} from '../models/magazine.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../models/user.model';

export class FormsHelper {

  getModelMagazine(magazineForm: FormGroup): MagazineModel {
    const magazine = new MagazineModel();
    magazine.id = magazineForm.get('id').value;
    magazine.tytul = magazineForm.get('tytul').value;
    magazine.wydawca = magazineForm.get('wydawca').value;
    magazine.issn = magazineForm.get('issn').value;
    magazine.redakcja = magazineForm.get('redakcja').value;
    magazine.czestotliwosc = magazineForm.get('czestotliwosc').value;
    magazine.rokWydania = magazineForm.get('rokWydania').value;
    magazine.witrynaWww = magazineForm.get('witrynaWww').value;
    magazine.pelneTekstyLokalnie = magazineForm.get('pelneTekstyLokalnie').value;
    return magazine;
  }

  setMagazine(magazine: MagazineModel, forms: FormGroup): FormGroup {
    forms.get('id').setValue(magazine.id);
    forms.get('tytul').setValue(magazine.tytul);
    forms.get('wydawca').setValue(magazine.wydawca);
    forms.get('issn').setValue(magazine.issn);
    forms.get('redakcja').setValue(magazine.redakcja);
    forms.get('czestotliwosc').setValue(magazine.czestotliwosc);
    forms.get('rokWydania').setValue(magazine.rokWydania);
    forms.get('witrynaWww').setValue(magazine.witrynaWww);
    forms.get('pelneTekstyLokalnie').setValue(magazine.pelneTekstyLokalnie);
    return forms;
  }

  generateMagazine(viewDetails: boolean): FormGroup {
    return new FormGroup({
      id: new FormControl({value: '', disabled: viewDetails}),
      tytul: new FormControl({value: '', disabled: viewDetails}, Validators.required),
      wydawca: new FormControl({value: '', disabled: viewDetails}, Validators.required),
      issn: new FormControl({value: '', disabled: viewDetails}, Validators.required),
      redakcja: new FormControl({value: '', disabled: viewDetails}, Validators.required),
      czestotliwosc: new FormControl({value: '', disabled: viewDetails}, Validators.required),
      rokWydania: new FormControl({value: 0, disabled: viewDetails}, Validators.required),
      witrynaWww: new FormControl({value: '', disabled: viewDetails}),
      pelneTekstyLokalnie: new FormControl({value: false, disabled: viewDetails}, Validators.required),
    });
  }

  getUserModel(userForm: FormGroup): UserModel {
    const user = new UserModel();
    user.id = userForm.get('id').value;
    user.login = userForm.get('login').value;
    user.haslo = userForm.get('haslo').value;
    user.username = userForm.get('username').value;
    user.imie = userForm.get('imie').value;
    user.czasopisma = [];
    user.uprawnienia = userForm.get('uprawnienia').value;
    return user;
  }

  getUserValues(details: UserModel, forma: FormGroup): FormGroup {
    forma.get('id').setValue(details.id);
    forma.get('login').setValue(details.login);
    forma.get('haslo').setValue(details.haslo);
    forma.get('username').setValue(details.username);
    forma.get('imie').setValue(details.imie);
    forma.get('uprawnienia').setValue(details.uprawnienia);
    return forma;
  }

  generateFormUser(viewDetails: boolean): FormGroup {
    return new FormGroup({
      id: new FormControl({value: '', disabled: viewDetails}),
      login: new FormControl({value: '', disabled: viewDetails}, Validators.required),
      haslo: new FormControl({value: '', disabled: viewDetails}, Validators.required),
      username: new FormControl({value: '', disabled: viewDetails}, Validators.required),
      imie: new FormControl({value: '', disabled: viewDetails}, Validators.required),
      uprawnienia: new FormControl({value: 1, disabled: viewDetails}),
    });
  }

  translateComments(): string[][] {
    return [
      [
        'Wprowadź login:',
        'Login uzytkownika:'
      ],
      [
        'Wprowadź nazwę użytkownika:',
        'Nazwa użytkownika:',
      ],
      [
        'Wprowadź imię:',
        'Imię użytkownika',
      ],
      [
        'Podaj uprawnienia:',
        'Uprawnienia użytkownika:',
      ]
    ];
  }
}
