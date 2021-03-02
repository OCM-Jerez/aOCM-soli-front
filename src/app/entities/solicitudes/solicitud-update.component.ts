import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { faEye, faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';

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

  textoCabecera = "Editar solicitud"
  // fechaSolicitudDp: any;
  // fechaRespuestaDp: any;

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
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ solicitud }) => {
      this.updateForm(solicitud);
      if (solicitud.id == undefined) { this.textoCabecera = "Crear solicitud"}
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
    const solicitud: ISolicitud = this.createFromForm();
    this.solicitudService.saveOrUpdate(solicitud)
  }

  private createFromForm(): ISolicitud {
    const { descripcion } = this.editForm.value;
    return {
      ...new Solicitud(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      fechaSolicitud: this.editForm.get(['fechaSolicitud'])!.value,
      fechaRespuesta: this.editForm.get(['fechaRespuesta'])!.value,
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
