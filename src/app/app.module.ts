import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot({
      auth: {
        clientId: 'fd962087-0866-4db5-b627-74005889a595',
        authority: 'https://login.microsoftonline.com/3333c5d1-13ba-42f1-a0d0-2c7f182d513c',
        validateAuthority: true,
        redirectUri: 'http://localhost:4200/app',
        postLogoutRedirectUri: 'http://localhost:4200/login',
        navigateToLoginRequestUrl: true,
      },
      cache: {
        cacheLocation: 'localStorage'
      },
    },
    {
      popUp: false,
      consentScopes: [
        'User.Read',
      ],
      unprotectedResources: ['https://www.microsoft.com/en-us/'],
      extraQueryParameters: {}
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
