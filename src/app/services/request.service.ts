import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASEURL, REQUESTENDPOINTS } from '../shared/api/endpoints';
import { Request } from '../shared/models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getRequests(): Observable<Request[]>{
    return this.http.get<Request[]>(BASEURL + REQUESTENDPOINTS.get('getall'));
  }

  getRequest(name: string): Observable<Request>{
    return this.http.get<Request>(BASEURL + REQUESTENDPOINTS.get('getbyname') + name)
  }

  postRequest(transport: Request): Observable<Request>{
    return this.http.post<Request>(BASEURL + REQUESTENDPOINTS.get('create'), transport);
  }

  putRequest(transport: Request): Observable<Request>{
    return this.http.put<Request>(BASEURL + REQUESTENDPOINTS.get('update'), transport);
  }

  deleteRequest(name: string): Observable<Request>{
    return this.http.delete<Request>(BASEURL + REQUESTENDPOINTS.get('delete') + name);
  }
}
