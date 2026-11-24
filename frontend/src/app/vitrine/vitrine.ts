import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service'; import { CarrinhoService } from '../services/carrinho.service';
import { ProdutoView } from '../services/models'; import { mapProduto } from '../services/produto-mapper';
@Component({imports:[CommonModule,RouterLink],selector:'app-vitrine',styleUrl:'./vitrine.css',templateUrl:'./vitrine.html',standalone:true})
export class Vitrine implements OnInit {
 private api=inject(ApiService); private carrinho=inject(CarrinhoService);
 produtos:ProdutoView[]=[]; carregando=true; erro=''; indiceAtual=0;
 ngOnInit():void { this.api.vitrineProdutos().subscribe({next:d=>{this.produtos=d.map(mapProduto);this.carregando=false;},error:()=>this.api.listarProdutos().subscribe({next:d=>{this.produtos=d.map(mapProduto);this.carregando=false;},error:()=>{this.erro='Não foi possível conectar à API na porta 8081.';this.carregando=false;}})}); }
 get produtosVisiveis():ProdutoView[]{if(!this.produtos.length)return [];return [0,1,2].map(i=>this.produtos[(this.indiceAtual+i)%this.produtos.length]).filter(Boolean);}
 anterior():void{if(this.produtos.length)this.indiceAtual=(this.indiceAtual-1+this.produtos.length)%this.produtos.length;}
 proximo():void{if(this.produtos.length)this.indiceAtual=(this.indiceAtual+1)%this.produtos.length;}
 adicionar(p:ProdutoView):void{this.carrinho.adicionar(p);alert('Produto adicionado ao carrinho!');}
}
