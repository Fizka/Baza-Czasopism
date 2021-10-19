import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

import {FormsHelper} from '../../helpers/forms.helper';
import {LoginService} from '../../service/login.service';
import {UsersComponent} from '../../service/users.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {

  userForm: FormGroup;
  helper = new FormsHelper();
  editMode = false;
  viewMode: string;
  confirmPassword = new FormControl('', Validators.required);
  username: string;
  translation: string[][] = this.helper.translateComments();
  translatedVersion = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginService,
              public snackBar: MatSnackBar) {
    this.route.data.subscribe(data => {
      this.viewMode = data.typWidoku;
    });
  }

  ngOnInit() {
    let id: number;
    if (this.viewMode === 'detale' || this.viewMode === 'edytuj') {
      id = history.state.uzytkownikId;
    } else if (this.viewMode === 'profil') {
      id = this.loginService.getID();
      this.translatedVersion = 1;
    }
    this.userForm = this.helper.generateFormUser(this.viewDeatails);

    if (this.RegistrationView) {
      this.userForm.setValidators(validatorHasla(this.confirmPassword));
      this.confirmPassword.valueChanges.subscribe(() => this.userForm.updateValueAndValidity());
    }

    if (id !== undefined) {
      this.editMode = true;
      const element = UsersComponent.getUser(id);
      this.helper.getUserValues(element, this.userForm);
      this.username = this.userForm.get('username').value;
    }
  }

  submit(): void {
    if (this.userForm.valid) {
      if (this.editMode) {
        UsersComponent.updateUser(this.helper.getUserModel(this.userForm));
        this.navigate();
      } else {
        this.userForm = UsersComponent.addID(this.userForm);
        UsersComponent.addUse(this.helper.getUserModel(this.userForm));
        this.navigate();
      }
    } else {
      this.openSnackbar();
    }
  }

  get viewDeatails(): boolean {
    return this.viewMode === 'detale' || this.viewMode === 'profil';
  }

  get isEditPossible(): boolean {
    return this.loginService.isID(this.userForm.get('id').value) ||
      this.loginService.isAdmin();
  }

  get RegistrationView(): boolean {
    return this.viewMode === 'dodaj' || this.viewMode === 'rejestruj';
  }

  get title(): string {
    if (this.viewMode === 'dodaj') {
      return `REJESTRACJA UŻYTKOWNIKA`;
    } else if (this.viewMode === 'rejestruj') {
      return `DODAJ UŻYTKOWNIKA`;
    } else if (this.viewMode === 'edytuj') {
      return `MODYFIKACJA  ${this.username}`;
    }
    return `PROFIL  ${this.userForm.get('username').value}`;
  }

  get contentButton(): string {
    if (this.viewMode === 'edytuj') {
      return `ZATWIERDŹ`;
    } else if (this.viewMode === 'dodaj') {
      return `DODAJ`;
    }
    return `ZAREJESTRUJ SIĘ`;
  }

  get isAdmin(): boolean {
    return this.loginService.isAdmin();
  }

  editProfile(): void {
    const username: string = this.userForm.get('username').value;
    const id: string = this.userForm.get('id').value;
    this.router.navigate([`/uzytkownik/edycja/${username}`], {state: {uzytkownikId: id}});
  }

  deleteProfile(): void {
    UsersComponent.deleteUser(this.userForm.get('id').value);
    if (this.isAdmin) {
      // powinien przekierować na listę userów
      this.router.navigate(['uzytkownicy']);
    } else {
      this.loginService.LogOff();
      this.router.navigate(['/']);
    }
  }

  private navigate(): void {
    if (this.isAdmin) {
      const username = this.userForm.get('username').value;
      const id = this.userForm.get('id').value;
      this.router.navigate([`/uzytkownik/profil/${username}`], {state: {uzytkownikId: id}});
    } else {
      if (this.editMode) {
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
