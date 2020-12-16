import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CzasopismaDashboardComponent} from './Komponenty/czasopisma-dashboard/czasopisma-dashboard.component';
import {DetaleCzasopismoComponent} from './Komponenty/detale-czasopismo/detale-czasopismo.component';
import {DetaleUzytkownikComponent} from './Komponenty/detale-uzytkownik/detale-uzytkownik.component';
import {LogowanieComponent} from './Komponenty/logowanie/logowanie.component';
import {AdminGuard} from "./admin/admin.guard";
import {UserGuard} from "./admin/user.guard";
import {NiezalogowanyGuard} from "./admin/niezalogowany.guard";

const routes: Routes = [
  {path: '', redirectTo: 'czasopisma', pathMatch: 'full'},
  {path: 'czasopisma', component: CzasopismaDashboardComponent},
  {path: 'czasopisma/dodaj', component: DetaleCzasopismoComponent, canActivate: [UserGuard], data: {typWidoku: 'dodaj'}},
  {path: 'czasopisma/edycja/:id', component: DetaleCzasopismoComponent, canActivate: [AdminGuard], data: {typWidoku: 'edytuj'}},
  {path: 'czasopisma/:id', component: DetaleCzasopismoComponent, canActivate: [AdminGuard], data: {typWidoku: 'detale'}},
  {path: 'uzytkownik/edycja/:username', component: DetaleUzytkownikComponent, canActivate: [UserGuard], data: {typWidoku: 'edytuj'}},
  {path: 'uzytkownik/profil', component: DetaleUzytkownikComponent, canActivate: [UserGuard], data: {typWidoku: 'profil'}},
  {path: 'uzytkownik/profil/:username', component: DetaleUzytkownikComponent, canActivate: [UserGuard], data: {typWidoku: 'detale'}},
  {path: 'rejestracja', component: DetaleUzytkownikComponent, canActivate: [NiezalogowanyGuard], data: {typWidoku: 'dodaj'}},
  {path: 'logowanie', component: LogowanieComponent, canActivate: [NiezalogowanyGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
