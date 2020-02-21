import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private router: Router, private http: HttpClient, private storage: StorageService) {

  }

  login(form: FormGroup): Observable<any> {
    console.log(form);
    return this.http.post(
      `http://localhost:4000/users/authenticate`,
      {
        username: form.value.username,
        password: form.value.password
      },
      {
        observe: 'response'
      }
      ).pipe(
           map((response) => {
            console.log(response.headers);
            return {
              token: response.headers.get('Token'),
              tokenExpiry: response.headers.get('Token-Expiry'),
              refreshToken: response.headers.get('Refresh-Token'),
              refreshTokenExpiry: response.headers.get('Refresh-Token-Expiry'),
            };
           }), catchError( error => {
             return throwError( error );
           })
        );
  }

  logout = () => {
    console.log('test');
    this.storage.logoutRemove();
    this.router.navigate(['login']);
  }
}
