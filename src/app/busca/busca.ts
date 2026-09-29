import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Produto, produtos } from '../vitrine/vitrine';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './busca.html',
  styleUrl: './busca.css'
})
export class Busca {
  
  termoBusca: string = '';

  // 2. CORREÇÃO: Atribuição do array 'produtos' em vez do nome da classe 'Vitrine'
  produtos: Produto[] = produtos;
  resultados: Produto[] = [...this.produtos];

  buscar(): void {
    const termo = this.termoBusca.toLowerCase().trim();
    
    if (!termo) {
      this.resultados = [...this.produtos];
      return;
    }

    this.resultados = this.produtos.filter(p => 
      p.nome.toLowerCase().includes(termo) || 
      p.descricao.toLowerCase().includes(termo)
    );
  }

  limparBusca(): void {
    this.termoBusca = '';
    this.resultados = [...this.produtos];
  }

  adicionarAoCarrinho(produto: Produto): void {
    const carrinho = JSON.parse(
      localStorage.getItem('carrinho') || '[]'
    );

    const itemExistente = carrinho.find(
      (item: any) => item.id === produto.id
    );

    if (itemExistente) {
      itemExistente.quantidade++;
      } else {
        carrinho.push({
          id: produto.id,
          quantidade: 1
        });
    }

    localStorage.setItem(
      'carrinho',
      JSON.stringify(carrinho)
    );
  }
}