import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSouClienteComponent } from './login/login-sou-cliente.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sou-cliente',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoginSouClienteComponent,
  ],
  templateUrl: './sou-cliente.component.html',
  styleUrl: './sou-cliente.component.scss'
})
export class SouClienteComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router,) { }
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }
  get isLogged(): boolean {
    return this.authService.isAuthenticated();
  }
}
