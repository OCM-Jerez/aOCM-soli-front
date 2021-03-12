import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

import { faUser, faHome, faAtlas, faBell } from '@fortawesome/free-solid-svg-icons';

import { environment } from 'src/environments/environment';

import { LoginService } from 'src/app/auth/pages/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  opciones: MenuItem[] = [];

  isNavbarCollapsed = true;
  isAdmin = environment.IsAdmin;
  userLoged = environment.userLoged

  faUser = faUser;
  faHome = faHome;
  faAtlas = faAtlas;
  faBell = faBell;


  constructor(
              private loginService: LoginService,
              private  router: Router
              ) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Usuarios', command: () => {
       this.router.navigate(['users']);
      }},
      {label: 'Solicitudes', command: () => {
        this.router.navigate(['solicitudes']);
      }},
      {label: 'Documentos', command: () => {
        this.router.navigate(['documentos']);
      }},
      {label: 'Gestiones', command: () => {
        this.router.navigate(['gestiones']);
      }}
    ];

    this.opciones = [
      {label: 'Perfil', command: () => {
       console.log('usuarios');
       this.router.navigate(['users/datos']);
      }},
      {label: 'Contraseña', command: () => {
        this.router.navigate(['solicitudes']);
      }},
      {label: 'Entrar', command: () => {
        this.router.navigate(['account/password']);
      }},
      {label: 'Salir', command: () => {
        this.router.navigate(['']);
      }}
    ];
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  login(): void {
    // this.loginModalService.open();
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
