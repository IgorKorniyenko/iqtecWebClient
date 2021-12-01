import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASEURL } from '../shared/api/endpoints';
import { MaterialType } from '../shared/models/materialType';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  constructor(private http: HttpClient) { }

  getTypes(): Observable<MaterialType[]>{
    return this.http.get<MaterialType[]>(BASEURL + 'tipo/consultar');
  }
}
