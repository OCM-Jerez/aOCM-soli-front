import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  version: string = " Beta 1.0.01";


  constructor() { }

  ngOnInit(): void {
  }


  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

}
