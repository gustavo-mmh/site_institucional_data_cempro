import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:5138/api/v1/autenticacao/login"
  private tokenKey = 'access_token';
  private usuarioSubject = new BehaviorSubject<string | null>(this.getUsuario());
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) {}
  login(credentials:{usuario:string, senha:string}): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
      tap((response: LoginResponse) => {
        if (response.access_token) {
          this.saveToken(response.access_token);
          localStorage.setItem('usuario', credentials.usuario);
          this.usuarioSubject.next(credentials.usuario);
        }
      })
      );
  }

  private saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
  getUsuario(): string | null {
    return localStorage.getItem('usuario');
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }
}
