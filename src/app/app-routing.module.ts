import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CzasopismaDashboardComponent } from './Komponenty/czasopisma-dashboard/czasopisma-dashboard.component';
import { DetaleCzasopismoComponent } from './Komponenty/detale-czasopismo/detale-czasopismo.component';
import { DetaleUzytkownikComponent } from './Komponenty/detale-uzytkownik/detale-uzytkownik.component';
import { LogowanieComponent } from './Komponenty/logowanie/logowanie.component';

const routes: Routes = [
  {path: '', redirectTo: 'czasopisma', pathMatch: 'full'},
  {path: 'czasopisma', component: CzasopismaDashboardComponent},
  {path: 'czasopisma/dodaj', component: DetaleCzasopismoComponent, data: { typWidoku: 'dodaj'}},
  {path: 'czasopisma/edytuj/:id', component: DetaleCzasopismoComponent, data: { typWidoku: 'edytuj'}},
  {path: 'czasopisma/:id', component: DetaleCzasopismoComponent, data: { typWidoku: 'detale'}},
  {path: 'uzytkownik/edycja/:username', component: DetaleUzytkownikComponent, data: { typWidoku: 'edytuj'}},
  {path: 'uzytkownik/profil', component: DetaleUzytkownikComponent, data: { typWidoku: 'profil'}},
  {path: 'uzytkownik/profil/:username', component: DetaleUzytkownikComponent, data: { typWidoku: 'detale'}},
  {path: 'rejestracja', component: DetaleUzytkownikComponent, data: { typWidoku: 'dodaj'}},
  {path: 'logowanie', component: LogowanieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
