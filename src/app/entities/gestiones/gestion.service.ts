import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { IGestion } from './gestion.interface';

@Injectable({ providedIn: 'root' })
export class GestionService {
  private baseUrl: string = environment.baseUrl;
  constructor(protected http: HttpClient) {}

  query(){
    const url = `${this.baseUrl}gestiones`;
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');
   return this.http.get<IGestion[]>(url, { headers });
  }


}
