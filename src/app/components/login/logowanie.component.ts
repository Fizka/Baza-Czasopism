import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css']
})
export class LogowanieComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    haslo: new FormControl('', Validators.required)
  });

  constructor(private loginService: LoginService,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.loginForm.valid && this.loginService.logIn(this.loginForm)) {
      this.router.navigate(['/']);
    } else {
      this.openSnackbar();
    }
  }

  openSnackbar() {
    const message = 'Wprowadzone dane są niepoprawne. Spróbuj jeszcze raz';
    this.snackBar.open(message, 'Close', {
      duration: 5000
    });
  }
}
