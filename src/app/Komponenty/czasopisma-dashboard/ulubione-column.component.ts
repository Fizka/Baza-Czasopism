import {AgRendererComponent} from 'ag-grid-angular';
import {Component, Input} from '@angular/core';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-ulubione-column',
  template: `
      <button class="btn-primary btn-ulubione" [ngClass]="this.ulubione ? 'btn-ulubione-added' : 'btn-ulubione-blank'"
              (click)="dodajDoUlubionych(this.params.data)"></button>`,
  styleUrls: ['./czasopisma-dashboard.component.css']
})
export class UlubioneColumnComponent implements AgRendererComponent {

  params: any;
  ulubione = false;

  constructor() {
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  dodajDoUlubionych(data) {
    //data - dostaniecie czasopismo
    this.ulubione = !this.ulubione;
  }

}
