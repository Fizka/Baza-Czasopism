import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FavoriteComponent} from './favorite.component';
import {LoginService} from '../../service/login.service';
import {MagazinesComponent} from '../../service/magazines.component';

@Component({
  selector: 'app-magazine-dashboard',
  templateUrl: './magazine-dashboard.component.html',
  styleUrls: ['./magazine-dashboard.component.css']
})
export class MagazineDashboardComponent implements OnInit {

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
    {
      headerName: '', width: 105, cellRendererFramework: FavoriteComponent,
      sortable: false, filter: false, singleClickEdit: false, editable: false, suppressSizeToFit: true
    },
    {headerName: 'Tytuł', field: 'tytul', sortable: true, filter: true},
    {headerName: 'Wydawca', field: 'wydawca', sortable: true, filter: true, resizable: false, width: 350},
    {headerName: 'ISSN', field: 'issn', sortable: true, filter: true},
    {headerName: 'Redakcja', field: 'redakcja', sortable: true, filter: true},
    {headerName: 'Częstotliwość', field: 'czestotliwosc', sortable: true, filter: true},
    {headerName: 'Rok Wydania', field: 'rokWydania', sortable: true, filter: true, resizable: false, width: 150},
    {headerName: 'Witryna', field: 'witrynaWww', sortable: true, filter: true},
    {headerName: 'Dostępność Lokalna', field: 'pelneTekstyLokalnie', sortable: true, filter: true}
  ];
  rowData = [];

  constructor(private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.loadData();
  }

  gridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  loadData(): void {
    this.rowData = MagazinesComponent.getMagazines();
  }

  renavigateToUser(): void {
    this.router.navigate([`/uzytkownik/profil/username1`], {state: {uzytkownikId: 1}});
  }

  addMagazine(): void {
    this.router.navigateByUrl('/czasopisma/dodaj');
  }

  searchFilter(): void {
    if (this.searchText) {
      this.searchText = this.searchText.toLocaleLowerCase();
      this.gridApi.setQuickFilter(this.searchText);
    }
  }

  isAdmin(): boolean {
    return this.loginService.isAdmin();
  }
}
