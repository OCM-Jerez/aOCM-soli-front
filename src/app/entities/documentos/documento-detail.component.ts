import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { environment } from '../../../environments/environment';

import { IDocumento } from './documento.interface';
import { DocumentoService } from './documento.service';

@Component({
  selector: 'app-documento-detail',
  templateUrl: './documento-detail.component.html',
  styleUrls: ['./documento-detail.component.scss']
})
export class DocumentoDetailComponent implements OnInit {
  isAdmin = environment.IsAdmin;
  documento: IDocumento | null = null;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected documentoService: DocumentoService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documento }) => (this.documento = documento));
  }

  byteSize(base64String: string): string {
    // return this.dataUtils.byteSize(base64String);
    return "cadena"
  }

  openFile(contentType: string, base64String: string): void {
    // this.dataUtils.openFile(contentType, base64String);
  }

  delete(documento: IDocumento): void {
    Swal.fire({
      title: '¿Realmente quieres borrar este documento?',
      confirmButtonColor: '#d33',
      denyButtonColor: '#3085d6',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Borrar`,
      denyButtonText: `NO Borrar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentoService.consulta(documento, 'delete')
      } else if (result.isDenied) {

      }
    })
  }

  previousState(): void {
    window.history.back();
  }
}
