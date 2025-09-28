import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-sou-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './login-sou-cliente.component.html',
  styleUrls: ['./login-sou-cliente.component.scss']
})
export class LoginSouClienteComponent {
  usuario = '';
  senha = '';
  loginError = ''; // ← mensagem de erro

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.loginError = 'Preencha todos os campos corretamente!';
      return;
    }

    this.authService.login({ usuario: this.usuario, senha: this.senha }).subscribe({
      next: (response: any) => {
        localStorage.setItem('access_token', response.access_token);
        this.loginError = ''; // limpa erro
        this.router.navigate(['/home']);
      },
      error: () => {
        this.loginError = 'Usuário ou senha inválidos'; // ← exibe erro
      }
    });
  }
}
