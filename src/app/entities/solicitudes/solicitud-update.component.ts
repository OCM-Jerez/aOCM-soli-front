import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { faEye } from '@fortawesome/free-solid-svg-icons';

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

  isSaving = false;
  fechaSolicitudDp: any;
  fechaRespuestaDp: any;

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
      console.log(solicitud);
      this.updateForm(solicitud);
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

  previousState(): void {
    window.history.back();
  }

  save(): void {
    console.log(this.editForm);
    this.isSaving = true;
    const solicitud = this.createFromForm();
    console.log(solicitud);
    if (solicitud.id !== undefined) {
      this.subscribeToSaveResponse(this.solicitudService.update(solicitud));
    } else {
      this.subscribeToSaveResponse(this.solicitudService.create(solicitud));
    }
  }

  private createFromForm(): ISolicitud {
    const { descripcion } = this.editForm.value;
    console.log(descripcion);

    return {
      ...new Solicitud(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      fechaSolicitud: this.editForm.get(['fechaSolicitud'])!.value,
      fechaRespuesta: this.editForm.get(['fechaRespuesta'])!.value,
      observacion: this.editForm.get(['observacion'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISolicitud>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    // this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }


}
