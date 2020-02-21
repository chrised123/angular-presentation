import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {

  }

  get(): Observable<any>  {
    return this.http.get('http://localhost:4000/users').
    pipe(
      map((data) => {
        return data;
      }), catchError( error => {
        return throwError( error );
      })
    );
  }
}
