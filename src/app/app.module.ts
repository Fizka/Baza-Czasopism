import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CzasopismaDashboardComponent } from './Komponenty/czasopisma-dashboard/czasopisma-dashboard.component';
import { DetaleCzasopismoComponent } from './Komponenty/detale-czasopismo/detale-czasopismo.component';
import { FooterComponent } from './Page/footer/footer.component';
import { MenuComponent } from './Page/menu/menu.component';
import { DetaleUzytkownikComponent } from './Komponenty/detale-uzytkownik/detale-uzytkownik.component';
import { LogowanieComponent } from './Komponenty/logowanie/logowanie.component';

@NgModule({
  declarations: [
    AppComponent,
    CzasopismaDashboardComponent,
    DetaleCzasopismoComponent,
    FooterComponent,
    MenuComponent,
    DetaleUzytkownikComponent,
    LogowanieComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
