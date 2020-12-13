import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CzasopismoModel} from '../../Model/czasopismo.model';
import {ActivatedRoute} from '@angular/router';
import {CzasopismaComponent} from '../../Serwisy/czasopisma.component';

@Component({
  selector: 'app-dodaj-edytuj-czasopismo',
  templateUrl: './dodaj-edytuj-czasopismo.component.html',
  styleUrls: ['./dodaj-edytuj-czasopismo.component.css']
})
export class DodajEdytujCzasopismoComponent implements OnInit {

  czasopismoForm: FormGroup;
  data: CzasopismaComponent = new CzasopismaComponent();
  typEdycji = false;
  typWidoku: string;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe( data => {
      this.typWidoku = data.typWidoku;
    });
  }

  ngOnInit() {
    const id: number = this.route.snapshot.params.id;
    this.czasopismoForm = this.generateForm();
    if (id) {
      this.typEdycji = true;
      this.setValues(id);
    }
  }

  generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl({value: '', disabled: this.widokDetali}, Validators.required),
      tytul: new FormControl({value: '', disabled: this.widokDetali}, Validators.required),
      wydawca: new FormControl({value: '', disabled: this.widokDetali}, Validators.required),
      issn: new FormControl({value: '', disabled: this.widokDetali}, Validators.required),
      redakcja: new FormControl({value: '', disabled: this.widokDetali}, Validators.required),
      czestotliwosc: new FormControl({value: '', disabled: this.widokDetali}, Validators.required),
      rokWydania: new FormControl({value: 0, disabled: this.widokDetali}, Validators.required),
      witrynaWww: new FormControl({value: '', disabled: this.widokDetali}),
      pelneTekstyLokalnie: new FormControl({value: false, disabled: this.widokDetali}, Validators.required),
    });
  }

  submit(): void {
    if (this.czasopismoForm.valid) {
      if (this.typEdycji) {
        this.data.zmienCzasopismo(this.getModel());
      } else {
        this.data.dodajCzasopismo(this.getModel());
      }
      console.log(this.data.getCzasopisma());
    }
  }

  getModel(): CzasopismoModel {
    const czasopismo = new CzasopismoModel();
    czasopismo.id = this.czasopismoForm.get('id').value;
    czasopismo.tytul = this.czasopismoForm.get('tytul').value;
    czasopismo.wydawca = this.czasopismoForm.get('wydawca').value;
    czasopismo.issn = this.czasopismoForm.get('issn').value;
    czasopismo.redakcja = this.czasopismoForm.get('redakcja').value;
    czasopismo.czestotliwosc = this.czasopismoForm.get('czestotliwosc').value;
    czasopismo.rokWydania = this.czasopismoForm.get('rokWydania').value;
    czasopismo.witrynaWww = this.czasopismoForm.get('witrynaWww').value;
    czasopismo.pelneTekstyLokalnie = this.czasopismoForm.get('pelneTekstyLokalnie').value;
    return czasopismo;
  }

  setValues(id: number): void {
    const el = this.data.getCzasopismo(id);
    this.czasopismoForm.get('id').setValue(el.id);
    this.czasopismoForm.get('tytul').setValue(el.tytul);
    this.czasopismoForm.get('wydawca').setValue(el.wydawca);
    this.czasopismoForm.get('issn').setValue(el.issn);
    this.czasopismoForm.get('redakcja').setValue(el.redakcja);
    this.czasopismoForm.get('czestotliwosc').setValue(el.czestotliwosc);
    this.czasopismoForm.get('rokWydania').setValue(el.rokWydania);
    this.czasopismoForm.get('witrynaWww').setValue(el.witrynaWww);
    this.czasopismoForm.get('pelneTekstyLokalnie').setValue(el.pelneTekstyLokalnie);
  }

  get widokDetali(): boolean {
    return this.typWidoku === 'detale';
  }

  get tytul(): string {
    if (this.typWidoku === 'dodaj') {
      return `DODAWANIE CZASOPISMA`;
    } else if (this.typWidoku === 'edytuj') {
      return `MODYFIKACJA  "${this.czasopismoForm.get('tytul').value}"`;
    }
    return `SZCZEGÓŁY  "${this.czasopismoForm.get('tytul').value}"`;
  }
}
