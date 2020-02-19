import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  constructor(private cookie: CookieService) {

  }

  loginSet = (jwtObject) => {
    if (environment.storage === 'cookie') {
      this.loginSetCookie(jwtObject);
    } else {
      this.loginSetLocal(jwtObject);
    }
  }

  logoutRemove = () => {
    if (environment.storage === 'cookie') {
      this.logoutRemoveCookie();
    } else {
      this.logoutRemoveLocal();
    }
  }

  loginGet = () => {
    if (environment.storage === 'cookie') {
      return this.cookie.get('token');
    } else {
      return localStorage.getItem('token');
    }
  }

  // Local storage implementation
  private loginSetLocal = (jwtObject) => {
    console.log('localstorage');
    localStorage.setItem('expires', jwtObject.expires);
    localStorage.setItem('token', jwtObject.token);
  }

  private logoutRemoveLocal = () => {
    localStorage.removeItem('expires');
    localStorage.removeItem('token');
  }

  // Cookie implementation
  private loginSetCookie = (jwtObject) => {
    console.log('cookie');
    // localStorage.setItem('expires', jwtObject.expires);
    // localStorage.setItem('token', jwtObject.token);
    this.cookie.set('token', jwtObject.token, new Date(jwtObject.expires), '/', 'localhost', false, 'Strict');
  }

  private logoutRemoveCookie = () => {
    this.cookie.delete('token');
  }

}


