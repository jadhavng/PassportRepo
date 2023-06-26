import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/UserDataService.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  loggedInUser: any; // Variable to store logged-in user data

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUserData(); // Fetch the logged-in user data
  }

  loadUserData() {
    this.userService.getLoggedInUser().subscribe(
      (response: any) => {
        this.loggedInUser = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
