import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent {
  contatoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.contatoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mensagem: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contatoForm.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos corretamente.', 'Fechar', {
        duration: 3000,
        panelClass: ['toast-error']
      });
      return;
    }

    this.http.post('http://localhost:3000/api/contato', this.contatoForm.value).subscribe({
      next: () => {
        this.snackBar.open('Mensagem enviada com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['toast-success']
        });
        this.contatoForm.reset();
      },
      error: () => {
        this.snackBar.open('Erro ao enviar a mensagem. Tente novamente.', 'Fechar', {
          duration: 3000,
          panelClass: ['toast-error']
        });
      }
    });
  }

  getErrorMessage(campo: string): string {
    const control = this.contatoForm.get(campo);

    if (control?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (control?.hasError('email')) {
      return 'Digite um e-mail válido';
    }
    if (control?.hasError('minlength')) {
      const min = control.errors?.['minlength'].requiredLength;
      return `Mínimo de ${min} caracteres`;
    }

    return '';
  }
}
