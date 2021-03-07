import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IDocumento } from './documento.interface';

@Component({
  selector: 'app-documento-detail',
  templateUrl: './documento-detail.component.html'
})
export class DocumentoDetailComponent implements OnInit {
  documento: IDocumento | null = null;

  constructor( protected activatedRoute: ActivatedRoute) {}

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

  previousState(): void {
    window.history.back();
  }
}
