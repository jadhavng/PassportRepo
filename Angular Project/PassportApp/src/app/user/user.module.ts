import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FreshPassportComponent } from './fresh-passport/fresh-passport.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RenewPassportComponent } from './renew-passport/renew-passport.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserProfileComponent,
    FreshPassportComponent,
    RenewPassportComponent,
  ],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule],
})
export class UserModule {}
