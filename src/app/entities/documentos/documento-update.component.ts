import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'ngx-webstorage';
import * as moment from 'moment';

import { DocumentoService } from './documento.service';

import { IDocumento, Documento } from './documento.interface';
import { ISolicitud } from '../solicitudes/solicitud.interface';

type SelectableEntity = ISolicitud;

@Component({
  selector: 'app-documento-update',
  templateUrl: './documento-update.component.html'
})
export class DocumentoUpdateComponent implements OnInit {
  faWindowClose = faWindowClose;
  faSave = faSave;

  date?: any ;
  isSaving = false;
  textoCabecera = "Editar documento";
  fechaSubidaDp: any;
  idSolicitud?: string;

  editForm = this.fb.group({
    id: [],
    descripcion: [null, [Validators.required]],
    fechaSolicitud: [null, [Validators.required]],
    observacion: [],
    ruta: [null, [Validators.required]],
    privado: [],
    solicitudId: []
  });

  constructor(
    protected documentoService: DocumentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private $localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
     this.idSolicitud = this.$localStorage.retrieve('solicitud');
      this.activatedRoute.data.subscribe(({ documento }) => {
      this.updateForm(documento);
      if (documento.id == undefined) {
        this.textoCabecera = "Crear documento";
        this.isSaving = true;
      }
     });
  }

  private createFromForm(): IDocumento {
    return {
      ...new Documento(),
      id: this.editForm.get(['id'])!.value,
      nombreDocumento: this.editForm.get(['descripcion'])!.value,
      fechaSubida: this.date,
      observacion: this.editForm.get(['observacion'])!.value,
      ruta: this.editForm.get(['ruta'])!.value,
      privado: this.editForm.get(['privado'])!.value,
      solicitudId: this.idSolicitud,
    };
  }

  updateForm(documento: IDocumento): void {
    this.editForm.patchValue({
      id: documento.id,
      descripcion: documento.nombreDocumento,
      fechaSolicitud: documento.fechaSubida,
      observacion: documento.observacion,
      ruta: documento.ruta,
      privado: documento.privado,
      solicitudId: documento.solicitudId
    });
  }

  save(): void {
    this.isSaving = true;
    this.date = moment(this.date).format('YYYY-MM-DD');
    const documento: IDocumento = this.createFromForm();
    if (documento.id === undefined) {
      this.documentoService.consulta(documento, 'save')
    } else {
      this.documentoService.consulta(documento, 'update')    }
  }

  previousState(): void {
    window.history.back();
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

}
