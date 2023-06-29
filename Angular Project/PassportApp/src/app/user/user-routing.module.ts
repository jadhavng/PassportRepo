import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FreshPassportComponent } from './fresh-passport/fresh-passport.component';

const routes: Routes = [
  { path: '', component: UserDashboardComponent },
  { path: 'userProfile', component: UserProfileComponent },
  { path: 'fresh-passport', component: FreshPassportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
