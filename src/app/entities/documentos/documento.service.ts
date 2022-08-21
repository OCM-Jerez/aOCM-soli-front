import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import Swal from 'sweetalert2';

import { IDocumento } from './documento.interface';

import { environment } from 'src/environments/environment';

type EntityResponseType = HttpResponse<IDocumento>;
type EntityArrayResponseType = HttpResponse<IDocumento[]>;

@Injectable({ providedIn: 'root' })
export class DocumentoService {
  private baseUrl: string = environment.baseUrl;
  isSaving = false;

  constructor(
    protected http: HttpClient,
    private $localStorage: LocalStorageService
  ) { }

  consulta(documento: IDocumento, action: string) {
    switch (action) {
      case 'save':
        this.isSaving = true;
        this.subscribeResponse(this.create(documento), action);
        break;
      case 'update':
        this.subscribeResponse(this.update(documento), action);
        this.isSaving = false;
        break;
      //  case 'delete':
      //    this.subscribeResponse(this.delete(documento.id), action);
      //    break;
    }
  }

  protected subscribeResponse(result: Observable<HttpResponse<IDocumento>>, action: string): void {
    result.subscribe(
      () => this.onSaveSuccess(action),
      () => { this.onSaveError(Error) }
    );
  }

  protected onSaveSuccess(action: string): void {
    switch (action) {
      case 'save':
        Swal.fire('', 'El documento ha sido creado correctamente.', 'success');
        break;
      case 'update':
        Swal.fire('', 'El documento ha sido editado correctamente.', 'success');
        break;
      case 'delete':
        Swal.fire('', 'El documento ha sido borrado correctamente.', 'success');
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

  create(documento: IDocumento): Observable<EntityResponseType> {
    return this.http
      .post<IDocumento>(this.baseUrl + 'documentos', documento, { observe: 'response' })
  }

  update(documento: IDocumento): Observable<EntityResponseType> {
    return this.http
      .put<IDocumento>(this.baseUrl + 'documentos', documento, { observe: 'response' })
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDocumento>(`${this.baseUrl}documentos/${id}`, { observe: 'response' })
  }

  query() {
    const url = `${this.baseUrl}documentos`;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');
    return this.http.get<IDocumento[]>(url, { headers });
  }

  // findAllBySolicitud(solicitudId: string): Observable<EntityArrayResponseType> {
  //   const usuarioId = this.$localStorage.retrieve('iduser')
  //   return this.http
  //     .get<IDocumento[]>(this.baseUrl + 'documentos/solicitud/' + solicitudId + '/usuario/' + usuarioId, { observe: 'response' });
  // }

  findAllBySolicitudDocumentoType(solicitudId: string, tipoDocumento: string): Observable<EntityArrayResponseType> {
    const usuarioId = this.$localStorage.retrieve('iduser')
    return this.http
      .get<IDocumento[]>(this.baseUrl + 'documentos/solicitud/' + solicitudId + '/documentoType/' + tipoDocumento + '/' + usuarioId, { observe: 'response' });
  }

}
