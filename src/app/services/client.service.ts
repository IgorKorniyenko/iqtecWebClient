import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Client } from '../shared/models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClients() : Observable<Client[]>{
    return this.http.get<Client[]>(baseURL + 'Iqtec/clientes/consultar');
  }

  postCliente(cliente : Client) : Observable<Client>{
   

    return this.http.post<Client>(baseURL + 'Iqtec/clientes/crear/', cliente);
  }
}
