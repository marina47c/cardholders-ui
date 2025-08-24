import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'access_token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ access_token: string }>('https://localhost:7107/api/auth/login', { username, password })
      .pipe(tap(res => this.setToken(res.access_token)));
  }

  setToken(token: string) { localStorage.setItem(this.tokenKey, token); }
  getToken() { return localStorage.getItem(this.tokenKey); }
  clear() { localStorage.removeItem(this.tokenKey); }
  isAuthenticated() { return !!this.getToken(); }
}
