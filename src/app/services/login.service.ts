import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private router: Router) {

  }

  login = (form: FormGroup) => {
    localStorage.setItem('user', form.value.username);
    this.router.navigate(['app']);
  }

  logout = () => {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
