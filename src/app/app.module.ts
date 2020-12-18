import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CzasopismaDashboardComponent} from './Komponenty/czasopisma-dashboard/czasopisma-dashboard.component';
import {DetaleCzasopismoComponent} from './Komponenty/detale-czasopismo/detale-czasopismo.component';
import {FooterComponent} from './Page/footer/footer.component';
import {MenuComponent} from './Page/menu/menu.component';
import {DetaleUzytkownikComponent} from './Komponenty/detale-uzytkownik/detale-uzytkownik.component';
import {LogowanieComponent} from './Komponenty/logowanie/logowanie.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material';
import {HeaderComponent} from './Page/header/header.component';
import {UlubioneColumnComponent} from './Komponenty/czasopisma-dashboard/ulubione-column.component';
import {UzytkownikListaComponent} from './Komponenty/uzytkownicy/uzytkownik-lista.component';
import {AgGridModule} from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    CzasopismaDashboardComponent,
    MenuComponent,
    DetaleCzasopismoComponent,
    FooterComponent,
    HeaderComponent,
    UlubioneColumnComponent,
    DetaleUzytkownikComponent,
    LogowanieComponent,
    UzytkownikListaComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NoopAnimationsModule,
    AgGridModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UlubioneColumnComponent]
})
export class AppModule {
}
