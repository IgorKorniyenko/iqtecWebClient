import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { BASEURL, USERSENDPOINTS } from '../shared/api/endpoints';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cookies: CookieService) { }

  login(user: User): Observable<any>{
    return this.http.post<User>(BASEURL + 'auth/login', user);
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  removeToken(){
    this.cookies.delete("token")
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(BASEURL + USERSENDPOINTS.get('getall'));
  }

  getUser(name: string): Observable<User>{
    return this.http.get<User>(BASEURL + USERSENDPOINTS.get('getbyname') + name)
  }

  postUser(user: any): Observable<User>{
    return this.http.post<User>(BASEURL + USERSENDPOINTS.get('create'), user);
  }

  putUser(user: User): Observable<User>{
    return this.http.put<User>(BASEURL + USERSENDPOINTS.get('update'), user);
  }

  deleteUser(name: string): Observable<User>{
    return this.http.delete<User>(BASEURL + USERSENDPOINTS.get('delete') + name);
  }
}
