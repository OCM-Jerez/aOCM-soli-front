import { Component, OnInit } from '@angular/core';

import { faUser, faHome, faAtlas, faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  isAdmin = true;

  faUser = faUser;
  faHome = faHome;
  faAtlas = faAtlas;
  faBell = faBell;

  constructor() { }

  ngOnInit(): void {
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  login(): void {
    // this.loginModalService.open();
  }

  logout(): void {
    this.collapseNavbar();
    // this.loginService.logout();
    // this.router.navigate(['']);
  }
}
