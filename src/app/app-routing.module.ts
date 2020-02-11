import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/login.authguard';


const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  data: { showHeader: false, showFooter: false } },
  { path: 'app', loadChildren: () => import('./core/core.module').then(m => m.CoreModule), canActivate: [AuthGuardService]},
  { path: '', redirectTo: 'login' , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
