import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

import { faUser, faHome, faAtlas, faBell } from '@fortawesome/free-solid-svg-icons';

import { environment } from 'src/environments/environment';

import { LoginService } from 'src/app/auth/pages/login/login.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  entidades: MenuItem[] = [];
  opciones: MenuItem[] = [];

  isAdmin = environment.IsAdmin;
  userLoged?: string;

  faUser = faUser;
  faHome = faHome;
  faAtlas = faAtlas;
  faBell = faBell;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private $localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
   this.userLoged =  this.$localStorage.retrieve('userLog');
    this.entidades = [
      {
        label: 'Usuarios', command: () => {
          this.router.navigate(['users']);
        }
      },
      {
        label: 'Solicitudes', command: () => {
          this.router.navigate(['solicitudes']);
        }
      },
      {
        label: 'Documentos', command: () => {
          this.router.navigate(['documentos']);
        }
      },
      {
        label: 'Gestiones', command: () => {
          this.router.navigate(['gestiones']);
        }
      }
    ];

    this.opciones = [
      {
        label: 'Perfil', command: () => {
          console.log('usuarios');
          this.router.navigate(['users/datos']);
        }
      },
      {
        label: 'Contraseña', command: () => {
          this.router.navigate(['solicitudes']);
        }
      },
      {
        label: 'Cambiar ususario', command: () => {
          this.router.navigate(['account/password']);
        }
      },
      {
        label: 'Salir', command: () => {
          this.loginService.logout();
          this.router.navigate(['']);
        }
      }
    ];
  }

}
