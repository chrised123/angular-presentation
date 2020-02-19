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
      }
      ).pipe(
           map((data) => {
             console.log(data);
             return data;
           }), catchError( error => {
             return throwError( error );
           })
        );
  }

  logout = () => {
    this.storage.logoutRemove();
    this.router.navigate(['login']);
  }
}
