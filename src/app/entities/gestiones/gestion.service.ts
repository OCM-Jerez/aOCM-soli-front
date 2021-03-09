import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IGestion } from './gestion.interface';

type EntityResponseType = HttpResponse<IGestion>;

@Injectable({ providedIn: 'root' })
export class GestionService {
  private baseUrl: string = environment.baseUrl;
  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGestion>(`${this.baseUrl}gestiones/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(){
    const url = `${this.baseUrl}gestiones`;
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');
   return this.http.get<IGestion[]>(url, { headers });
  }

  create(gestion: IGestion): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(documento);
    // TODO Revisar esta fecha
    const copy = Date.now
    return this.http
      .post<IGestion>(this.baseUrl +'gestiones', gestion, { observe: 'response' })
      // .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(gestion: IGestion): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(documento);
        // TODO Revisar esta fecha
    // const copy = Date.now
    return this.http
      .put<IGestion>(this.baseUrl+'gestiones', gestion,{ observe: 'response' })
      // .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    // if (res.body) {
    //   res.body.fechaSolicitud = res.body.fechaSolicitud ? moment(res.body.fechaSolicitud) : undefined;
    //   res.body.fechaRespuesta = res.body.fechaRespuesta ? moment(res.body.fechaRespuesta) : undefined;
    // }
    return res;
  }


}
