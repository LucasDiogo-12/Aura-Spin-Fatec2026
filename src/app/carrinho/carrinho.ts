import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto, produtos } from '../vitrine/vitrine';

interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
  selecionado: boolean;
}

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-carrinho',
  styleUrl: './carrinho.css',
  templateUrl: './carrinho.html',
  standalone: true,
})
export class Carrinho {

  itens: ItemCarrinho[] = [];

  ngOnInit() {

    const carrinho = JSON.parse(
      localStorage.getItem('carrinho') || '[]'
    );

    this.itens = carrinho
      .map((item: any) => {

        const produto = produtos.find(
          produto => produto.id === item.id
        );

        if (!produto) {
          return null;
        }

        return {
          produto: produto,
          quantidade: item.quantidade,
          selecionado: true
        };

      })
      .filter((item: ItemCarrinho | null) => item !== null) as ItemCarrinho[];

  }

  aumentarQuantidade(item: ItemCarrinho) {
    item.quantidade++;
    this.salvarCarrinho();
  }

  diminuirQuantidade(item: ItemCarrinho) {

    if (item.quantidade > 1) {
      item.quantidade--;
      this.salvarCarrinho();
    }

  }

  excluir(item: ItemCarrinho) {

    this.itens = this.itens.filter(
      i => i.produto.id !== item.produto.id
    );

    this.salvarCarrinho();

  }

  salvarCarrinho() {

    const carrinho = this.itens.map(item => ({
      id: item.produto.id,
      quantidade: item.quantidade
    }));

    localStorage.setItem(
      'carrinho',
      JSON.stringify(carrinho)
    );

    window.dispatchEvent(new Event('carrinhoAtualizado'));
  }

  get subtotal() {

    return this.itens
      .filter(item => item.selecionado)
      .reduce(
        (total, item) =>
          total + item.produto.preco * item.quantidade,
        0
      );

  }

}