import { Component, OnInit } from '@angular/core';
import { QueryParamsHandling, Router } from '@angular/router';

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
  // opciones: MenuItem[] = [];

  isAdmin = environment.IsAdmin;
  userLoged?: string;

  faUser = faUser;
  faHome = faHome;
  faAtlas = faAtlas;
  faBell = faBell;


  public seletedOpcion: IMenuItemOCM = { id: 0, opcion: '' };
  public opciones1: IMenuItemOCM[] = []

  constructor(
    private loginService: LoginService,
    private router: Router,
    private $localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.userLoged = this.$localStorage.retrieve('userLog');
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

    // this.opciones = [
    //   {
    //     label: 'Perfil', command: () => {
    //       console.log('usuarios');
    //       this.router.navigate(['users/datos']);
    //     }
    //   },
    //   {
    //     label: 'Contraseña', command: () => {
    //       this.router.navigate(['solicitudes']);
    //     }
    //   },
    //   {
    //     label: 'Cambiar usuario', command: () => {
    //       this.router.navigate(['account/password']);
    //     }
    //   },
    //   {
    //     label: 'Salir', command: () => {
    //       this.loginService.logout();
    //       this.router.navigate(['']);
    //     }
    //   }
    // ];

    this.opciones1 = [
      { id: 1, opcion: 'Perfil' },
      { id: 2, opcion: 'Contraseña' },
      { id: 3, opcion: 'Cambiar usuario' },
      { id: 4, opcion: 'Salir' },
    ];

  }

  onSelect(id: any): void {
    switch (id.value) {
      case '3':
        console.log(id.value);
        this.loginService.logout();
        this.router.navigate(['']);
        break;
      case '4':
        console.log(id.value);
        this.loginService.logout();
        this.router.navigate(['']);
        break;
      default:
        break;
    }
  }

}

interface IMenuItemOCM {
  id: number;
  opcion: string
}

// interface IMenuItem {
//   label?: string;
//   icon?: string;
//   command?: (event?: any) => void;
//   url?: string;
//   items?: MenuItem[];
//   expanded?: boolean;
//   disabled?: boolean;
//   visible?: boolean;
//   target?: string;
//   escape?: boolean;
//   routerLinkActiveOptions?: any;
//   separator?: boolean;
//   badge?: string;
//   badgeStyleClass?: string;
//   style?: any;
//   styleClass?: string;
//   title?: string;
//   id?: string;
//   automationId?: any;
//   tabindex?: string;
//   routerLink?: any;
//   queryParams?: {
//     [k: string]: any;
//   };
//   fragment?: string;
//   queryParamsHandling?: QueryParamsHandling;
//   preserveFragment?: boolean;
//   skipLocationChange?: boolean;
//   replaceUrl?: boolean;
//   state?: {
//     [k: string]: any;
//   };
// }