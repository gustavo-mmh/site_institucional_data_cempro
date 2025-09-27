import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { ProdutoFormComponent } from "../produto-form/produto-form.component";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule, MatDialogContent, MatInputModule, MatButtonModule, MatDialogActions, ProdutoFormComponent, MatButton],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @ViewChild(ProdutoFormComponent) produtoForm?: ProdutoFormComponent;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  fechar(result?: any): void {
    this.dialogRef.close(result);
  }

  salvar() {
    if (this.produtoForm) {
      (this.produtoForm as any).salvar();
    }
  }
}
