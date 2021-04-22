import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'ngx-webstorage';

import { GestionService } from './gestion.service';
import { SolicitudService } from '../solicitudes/solicitud.service';

import { Gestion, IGestion } from './gestion.interface';
import { ISolicitud } from '../solicitudes/solicitud.interface';

type SelectableEntity = ISolicitud | IGestion;

@Component({
  selector: 'app-gestion-update',
  templateUrl: './gestion-update.component.html'
})
export class GestionUpdateComponent implements OnInit {
  faWindowClose = faWindowClose;
  faSave = faSave;

  isSaving = false;
  idSolicitud?: string;
  solicituds: ISolicitud[] = [];
  fechaDp: any;
  solicitud: ISolicitud | null = null;
  textoCabecera = "Editar gestión";

  editForm = this.fb.group({
    id: [],
    nombreDeDocumento: [null, [Validators.required]],
    detalle: [null, []],
    fecha: [null, [Validators.required]],
    observacion: [],
    documento: [],
    documentoContentType: [],
    privado: [],
    solicitudId: []
  });

  constructor(
    protected gestionService: GestionService,
    protected solicitudService: SolicitudService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.idSolicitud = this.localStorage.retrieve('solicitud');
    this.activatedRoute.data.subscribe(({ gestion }) => {
      this.updateForm(gestion);
      if (gestion.id == undefined) {
        this.textoCabecera = "Crear gestión";
        this.isSaving = true;
      }
    });
  }

  updateForm(gestion: IGestion): void {
    this.editForm.patchValue({
      id: gestion.id,
      detalle: gestion.detalle,
      fecha: gestion.fecha,
      observacion: gestion.observacion,
      privado: gestion.privado,
      solicitudId: this.idSolicitud
    });
  }

  private createFromForm(): IGestion {
    this.idSolicitud = this.localStorage.retrieve('solicitud');
    return {
      ...new Gestion(),
      id: this.editForm.get(['id'])!.value,
      detalle: this.editForm.get(['detalle'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      observacion: this.editForm.get(['observacion'])!.value,
      privado: this.editForm.get(['privado'])!.value,
      solicitudId: this.solicitud?.id
    };
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const gestion = this.createFromForm();
    gestion.solicitudId = this.localStorage.retrieve('solicitud');
    if (gestion.id !== undefined) {
      this.subscribeToSaveResponse(this.gestionService.update(gestion));
    } else {
      this.subscribeToSaveResponse(this.gestionService.create(gestion));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGestion>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  byteSize(base64String: string): string {
    // return this.dataUtils.byteSize(base64String);
    return "respuesta"
  }

  openFile(contentType: string, base64String: string): void {
    // this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    // this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
    //   this.eventManager.broadcast(
    //     new JhiEventWithContent<AlertError>('ocmSoliServerApp.error', { ...err, key: 'error.file.' + err.key })
    //   );
    // });
  }
}
