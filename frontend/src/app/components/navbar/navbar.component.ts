import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  isDarkMode$!: Observable<boolean>;
  usuario$: typeof this.authService.usuario$;
  constructor(private authService: AuthService, private router: Router, private themeService: ThemeService) {
    this.usuario$ = this.authService.usuario$;
  }
  ngOnInit(): void {
    this.isDarkMode$ = this.themeService.darkMode$;
  }
  toggleDarkMode(): void {
    this.themeService.toggleTheme();
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