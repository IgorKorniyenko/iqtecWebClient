import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Cliente } from '../shared/models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClients() : Observable<Cliente[]>{
    return this.http.get<Cliente[]>(baseURL + 'Iqtec/clientes/consultar');
  }

  postCliente(cliente : Cliente) : Observable<Cliente>{
   

    return this.http.post<Cliente>(baseURL + 'Iqtec/clientes/crear/', cliente);
  }
}
