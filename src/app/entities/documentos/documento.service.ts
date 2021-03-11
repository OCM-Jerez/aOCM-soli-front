import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDocumento } from './documento.interface';

import { environment } from 'src/environments/environment';

type EntityResponseType = HttpResponse<IDocumento>;
type EntityArrayResponseType = HttpResponse<IDocumento[]>;

@Injectable({ providedIn: 'root' })
export class DocumentoService {
  private baseUrl: string = environment.baseUrl;
  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDocumento>(`${this.baseUrl}documentos/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(){
    const url = `${this.baseUrl}documentos`;
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');
   return this.http.get<IDocumento[]>(url, { headers });
  }

  create(documento: IDocumento): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(documento);
    // TODO Revisar esta fecha
    const copy = Date.now
    return this.http
      .post<IDocumento>(this.baseUrl +'documentos', documento, { observe: 'response' })
      // .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(documento: IDocumento): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(documento);
        // TODO Revisar esta fecha
    const copy = Date.now
    return this.http
      .put<IDocumento>(this.baseUrl+'documentos', documento,{ observe: 'response' })
      // .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findAllBySolicitud(solicitudId: string): Observable<EntityArrayResponseType> {
    // const usuarioId = this.localStorageService.retrieve('idUser');
    const usuarioId ="51aac8a8-cf42-4f96-a5cb-a39977806694";
    return this.http
      .get<IDocumento[]>(this.baseUrl + 'documentos/solicitud/' + solicitudId + '/usuario/' + usuarioId, { observe: 'response' });
      // .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    // if (res.body) {
    //   res.body.fechaSolicitud = res.body.fechaSolicitud ? moment(res.body.fechaSolicitud) : undefined;
    //   res.body.fechaRespuesta = res.body.fechaRespuesta ? moment(res.body.fechaRespuesta) : undefined;
    // }
    return res;
  }


}
