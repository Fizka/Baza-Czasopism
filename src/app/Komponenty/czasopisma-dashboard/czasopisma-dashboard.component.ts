import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-czasopisma-dashboard',
  templateUrl: './czasopisma-dashboard.component.html',
  styleUrls: ['./czasopisma-dashboard.component.css']
})
export class CzasopismaDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  dodaj(): void {
    this.router.navigateByUrl('/czasopisma/dodaj');
  }
}
