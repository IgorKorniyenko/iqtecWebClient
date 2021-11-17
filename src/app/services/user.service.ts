import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASEURL, USERSENDPOINTS } from '../shared/api/endpoints';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(BASEURL + USERSENDPOINTS.get('getall'));
  }

  getUser(name: string): Observable<User>{
    return this.http.get<User>(BASEURL + USERSENDPOINTS.get('getbyname') + name)
  }

  postUser(transport: User): Observable<User>{
    return this.http.post<User>(BASEURL + USERSENDPOINTS.get('create'), transport);
  }

  putUser(transport: User): Observable<User>{
    return this.http.put<User>(BASEURL + USERSENDPOINTS.get('update'), transport);
  }

  deleteUser(name: string): Observable<User>{
    return this.http.delete<User>(BASEURL + USERSENDPOINTS.get('delete') + name);
  }
}
