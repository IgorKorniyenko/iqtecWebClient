
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService: UserService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.userService.getToken();
    console.log(token);
    // const token = localStorage.token; // you probably want to store it in localStorage or something

    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(req1);
  }

}