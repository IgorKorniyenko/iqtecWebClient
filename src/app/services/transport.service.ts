import { Injectable } from '@angular/core';
import { BASEURL } from '../shared/api/endpoints';
import { TRANSPORTENDPOINTS } from '../shared/api/endpoints';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transport } from '../shared/models/transport';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private http: HttpClient) { }

  getTransports(): Observable<Transport[]>{
    return this.http.get<Transport[]>(BASEURL + TRANSPORTENDPOINTS.get('getall'));
  }

  getTransport(name: string): Observable<Transport>{
    return this.http.get<Transport>(BASEURL + TRANSPORTENDPOINTS.get('getbyname') + name)
  }

  postTransport(transport: Transport): Observable<Transport>{
    return this.http.post<Transport>(BASEURL + TRANSPORTENDPOINTS.get('create'), transport);
  }

  putTransport(transport: Transport): Observable<Transport>{
    return this.http.put<Transport>(BASEURL + TRANSPORTENDPOINTS.get('update'), transport);
  }

  deleteTransport(name: string): Observable<Transport>{
    return this.http.delete<Transport>(BASEURL + TRANSPORTENDPOINTS.get('delete') + name);
  }


}
