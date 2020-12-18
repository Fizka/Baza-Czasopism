import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {LogowanieService} from '../Serwisy/logowanie.service';

@Injectable({
  providedIn: 'root'
})
export class NiezalogowanyGuard implements CanActivate {

  constructor(private logowanieService: LogowanieService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.logowanieService.czyZalogowany();
  }

}
