import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.cookieService.get('token');
    let newReq = request
    if (token) {
      newReq = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      })
    }
    return next.handle(newReq).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          console.log("There is no token or it is invalid.")
        }

        return throwError(err);

      })
    );
  }
}
