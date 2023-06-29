import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../UserDataService.service';
import { SharedService } from '../shared/shared.service.ts/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  loginForm!: FormGroup;

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Perform login logic here
      const formData = this.loginForm.value;
      console.log(formData);

      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.userService.login(email, password).subscribe(
        (response) => {
          if (response.length > 0) {
            // Successful login, user found in the database

            console.log('Login successful');
            this.sharedService.isLoggedIn = true;
            this.userService.loggedInUser = response[0]; // Store logged-in user data
            this.userService.loggedInUserID = response[0].id;

            this.router.navigate(['userDashboard']);
          } else {
            // Invalid credentials, user not found
            console.log('Invalid credentials');
          }

          this.loginForm.reset();
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
      this.loginForm.reset();
    } else {
      this.validateForm();
      console.log('loginform', this.loginForm);
    }
  }

  validateForm() {
    for (const field in this.loginForm.controls) {
      if (this.loginForm.controls.hasOwnProperty(field)) {
        const control = this.loginForm.get(field);

        if (control && !control.valid) {
        }
      }
    }
  }
}
