import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contato {
  nome: string;
  email: string;
  mensagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = 'http://localhost:5138/api/v1/contato'; // ajuste para sua API

  constructor(private http: HttpClient) { }

  enviarContato(dados: Contato): Observable<any> {
  debugger
    return this.http.post(this.apiUrl, dados, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
