import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersComponent} from '../../service/users.component';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export class UserBoardComponent implements OnInit {

  gridApi;
  title = 'Czasopisma';
  searchText: string;
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    wrapText: true
  };
  columnDefs = [
    {headerName: 'Login', field: 'login', sortable: true, filter: true},
    {headerName: 'Nazwa użytkownika', field: 'username', sortable: true, filter: true, resizable: false, width: 350},
    {headerName: 'Imię', field: 'imie', sortable: true, filter: true},
    {headerName: 'Uprawnienia', field: 'uprawnienia', sortable: true, filter: true},
  ];
  rowData = [];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.loadData();
  }

  gridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  loadData(): void {
    this.rowData = UsersComponent.getUsers();
  }

  addUser(): void {
    this.router.navigateByUrl('uzytkownik/dodaj');
  }

  searchFilter(): void {
    if (this.searchText) {
      this.searchText = this.searchText.toLocaleLowerCase();
      this.gridApi.setQuickFilter(this.searchText);
    }
  }

  getDetails(): void {
    const selectedRows = this.gridApi.getSelectedRows();
    const id = selectedRows[0].id;
    const username = selectedRows[0].username;
    this.router.navigate([`/uzytkownik/profil/${username}`], {state: {uzytkownikId: id}});
  }

}
