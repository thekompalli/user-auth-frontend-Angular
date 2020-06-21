import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EmailExpireComponent } from './components/email-expire/email-expire.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path: "", redirectTo:"/login", pathMatch:"full"},
  {path: "login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path: "dashboard", component:DashboardComponent, canActivate:[AuthGuard]},
  {path: "expired", component:EmailExpireComponent},
  {path: "forgot-password", component:ForgotPasswordComponent},
  {path: "pass-reset/:token/:email", component:PasswordResetComponent},
  {path: "**", redirectTo:"/login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
