import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MagazineDashboardComponent} from './components/magazine-dashboard/magazine-dashboard.component';
import {DetailsMagazineComponent} from './components/details-maganize/details-magazine.component';
import {FooterComponent} from './page/footer/footer.component';
import {MenuComponent} from './page/menu/menu.component';
import {DetailsUserComponent} from './components/details-user/details-user.component';
import {LogowanieComponent} from './components/login/logowanie.component';
import {MatSnackBarModule} from '@angular/material';
import {HeaderComponent} from './page/header/header.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FavoriteComponent} from './components/magazine-dashboard/favorite.component';
import {UserBoardComponent} from './components/users/user-board.component';
import {AgGridModule} from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    MagazineDashboardComponent,
    MenuComponent,
    DetailsMagazineComponent,
    FooterComponent,
    HeaderComponent,
    FavoriteComponent,
    DetailsUserComponent,
    LogowanieComponent,
    UserBoardComponent
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
  entryComponents: [FavoriteComponent]
})
export class AppModule {
}
