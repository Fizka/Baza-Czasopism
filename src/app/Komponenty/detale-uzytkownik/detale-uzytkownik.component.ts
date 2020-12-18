import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

import {FormsHelper} from '../../Helpers/forms.helper';
import {LogowanieService} from '../../Serwisy/logowanie.service';
import {UzytkownicyComponent} from '../../Serwisy/uzytkownicy.component';
import {MatSnackBar} from '@angular/material';

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
  username: string;
  tlumaczenia: string[][] = this.helper.tlumaczeniaUzytkownik();
  tlumaczeniaWersja = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private logowanieSerwis: LogowanieService,
              public snackBar: MatSnackBar) {
    this.route.data.subscribe(data => {
      this.typWidoku = data.typWidoku;
    });
  }

  ngOnInit() {
    let id: number;
    if (this.typWidoku === 'detale' || this.typWidoku === 'edytuj') {
      id = history.state.uzytkownikId;
    } else if (this.typWidoku === 'profil') {
      id = this.logowanieSerwis.pobierzId();
      this.tlumaczeniaWersja = 1;
    }
    this.uzytkownikForm = this.helper.generateFormUzytkownik(this.widokDetali);

    if (this.widokRejestracji) {
      this.uzytkownikForm.setValidators(validatorHasla(this.potwierdzHaslo));
      this.potwierdzHaslo.valueChanges.subscribe(() => this.uzytkownikForm.updateValueAndValidity());
    }

    if (id !== undefined) {
      this.typEdycji = true;
      const element = UzytkownicyComponent.getUzytkownik(id);
      this.helper.setValuesUzytkownik(element, this.uzytkownikForm);
      this.username = this.uzytkownikForm.get('username').value;
    }
  }

  submit(): void {
    if (this.uzytkownikForm.valid) {
      if (this.typEdycji) {
        const model = this.helper.getModelUzytkownik(this.uzytkownikForm);
        if (UzytkownicyComponent.zmienUzytkownika(model)) {
          this.logowanieSerwis.aktualizujUzytkownika(model);
          this.nawiguj();
        }
      } else {
        this.uzytkownikForm = UzytkownicyComponent.nadajId(this.uzytkownikForm);
        UzytkownicyComponent.dodajUzytkownika(this.helper.getModelUzytkownik(this.uzytkownikForm));
        this.nawiguj();
      }
    } else {
      this.openSnackbar();
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
    return this.typWidoku === 'dodaj' || this.typWidoku === 'rejestruj';
  }

  get tytul(): string {
    if (this.typWidoku === 'dodaj') {
      return `REJESTRACJA UŻYTKOWNIKA`;
    } else if (this.typWidoku === 'rejestruj') {
      return `DODAJ UŻYTKOWNIKA`;
    } else if (this.typWidoku === 'edytuj') {
      return `MODYFIKACJA  ${this.username}`;
    }
    return `PROFIL  ${this.uzytkownikForm.get('username').value}`;
  }

  get przyciskTresc(): string {
    if (this.typWidoku === 'edytuj') {
      return `ZATWIERDŹ`;
    } else if (this.typWidoku === 'dodaj') {
      return `DODAJ`;
    }
    return `ZAREJESTRUJ SIĘ`;
  }

  get czyAdmin(): boolean {
    return this.logowanieSerwis.isAdmin();
  }

  edytujProfil(): void {
    const username: string = this.uzytkownikForm.get('username').value;
    const id: string = this.uzytkownikForm.get('id').value;
    this.router.navigate([`/uzytkownik/edycja/${username}`], {state: {uzytkownikId: id}});
  }

  usunProfil(): void {
    UzytkownicyComponent.usunUzytkownika(this.uzytkownikForm.get('id').value);
    if (this.typWidoku !== 'profil' && this.czyAdmin) {
      this.router.navigate(['uzytkownicy']);
    } else {
      this.logowanieSerwis.wyloguj();
      this.router.navigate(['/']);
    }
  }

  private nawiguj(): void {
    if (this.czyAdmin) {
      const username = this.uzytkownikForm.get('username').value;
      const id = this.uzytkownikForm.get('id').value;
      this.router.navigate([`/uzytkownik/profil/${username}`], {state: {uzytkownikId: id}});
    } else {
      if (this.typEdycji) {
        this.router.navigate(['uzytkownik/profil']);
      } else {
        this.router.navigate(['/logowanie']);
      }
    }
  }

  openSnackbar() {
    const message = 'Należy wypełnić wszystkie pola.';
    this.snackBar.open(message, 'Close', {
      duration: 10000
    });
  }
}

export function validatorHasla(potwierdzenie: AbstractControl): ValidatorFn {
  return (control: FormGroup): { [key: string]: boolean } | null => {
    const identyczne = control.get('haslo').value === potwierdzenie.value;
    return !identyczne ? {haslaNieIdentyczne: true} : null;
  };
}
