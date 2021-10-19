import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MagazineDashboardComponent} from './components/magazine-dashboard/magazine-dashboard.component';
import {DetailsMagazineComponent} from './components/details-maganize/details-magazine.component';
import {DetailsUserComponent} from './components/details-user/details-user.component';
import {LogowanieComponent} from './components/login/logowanie.component';
import {AdminGuard} from "./admin/admin.guard";
import {UserGuard} from "./admin/user.guard";
import {BasicUserGuard} from "./admin/basic-user.guard";
import {UserBoardComponent} from './components/users/user-board.component';

const routes: Routes = [
  {path: '', redirectTo: 'czasopisma', pathMatch: 'full'},
  {path: 'czasopisma', component: MagazineDashboardComponent},
  {path: 'czasopisma/dodaj', component: DetailsMagazineComponent, canActivate: [UserGuard], data: {typWidoku: 'dodaj'}},
  {path: 'czasopisma/edycja/:id', component: DetailsMagazineComponent, canActivate: [AdminGuard], data: {typWidoku: 'edytuj'}},
  {path: 'czasopisma/:id', component: DetailsMagazineComponent, canActivate: [AdminGuard], data: {typWidoku: 'detale'}},
  {path: 'uzytkownicy', component: UserBoardComponent},
  {path: 'rejestracja', component: DetailsUserComponent, data: {typWidoku: 'rejestruj'}},
  {path: 'uzytkownik/edycja/:username', component: DetailsUserComponent, canActivate: [UserGuard], data: {typWidoku: 'edytuj'}},
  {path: 'uzytkownik/profil', component: DetailsUserComponent, canActivate: [UserGuard], data: {typWidoku: 'profil'}},
  {path: 'uzytkownik/profil/:username', component: DetailsUserComponent, canActivate: [UserGuard], data: {typWidoku: 'detale'}},
  {path: 'rejestracja', component: DetailsUserComponent, canActivate: [BasicUserGuard], data: {typWidoku: 'dodaj'}},
  {path: 'logowanie', component: LogowanieComponent, canActivate: [BasicUserGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
