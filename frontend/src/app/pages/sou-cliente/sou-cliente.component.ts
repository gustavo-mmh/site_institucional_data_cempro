import { Component } from '@angular/core';
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
export class SouClienteComponent {
  constructor(public auth: AuthService) { }

  get isLogged(): boolean {
    return this.auth.isAuthenticated();
  }
}
