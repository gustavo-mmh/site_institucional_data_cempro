import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { ProdutoFormComponent } from "../produto-form/produto-form.component";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

export interface DialogData {
  titulo: string;
  tipo: 'detalhes' | 'form' | 'confirmacao';
  produto: any;
}

@Component({
  selector: 'app-dialog',
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogTitle,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatIconModule,
    ProdutoFormComponent
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @ViewChild(ProdutoFormComponent) produtoForm?: ProdutoFormComponent;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log(data);
    this.dialogRef.updateSize('auto', 'auto');
    this.dialogRef.disableClose = false;
}
  ngOnInit(): void {
    this.setupDialogConfig();
  }

  private setupDialogConfig(): void {
    switch (this.data.tipo) {
      case 'confirmacao':
        this.dialogRef.disableClose = true; 
        break;
      case 'form':
        this.dialogRef.updateSize('500px', 'auto');
        break;
      case 'detalhes':
        this.dialogRef.updateSize('450px', 'auto');
        break;
    }
  }

  getDialogIcon(): string {
    const icons = {
      'detalhes': 'info',
      'form': 'edit',
      'confirmacao': 'warning'
    };
    return icons[this.data.tipo] || 'help';
  }

  isFormValid(): boolean {
    if (this.data.tipo !== 'form' || !this.produtoForm) {
      return true;
    }
    return this.produtoForm.form?.valid || false;
  }

  fechar(result?: any): void {
    this.dialogRef.close(result);
  }

  salvar(): void {
    if (this.produtoForm && this.isFormValid()) {
      this.produtoForm.salvar();
    } else {
      // Marcar campos como touched para mostrar erros de validação
      if (this.produtoForm?.form) {
        Object.keys(this.produtoForm.form.controls).forEach(key => {
          this.produtoForm!.form.get(key)?.markAsTouched();
        });
      }
    }
  }
  onEscapeKey(): void {
    if (this.data.tipo !== 'confirmacao') {
      this.fechar();
    }
  }
  onBackdropClick(): void {
    if (this.data.tipo === 'confirmacao') {
      return; // Não fecha em backdrop click para confirmações
    }
    this.fechar();
  }
}
