import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'ngx-webstorage';

import { GestionService } from './gestion.service';

import { Gestion, IGestion } from './gestion.interface';

type SelectableEntity = IGestion;

@Component({
  selector: 'app-gestion-update',
  templateUrl: './gestion-update.component.html'
})
export class GestionUpdateComponent implements OnInit {
  faWindowClose = faWindowClose;
  faSave = faSave;

  isSaving = false;
  idSolicitud?: string;
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
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
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
      solicitudId: this.idSolicitud
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
      this.gestionService.consulta(gestion, 'save');
    } else {
      this.gestionService.consulta(gestion, 'update');
    }
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

}
