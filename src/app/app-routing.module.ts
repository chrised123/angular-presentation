import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';


const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  data: { showHeader: false, showFooter: false } },
  { path: 'app', loadChildren: () => import('./core/core.module').then(m => m.CoreModule), canActivate: [MsalGuard]},
  { path: '', redirectTo: 'app' , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
