import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { Product, ProdutoService } from '../../services/produto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'preco', 'acoes'];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  produtos: Product[] = [];
  role: string | null = null;
  errorMessage: string | null = null;
  constructor(
    private produtoService: ProdutoService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
     this.loadProducts();
  }
  
  loadProducts(): void {
    this.produtoService.getProducts().subscribe({
      next: (data) => {
        this.produtos = data;
        this.dataSource.data = this.produtos;
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.errorMessage = 'Erro ao carregar produtos';
      }
    });
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  get isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'Admin';
  }


  detalheProduto(produto: Product) {
    this.dialog.open(DialogComponent, {
      data: {
        width: '500px',
        titulo: 'Detalhes do Produto',
        tipo: 'detalhes',
        produto
      }
    });
  }
  abrirForm(produto?: Product) {
    if (!this.isAdmin) {
      this.toastr.error('Apenas Admins podem gerenciar produtos', 'Erro');
      return;
    }
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        titulo: produto ? 'Editar Produto' : 'Novo Produto',
        tipo: 'form',
        produto: produto || null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (produto) {
          this.produtoService.updateProduct(produto.id, result).subscribe(() => this.loadProducts() );
        } else {
          if (result.id === null || result.id === undefined) {
            delete result.id;
          }
          this.produtoService.createProduct(result).subscribe(() => this.loadProducts());
        }
      }
    });
  }
  abrirConfirmacao(produto: Product) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        titulo: 'Confirmação',
        tipo: 'confirmacao',
        produto
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.produtoService.deleteProduct(produto.id).subscribe(() => this.loadProducts());
      }
    });
  }
}
