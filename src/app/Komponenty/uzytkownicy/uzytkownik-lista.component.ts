import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UzytkownicyComponent} from '../../Serwisy/uzytkownicy.component';

@Component({
  selector: 'app-uzytkownicy',
  templateUrl: './uzytkownik-lista.component.html',
  styleUrls: ['./uzytkownik-lista.component.css']
})
export class UzytkownikListaComponent implements OnInit {

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
    this.ladowanieDanych();
  }

  gridready(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  ladowanieDanych(): void {
    this.rowData = UzytkownicyComponent.getUzytkownicy();
  }

  dodaj(): void {
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
