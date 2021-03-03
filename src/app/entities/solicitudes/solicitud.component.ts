import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons';

import { environment } from 'src/environments/environment';

import { SolicitudService } from './solicitud.service';
import { ISolicitud } from './solicitud.interface';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html'
})
export class SolicitudComponent implements OnInit {
  faPlus = faPlus;
  faEye = faEye;

  solicitudes?: ISolicitud[];
  // diasRespuesta = 0;
  isAdmin = environment.IsAdmin;

  constructor(protected solicitudService: SolicitudService) { }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ISolicitud): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  private loadAll(): void {
    this.solicitudService.query().
      subscribe(resp => {
        // Se añade diasRespuesta a cada solicitud. diasRespuesta es un campo calculado en la Interfaz ISolicitud
        // TODO Es mejor practica calcularlo en el back?
        this.solicitudes = resp;
        this.solicitudes.forEach(soli => {
          if (soli.fechaRespuesta) {
            const date = moment(soli.fechaRespuesta);
            soli.diasRespuesta = date.diff(soli.fechaSolicitud, 'days');
          } else {
            const date = moment();
            soli.diasRespuesta = date.diff(soli.fechaSolicitud, 'days');
          }
        });
      });
   }

}
