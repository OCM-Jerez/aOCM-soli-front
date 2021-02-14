import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IDocumento } from './documento.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DocumentoService {
  private baseUrl: string = environment.baseUrl;
  constructor(protected http: HttpClient) {}

  query(){
    const url = `${this.baseUrl}documentos`;
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');
   return this.http.get<IDocumento[]>(url, { headers });
  }


}
