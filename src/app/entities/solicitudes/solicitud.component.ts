import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';

import * as moment from 'moment';

import { environment } from 'src/environments/environment';

import { SolicitudService } from './solicitud.service';
import { ISolicitud } from './solicitud.interface';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {
  solicitudes: any[] = [];
  isAdmin = environment.IsAdmin;
  isCTA = false;
  fechaRespuesta: any;
  estado = "Solicitada"

  @ViewChild('dt') table: Table | undefined;

  constructor(protected solicitudService: SolicitudService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll(): void {
    this.isCTA = false;
    this.solicitudService.query().
      subscribe(resp => {
        // Se añade diasRespuesta a cada solicitud. diasRespuesta es un campo calculado en la Interfaz ISolicitud
        // TODO Es mejor practica calcularlo en el back?
        this.solicitudes = resp;
        this.solicitudes.forEach(soli => {
          // console.log(soli.code);
          if (soli.fechaRespuesta) {
            const date = moment(soli.fechaRespuesta);
            soli.diasRespuesta = date.diff(soli.fechaSolicitud, 'days');
          } else {
            const date = moment();
            soli.diasRespuesta = date.diff(soli.fechaSolicitud, 'days');
          }
          if (soli.fechaInicio) {
            soli.estado = "Iniciada"
          }
          if (soli.fechaRespuesta) {
            soli.estado = "Respondida"
          }
          if (soli.fechaReclamacionCTA) {
            soli.estado = "Reclamada CTA"
          }
          if (soli.fechaInicioCTA) {
            soli.estado = "Iniciada CTA"
          }
          if (soli.fechaRespuestaCTA) {
            soli.estado = "Respondida CTA"
          }
          if (soli.isCerrada) {
            soli.estado = "Cerrada"
          }

        });
      });
    this.primengConfig.ripple = true;
  }

  trackId(index: number, item: ISolicitud): number {
    return item.id!;
  }

  todas() {
    this.loadAll();
  }

  pendientes() {
    this.isCTA = false;
    this.solicitudService.findPendientes().
      subscribe(resp => {
        this.solicitudes = resp;
        this.solicitudes.forEach(soli => {
          if (soli.fechaRespuesta) {
            const date = moment(soli.fechaRespuesta);
            soli.diasRespuesta = date.diff(soli.fechaSolicitud, 'days');
          } else {
            const date = moment();
            soli.diasRespuesta = date.diff(soli.fechaSolicitud, 'days');
          }
          if (soli.fechaInicio) {
            soli.estado = "Iniciada"
          }
          if (soli.fechaRespuesta) {
            soli.estado = "Respondida"
          }
          if (soli.fechaReclamacionCTA) {
            soli.estado = "Reclamada CTA"
          }
          if (soli.fechaInicioCTA) {
            soli.estado = "Iniciada CTA"
          }
          if (soli.fechaRespuestaCTA) {
            soli.estado = "Respondida CTA"
          }
          if (soli.isCerrada) {
            soli.estado = "Cerrada"
          }

        });
      });

  }

  CTA() {
    this.isCTA = true;
    this.solicitudService.findReclamadasCTA().
      subscribe(resp => {
        this.solicitudes = resp;
        this.solicitudes.forEach(soli => {
          if (soli.fechaRespuestaCTA) {
            const date = moment(soli.fechaRespuestaCTA);
            soli.diasRespuesta = date.diff(soli.fechaInicioCTA, 'days');
          } else {
            const date = moment();
            soli.diasRespuesta = date.diff(soli.fechaInicioCTA, 'days');
          }
          if (soli.fechaReclamacionCTA) {
            soli.estado = "Reclamada CTA"
          }
          if (soli.fechaInicioCTA) {
            soli.estado = "Iniciada CTA"
          }
          if (soli.fechaRespuestaCTA) {
            soli.estado = "Respondida CTA"
          }
          if (soli.isCerrada) {
            soli.estado = "Cerrada"
          }

        });
      });

  }

  pendientesCTA() {
    this.isCTA = true;
    this.solicitudService.findPendientesCTA().
      subscribe(resp => {
        this.solicitudes = resp;
        this.solicitudes.forEach(soli => {
          if (soli.fechaRespuestaCTA) {
            const date = moment(soli.fechaRespuestaCTA);
            soli.diasRespuesta = date.diff(soli.fechaInicioCTA, 'days');
          } else {
            const date = moment();
            soli.diasRespuesta = date.diff(soli.fechaInicioCTA, 'days');
          }
          if (soli.fechaReclamacionCTA) {
            soli.estado = "Reclamada CTA"
          }
          if (soli.fechaInicioCTA) {
            soli.estado = "Iniciada CTA"
          }
          if (soli.fechaRespuestaCTA) {
            soli.estado = "Respondida CTA"
          }


        });
      });

  }

}
