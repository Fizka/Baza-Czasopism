import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit() {
  }

  wyloguj(): void {
    this.loginService.LogOff();
  }

  czyZalogowany(): boolean {
    return this.loginService.isLogged();
  }

  czyAdmin(): boolean {
    return this.loginService.isAdmin();
  }
}
