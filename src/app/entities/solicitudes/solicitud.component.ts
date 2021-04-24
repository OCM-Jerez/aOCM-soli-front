import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { environment } from 'src/environments/environment';

import { SolicitudService } from './solicitud.service';
import { ISolicitud } from './solicitud.interface';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html'
})
export class SolicitudComponent implements OnInit {
  solicitudes: any[] = [];
  isAdmin = environment.IsAdmin;
  fechaRespuesta: any;

  constructor(protected solicitudService: SolicitudService) { }

  ngOnInit(): void {
    this.loadAll();
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

  trackId(index: number, item: ISolicitud): number {
    return item.id!;
  }

}
