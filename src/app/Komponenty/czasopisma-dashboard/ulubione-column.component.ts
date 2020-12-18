import {AgRendererComponent} from 'ag-grid-angular';
import {Component, Input, OnInit} from '@angular/core';
import {ICellRendererParams} from 'ag-grid-community';
import {CzasopismoModel} from '../../Model/czasopismo.model';
import {UzytkownicyComponent} from '../../Serwisy/uzytkownicy.component';
import {UzytkownikModel} from '../../Model/uzytkownik.model';
import {LogowanieService} from '../../Serwisy/logowanie.service';
import value from '*.json';

@Component({
  selector: 'app-ulubione-column',
  template: `
      <button class="btn-primary btn-ulubione" [ngClass]="this.ulubione ? 'btn-ulubione-added' : 'btn-ulubione-blank'"
              (click)="dodajUsunDoUlubionych(this.params.data)"></button>`,
  styleUrls: ['./czasopisma-dashboard.component.css']
})
export class UlubioneColumnComponent implements AgRendererComponent {

  params: any;
  ulubione = false;
  rowData: UzytkownikModel;

  constructor(private logowanieService: LogowanieService) {
  }

  // tslint:disable-next-line:no-shadowed-variable
  isEmpty(value): boolean {
    return !value;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.rowData = this.logowanieService.pobierzUzytkownika();
    if (!this.rowData) {
      this.ulubione = true;
    } else {
      this.ulubione = this.isEmpty(this.sprawdzUlubioneUzytkownika(params.data));
    }
  }

  refresh(params: any): boolean {
    return false;
  }

  dodajUsunDoUlubionych(data: CzasopismoModel) {
    if (this.rowData) {
      this.ulubione = !this.ulubione;
      const index = this.rowData.czasopisma.findIndex(row => row === data.id);
      this.ulubione === false ? this.rowData.czasopisma.push(data.id) : this.rowData.czasopisma.splice(index, 1);
      if (UzytkownicyComponent.zmienUzytkownika(this.rowData)) {
        this.logowanieService.aktualizujUzytkownika(this.rowData);
      }
    }
    this.preventRowSelection();
  }

  preventRowSelection(): void {
    const previousValue = this.params.node.gridOptionsWrapper.gridOptions.suppressRowClickSelection;
    this.params.node.gridOptionsWrapper.gridOptions.suppressRowClickSelection = true;
    setTimeout(() => {
      this.params.node.gridOptionsWrapper.gridOptions.suppressRowClickSelection = previousValue;
    });
  }

  sprawdzUlubioneUzytkownika(data: CzasopismoModel) {
    return this.rowData.czasopisma.find(row => row === data.id);
  }


}

