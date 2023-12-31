import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StepsComponent } from './steps/steps.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './UserDataService.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { adminAuthGuard } from './admin-auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    StepsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
