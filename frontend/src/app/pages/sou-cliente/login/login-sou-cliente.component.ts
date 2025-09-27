import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-sou-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastrModule],
  templateUrl: './login-sou-cliente.component.html',
  styleUrls: ['./login-sou-cliente.component.scss']
})
export class LoginSouClienteComponent {

  usuario = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  onSubmit() {
    this.authService.login({ usuario: this.usuario, senha: this.senha }).subscribe({
      next: (response: any) => {
        localStorage.setItem('access_token', response.access_token);
        this.toastr.success('Login realizado com sucesso!');
        this.router.navigate(['/home']);
      },
      error: () => {
        this.toastr.error('Usuário ou senha inválidos');
      }
    });
  }

}
