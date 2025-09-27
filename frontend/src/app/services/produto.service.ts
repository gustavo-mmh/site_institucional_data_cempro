import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface centralizada (se preferir pode mover para /models/produto.ts)
export interface Product {
  id: number;
  nome: string;
  valor: number;
  dataInclusao: string,
  dataAlteracao:string
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost:5138/api/v1/produtos'; 

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/:${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createProduct(produto: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, produto, {
      headers: this.getAuthHeaders()
    });
  }

  updateProduct(id: number, produto: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/:${id}`, produto, {
      headers: this.getAuthHeaders()
    });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/:${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
