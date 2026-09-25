import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  descricao: string;
}

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-vitrine',
  styleUrl: './vitrine.css', 
  templateUrl: './vitrine.html',
  standalone: true,
})
export class Vitrine 
{
  // Lista de produtos mockados
  produtos: Produto[] = [
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
      imagem: 'https://via.placeholder.com/250x200?text=Spinner+Dourado',
      descricao: ''
      //descricao: 'Corpo em liga de zinco com acabamento premium e giro longo.'
    },
    {
      id: 5,
      nome: 'Fidget Spinner LED Brilha no Escuro',
      preco: 29.90,
      imagem: 'https://via.placeholder.com/250x200?text=Spinner+LED',
      descricao: 'Luzes LED ajustáveis em cada uma das pontas.'
    },
    {
      id: 6,
      nome: 'Fidget Spinner Camuflado',
      preco: 24.90,
      imagem: 'https://via.placeholder.com/250x200?text=Spinner+Camuflado',
      descricao: 'Estampa camuflada militar com peso balanceado.'
    }
  ];

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
    this.indiceAtual = this.produtos.length -1;
  } else {
    this.indiceAtual--;
  }
}

proximo() {
  if (this.indiceAtual === this.produtos.length -1) {
    this.indiceAtual = 0;
  } else {
    this.indiceAtual++;
  }
}
}
