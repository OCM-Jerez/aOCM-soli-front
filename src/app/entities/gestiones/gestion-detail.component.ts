import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { environment } from '../../../environments/environment';

import { IGestion } from './gestion.interface';
import { GestionService } from './gestion.service';

@Component({
  selector: 'app-gestion-detail',
  templateUrl: './gestion-detail.component.html',
  styleUrls: ['./gestion-detail.component.scss']
})
export class GestionDetailComponent implements OnInit {
  isAdmin = environment.IsAdmin;
  gestion: IGestion | null = null;

  constructor(
    protected gestionService: GestionService,
    protected activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gestion }) => (this.gestion = gestion));
  }

  byteSize(base64String: string): string {
    // return this.dataUtils.byteSize(base64String);
    return "cadena"
  }

  openFile(contentType: string, base64String: string): void {
    // this.dataUtils.openFile(contentType, base64String);
  }

  delete(documento: IGestion): void {
    Swal.fire({
      title: '¿Realmente quieres borrar esta gestión?',
      confirmButtonColor: '#d33',
      denyButtonColor: '#3085d6',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Borrar`,
      denyButtonText: `NO Borrar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.gestionService.consulta(documento, 'delete')
      } else if (result.isDenied) {

      }
    })
  }

  // ver(url: string | undefined) {
  //   window.open(url, '_blank');
  // }

  previousState(): void {
    window.history.back();
  }
}
