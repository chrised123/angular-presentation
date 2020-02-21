import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, switchMap, filter, take } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { LoginService } from './login.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public storage: StorageService, private login: LoginService) {}

  intercept( request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    console.log('test');
    const token = this.storage.getItem('token');
    const refreshToken = this.storage.getItem('refreshToken');

    if ( new RegExp('^/refresh').test(request.url) && refreshToken ) {
      request = request.clone({ headers: request.headers.set('Refresh-Token', refreshToken) });
    }
    console.log(`${request.url} => ${token}`);
    if (token) {
      // this.addToken(request, token);
      request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
      request = request.clone({ headers: request.headers.set('Refresh-Token', refreshToken) });
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.login.logout();
        // return throwError(error);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string ) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        // 'Refresh-Token': refreshToken
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.login.refresh().pipe(
        switchMap((data: any) => {
          this.storage.loginSet(data);
          this.isRefreshing = false;
          this.refreshTokenSubject.next(data.token);
          return next.handle(this.addToken(request, data.token));
        }));
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
