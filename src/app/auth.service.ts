import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://62.74.232.210:4566/healthmonitor'; // 'http://localhost:3000';
  private accessToken: string | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/users/login`, { username, password }).pipe(
      tap(response => {
        this.accessToken = response.access_token;
        localStorage.setItem('access_token', this.accessToken || '');
      })
    );
  }

  getToken(): string | null {
    return this.accessToken || localStorage.getItem('access_token');
  }

  logout() {
    this.accessToken = null;
    localStorage.removeItem('access_token');
  }
}