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
import { Router } from '@angular/router';

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
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.signUpForm = this.fb.group(
      {
        firstName: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
        ],
        lastName: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [Validators.required, this.numericFieldValidator(10)],
        ],
        gender: ['', Validators.required],
        dateOfBirth: [
          '',
          [Validators.required, this.dateNotInFutureValidator()],
        ],
        aadharNo: [
          '',
          [
            Validators.required,
            this.numericFieldValidator(12), // Custom validator for numeric input
            // Validators.minLength(12),
            // Validators.maxLength(12),
          ],
        ],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        image: [null, this.imageFormatValidator(['jpg', 'png'])], // Add the image control with format validator
      },
      { validator: this.passwordMatchValidator }
    );

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

    if (file) {
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
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      console.log(formData);

      this.userService.registerUser(formData).subscribe(
        (response) => {
          console.log('User registered successfully');
          alert('Registered successfully..');
          this.signUpForm.reset();
          this.router.navigate(['login']);
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
      pattern: 'Should contains only alphabets',
    },
    lastName: {
      required: 'Last Name is required.',
      pattern: 'Should contains only alphabets',
    },
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email address.',
    },
    phoneNumber: {
      required: 'Phone Number is required.',
      invalidNo: 'Phone Number contains only 10 digits',
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
      invalidNo: 'Aadhar No contains 12 digits',
      // minLength: 'Aadhar No should be 12 digits long.',
      // maxLength: 'Aadhar No should be 12 digits long.',
    },
    password: {
      required: 'Password is required.',
    },
    confirmPassword: {
      required: 'Confirm Password is required.',
      passwordMismatch: 'Passwords do not match.',
    },
    image: {
      invalidFormat:
        'Invalid image format. Only JPG and PNG formats are allowed.',
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

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: false };
    }

    return null;
  }

  numericFieldValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const pattern = new RegExp(`^[0-9]{${maxLength}}$`);
      const valid = pattern.test(value);

      return valid ? null : { invalidNo: true };
    };
  }

  imageFormatValidator(allowedFormats: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value as File;
      if (file && file.name) {
        const fileName = file.name.toLowerCase();
        const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);

        if (!allowedFormats.includes(fileExtension)) {
          return { invalidFormat: true };
        }
      }

      return null;
    };
  }
}
