import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, {withCredentials: true});
  }

  loginUser(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData, {withCredentials: true});
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`, {withCredentials: true});
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<{ isAuthenticated: boolean, isAdmin: boolean }>(`${this.apiUrl}/check-auth`, { withCredentials: true }).pipe(
      map(response => response.isAuthenticated)
    )
  }
}

