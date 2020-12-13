import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CzasopismaDashboardComponent } from './Komponenty/czasopisma-dashboard/czasopisma-dashboard.component';
import { MenuComponent } from './Page/menu/menu.component';
import { FooterComponent } from './Page/footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { DodajEdytujCzasopismoComponent } from './Komponenty/dodaj-edytuj-czasopismo/dodaj-edytuj-czasopismo.component';
import { ElementCzasopismoComponent } from './Komponenty/element-czasopismo/element-czasopismo.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CzasopismaDashboardComponent,
    MenuComponent,
    FooterComponent,
    DodajEdytujCzasopismoComponent,
    ElementCzasopismoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
