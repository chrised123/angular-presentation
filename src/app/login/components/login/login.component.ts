import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private loginService: LoginService) {
    this.loginForm = fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    })
  }

  login = () => {
    this.loginService.login(this.loginForm);
  }

  isLoggedIn = () => localStorage.getItem('user') != null;

  ngOnInit() {
    if (this.isLoggedIn) {
      this.router.navigate(['app'])
    }
  }
}
