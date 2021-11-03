import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASEURL } from '../shared/api/endpoints';
import { Client } from '../shared/models/client';
import { CLIENTENDPOINTS } from '../shared/api/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClients() : Observable<Client[]>{
    return this.http.get<Client[]>(BASEURL + CLIENTENDPOINTS.get('getall'));
  }

  getClient(nombre : string) : Observable<Client>{
    return this.http.get<Client>(BASEURL + CLIENTENDPOINTS.get('getbyname') + nombre);
  } 

  postCliente(cliente : Client) : Observable<Client>{
   
    return this.http.post<Client>(BASEURL + CLIENTENDPOINTS.get('create'), cliente);
  }
}
