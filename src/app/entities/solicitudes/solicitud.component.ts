import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { faPlus, faEye, faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

import { environment } from 'src/environments/environment';

import { SolicitudService } from './solicitud.service';
import { ISolicitud } from './solicitud.interface';
// import * as moment from 'moment';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html'
})
export class SolicitudComponent implements OnInit {
  faPlus = faPlus;
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTimes = faTimes;

  solicitudes?: ISolicitud[];
  diasRespuesta = 0;
  isAdmin = environment.IsAdmin;

  constructor(
    protected solicitudService: SolicitudService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) { }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ISolicitud): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  delete(solicitud: ISolicitud): void {
    // const modalRef = this.modalService.open(SolicitudDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    // modalRef.componentInstance.solicitud = solicitud;
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
