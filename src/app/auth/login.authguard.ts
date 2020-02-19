import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, public storage: StorageService) {}


  canActivate(): boolean {
    const jwt = new JwtHelperService();
    const token = this.storage.loginGet()
    if (token != null) {
      const isExpired = jwt.isTokenExpired(token);
      console.log('authGuard triggered!');
      if (!isExpired) {
        return true;
      }
    }
    this.router.navigate(['login']);
    this.storage.logoutRemove();
    return false;
  }
}
