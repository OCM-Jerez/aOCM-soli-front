import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ISolicitud } from './solicitud.interface';

// import * as moment from 'moment';

// import { DATE_FORMAT } from 'app/shared/constants/input.constants';
// import { SERVER_API_URL } from 'app/app.constants';
// import { createRequestOption } from 'app/shared/util/request-util';

type EntityResponseType = HttpResponse<ISolicitud>;
type EntityArrayResponseType = HttpResponse<ISolicitud[]>;

@Injectable({ providedIn: 'root' })
export class SolicitudService {
  private baseUrl = environment.baseUrl;

  constructor(protected http: HttpClient) {}

  // create(solicitud: ISolicitud): Observable<EntityResponseType> {
  //   const copy = this.convertDateFromClient(solicitud);
  //   return this.http
  //     .post<ISolicitud>(this.url, copy, { observe: 'response' })
  //     .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  // }

  // update(solicitud: ISolicitud): Observable<EntityResponseType> {
  //   const copy = this.convertDateFromClient(solicitud);
  //   return this.http
  //     .put<ISolicitud>(this.url, copy, { observe: 'response' })
  //     .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  // }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISolicitud>(`${this.baseUrl}/${id}`, { observe: 'response' })
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

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.baseUrl}/${id}`, { observe: 'response' });
  }

  // protected convertDateFromClient(solicitud: ISolicitud): ISolicitud {
    // const copy: ISolicitud = Object.assign({}, solicitud, {
    //   fechaSolicitud:
    //     solicitud.fechaSolicitud && solicitud.fechaSolicitud.isValid() ? solicitud.fechaSolicitud.format(DATE_FORMAT) : undefined,
    //   fechaRespuesta:
    //     solicitud.fechaRespuesta && solicitud.fechaRespuesta.isValid() ? solicitud.fechaRespuesta.format(DATE_FORMAT) : undefined
    // });
    // return copy;
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
