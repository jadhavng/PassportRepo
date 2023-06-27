import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/UserDataService.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.setUserName();
  }

  userName: any;

  setUserName() {
    this.userName = this.userService.getshareUserName;
  }
}
