import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StepsComponent } from './steps/steps.component';
import { authGuard } from './auth.guard';
//import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserFormComponent } from './admin/user-form/user-form.component';
import { adminAuthGuard } from './admin-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'steps', component: StepsComponent },
  {
    path: 'userDashboard',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [authGuard],
  },
  // {
  //   path: 'adminDashboard',
  //   loadChildren: () =>
  //     import('./admin/admin.module').then((m) => m.AdminModule),
  //   canActivate: [adminAuthGuard],
  // },
  //{ path: 'userProfile', component: UserProfileComponent },
  // { path: 'adminDash', component: DashboardComponent },
  // { path: 'userForm', component: UserFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
