import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'ngx-webstorage';

import { DocumentoService } from './documento.service';

import { SolicitudService } from '../solicitudes/solicitud.service';
// import { GestionService } from 'app/entities/gestion/gestion.service';

import { IDocumento, Documento } from './documento.interface';
import { ISolicitud } from '../solicitudes/solicitud.interface';
// import { IGestion } from 'app/shared/model/gestion.model';

// type SelectableEntity = ISolicitud | IGestion;
type SelectableEntity = ISolicitud;

@Component({
  selector: 'app-documento-update',
  templateUrl: './documento-update.component.html'
})
export class DocumentoUpdateComponent implements OnInit {
  faWindowClose = faWindowClose;
  faSave = faSave;

  isSaving = false;
  textoCabecera = "Editar documento"

  // solicituds: ISolicitud[] = [];
  // gestions: IGestion[] = [];
  fechaSubidaDp: any;
  idSolicitud?: string;

  editForm = this.fb.group({
    id: [],
    nombreDeDocumento: [null, [Validators.required]],
    fechaSubida: [null, [Validators.required]],
    documento: [],
    documentoContentType: [],
    observacion: [],
    ruta: [],
    privado: [],
    solicitudId: []
    // gestionId: []
  });

  constructor(
    protected documentoService: DocumentoService,
    protected solicitudService: SolicitudService,
    // protected gestionService: GestionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private $localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
     this.idSolicitud = this.$localStorage.retrieve('solicitud');
      this.activatedRoute.data.subscribe(({ documento }) => {
      this.updateForm(documento);
      if (documento.id == undefined) { this.textoCabecera = "Crear documento" }
      // this.solicitudService.query().subscribe((res: HttpResponse<ISolicitud[]>) => (this.solicituds = res.body || []));
      // this.gestionService.query().subscribe((res: HttpResponse<IGestion[]>) => (this.gestions = res.body || []));
    });
  }

  updateForm(documento: IDocumento): void {
    this.editForm.patchValue({
      id: documento.id,
      nombreDeDocumento: documento.nombreDeDocumento,
      fechaSubida: documento.fechaSubida,
      documento: documento.documento,
      documentoContentType: documento.documentoContentType,
      observacion: documento.observacion,
      ruta: documento.ruta,
      privado: documento.privado,
      solicitudId: documento.solicitudId
    });
  }

  byteSize(base64String: string): string {
    return "respuesta"
    // return this.dataUtils.byteSize(base64String);
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

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const documento: IDocumento = this.createFromForm();
    if (documento.id !== undefined) {
      this.subscribeToSaveResponse(this.documentoService.update(documento));
    } else {
      this.subscribeToSaveResponse(this.documentoService.create(documento));
    }
  }

  private createFromForm(): IDocumento {
    return {
      ...new Documento(),
      id: this.editForm.get(['id'])!.value,
      nombreDeDocumento: this.editForm.get(['nombreDeDocumento'])!.value,
      fechaSubida: this.editForm.get(['fechaSubida'])!.value,
      documentoContentType: this.editForm.get(['documentoContentType'])!.value,
      documento: this.editForm.get(['documento'])!.value,
      observacion: this.editForm.get(['observacion'])!.value,
      ruta: this.editForm.get(['ruta'])!.value,
      privado: this.editForm.get(['privado'])!.value,
      solicitudId: this.idSolicitud,
      // gestionId: this.editForm.get(['gestionId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumento>>): void {
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
}
