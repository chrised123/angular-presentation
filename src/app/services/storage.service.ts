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
    console.log('logout')
    if (environment.storage === 'cookie') {
      this.logoutRemoveCookie();
    } else {
      this.logoutRemoveLocal();
    }
  }

  getItem = (key) => {
    if (environment.storage === 'cookie') {
      return this.cookie.get(key);
    } else {
      return localStorage.getItem(key);
    }
  }

  // Local storage implementation
  private loginSetLocal = (jwtObject) => {
    console.log('localstorage');
    localStorage.setItem('expires', jwtObject.tokenExpiry);
    localStorage.setItem('token', jwtObject.token);
    localStorage.setItem('refreshToken', jwtObject.refreshToken);
    localStorage.setItem('refreshTokenExpiry', jwtObject.refreshTokenExpiry);
  }

  private logoutRemoveLocal = () => {
    localStorage.removeItem('expires');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshTokenExpiry');
  }

  // Cookie implementation
  private loginSetCookie = (jwtObject) => {
    console.log(jwtObject);
    console.log('cookie');
    // localStorage.setItem('expires', jwtObject.expires);
    // localStorage.setItem('token', jwtObject.token);
    this.cookie.set('token', jwtObject.token, new Date(parseInt(jwtObject.tokenExpiry)), '/', 'localhost', false, 'Strict');
    this.cookie.set('refreshToken', jwtObject.refreshToken, new Date(parseInt(jwtObject.refreshTokenExpiry)), '/', 'localhost', false, 'Strict');
  }

  private logoutRemoveCookie = () => {
    console.log('remove');
    this.cookie.delete('token', '/');
    this.cookie.delete('refreshToken', '/');
  }

}


