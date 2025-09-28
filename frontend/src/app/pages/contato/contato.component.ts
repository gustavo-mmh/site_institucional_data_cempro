import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent {
  contatoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contatoService: ContatoService,
    private toastr: ToastrService
  ) {
    this.contatoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensagem: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contatoForm.valid) {
      this.contatoService.enviarContato(this.contatoForm.value).subscribe({
        next: () => {
          this.toastr.success('Mensagem enviada com sucesso!', 'Contato');
          this.contatoForm.reset();
        },
        error: (err: any) => {
          console.error(err);
          this.toastr.error('Erro ao enviar mensagem.', 'Contato');
        }
      });
    } else {
      this.toastr.warning('Preencha todos os campos corretamente!', 'Validação');
    }
  }
}
