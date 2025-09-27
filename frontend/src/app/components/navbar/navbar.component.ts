import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  usuario$: typeof this.authService.usuario$;
  constructor(private authService: AuthService, private router: Router) {
    this.usuario$ = this.authService.usuario$;
  }
  get isLogged(): boolean {
    return this.authService.isAuthenticated();
  }
  
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }


 }