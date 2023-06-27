// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent {

// }

import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { UserService } from '../UserDataService.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  formErrors: any = {};
  selectedImage: File | null = null; // Declare selectedImage variable

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, this.dateNotInFutureValidator()]],
      aadharNo: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
        ],
      ],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      image: [null], // Add the image control
    });

    this.signUpForm.valueChanges.subscribe((data) => {
      this.validateForm();
    });
  }

  validateForm() {
    this.formErrors = {};

    for (const field in this.signUpForm.controls) {
      if (this.signUpForm.controls.hasOwnProperty(field)) {
        const control = this.signUpForm.get(field);

        if (control && !control.valid && (control.dirty || control.touched)) {
          const messages = this.validationMessages[field];

          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              if (!this.formErrors[field]) {
                this.formErrors[field] = '';
              }

              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];

    // Perform any necessary validation on the file here

    this.selectedImage = file;

    // Convert the image file to a base64-encoded string
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.signUpForm.patchValue({
        image: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      console.log(formData);

      this.userService.registerUser(formData).subscribe(
        (response) => {
          console.log('User registered successfully');
          this.signUpForm.reset();
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    } else {
      this.validateForm();
    }
  }

  validationMessages: { [key: string]: { [key: string]: string } } = {
    firstName: {
      required: 'First Name is required.',
    },
    lastName: {
      required: 'Last Name is required.',
    },
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email address.',
    },
    phoneNumber: {
      required: 'Phone Number is required.',
    },
    gender: {
      required: 'Gender is required.',
    },
    dateOfBirth: {
      required: 'Date of Birth is required.',
      futureDate: 'Date of Birth cannot be a future date.',
    },
    aadharNo: {
      required: 'Aadhar No is required.',
      minlength: 'Aadhar No should be 12 digits long.',
      maxlength: 'Aadhar No should be 12 digits long.',
    },
    password: {
      required: 'Password is required.',
    },
    confirmPassword: {
      required: 'Confirm Password is required.',
      passwordMismatch: 'Passwords do not match.',
    },
  };

  dateNotInFutureValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();

      if (selectedDate > currentDate) {
        return { futureDate: true };
      }

      return null;
    };
  }
}
