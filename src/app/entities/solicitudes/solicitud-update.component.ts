import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { faEye, faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';
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
  date?: any ;
  dateRes: any ;
  textoCabecera = "Editar solicitud"

  editForm: FormGroup = this.fb.group({
    id: [],
    descripcion: [null, [Validators.required]],
    fechaSolicitud: [null, [Validators.required]],
    fechaRespuesta: [],
    observacion: []
  });

  constructor(
    protected solicitudService: SolicitudService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ solicitud }) => {
      this.updateForm(solicitud);
      this.date = solicitud.fechaSolicitud;
      this.dateRes = solicitud.fechaRespuesta
      if (solicitud.id == undefined) { this.textoCabecera = "Crear solicitud" }
    });
  }

  updateForm(solicitud: ISolicitud): void {
    this.editForm.patchValue({
      id: solicitud.id,
      descripcion: solicitud.descripcion,
      fechaSolicitud: solicitud.fechaSolicitud,
      fechaRespuesta: solicitud.fechaRespuesta,
      observacion: solicitud.observacion
    });
  }

  save(): void {
    // https://github.com/primefaces/primeng/issues/1226
    this.date =moment(this.date).format('YYYY-MM-DD');
    this.dateRes =moment(this.dateRes).format('YYYY-MM-DD');
    console.log(typeof(this.date));
    const solicitud: ISolicitud = this.createFromForm();
    if (solicitud.id === undefined) {
      this.solicitudService.consulta(solicitud, 'save')
    } else {
      this.solicitudService.consulta(solicitud, 'update')
    }
  }

  private createFromForm(): ISolicitud {
    // const { descripcion } = this.editForm.value;
    return {
      ...new Solicitud(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      // fechaSolicitud: this.editForm.get(['fechaSolicitud'])!.value,
      fechaSolicitud: this.date,
      // fechaRespuesta: this.editForm.get(['fechaRespuesta'])!.value,
      fechaRespuesta: this.dateRes,
      observacion: this.editForm.get(['observacion'])!.value
    };
  }

  previousState(): void {
    window.history.back();
  }

  // byteSize(base64String: string): string {
  //   return this.dataUtils.byteSize(base64String);
  // }

  // openFile(contentType: string, base64String: string): void {
  //   this.dataUtils.openFile(contentType, base64String);
  // }

  // setFileData(event: Event, field: string, isImage: boolean): void {
  //   this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
  //     this.eventManager.broadcast(
  //       new JhiEventWithContent<AlertError>('ocmSoliServerApp.error', { ...err, key: 'error.file.' + err.key })
  //     );
  //   });
  // }

}
