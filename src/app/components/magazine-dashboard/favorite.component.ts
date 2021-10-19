import {AgRendererComponent} from 'ag-grid-angular';
import {Component, Input, OnInit} from '@angular/core';
import {ICellRendererParams} from 'ag-grid-community';
import {MagazineModel} from '../../models/magazine.model';
import {UsersComponent} from '../../service/users.component';
import {UserModel} from '../../models/user.model';
import {LoginService} from '../../service/login.service';
import value from '*.json';

@Component({
  selector: 'app-ulubione-column',
  template: `
    <button class="btn-primary btn-ulubione" [ngClass]="this.favorite ? 'btn-ulubione-added' : 'btn-ulubione-blank'"
            (click)="addRemoveToFavorite(this.params.data)"></button>`,
  styleUrls: ['./magazine-dashboard.component.css']
})
export class FavoriteComponent implements AgRendererComponent {

  params: any;
  favorite = false;
  rowData: UserModel;

  constructor(private loginService: LoginService) {
  }

  // tslint:disable-next-line:no-shadowed-variable
  isEmpty(value): boolean {
    return !value;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.rowData = this.loginService.getUser();
    if (!this.rowData) {
      this.favorite = true;
    } else {
      this.favorite = this.isEmpty(this.checkFavoriteForUser(params.data));
    }
  }

  refresh(params: any): boolean {
    return false;
  }

  addRemoveToFavorite(data: MagazineModel) {
    if (this.rowData) {
      this.favorite = !this.favorite;
      const index = this.rowData.czasopisma.findIndex(row => row === data.id);
      this.favorite === false ? this.rowData.czasopisma.push(data.id) : this.rowData.czasopisma.splice(index, 1);
      UsersComponent.updateUser(this.rowData);
    }
  }

  checkFavoriteForUser(data: MagazineModel) {
    return this.rowData.czasopisma.find(row => row === data.id);
  }

}

