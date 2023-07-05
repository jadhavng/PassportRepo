import { Component } from '@angular/core';
import { UserService } from 'src/app/UserDataService.service';
import { SharedService } from 'src/app/shared/shared.service.ts/shared.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css'],
})
export class ApplicationFormComponent {
  public passportDetails: any = {};
  userId!: string;

  constructor(
    private userService: UserService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.userId = this.userService.loggedInUserID;
    console.log('User ID:', this.userId);
    this.fetchPassportDetails();
  }

  isPassportDetailsEmpty(passportDetails: any): boolean {
    return Object.keys(passportDetails).length === 0;
  }

  fetchPassportDetails() {
    if (this.userId) {
      console.log('Fetching passport details for user ID:', this.userId);
      this.userService.getUserById(this.userId).subscribe(
        (user: any) => {
          this.passportDetails = user.passport;
          console.log('Passport details:', this.passportDetails);
        },
        (error) => {
          console.error('Error fetching passport details:', error);
          // Handle the error appropriately
        }
      );
    }
  }
}
