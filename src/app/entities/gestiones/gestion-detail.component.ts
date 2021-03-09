import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGestion } from './gestion.interface';

@Component({
  selector: 'app-gestion-detail',
  templateUrl: './gestion-detail.component.html'
})
export class GestionDetailComponent implements OnInit {
  gestion: IGestion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gestion }) => (this.gestion = gestion));
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
