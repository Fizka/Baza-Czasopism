import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CzasopismaDashboardComponent } from './Komponenty/czasopisma-dashboard/czasopisma-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CzasopismaDashboardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
