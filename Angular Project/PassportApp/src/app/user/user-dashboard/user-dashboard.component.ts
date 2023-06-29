import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/UserDataService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  user: any; // Declare the user property
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.setUserName();
    this.getUserData(); // Call the method to fetch user data
  }

  userName: any;

  setUserName() {
    this.userName = this.userService.getshareUserName;
  }

  getUserData() {
    this.userService.getLoggedInUser().subscribe(
      (user) => {
        this.user = user;
        // this.checkPassportStatus();
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  applyNewPassport(): void {
    if (this.user && this.user.passport) {
      const isEmpty = Object.keys(this.user.passport).length === 0;
      console.log(isEmpty);

      if (!isEmpty) {
        // User has already applied for a passport
        alert('You have already applied for a passport.');
      } else {
        // User is applying for the first time, navigate to the fresh passport form
        this.router.navigate(['userDashboard/fresh-passport']);
      }
    }
  }

  applyRenewPassport(): void {
    if (this.user && this.user.passport) {
      const isEmpty = Object.keys(this.user.passport).length === 0;
      console.log(isEmpty);

      if (!isEmpty) {
        // User has already applied for a passport
        alert('You have already applied for a passport.');
      } else {
        // User is applying for the first time, navigate to the fresh passport form
        this.router.navigate(['userDashboard/renew-passport']);
      }
    }
  }
}
