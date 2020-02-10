import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loggedIn = false;
  constructor(private authService: MsalService, private router: Router ) { }

  ngOnInit() {
    this.loggedIn = !!this.authService.getAccount();
    if (this.loggedIn){
      this.router.navigate(['/app']);
    }
  }

}
