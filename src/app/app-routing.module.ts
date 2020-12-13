import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CzasopismaDashboardComponent} from './Komponenty/czasopisma-dashboard/czasopisma-dashboard.component';
import {DodajEdytujCzasopismoComponent} from './Komponenty/dodaj-edytuj-czasopismo/dodaj-edytuj-czasopismo.component';
import {ElementCzasopismoComponent} from './Komponenty/element-czasopismo/element-czasopismo.component';

const routes: Routes = [
  {path: '', redirectTo: 'czasopisma', pathMatch: 'full'},
  {path: 'czasopisma', component: CzasopismaDashboardComponent},
  {path: 'czasopisma/dodaj', component: DodajEdytujCzasopismoComponent, data: { typWidoku: 'dodaj'}},
  {path: 'czasopisma/edytuj/:id', component: DodajEdytujCzasopismoComponent, data: { typWidoku: 'edytuj'}},
  {path: 'czasopisma/:id', component: DodajEdytujCzasopismoComponent, data: { typWidoku: 'detale'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
