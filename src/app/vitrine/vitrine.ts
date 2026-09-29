import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  descricao: string;
}

export const produtos: Produto[] = [
  {
    id: 1,
    nome: 'Fidget Spinner Clássico Azul',
    preco: 19.90,
    imagem: 'assets/FS_Azul.png',
    descricao: 'Modelo padrão com rolamento central de alta precisão.'
  },
  {
    id: 2,
    nome: 'Fidget Spinner Clássico Verde',
    preco: 19.90,
    imagem: 'assets/FS_Verde.png',
    descricao: 'Modelo padrão com rolamento central de alta precisão.'
  },
  {
    id: 3,
    nome: 'Fidget Spinner Clássico Vermelho',
    preco: 19.90,
    imagem: 'assets/FS_Vermelho.png',
    descricao: 'Modelo padrão com rolamento central de alta precisão.'
  },
  {
    id: 4,
    nome: 'Fidget Spinner Metálico Dourado',
    preco: 39.90,
    imagem: 'assets/FS-Dourado.png',
    descricao: ''
  },
  {
    id: 5,
    nome: 'Fidget Spinner Metálico Prateado',
    preco: 39.90,
    imagem: 'assets/FS-Prateado.png',
    descricao: ''
  },
  {
    id: 6,
    nome: 'Fidget Spinner Camuflado',
    preco: 24.90,
    imagem: 'assets/FS-Camuflado.png',
    descricao: 'Estampa camuflada militar com peso balanceado.'
  },
  {
    id: 7,
    nome: 'Fidget Spinner LED Brilha no Escuro',
    preco: 19.90,
    imagem: 'assets/FS-Led.png',
    descricao: 'Luzes LED ajustáveis em cada uma das pontas.'
  },
  {
    id: 8,
    nome: 'Fidget Spinner Camuflado Verde',
    preco: 9.99,
    imagem: 'assets/FS-CamuVerde.png',
    descricao: 'Estampa camuflada militar verde com peso balanceado.'
  }
];

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-vitrine',
  styleUrl: './vitrine.css', 
  templateUrl: './vitrine.html',
  standalone: true,
})
export class Vitrine {
  produtosEmPromocao = [
    {
      id: 7,
      nome: 'Fidget Spinner LED Brilha no Escuro',
      imagem: 'assets/FS-Led.png',
      descricao: 'Luzes LED ajustáveis em cada uma das pontas.',
      precoOriginal: 39.90,
      precoPromocional: 19.90,
      desconto: 20
    },
    {
      id: 8,
      nome: 'Fidget Spinner Camuflado Verde',
      descricao: 'Estampa camuflada militar verde com peso balanceado.',
      imagem: 'assets/FS-CamuVerde.png',
      precoOriginal: 29.99,
      precoPromocional: 9.99,
      desconto: 20
    }
  ];

  produtos: Produto[] = produtos;
  mostrarAlerta = false;

  indiceAtual = 0;

  get produtosVisiveis() {
    return [
      this.produtos[this.indiceAtual],
      this.produtos[(this.indiceAtual + 1) % this.produtos.length],
      this.produtos[(this.indiceAtual + 2) % this.produtos.length]
    ];
  }

  anterior() {
    if (this.indiceAtual === 0) {
      this.indiceAtual = this.produtos.length - 1;
    } else {
      this.indiceAtual--;
    }
  }

  proximo() {
    if (this.indiceAtual === this.produtos.length - 1) {
      this.indiceAtual = 0;
    } else {
      this.indiceAtual++;
    }
  }

 adicionarAoCarrinho(produto: any) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

  const itemExistente = carrinho.find(
    (item: any) => item.id === produto.id
  );

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.precoPromocional || produto.preco,
      imagem: produto.imagem,
      quantidade: 1
    });
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  window.dispatchEvent(new Event('carrinhoAtualizado'));

  this.mostrarAlerta = true;

    setTimeout(() => {
      this.mostrarAlerta = false;
    }, 3000);
 }
}