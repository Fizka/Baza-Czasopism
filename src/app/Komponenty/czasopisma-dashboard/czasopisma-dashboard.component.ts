import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LogowanieService} from "../../Serwisy/logowanie.service";

@Component({
  selector: 'app-czasopisma-dashboard',
  templateUrl: './czasopisma-dashboard.component.html',
  styleUrls: ['./czasopisma-dashboard.component.css']
})
export class CzasopismaDashboardComponent implements OnInit {

  constructor(
      private logowanieService: LogowanieService,
      private router: Router
  ) {
  }

  ngOnInit() {
  }

  dodaj(): void {
    this.router.navigateByUrl('/czasopisma/dodaj');
  }

  uzytkownik(): void {
    this.router.navigate([`/uzytkownik/profil/username1`], {state: {uzytkownikId: 1}});
  }

  czyAdmin(): boolean {
    return this.logowanieService.isAdmin();
  }
}
