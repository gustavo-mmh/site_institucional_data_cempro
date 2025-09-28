import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../services/produto.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit, OnDestroy {
  @Input() produto: Product | null = null;
  @Output() onSave = new EventEmitter<Product>();

  form!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.setupFormValidation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Inicializa o formulário com validações aprimoradas
   */
  private initializeForm(): void {
    this.form = this.fb.group({
      id: [this.produto?.id || null],
      nome: [
        this.produto?.nome || '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          this.noOnlyWhitespaceValidator
        ]
      ],
      valor: [
        this.produto?.valor || 0,
        [
          Validators.required,
          Validators.min(0.01),
          Validators.max(999999.99)
        ]
      ]
    });
  }

  /**
   * Configura validação em tempo real
   */
  private setupFormValidation(): void {
    // Observar mudanças no formulário para feedback visual em tempo real
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        // Aqui você pode adicionar lógica adicional se necessário
        this.updateFormStatus();
      });

    // Auto-formatação do campo valor
    this.form.get('valor')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value && value < 0) {
          this.form.get('valor')?.setValue(0, { emitEvent: false });
        }
      });

    // Trim automático no campo nome
    this.form.get('nome')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (typeof value === 'string' && value !== value.trim()) {
          this.form.get('nome')?.setValue(value.trim(), { emitEvent: false });
        }
      });
  }

  /**
   * Validador customizado para evitar apenas espaços em branco
   */
  private noOnlyWhitespaceValidator(control: any) {
    if (control.value && control.value.trim().length === 0) {
      return { whitespace: true };
    }
    return null;
  }

  /**
   * Atualiza o status do formulário (pode ser usado para lógica adicional)
   */
  private updateFormStatus(): void {
    // Marcar campos como touched quando o usuário começar a digitar
    if (this.form.dirty && !this.form.touched) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }

  /**
   * Salva o formulário com validação completa
   */
  salvar(): void {
    if (this.form.valid) {
      const formValue = this.form.value;

      // Limpar e formatar dados antes de enviar
      const produto: Product = {
        ...formValue,
        nome: formValue.nome.trim(),
        valor: parseFloat(formValue.valor)
      };

      this.onSave.emit(produto);
    } else {
      // Marcar todos os campos como touched para mostrar erros
      this.markAllFieldsAsTouched();
    }
  }

  /**
   * Marca todos os campos como touched para mostrar erros de validação
   */
  private markAllFieldsAsTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });
  }

  /**
   * Reseta o formulário para o estado inicial
   */
  resetForm(): void {
    this.form.reset();
    this.initializeForm();
  }

  /**
   * Verifica se um campo específico tem erro e foi touched
   */
  hasFieldError(fieldName: string, errorType?: string): boolean {
    const field = this.form.get(fieldName);
    if (!field) return false;

    if (errorType) {
      return field.hasError(errorType) && field.touched;
    }
    return field.invalid && field.touched;
  }

  /**
   * Obtém a mensagem de erro para um campo específico
   */
  getFieldErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;

    if (errors['required']) return `${this.getFieldLabel(fieldName)} é obrigatório`;
    if (errors['minlength']) return `${this.getFieldLabel(fieldName)} deve ter pelo menos ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength']) return `${this.getFieldLabel(fieldName)} não pode ter mais que ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['min']) return `${this.getFieldLabel(fieldName)} deve ser maior que ${errors['min'].min}`;
    if (errors['max']) return `${this.getFieldLabel(fieldName)} não pode ser maior que ${errors['max'].max}`;
    if (errors['whitespace']) return `${this.getFieldLabel(fieldName)} não pode conter apenas espaços`;

    return 'Campo inválido';
  }

  /**
   * Retorna o label do campo para mensagens de erro
   */
  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'nome': 'Nome',
      'valor': 'Valor'
    };
    return labels[fieldName] || fieldName;
  }

  /**
   * Verifica se o formulário é válido
   */
  get isFormValid(): boolean {
    return this.form.valid;
  }

  /**
   * Verifica se o formulário foi modificado
   */
  get isFormDirty(): boolean {
    return this.form.dirty;
  }

  /**
   * Obtém o valor atual do formulário
   */
  get formValue(): any {
    return this.form.value;
  }
}