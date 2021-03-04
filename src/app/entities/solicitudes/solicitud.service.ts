import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { ISolicitud } from './solicitud.interface';

type EntityResponseType = HttpResponse<ISolicitud>;
type EntityArrayResponseType = HttpResponse<ISolicitud[]>;

@Injectable({ providedIn: 'root' })
export class SolicitudService {
  private baseUrl = environment.baseUrl;
  isSaving = false;

  constructor(protected http: HttpClient) { }

  consulta(solicitud: ISolicitud, action: string) {
    console.log(action);
    switch (action) {
      case 'save':
        this.isSaving = true;
        this.subscribeResponse(this.create(solicitud), action);
        break;
      case 'update':
        this.subscribeResponse(this.update(solicitud), action);
        this.isSaving = false;
        break;
      case 'delete':
        this.subscribeResponse(this.delete(solicitud.id), action);
        break;
    }
  }

  protected subscribeResponse(result: Observable<HttpResponse<ISolicitud>>, action: string): void {
    result.subscribe(
      () => this.onSaveSuccess(action),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(action: string): void {
    switch (action) {
      case 'save':
        Swal.fire('', 'La solicitud ha sido creada correctamente.', 'success');
        break;
      case 'update':
        Swal.fire('', 'La solicitud ha sido editada correctamente.', 'success');
        break;
      case 'delete':
        Swal.fire('', 'La solicitud ha sido borrada correctamente.', 'success');
        break;
    }
    window.history.back();
  }

  protected onSaveError(): void {
    // TODO Obtener error.
    Swal.fire('Error', 'error', 'error');
    this.isSaving = false;
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISolicitud>(`${this.baseUrl}solicitudes/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query() {
    // const options = createRequestOption(req);
    const url = `${this.baseUrl}solicitudes`;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');
    return this.http.get<ISolicitud[]>(url, { headers });
  }

  create(solicitud: ISolicitud): Observable<EntityResponseType> {
    //const copy = this.convertDateFromClient(solicitud);
    return this.http
      .post<ISolicitud>(this.baseUrl + 'solicitudes', solicitud, { observe: 'response' });
    // .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(solicitud: ISolicitud): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(solicitud);
    return this.http
      .put<ISolicitud>(this.baseUrl + 'solicitudes', solicitud, { observe: 'response' });
    // .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.baseUrl}solicitudes/${id}`, { observe: 'response' });
  }

  // query(req?: any): Observable<EntityArrayResponseType> {
  //   const options = createRequestOption(req);
  //   return this.http
  //     .get<ISolicitud[]>(this.url, { params: options, observe: 'response' })
  //     .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  // }

  // protected convertDateFromClient(solicitud: ISolicitud): ISolicitud {
  //   const copy: ISolicitud = Object.assign({}, solicitud, {
  //     fechaSolicitud:
  //       solicitud.fechaSolicitud && solicitud.fechaSolicitud.isValid() ? solicitud.fechaSolicitud.format(DATE_FORMAT) : undefined,
  //     fechaRespuesta:
  //       solicitud.fechaRespuesta && solicitud.fechaRespuesta.isValid() ? solicitud.fechaRespuesta.format(DATE_FORMAT) : undefined
  //   });
  //   return copy;
  // }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    // if (res.body) {
    //   res.body.fechaSolicitud = res.body.fechaSolicitud ? moment(res.body.fechaSolicitud) : undefined;
    //   res.body.fechaRespuesta = res.body.fechaRespuesta ? moment(res.body.fechaRespuesta) : undefined;
    // }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    // if (res.body) {
    //   res.body.forEach((solicitud: ISolicitud) => {
    //     solicitud.fechaSolicitud = solicitud.fechaSolicitud ? moment(solicitud.fechaSolicitud) : undefined;
    //     solicitud.fechaRespuesta = solicitud.fechaRespuesta ? moment(solicitud.fechaRespuesta) : undefined;
    //   });
    // }
    return res;
  }
}
