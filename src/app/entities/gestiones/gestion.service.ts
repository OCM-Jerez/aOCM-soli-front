import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import Swal from 'sweetalert2';

import { IGestion } from './gestion.interface';

import { environment } from 'src/environments/environment';

type EntityResponseType = HttpResponse<IGestion>;
type EntityArrayResponseType = HttpResponse<IGestion[]>;

@Injectable({ providedIn: 'root' })
export class GestionService {
  private baseUrl: string = environment.baseUrl;
  isSaving = false;

  constructor(
    protected http: HttpClient,
    private $localStorage: LocalStorageService
  ) { }

  consulta(gestion: IGestion, action: string) {
    switch (action) {
      case 'save':
        this.isSaving = true;
        this.subscribeResponse(this.create(gestion), action);
        break;
      case 'update':
        this.subscribeResponse(this.update(gestion), action);
        this.isSaving = false;
        break;
      //  case 'delete':
      //    this.subscribeResponse(this.delete(gestion.id), action);
      //    break;
    }
  }

  protected subscribeResponse(result: Observable<HttpResponse<IGestion>>, action: string): void {
    result.subscribe(
      () => this.onSaveSuccess(action),
      () => { this.onSaveError(Error) }
    );
  }

  protected onSaveSuccess(action: string): void {
    switch (action) {
      case 'save':
        Swal.fire('', 'La gestión ha sido creada correctamente.', 'success');
        break;
      case 'update':
        Swal.fire('', 'La gestión ha sido editado correctamente.', 'success');
        break;
      case 'delete':
        Swal.fire('', 'La gestión ha sido borrado correctamente.', 'success');
        break;
    }
    window.history.back();
  }

  protected onSaveError(error: any): void {
    // TODO Obtener error.
    console.log(error);
    Swal.fire('Error', error, 'error');
    this.isSaving = false;
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGestion>(`${this.baseUrl}gestiones/${id}`, { observe: 'response' })
  }

  findAll() {
    const url = `${this.baseUrl}gestiones/todas`;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');
    return this.http.get<IGestion[]>(url, { headers });
  }

  query() {
    const url = `${this.baseUrl}gestiones`;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');
    return this.http.get<IGestion[]>(url, { headers });
  }

  findAllBySolicitud(solicitudId: string): Observable<EntityArrayResponseType> {
    const usuarioId = this.$localStorage.retrieve('iduser')
    return this.http
      .get<IGestion[]>(this.baseUrl + 'gestiones/solicitud/' + solicitudId + '/usuario/' + usuarioId, { observe: 'response' });
  }

  create(gestion: IGestion): Observable<EntityResponseType> {
    return this.http
      .post<IGestion>(this.baseUrl + 'gestiones', gestion, { observe: 'response' })
  }

  update(gestion: IGestion): Observable<EntityResponseType> {
    return this.http
      .put<IGestion>(this.baseUrl + 'gestiones', gestion, { observe: 'response' })
  }

}
