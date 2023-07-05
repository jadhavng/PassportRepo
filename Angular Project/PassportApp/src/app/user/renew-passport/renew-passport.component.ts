import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/UserDataService.service';

@Component({
  selector: 'app-renew-passport',
  templateUrl: './renew-passport.component.html',
  styleUrls: ['./renew-passport.component.css'],
})
export class RenewPassportComponent {
  myForm: FormGroup;
  formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.myForm = this.formBuilder.group({
      filenumInput: ['', Validators.required],
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      otherNames: ['', Validators.required],
      changedName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],

      martialStatus: ['', Validators.required],
      citizenship: ['', Validators.required],
      panNumber: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z]{5}\d{4}[A-Za-z]$/)],
      ],
      voterId: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z]{3}\d{7}$/)],
      ],
      employment: ['', Validators.required],
      organizationName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
      ],
      parentOrSpouseGovernmentServant: ['', Validators.required],
      motherGivenName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
      ],
      fatherGivenName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
      ],
      legalGuardianGivenName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
      ],
      spouseGivenName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
      ],
      houseStreetName: ['', Validators.required],
      villageTown: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      emailId: ['', [Validators.required, Validators.email]],
      permanentAddressSame: ['', Validators.required],
      emergencyName: ['', Validators.required],
      emergencyAddress: ['', Validators.required],
      emergencyVillage: ['', Validators.required],
      emergencyDistrict: ['', Validators.required],
      emergencyState: ['', Validators.required],
      emergencyMobileNo: ['', Validators.required],
      emergencyEmail: ['', [Validators.required, Validators.email]],
      passportNumber: ['', Validators.required],
      issue_date: ['', Validators.required],
      expire_date: ['', Validators.required],
      placeOfIssue: ['', Validators.required],
      previousPassport: ['', Validators.required],
      feeAmount: ['', Validators.required],
      ddNumber: ['', Validators.required],
      ddIssueDate: ['', Validators.required],
      ddExpiryDate: ['', Validators.required],
      bankName: ['', Validators.required],
      branch: ['', Validators.required],
      placeOfApplication: ['', Validators.required],
      dateofApplication: ['', Validators.required],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      const userId = this.userService.loggedInUserID; // Replace with the actual user ID
      this.userService.updateUserApplicationStatus(userId, 'Renewal').subscribe(
        () => {
          console.log('Application Details saved successfully');
        },
        (error) => {
          console.error('Failed to update application type:', error);
        }
      );

      // Update passport details for the user
      this.userService.updateUserPassportDetails(userId, formData).subscribe(
        () => {
          alert('Passport details updated successfully');
        },
        (error) => {
          console.error('Failed to update passport details:', error);
        }
      );
    } else {
      alert('Form is invalid. Please check the fields.');
    }
  }

  isFieldInvalid(fieldName: string, errorTypes?: string[]): boolean {
    const formControl = this.myForm.get(fieldName);
    if (errorTypes) {
      return (
        formControl !== null &&
        errorTypes.some((errorType) => formControl?.hasError(errorType)) &&
        (formControl?.touched || this.formSubmitted)
      );
    }
    return (
      formControl !== null &&
      formControl.invalid &&
      (formControl.touched || this.formSubmitted)
    );
  }

  isFormSubmitted(): boolean {
    return this.formSubmitted;
  }
}
