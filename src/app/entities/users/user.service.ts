import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IUser } from './user.interface';


// import { SERVER_API_URL } from 'app/app.constants';
// import { createRequestOption, Pagination } from 'app/shared/util/request-util';
// import { IUser } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl: string = environment.baseUrl;
  // public resourceUrl = SERVER_API_URL + 'api/users';

  constructor(private http: HttpClient) { }

  // create(user: IUser): Observable<IUser> {
  //   return this.http.post<IUser>(this.resourceUrl, user);
  // }

  // update(user: IUser): Observable<IUser> {
  //   return this.http.put<IUser>(this.resourceUrl, user);
  // }

  // find(login: string): Observable<IUser> {
  //   return this.http.get<IUser>(`${this.resourceUrl}/${login}`);
  // }

  query() {
    // const options = createRequestOption(req);
    const url = `${this.baseUrl}users`;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');
    return this.http.get<IUser[]>(url, { headers });
  }

  findAll() {
    const url = `${this.baseUrl}users/todas`;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');
    return this.http.get<IUser[]>(url, { headers });
  }


  // delete(login: string): Observable<{}> {
  //   return this.http.delete(`${this.resourceUrl}/${login}`);
  // }

  // authorities(): Observable<string[]> {
  //   return this.http.get<string[]>(SERVER_API_URL + 'api/users/authorities');
  // }
}
