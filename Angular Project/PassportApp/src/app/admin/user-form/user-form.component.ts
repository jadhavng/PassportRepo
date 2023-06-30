import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/UserDataService.service';
import { SharedService } from 'src/app/shared/shared.service.ts/shared.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  public passportDetails: any = {};
  userId!: string;

  constructor(
    private userService: UserService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.userId = this.sharedService.selectedUserByADmin;
    console.log('User ID:', this.userId);
    this.fetchPassportDetails();
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
