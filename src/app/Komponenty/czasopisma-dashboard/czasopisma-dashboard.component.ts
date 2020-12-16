import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LogowanieService} from '../../Serwisy/logowanie.service';

@Component({
  selector: 'app-czasopisma-dashboard',
  templateUrl: './czasopisma-dashboard.component.html',
  styleUrls: ['./czasopisma-dashboard.component.css']
})
export class CzasopismaDashboardComponent implements OnInit {

  constructor(private router: Router,
              private logowanieService: LogowanieService) {
  }

  ngOnInit() {
  }

  dodaj(): void {
    this.router.navigateByUrl('/czasopisma/dodaj');
  }

  uzytkownik(): void {
    this.router.navigate([`/uzytkownik/profil/username1`], {state: {uzytkownikId: 1}});
  }

  get czyAdmin(): boolean {
    return this.logowanieService.isAdmin();
  }
}
