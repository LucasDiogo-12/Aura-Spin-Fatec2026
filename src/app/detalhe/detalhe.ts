import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto, produtos } from '../vitrine/vitrine';

@Component({
  imports: [CommonModule],
  selector: 'app-detalhe',
  styleUrl: './detalhe.css',
  templateUrl: './detalhe.html',
  standalone: true,
})

export class Detalhe {
  produto!: Produto;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );
    this.produto = produtos.find(
      produto => produto.id === id
    )!;
  }

  adicionarAoCarrinho() {
    const carrinho = JSON.parse(
      localStorage.getItem('carrinho') || '[]'
    );
    const itemExistente = carrinho.find(
      (item: any) => item.id === this.produto.id
    );
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinho.push({
        id: this.produto.id,
        quantidade: 1
      });
    }

    localStorage.setItem(
      'carrinho',
      JSON.stringify(carrinho)
    );
  }

  comprarAgora() {
    this.adicionarAoCarrinho();
    this.router.navigate(['/carrinho']);
  }
}
