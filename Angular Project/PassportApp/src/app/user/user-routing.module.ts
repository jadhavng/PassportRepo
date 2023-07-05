import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FreshPassportComponent } from './fresh-passport/fresh-passport.component';
import { RenewPassportComponent } from './renew-passport/renew-passport.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
const routes: Routes = [
  { path: '', component: UserDashboardComponent },
  { path: 'userProfile', component: UserProfileComponent },
  { path: 'fresh-passport', component: FreshPassportComponent },
  { path: 'renew-passport', component: RenewPassportComponent },
  { path: 'applicationDetails', component: ApplicationFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
