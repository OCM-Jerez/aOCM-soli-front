import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import * as moment from 'moment';
import Swal from 'sweetalert2';

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
  templateUrl: './solicitud-detail.component.html',
  styleUrls: ['./solicitud-detail.component.scss']
})
export class SolicitudDetailComponent implements OnInit {
  solicitud: ISolicitud | null = null;
  documentosSolicitud?: IDocumento[] | any;
  documentosInicio?: IDocumento[] | any;
  documentosRespuesta?: IDocumento[] | any;
  documentosCTA?: IDocumento[] | any;
  gestions?: IGestion[] | any;
  isAdmitida: boolean | undefined;
  calidadRespuesta: number | undefined;
  isAdmin = environment.IsAdmin;
  isCerrada: boolean | undefined;

  constructor(
    protected solicitudService: SolicitudService,
    protected documentoService: DocumentoService,
    protected gestionService: GestionService,
    protected activatedRoute: ActivatedRoute,
    private $localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ solicitud }) => (this.solicitud = solicitud));
    this.calidadRespuesta = this.solicitud?.calidadRespuesta;
    this.isAdmitida = this.solicitud?.isAdmitida;
    this.isCerrada = this.solicitud?.isCerrada
    this.$localStorage.store('solicitud', this.solicitud?.id);

    // Calculo días trancurridos desde la solicitud.
    if (this.solicitud!.fechaRespuesta) {
      const date = moment(this.solicitud!.fechaRespuesta);
      this.solicitud!.diasRespuesta = date.diff(this.solicitud!.fechaSolicitud, 'days');
    } else {
      const date = moment();
      this.solicitud!.diasRespuesta = date.diff(this.solicitud!.fechaSolicitud, 'days');
    }

    // Relación con documentos
    if (this.solicitud?.id) {
      this.documentoService.findAllBySolicitudDocumentoType(this.solicitud.id, 'solicitud').subscribe(response => {
        this.documentosSolicitud = response.body;
      });

      this.documentoService.findAllBySolicitudDocumentoType(this.solicitud.id, 'inicio').subscribe(response => {
        this.documentosInicio = response.body;
      });

      this.documentoService.findAllBySolicitudDocumentoType(this.solicitud.id, 'respuesta').subscribe(response => {
        this.documentosRespuesta = response.body;
      });

      this.documentoService.findAllBySolicitudDocumentoType(this.solicitud.id, 'CTA').subscribe(response => {
        this.documentosCTA = response.body;
      });
    }

    // Relación con gestiones
    if (this.solicitud?.id) {
      this.gestionService.findAllBySolicitud(this.solicitud.id).subscribe(response => {
        this.gestions = response.body;
      });
    }
  }

  delete(solicitud: ISolicitud): void {
    Swal.fire({
      title: '¿Realmente quieres borrar esta solicitud?',
      confirmButtonColor: '#d33',
      denyButtonColor: '#3085d6',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Borrar`,
      denyButtonText: `NO Borrar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitudService.consulta(solicitud, 'delete')
      } else if (result.isDenied) {

      }
    })
  }

  crearDocumento(): void {
    this.router.navigate(['/documentos/new']);
  }

  crearGestion(): void {
    this.router.navigate(['/gestiones/new']);
  }

  trackId(index: number, item: IDocumento): number {
    return item.id!;
  }

  previousState(): void {
    window.history.back();
  }

}
