import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteApi, PedidoApi, ProdutoApi } from './models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  readonly baseUrl = 'http://localhost:8081/api';

  // PRODUTO: vitrine, busca e CRUD
  listarProdutos(): Observable<ProdutoApi[]> { return this.http.get<ProdutoApi[]>(`${this.baseUrl}/produtos`); }
  vitrineProdutos(): Observable<ProdutoApi[]> { return this.http.get<ProdutoApi[]>(`${this.baseUrl}/produto/vitrine`); }
  buscarProdutos(termo: string): Observable<ProdutoApi[]> {
    return this.http.get<ProdutoApi[]>(`${this.baseUrl}/produto/busca/${encodeURIComponent(termo)}`);
  }
  obterProduto(codigo: number): Observable<ProdutoApi> { return this.http.get<ProdutoApi>(`${this.baseUrl}/produto/${codigo}`); }
  criarProduto(produto: ProdutoApi): Observable<string> { return this.http.post(`${this.baseUrl}/produto`, produto, { responseType: 'text' }); }
  atualizarProduto(produto: ProdutoApi): Observable<string> { return this.http.put(`${this.baseUrl}/produto`, produto, { responseType: 'text' }); }
  excluirProduto(codigo: number): Observable<string> { return this.http.delete(`${this.baseUrl}/produto/${codigo}`, { responseType: 'text' }); }

  // CLIENTE: cadastro, login, consulta e manutenção
  listarClientes(): Observable<ClienteApi[]> { return this.http.get<ClienteApi[]>(`${this.baseUrl}/clientes`); }
  obterCliente(codigo: number): Observable<ClienteApi> { return this.http.get<ClienteApi>(`${this.baseUrl}/cliente/${codigo}`); }
  criarCliente(cliente: ClienteApi): Observable<string> { return this.http.post(`${this.baseUrl}/cliente`, cliente, { responseType: 'text' }); }
  atualizarCliente(cliente: ClienteApi): Observable<string> { return this.http.put(`${this.baseUrl}/cliente`, cliente, { responseType: 'text' }); }
  excluirCliente(codigo: number): Observable<string> { return this.http.delete(`${this.baseUrl}/cliente/${codigo}`, { responseType: 'text' }); }
  login(email: string, senha: string): Observable<ClienteApi> {
    return this.http.post<ClienteApi>(`${this.baseUrl}/cliente/login`, { email, senha });
  }
  resetarSenha(email: string): Observable<string> {
    return this.http.patch(`${this.baseUrl}/cliente/resetarSenha`, { email }, { responseType: 'text' });
  }
  alterarSenha(email: string, documento: string, senha: string): Observable<string> {
    return this.http.patch(`${this.baseUrl}/cliente/alterarSenha`, { email, documento, senha }, { responseType: 'text' });
  }

  // PEDIDO: criação, consulta, listagem, alteração e exclusão
  listarPedidos(): Observable<PedidoApi[]> { return this.http.get<PedidoApi[]>(`${this.baseUrl}/pedidos`); }
  obterPedido(codigo: number): Observable<PedidoApi> { return this.http.get<PedidoApi>(`${this.baseUrl}/pedido/${codigo}`); }
  criarPedido(pedido: PedidoApi): Observable<string> { return this.http.post(`${this.baseUrl}/pedido`, pedido, { responseType: 'text' }); }
  atualizarPedido(pedido: PedidoApi): Observable<string> { return this.http.put(`${this.baseUrl}/pedido`, pedido, { responseType: 'text' }); }
  excluirPedido(codigo: number): Observable<string> { return this.http.delete(`${this.baseUrl}/pedido/${codigo}`, { responseType: 'text' }); }
}
