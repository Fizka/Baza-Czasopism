import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {MagazinesComponent} from '../../service/magazines.component';
import {FormsHelper} from '../../helpers/forms.helper';
import {MatSnackBar} from '@angular/material';
import {LoginService} from '../../service/login.service';
import {UsersComponent} from '../../service/users.component';

@Component({
  selector: 'app-details-magazine',
  templateUrl: './details-magazine.component.html',
  styleUrls: ['./details-magazine.component.css']
})
export class DetailsMagazineComponent implements OnInit {

  magazineForms: FormGroup;
  helper = new FormsHelper();
  editMode = false;
  viewMode: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public snackBar: MatSnackBar,
              private loginService: LoginService) {
    this.route.data.subscribe(data => {
      this.viewMode = data.typWidoku;
    });
  }

  ngOnInit() {
    const id: number = this.route.snapshot.params.id;
    this.magazineForms = this.helper.generateMagazine(this.viewDetails);
    if (id) {
      this.editMode = true;
      const element = MagazinesComponent.getMagazine(id);
      this.helper.setMagazine(element, this.magazineForms);
    }
  }

  submit(): void {
    if (this.magazineForms.valid) {
      if (this.editMode) {
        MagazinesComponent.updateMagazine(this.helper.getModelMagazine(this.magazineForms));
      } else {
        this.magazineForms = MagazinesComponent.addID(this.magazineForms);
        MagazinesComponent.addMagazine(this.helper.getModelMagazine(this.magazineForms));
      }
      const id = this.magazineForms.get('id').value;
      this.router.navigate([`/czasopisma/${id}`]);
    } else {
      this.openSnackbar();
    }
  }

  edit(): void {
    const id: string = this.magazineForms.get('id').value;
    this.router.navigate([`/czasopisma/edycja/${id}`]);
  }

  delete(): void {
    MagazinesComponent.deleteMagazine(this.magazineForms.get('id').value);
    UsersComponent.deleteMagazine(this.magazineForms.get('id').value);
    this.router.navigate([`/`]);
  }

  get viewDetails(): boolean {
    return this.viewMode === 'detale';
  }

  get isAdmin(): boolean {
    return this.loginService.isAdmin();
  }

  get title(): string {
    if (this.viewMode === 'dodaj') {
      return `DODAWANIE CZASOPISMA`;
    } else if (this.viewMode === 'edytuj') {
      return `MODYFIKACJA  "${this.magazineForms.get('tytul').value}"`;
    }
    return `SZCZEGÓŁY  "${this.magazineForms.get('tytul').value}"`;
  }

  get contentButton(): string {
    if (this.viewMode === 'edytuj') {
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
