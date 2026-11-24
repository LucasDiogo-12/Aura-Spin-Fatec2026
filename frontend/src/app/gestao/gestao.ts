import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ClienteApi, PedidoApi, ProdutoApi } from '../services/models';

@Component({ selector: 'app-gestao', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './gestao.html' })
export class Gestao implements OnInit {
  private api = inject(ApiService);
  produtos: ProdutoApi[] = []; clientes: ClienteApi[] = []; pedidos: PedidoApi[] = [];
  produtoNovo(): ProdutoApi { return { nome: '', descritivo: '', valor: null as any, valorPromo: 0, quantidade: 0, destaque: 0, imagem: '' }; }
  clienteNovo(): ClienteApi { return { nome: '', telefone: '', documento: '', senha: '', logradouro: '', email: '', ativo: 1 }; }
  pedidoNovo(): PedidoApi { return { valorTotal: null as any, entrega: '', obs: '', dataPedido: new Date().toISOString().slice(0,10), codigoCliente: null as any }; }
  produto: ProdutoApi = this.produtoNovo(); cliente: ClienteApi = this.clienteNovo(); pedido: PedidoApi = this.pedidoNovo();
  clienteConsultaCodigo = 0; pedidoConsultaCodigo = 0; retorno = ''; erro = '';
  ngOnInit(): void { this.carregarTudo(); }
  limparMensagens(): void { this.retorno = ''; this.erro = ''; }
  carregarTudo(): void { this.carregarProdutos(); this.carregarClientes(); this.carregarPedidos(); }
  carregarProdutos(): void { this.api.listarProdutos().subscribe({ next: d => this.produtos = d, error: () => this.erro = 'Não foi possível listar produtos.' }); }
  salvarProduto(): void {
    this.limparMensagens();
    if (!this.produto.nome?.trim() || !Number.isFinite(Number(this.produto.valor)) || Number(this.produto.valor) <= 0) { this.erro = 'Informe nome e valor maior que zero para o produto.'; return; }
    const payload: ProdutoApi = { ...this.produto, nome: this.produto.nome.trim(), valor: Number(this.produto.valor), quantidade: Number(this.produto.quantidade || 0), valorPromo: Number(this.produto.valorPromo || 0), destaque: Number(this.produto.destaque || 0), imagem: this.produto.imagem?.trim() || '' };
    const req = payload.codigo ? this.api.atualizarProduto(payload) : this.api.criarProduto(payload);
    req.subscribe({ next: r => { this.retorno = r; this.produto = this.produtoNovo(); this.carregarProdutos(); }, error: e => this.erro = e.error || 'Falha ao salvar produto.' });
  }
  editarProduto(p: ProdutoApi): void { this.limparMensagens(); this.produto = { ...p }; }
  cancelarProduto(): void { this.produto = this.produtoNovo(); }
  selecionarImagem(event: Event): void {
    const arquivo = (event.target as HTMLInputElement).files?.[0];
    if (!arquivo) return;
    if (!arquivo.type.startsWith("image/")) { this.erro = "Selecione um arquivo de imagem."; return; }
    const leitor = new FileReader();
    leitor.onload = () => this.produto.imagem = String(leitor.result || "");
    leitor.readAsDataURL(arquivo);
  }
  excluirProduto(codigo?: number): void { if (codigo && confirm('Excluir este produto?')) this.api.excluirProduto(codigo).subscribe({ next: r => { this.retorno = r; this.carregarProdutos(); }, error: () => this.erro = 'Falha ao excluir produto.' }); }

  carregarClientes(): void { this.api.listarClientes().subscribe({ next: d => this.clientes = d.filter(c => !!c.codigo), error: () => this.erro = 'Não foi possível listar clientes.' }); }
  cadastrarCliente(): void {
    this.limparMensagens();
    if (!this.cliente.nome.trim() || !this.cliente.email.trim() || !this.cliente.senha.trim()) { this.erro = 'Nome, email e senha são obrigatórios.'; return; }
    this.api.criarCliente(this.cliente).subscribe({ next: r => { this.retorno = r; this.cliente = this.clienteNovo(); this.carregarClientes(); }, error: e => this.erro = e.error || 'Falha ao cadastrar cliente.' });
  }
  consultarCliente(): void { this.limparMensagens(); if (!this.clienteConsultaCodigo) { this.erro = 'Informe o código do cliente.'; return; } this.api.obterCliente(this.clienteConsultaCodigo).subscribe({ next: c => { if (!c.codigo) { this.cliente = this.clienteNovo(); this.erro = 'Cliente não encontrado.'; } else this.cliente = { ...c }; }, error: () => this.erro = 'Falha ao consultar cliente.' }); }
  selecionarCliente(c: ClienteApi): void { this.cliente = { ...c }; }
  limparCliente(): void { this.cliente = this.clienteNovo(); }
  atualizarCliente(): void { if (!this.cliente.codigo) return; this.api.atualizarCliente(this.cliente).subscribe({ next: r => { this.retorno = r; this.carregarClientes(); }, error: e => this.erro = e.error || 'Falha ao atualizar cliente.' }); }
  excluirCliente(codigo?: number): void { const id = codigo || this.cliente.codigo; if (id && confirm('Excluir este cliente?')) this.api.excluirCliente(id).subscribe({ next: r => { this.retorno = r; this.cliente = this.clienteNovo(); this.carregarClientes(); }, error: () => this.erro = 'Falha ao excluir cliente.' }); }

  carregarPedidos(): void { this.api.listarPedidos().subscribe({ next: d => this.pedidos = d.filter(p => !!p.codigoPedido), error: () => this.erro = 'Não foi possível listar pedidos.' }); }
  cadastrarPedido(): void {
    this.limparMensagens();
    if (!(Number(this.pedido.valorTotal) > 0) || !(Number(this.pedido.codigoCliente) > 0) || !this.pedido.entrega.trim() || !this.pedido.dataPedido) { this.erro = 'Informe valor total, código do cliente, entrega e data.'; return; }
    this.api.criarPedido({ ...this.pedido, valorTotal: Number(this.pedido.valorTotal), codigoCliente: Number(this.pedido.codigoCliente) }).subscribe({ next: r => { this.retorno = r; this.pedido = this.pedidoNovo(); this.carregarPedidos(); }, error: e => this.erro = e.error || 'Falha ao cadastrar pedido. Confira se o cliente existe.' });
  }
  consultarPedido(): void { this.limparMensagens(); if (!this.pedidoConsultaCodigo) { this.erro = 'Informe o código do pedido.'; return; } this.api.obterPedido(this.pedidoConsultaCodigo).subscribe({ next: p => { if (!p.codigoPedido) { this.pedido = this.pedidoNovo(); this.erro = 'Pedido não encontrado.'; } else this.pedido = { ...p }; }, error: () => this.erro = 'Falha ao consultar pedido.' }); }
  selecionarPedido(p: PedidoApi): void { this.pedido = { ...p }; }
  limparPedido(): void { this.pedido = this.pedidoNovo(); }
  atualizarPedido(): void { if (!this.pedido.codigoPedido) return; this.api.atualizarPedido(this.pedido).subscribe({ next: r => { this.retorno = r; this.carregarPedidos(); }, error: e => this.erro = e.error || 'Falha ao atualizar pedido.' }); }
  excluirPedido(codigo?: number): void { const id = codigo || this.pedido.codigoPedido; if (id && confirm('Excluir este pedido?')) this.api.excluirPedido(id).subscribe({ next: r => { this.retorno = r; this.pedido = this.pedidoNovo(); this.carregarPedidos(); }, error: () => this.erro = 'Falha ao excluir pedido.' }); }
}
