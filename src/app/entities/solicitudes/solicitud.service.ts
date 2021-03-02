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
  texto = "editada";

  constructor(protected http: HttpClient) {}

saveOrUpdate(solicitud: ISolicitud) {
  if (solicitud.id !== undefined) {
    this.subscribeToSaveResponse(this.update(solicitud));
  } else {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.create(solicitud));
  }
}

protected subscribeToSaveResponse(result: Observable<HttpResponse<ISolicitud>>): void {
  result.subscribe(
    () => this.onSaveSuccess(),
    () => this.onSaveError()
  );
}

protected onSaveSuccess(): void {
  if (this.isSaving) {this.texto = "guardada" }
  Swal.fire('', 'La solicitud ha sido ' + this.texto + ' correctamente.', 'success');
  this.isSaving = false;
  this.previousState();
}

protected onSaveError(): void {
  // TODO Obtener error.
  Swal.fire('Error', 'error', 'error');
  this.isSaving = false;
}

previousState(): void {
  window.history.back();
}

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISolicitud>(`${this.baseUrl}solicitudes/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  // query(req?: any): Observable<EntityArrayResponseType> {
  //   const options = createRequestOption(req);
  //   return this.http
  //     .get<ISolicitud[]>(this.url, { params: options, observe: 'response' })
  //     .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  // }

  query(){
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
      // .put<ISolicitud>(this.baseUrl, solicitud, { observe: 'response' });
      .put<ISolicitud>(this.baseUrl + 'solicitudes', solicitud, { observe: 'response' });

      // .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.baseUrl}/${id}`, { observe: 'response' });
  }

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
