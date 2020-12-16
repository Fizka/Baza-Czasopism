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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material';
import { UzytkownikListaComponent } from './Komponenty/uzytkownicy/uzytkownik-lista.component';
import {AgGridModule} from 'ag-grid-angular';
import { UlubioneCzasopismaComponent } from './Komponenty/ulubione-czasopisma/ulubione-czasopisma.component';

@NgModule({
  declarations: [
    AppComponent,
    CzasopismaDashboardComponent,
    DetaleCzasopismoComponent,
    FooterComponent,
    MenuComponent,
    DetaleUzytkownikComponent,
    LogowanieComponent,
    UzytkownikListaComponent,
    UlubioneCzasopismaComponent,
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
