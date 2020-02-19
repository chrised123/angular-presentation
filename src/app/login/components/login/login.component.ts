import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../../../services/login.service';
import { StorageService } from './../../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private loginService: LoginService, private storageService: StorageService) {
    this.loginForm = fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    })
  }

  login = () => {
    this.loginService.login(this.loginForm).subscribe((data) => {
      console.log(data);
      this.storageService.loginSet(data);
      this.router.navigateByUrl('app');
    },
    (error) => {
      console.log('login error');
    });
  }

  isLoggedIn = () => localStorage.getItem('user') != null;

  ngOnInit() {
    if (this.isLoggedIn) {
      this.router.navigate(['app'])
    }
  }
}
