import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from '../services/storage.service';
import { LoginService } from '../services/login.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, public storage: StorageService, public login: LoginService) {}


  canActivate(): Observable<boolean> {
    const jwt = new JwtHelperService();
    const token = this.storage.getItem('token');
    if (token) {
      const isExpired = jwt.isTokenExpired(token);
      console.log(`authGuard for token ${token} triggered! => ${isExpired}`);
      if (!isExpired) {
        // check if expiry is less than 15 seconds.
        const tokenExpiry = jwt.getTokenExpirationDate(token);
        if (tokenExpiry.getTime() - Date.now() < 15000) {
          return this.login.refresh().pipe(
            map(data => {
            this.storage.loginSet(data);
            return true;
          })
          );
        } else {
          console.log('good');
          return of(true);
        }

      }
    } else {
      this.router.navigate(['login']);
      this.storage.logoutRemove();
      return of(false);
    }
  }
}
