import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; import { FormsModule } from '@angular/forms'; import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service'; import { CarrinhoService } from '../services/carrinho.service';
import { ProdutoView } from '../services/models'; import { mapProduto } from '../services/produto-mapper';
@Component({selector:'app-busca',standalone:true,imports:[CommonModule,FormsModule,RouterLink],templateUrl:'./busca.html',styleUrl:'./busca.css'})
export class Busca implements OnInit {
 private api=inject(ApiService); private carrinho=inject(CarrinhoService);
 termoBusca=''; resultados:ProdutoView[]=[]; erro='';
 ngOnInit():void{this.buscar();}
 buscar():void{const t=this.termoBusca.trim();(t?this.api.buscarProdutos(t):this.api.listarProdutos()).subscribe({next:d=>{this.resultados=d.map(mapProduto);this.erro='';},error:()=>this.erro='Falha ao consultar produtos. Verifique o backend.'});}
 limparBusca():void{this.termoBusca='';this.buscar();}
 adicionar(p:ProdutoView):void{this.carrinho.adicionar(p);alert('Produto adicionado ao carrinho!');}
}
