import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'environement';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = environment.apiUrl + '/v1/registration';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  /** LOGIN */
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ jwt: string }>(
      `${this.apiUrl}/authenticate`,
      { email, password },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(response => {
        if (response.jwt) {
          this.storeToken(response.jwt);
          console.log('Stored JWT Token:', response.jwt);
        }
      }),
      catchError(this.handleError)
    );
  }

  /** REGISTER */
  register(email: string, password: string, firstName: string, lastName: string, role: string): Observable<string> {
    const userData = { email, password, First_name: firstName, Last_name: lastName, app_user_role: role };
    return this.http.post(`${this.apiUrl}`, userData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text'
    }).pipe(
      tap(token => {
        if (token) {
          this.storeToken(token);
        }
      }),
      catchError(this.handleError)
    );
  }

  /** LOGOUT */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    console.log('Logged out successfully');
  }

  /** IS AUTHENTICATED */
  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log('Token:', token, 'Expired?', token ? this.isTokenExpired(token) : 'no token');
    return !!token && !this.isTokenExpired(token);
  }

  /** GET TOKEN */
  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    console.log('Retrieved token:', token);
    return token;
  }

  /** STORE TOKEN */
  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /** CHECK EXPIRATION */
  private isTokenExpired(token: string): boolean {
    try {
      const payload = this.decodeToken(token);
      console.log('Decoded JWT payload:', payload);
      // Treat token as valid if no exp field
      return payload?.exp ? Date.now() >= payload.exp * 1000 : false;
    } catch {
      return true;
    }
  }

  /** DECODE TOKEN */
  private decodeToken(token: string): any {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (e) {
      console.warn('Error decoding token:', e);
      return null;
    }
  }

  /** AUTH HEADERS */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }) : new HttpHeaders();
  }

  /** REFRESH TOKEN */
  refreshToken(): Observable<any> {
    const token = this.getToken();
    if (!token) return throwError(() => new Error('No token available'));
    return this.http.post<{ jwt: string }>(
      `${this.apiUrl}/refresh`,
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(res => res.jwt && this.storeToken(res.jwt)),
      catchError(this.handleError)
    );
  }

  /** GET USER ID */
  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const decoded = this.decodeToken(token);
    return decoded?.sub || null;
  }

  /** ERROR HANDLER */
  private handleError(error: any) {
    console.error('Auth Error:', error);
    let msg = 'Server Error';
    if (error.status === 400) msg = 'Bad Request';
    else if (error.status === 401) msg = 'Unauthorized';
    else if (error.status === 403) msg = 'Forbidden';
    else if (error.status === 500) msg = 'Internal Server Error';
    return throwError(() => new Error(msg));
  }
}
