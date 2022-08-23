import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  isAdmin = environment.IsAdmin;
  userLoged?: string;

  faUser = faUser;
  faHome = faHome;
  faAtlas = faAtlas;
  faBell = faBell;

  public entidades: IMenuItemOCM[] = []
  public opciones: IMenuItemOCM[] = []

  constructor(
    private loginService: LoginService,
    private router: Router,
    private $localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.userLoged = this.$localStorage.retrieve('userLog');

    this.entidades = [
      { id: 0, opcion: 'Usuarios' },
      // { id: 1, opcion: 'Solicitudes' },
      { id: 1, opcion: 'Documentos' },
      { id: 2, opcion: 'Gestiones' },
    ];

    this.opciones = [
      { id: 0, opcion: 'Perfil' },
      { id: 1, opcion: 'Contraseña' },
      { id: 2, opcion: 'Cambiar usuario' },
      {
        id: 3, opcion: 'Salir',
        command: () => {
          this.loginService.logout();
          this.router.navigate(['']);
        }
      },
    ];

  }

  onSelectEntidad(event: any): void {
    switch (event.value) {
      case '1':
        console.log('this.router.navigate');
        this.router.navigateByUrl('documentos');
        break;
      case '2':
        console.log('this.router.navigate');
        this.router.navigateByUrl('gestiones');
        break;
      case '4':

        break;
      default:
        break;
    }
  }

  onSelectOption(event: any): void {
    switch (event.value) {
      case '2':

        break;
      case '3':
        if (this.opciones[3].command) {
          this.opciones[3].command();
        }
        break;
      default:
        break;
    }
  }

}

interface IMenuItemOCM {
  id: number;
  opcion: string;
  command?: (event?: any) => void;
}

