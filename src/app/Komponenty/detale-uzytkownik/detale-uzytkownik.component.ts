import {ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

import { FormsHelper } from '../../Helpers/forms.helper';
import { LogowanieService } from '../../Serwisy/logowanie.service';
import { UzytkownicyComponent } from '../../Serwisy/uzytkownicy.component';

@Component({
  selector: 'app-detale-uzytkownik',
  templateUrl: './detale-uzytkownik.component.html',
  styleUrls: ['./detale-uzytkownik.component.css']
})
export class DetaleUzytkownikComponent implements OnInit {

  uzytkownikForm: FormGroup;
  helper = new FormsHelper();
  typEdycji = false;
  typWidoku: string;
  potwierdzHaslo = new FormControl('', Validators.required);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private logowanieSerwis: LogowanieService) {
    this.route.data.subscribe( data => {
      this.typWidoku = data.typWidoku;
    });
  }

  ngOnInit() {
    let id: number;
    if (this.typWidoku === 'detale') {
      id = history.state.uzytkownikId;
    } else if (this.typWidoku === 'profil') {
      id = this.logowanieSerwis.pobierzId();
    }
    this.uzytkownikForm = this.helper.generateFormUzytkownik(this.widokDetali);

    if (this.typWidoku === 'dodaj') {
      this.uzytkownikForm.setValidators(validatorHasla(this.potwierdzHaslo));
      this.potwierdzHaslo.valueChanges.subscribe( () => this.uzytkownikForm.updateValueAndValidity());
    }

    if (id) {
      this.typEdycji = true;
      const element = UzytkownicyComponent.getUzytkownik(id);
      this.helper.setValuesUzytkownik(element, this.uzytkownikForm);
    }
  }

  submit(): void {
    console.log(this.uzytkownikForm);
    if (this.uzytkownikForm.valid) {
      if (this.typEdycji) {
        UzytkownicyComponent.zmienUzytkownika(this.helper.getModelUzytkownik(this.uzytkownikForm));
        this.router.navigate(['uzytkownik/profil']);
      } else {
        UzytkownicyComponent.dodajUzytkownika(this.helper.getModelUzytkownik(this.uzytkownikForm));
        this.router.navigate(['/logowanie']);
      }
    }
  }

  get widokDetali(): boolean {
    return this.typWidoku === 'detale' || this.typWidoku === 'profil';
  }

  get mozliwaEdycja(): boolean {
    return this.logowanieSerwis.czyRowneId(this.uzytkownikForm.get('id').value) ||
      this.logowanieSerwis.isAdmin();
  }

  get widokRejestracji(): boolean {
    return this.typWidoku === 'dodaj';
  }

  get tytul(): string {
    if (this.typWidoku === 'dodaj') {
      return `REJESTRACJA UŻYTKOWNIKA`;
    } else if (this.typWidoku === 'edytuj') {
      return `MODYFIKACJA  "${this.uzytkownikForm.get('username').value}"`;
    }
    return `PROFIL  ${this.uzytkownikForm.get('username').value}`;
  }

  get przyciskTresc(): string {
    if (this.typWidoku === 'edytuj') {
      return `ZATWIERDŹ`;
    }
    return `ZAREJESTRUJ SIĘ`;
  }

  get czyAdmin(): boolean {
    return this.logowanieSerwis.isAdmin();
  }

  edytujProfil(): void {
    console.log(typeof this.uzytkownikForm.get('username').value);
    const username: string = this.uzytkownikForm.get('username').value;
    const id: string = this.uzytkownikForm.get('id').value;
    this.router.navigate([`/uzytkownik/edycja/${username}`], { state: { uzytkownikId: id }});
  }

}

export function validatorHasla(potwierdzenie: AbstractControl): ValidatorFn {
  return (control: FormGroup): {[key: string]: boolean} | null => {
    const identyczne = control.get('haslo').value === potwierdzenie.value;
    return !identyczne ? {haslaNieIdentyczne: true} : null;
  };
}
