import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../services/produto.service';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss'
})
export class ProdutoFormComponent implements OnInit {
  @Input() produto: Product | null = null;
  @Output() onSave = new EventEmitter<Product>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.produto?.id || null],
      nome: [this.produto?.nome || '', Validators.required],
      valor: [this.produto?.valor || 0, [Validators.required, Validators.min(0)]]
    });
  }

    salvar() {
    if (this.form.valid) {
      this.onSave.emit(this.form.value);
    }


}
}
