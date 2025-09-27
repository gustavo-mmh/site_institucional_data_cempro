import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product, ProdutoService } from '../../services/produto.service';
import { AuthService } from '../../services/auth.service';

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
  constructor(private authService: AuthService, private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.getProducts().subscribe({
      next: (produtos) => this.dataSource.data = produtos,
      error: (err) => console.error('Erro ao carregar produtos:', err)
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  criarProduto() {
  //   // const novo: Product = { id: 0, nome: 'Novo Produto', valor: 99.90 };
  //   this.produtoService.createProduct(novo).subscribe({
  //     next: () => this.ngOnInit(),
  //     error: (err) => console.error('Erro ao criar produto:', err)
  //   });
  }

  editar(produto: Product) {
    const atualizado = { ...produto, preco: produto.valor + 10 };
    this.produtoService.updateProduct(produto.id, atualizado).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error('Erro ao atualizar produto:', err)
    });
  }

  deletar(produto: Product) {
    this.produtoService.deleteProduct(produto.id).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error('Erro ao deletar produto:', err)
    });
  }

}
