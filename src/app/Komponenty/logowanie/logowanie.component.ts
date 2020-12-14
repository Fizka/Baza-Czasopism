import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LogowanieService} from '../../Serwisy/logowanie.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css']
})
export class LogowanieComponent implements OnInit {

  logowanieForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    haslo: new FormControl('', Validators.required)
  });
  wiadomosc = '';
  isSignUpFailed = false;

  constructor(private logowanieService: LogowanieService,
              private router: Router) { }

  ngOnInit() {
  }

  submit() {
    if (this.logowanieForm.valid && this.logowanieService.zaloguj(this.logowanieForm)) {
      this.router.navigate(['/']);
    } else {
      this.isSignUpFailed = true;
      this.wiadomosc = 'Wprowadzone dane są niepoprawne. Spróbuj jeszcze raz';
    }
  }

}
