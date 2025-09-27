import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

interface Produto {
  id: number;
  nome: string;
  valor: number;
  dataInclusao: string;
  dataAlteracao: string;
}

@Component({
  selector: 'app-crud-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crud-cliente.component.html',
  styleUrl: './crud-cliente.component.scss'
})
export class CrudClienteComponent {
  produtos: Produto[] = [];
  apiUrl = 'http://localhost:5138/api/v1/produtos';

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  ngOnInit() {
    this.getProdutos();
  }

  getProdutos() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<Produto[]>(this.apiUrl, { headers }).subscribe({
      next: (res) => (this.produtos = res),
      error: (err) => console.error('Erro ao buscar produtos', err)
  });
}

}
