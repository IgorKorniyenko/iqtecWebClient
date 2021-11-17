import { Injectable } from '@angular/core';
import { Headquater } from '../shared/models/heaquater';
import { BASEURL } from '../shared/api/endpoints';
import { HEADQUATERSENDPOINTS } from '../shared/api/endpoints';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadquaterService {

  constructor( private http: HttpClient) { }

  getHeadquaters(): Observable<Headquater[]>{
    return this.http.get<Headquater[]>(BASEURL + HEADQUATERSENDPOINTS.get('getall'));
  }

  getHeadquater(name: string): Observable<Headquater>{
    return this.http.get<Headquater>(BASEURL + HEADQUATERSENDPOINTS.get('getbyname') + name);
  }

  postHeadquater(headquater: Headquater): Observable<Headquater>{
    return this.http.post<Headquater>(BASEURL + HEADQUATERSENDPOINTS.get('create'), headquater);
  }

  putHeadquater(headquater: Headquater): Observable<Headquater>{
    return this.http.put<Headquater>(BASEURL + HEADQUATERSENDPOINTS.get('update'), headquater);
  }

  deleteHeadquater(name: string): Observable<Headquater>{
    this.http.head
    return this.http.delete<Headquater>(BASEURL + HEADQUATERSENDPOINTS.get('delete') + name);
  }

}
