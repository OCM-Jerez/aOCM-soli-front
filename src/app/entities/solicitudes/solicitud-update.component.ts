import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { faEye, faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'ngx-webstorage';
import * as moment from 'moment';

import { SolicitudService } from './solicitud.service';

import { ISolicitud, Solicitud } from './solicitud.interface';

@Component({
  selector: 'app-solicitud-update',
  templateUrl: './solicitud-update.component.html',
  styles: [
  ]
})

export class SolicitudUpdateComponent implements OnInit {
  faEye = faEye;
  faWindowClose = faWindowClose;
  faSave = faSave;

  // TODO ¿Como tipar?
  date?: any;
  dateIni?: any;
  dateRes?: any;
  dateReclamacionCTA?: any;
  dateIniCTA?: any;
  dateResCTA?: any;
  dateResAytoCTA?: any;
  textoCabecera = "Editar solicitud";
  calidadRespuesta?: number;


  editForm = new FormGroup({
    id: new FormControl([]),
    descripcion: new FormControl([null, [Validators.required]]),
    fechaSolicitud: new FormControl([null, [Validators.required]]),
    fechaInicio: new FormControl([]),
    fechaRespuesta: new FormControl([]),
    fechaReclamacionCTA: new FormControl([]),
    fechaInicioCTA: new FormControl([]),
    fechaRespuestaCTA: new FormControl([]),
    fechaRespuestaAytoCTA: new FormControl([]),
    observacion: new FormControl([]),
    observacionCTA: new FormControl([]),
    isAdmitida: new FormControl([]),
    isAtendidaCTA: new FormControl([]),
    isCerrada: new FormControl([]),
    calidadRespuesta: new FormControl([]),
    year: new FormControl([]),
    code: new FormControl([])
  });

  constructor(
    protected solicitudService: SolicitudService,
    protected activatedRoute: ActivatedRoute,
    private $localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ solicitud }) => {
      this.updateForm(solicitud);
      this.date = solicitud.fechaSolicitud;
      this.dateIni = solicitud.fechaInicio;
      this.dateRes = solicitud.fechaRespuesta;
      this.dateReclamacionCTA = solicitud.fechaReclamacionCTA;
      this.dateIniCTA = solicitud.fechaInicioCTA;
      this.dateResCTA = solicitud.fechaRespuestaCTA;
      this.dateResAytoCTA = solicitud.fechaRespuestaAytoCTA
      if (solicitud.id == undefined) { this.textoCabecera = "Crear solicitud" }
    });
  }

  updateForm(solicitud: ISolicitud): void {
    this.editForm.patchValue({
      id: solicitud.id,
      descripcion: solicitud.descripcion,
      fechaSolicitud: solicitud.fechaSolicitud,
      fechaInicio: solicitud.fechaInicio,
      fechaRespuesta: solicitud.fechaRespuesta,
      fechaReclamacionCTA: solicitud.fechaReclamacionCTA,
      fechaInicioCTA: solicitud.fechaInicioCTA,
      fechaRespuestaCTA: solicitud.fechaRespuestaCTA,
      fechaRespuestaAytoCTA: solicitud.fechaRespuestaAytoCTA,
      observacion: solicitud.observacion,
      observacionCTA: solicitud.observacionCTA,
      isAdmitida: solicitud.isAdmitida,
      isAtendidaCTA: solicitud.isAtendidaCTA,
      isCerrada: solicitud.isCerrada,
      calidadRespuesta: solicitud.calidadRespuesta,
      year: solicitud.year,
      code: solicitud.code,
      // Campos comunes.
      lastModifiedBy: this.$localStorage.retrieve('userLog'),
      lastModifiedDate: moment().format('YYYY-MM-DD')
    });
  }
  private createFromForm(): ISolicitud {
    return {
      ...new Solicitud(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      fechaSolicitud: this.date,
      fechaInicio: this.dateIni,
      fechaRespuesta: this.dateRes,
      fechaReclamacionCTA: this.dateReclamacionCTA,
      fechaInicioCTA: this.dateIniCTA,
      fechaRespuestaCTA: this.dateResCTA,
      fechaRespuestaAytoCTA: this.dateResAytoCTA,
      observacion: this.editForm.get(['observacion'])!.value,
      observacionCTA: this.editForm.get(['observacionCTA'])!.value,
      isAdmitida: this.editForm.get(['isAdmitida'])!.value,
      isAtendidaCTA: this.editForm.get(['isAtendidaCTA'])!.value,
      isCerrada: this.editForm.get(['isCerrada'])!.value,
      calidadRespuesta: this.editForm.get(['calidadRespuesta'])!.value,
      year: this.editForm.get(['year'])!.value,
      code: this.editForm.get(['code'])!.value,
      // Campos comunes.
      createdBy: this.$localStorage.retrieve('userLog'),
      createdDate: moment().format('YYYY-MM-DD'),
      lastModifiedBy: this.$localStorage.retrieve('userLog'),
      lastModifiedDate: moment().format('YYYY-MM-DD')
    };
  }

  save(): void {
    // https://github.com/primefaces/primeng/issues/1226
    this.date = moment(this.date).format('YYYY-MM-DD');
    if (this.dateIni) { this.dateIni = moment(this.dateIni).format('YYYY-MM-DD') };
    if (this.dateRes) { this.dateRes = moment(this.dateRes).format('YYYY-MM-DD') };
    if (this.dateReclamacionCTA) {this.dateReclamacionCTA = moment(this.dateReclamacionCTA).format('YYYY-MM-DD')};
    if (this.dateIniCTA) { this.dateIniCTA= moment(this.dateIniCTA).format('YYYY-MM-DD') };
    if (this.dateResCTA) { this.dateResCTA= moment(this.dateResCTA).format('YYYY-MM-DD') };
    if (this.dateResAytoCTA) { this.dateResAytoCTA= moment(this.dateResAytoCTA).format('YYYY-MM-DD') };

    const solicitud: ISolicitud = this.createFromForm();

    if (solicitud.id === undefined) {
      this.solicitudService.consulta(solicitud, 'save')
    } else {
      this.solicitudService.consulta(solicitud, 'update')
    }
  }

  previousState(): void {
    window.history.back();
  }

}
