import { Component } from '@angular/core';
import { SharedService } from '../shared/shared.service.ts/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public sharedService: SharedService) {}
}
