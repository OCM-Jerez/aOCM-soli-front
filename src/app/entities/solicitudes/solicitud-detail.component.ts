import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import * as moment from 'moment';

// Services
import { SolicitudService } from './solicitud.service';
import { DocumentoService } from '../documentos/documento.service';
import { GestionService } from '../gestiones/gestion.service';

// Interfaces
import { ISolicitud } from './solicitud.interface';
import { IDocumento } from '../documentos/documento.interface';
import { IGestion } from '../gestiones/gestion.interface';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-solicitud-detail',
  templateUrl: './solicitud-detail.component.html'
})
export class SolicitudDetailComponent implements OnInit {
  solicitud: ISolicitud | null = null;
  documentos?: IDocumento[] | any;
  gestions: IGestion[] | any;
  isAdmin = environment.IsAdmin;

  constructor(
    protected solicitudService: SolicitudService,
    protected documentoService: DocumentoService,
    protected gestionService: GestionService,
    protected activatedRoute: ActivatedRoute,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ solicitud }) => (this.solicitud = solicitud));
    // Calculo días trancurridos desde la solicitud.
    if (this.solicitud!.fechaRespuesta) {
      const date = moment(this.solicitud!.fechaRespuesta);
      this.solicitud!.diasRespuesta = date.diff(this.solicitud!.fechaSolicitud, 'days');
    } else {
      const date = moment();
      this.solicitud!.diasRespuesta = date.diff(this.solicitud!.fechaSolicitud, 'days');
    }

    // Relación con documentos
    // if (this.solicitud?.id) {
    //   this.documentoService.findAllBySolicitud(this.solicitud.id).subscribe(response => {
    //     this.documentos = response.body;
    //   });
    // }

    // Relación con gestiones
    // if (this.solicitud?.id) {
    //   this.gestionService.findAllBySolicitud(this.solicitud.id).subscribe(response => {
    //     this.gestions = response.body;
    //   });
    // }
  }

  save(solicitud: ISolicitud): void {
    this.solicitudService.saveOrUpdate(solicitud)
    }

  crearDocumento(): void {
    this.localStorage.store('solicitud', this.solicitud);
    this.router.navigate(['/documento/new']);
  }

  crearGestion(): void {
    this.localStorage.store('solicitud', this.solicitud);
    this.router.navigate(['/gestion/new']);
  }

  trackId(index: number, item: IDocumento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  // byteSize(base64String: string): string {
  //   return this.dataUtils.byteSize(base64String);
  // }
  // openFile(contentType: string, base64String: string): void {
  //   return this.dataUtils.openFile(contentType, base64String);
  // }

  previousState(): void {
    window.history.back();
  }
}
