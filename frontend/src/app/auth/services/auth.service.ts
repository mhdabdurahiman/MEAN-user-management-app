import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, {withCredentials: true});
  }

  loginUser(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData, {withCredentials: true});
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`, {withCredentials: true});
  }
}

