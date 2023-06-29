import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public loggedInUser: any; // Variable to store logged-in user data
  private apiUrl = 'http://localhost:3000/user'; // Replace with your server-side API endpoint
  public shareUserName: any;
  public loggedInUserID: any;

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    user.passport = {};
    return this.http.post<any>(this.apiUrl, user);
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}?email=${email}&password=${password}`;
    return this.http.get(url);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateUserStatus(userId: string, status: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.patch(url, { status });
  }
  updateUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<any>(url, user);
  }

  deleteUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete(url);
  }

  getLoggedInUser(): Observable<any> {
    return of(this.loggedInUser);
  }

  setLoggedInUser(user: any): void {
    this.loggedInUser = user;
  }

  set setshareUserName(value: any) {
    this.shareUserName = value;
  }

  get getshareUserName(): any {
    return this.shareUserName;
  }

  updateUserPassportDetails(
    userId: string,
    passportDetails: any
  ): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.patch(url, { passport: passportDetails });
  }

  getUserPassportDetails(userId: string): Observable<any[]> {
    const url = `${this.apiUrl}/${userId}/passport`;
    return this.http.get<any[]>(url);
  }
}
