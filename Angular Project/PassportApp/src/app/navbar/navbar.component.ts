import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service.ts/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public sharedService: SharedService, private router: Router) {}

  public logout() {
    this.sharedService.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
