import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UlubioneColumnComponent} from './ulubione-column.component';
import {LogowanieService} from '../../Serwisy/logowanie.service';
import {CzasopismaComponent} from '../../Serwisy/czasopisma.component';

@Component({
  selector: 'app-czasopisma-dashboard',
  templateUrl: './czasopisma-dashboard.component.html',
  styleUrls: ['./czasopisma-dashboard.component.css']
})
export class CzasopismaDashboardComponent implements OnInit {

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
      headerName: '', width: 105, cellRendererFramework: UlubioneColumnComponent,
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
              private logowanieService: LogowanieService) {
  }

  ngOnInit() {
    this.ladowanieDanych();
  }

  gridready(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  ladowanieDanych(): void {
    this.rowData = CzasopismaComponent.getCzasopisma();
  }

  uzytkownik(): void {
    this.router.navigate([`/uzytkownik/profil/username1`], {state: {uzytkownikId: 1}});
  }

  dodaj(): void {
    this.router.navigateByUrl('/czasopisma/dodaj');
  }

  searchFilter(): void {
    if (this.searchText) {
      this.searchText = this.searchText.toLocaleLowerCase();
      this.gridApi.setQuickFilter(this.searchText);
    }
  }

  czyAdmin(): boolean {
    return this.logowanieService.isAdmin();
  }

  getDetails(): void {
    const selectedRows = this.gridApi.getSelectedRows();
    const id = selectedRows[0].id;
    this.router.navigate([`/czasopisma/${id}`]);
  }
}
