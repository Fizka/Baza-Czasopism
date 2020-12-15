import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LogowanieService} from '../../Serwisy/logowanie.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,
              private logowanieService: LogowanieService) {
  }

  ngOnInit() {
  }

  zaloguj(): void {
    this.router.navigate(['/logowanie']);
  }

  rejestracja(): void {
    this.router.navigate(['/rejestracja']);
  }

  wyloguj(): void {
    this.logowanieService.wyloguj();
    this.router.navigate(['/']);
  }

  czyZalogowany(): boolean {
    return this.logowanieService.czyZalogowany();
  }

}
