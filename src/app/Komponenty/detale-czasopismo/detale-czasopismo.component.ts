import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {CzasopismaComponent} from '../../Serwisy/czasopisma.component';
import {FormsHelper} from '../../Helpers/forms.helper';
import {MatSnackBar} from '@angular/material';
import {LogowanieService} from '../../Serwisy/logowanie.service';
import {UzytkownicyComponent} from '../../Serwisy/uzytkownicy.component';

@Component({
  selector: 'app-detale-czasopismo',
  templateUrl: './detale-czasopismo.component.html',
  styleUrls: ['./detale-czasopismo.component.css']
})
export class DetaleCzasopismoComponent implements OnInit {

  czasopismoForm: FormGroup;
  helper = new FormsHelper();
  typEdycji = false;
  typWidoku: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public snackBar: MatSnackBar,
              private logowanieService: LogowanieService) {
    this.route.data.subscribe(data => {
      this.typWidoku = data.typWidoku;
    });
  }

  ngOnInit() {
    const id: number = this.route.snapshot.params.id;
    this.czasopismoForm = this.helper.generateFormCzasopismo(this.widokDetali);
    if (id) {
      this.typEdycji = true;
      const element = CzasopismaComponent.getCzasopismo(id);
      this.helper.setValuesCzasopismo(element, this.czasopismoForm);
    }
  }

  submit(): void {
    if (this.czasopismoForm.valid) {
      if (this.typEdycji) {
        CzasopismaComponent.zmienCzasopismo(this.helper.getModelCzasopismo(this.czasopismoForm));
      } else {
        this.czasopismoForm = CzasopismaComponent.nadajId(this.czasopismoForm);
        CzasopismaComponent.dodajCzasopismo(this.helper.getModelCzasopismo(this.czasopismoForm));
      }
      const id = this.czasopismoForm.get('id').value;
      this.router.navigate([`/czasopisma/${id}`]);
    } else {
      this.openSnackbar();
    }
  }

  edytuj(): void {
    const id: string = this.czasopismoForm.get('id').value;
    this.router.navigate([`/czasopisma/edycja/${id}`]);
  }

  usun(): void {
    CzasopismaComponent.usunCzasopismo(this.czasopismoForm.get('id').value);
    UzytkownicyComponent.usunCzasopismo(this.czasopismoForm.get('id').value);
    this.router.navigate([`/`]);
  }

  get widokDetali(): boolean {
    return this.typWidoku === 'detale';
  }

  get czyAdmin(): boolean {
    return this.logowanieService.isAdmin();
  }

  get tytul(): string {
    if (this.typWidoku === 'dodaj') {
      return `DODAWANIE CZASOPISMA`;
    } else if (this.typWidoku === 'edytuj') {
      return `MODYFIKACJA  "${this.czasopismoForm.get('tytul').value}"`;
    }
    return `SZCZEGÓŁY  "${this.czasopismoForm.get('tytul').value}"`;
  }

  get przyciskTresc(): string {
    if (this.typWidoku === 'edytuj') {
      return `ZATWIERDŹ`;
    }
    return `DODAJ`;
  }

  openSnackbar() {
    const message = 'Należy wypełnić wszystkie pola.';
    this.snackBar.open(message, 'Close', {
      duration: 10000
    });
  }
}
