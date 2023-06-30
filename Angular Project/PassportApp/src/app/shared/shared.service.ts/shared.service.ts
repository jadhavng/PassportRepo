import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public isLoggedIn = false;
  public isAdminLogged = false;
  public selectedUserByADmin: any;
}
