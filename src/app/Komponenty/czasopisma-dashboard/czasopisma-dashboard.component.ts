import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UlubioneColumnComponent} from './ulubione-column.component';
import {LogowanieService} from '../../Serwisy/logowanie.service';
import {CzasopismaComponent} from '../../Serwisy/czasopisma.component';
import {UzytkownikModel} from '../../Model/uzytkownik.model';

@Component({
  selector: 'app-czasopisma-dashboard',
  templateUrl: './czasopisma-dashboard.component.html',
  styleUrls: ['./czasopisma-dashboard.component.css']
})
export class CzasopismaDashboardComponent implements OnInit {

  ulubione = false;
  backaup: any;
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
    this.backaup = this.rowData;
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

  pokazUlubione() {
    const user: UzytkownikModel = this.logowanieService.pobierzUzytkownika();
    if (this.ulubione === false) {
      this.rowData = this.rowData.filter(
        row => user.czasopisma.includes(row.id)
      );
      this.ulubione = true;
    } else {
      this.ulubione = false;
      this.rowData = this.backaup;
    }
  }

  czyZalogowany(): boolean {
    return !!localStorage.getItem('uzytkownik');
  }

  czyAdmin(): boolean {
    return this.logowanieService.isAdmin();
  }
}
