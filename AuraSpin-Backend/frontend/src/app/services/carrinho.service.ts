import { Injectable } from '@angular/core';
import { ProdutoView } from './models';
export interface ItemCarrinho { produto: ProdutoView; quantidade: number; }
@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  private chave = 'aura-spin-carrinho';
  itens(): ItemCarrinho[] { try { return JSON.parse(localStorage.getItem(this.chave) || '[]'); } catch { return []; } }
  salvar(itens: ItemCarrinho[]): void { localStorage.setItem(this.chave, JSON.stringify(itens)); }
  adicionar(produto: ProdutoView): void {
    const itens = this.itens(); const item = itens.find(i => i.produto.codigo === produto.codigo);
    if (item) item.quantidade++; else itens.push({ produto, quantidade: 1 });
    this.salvar(itens);
  }
  alterar(codigo: number, delta: number): void {
    const itens = this.itens().map(i => i.produto.codigo === codigo ? { ...i, quantidade: i.quantidade + delta } : i).filter(i => i.quantidade > 0);
    this.salvar(itens);
  }
  remover(codigo: number): void { this.salvar(this.itens().filter(i => i.produto.codigo !== codigo)); }
  limpar(): void { localStorage.removeItem(this.chave); }
}
