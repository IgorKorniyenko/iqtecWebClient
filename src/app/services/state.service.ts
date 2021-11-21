import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASEURL } from '../shared/api/endpoints';
import { State } from '../shared/models/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<State[]>{
    return this.http.get<State[]>(BASEURL + "Iqtec/estado/consultar");
  }
}
