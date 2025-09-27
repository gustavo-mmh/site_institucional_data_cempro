import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('access_token');

    if (token) {
      return true; 
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}
