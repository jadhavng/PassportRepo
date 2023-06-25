import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user'; // Replace with your server-side API endpoint

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}?email=${email}&password=${password}`;
    return this.http.get(url);
  }
}
