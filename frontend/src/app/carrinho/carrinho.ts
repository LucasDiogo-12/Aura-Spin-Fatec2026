import { Component, inject } from '@angular/core'; import { CommonModule } from '@angular/common'; import { Router } from '@angular/router';
import { ApiService } from '../services/api.service'; import { CarrinhoService, ItemCarrinho } from '../services/carrinho.service'; import { PedidoApi } from '../services/models';
@Component({selector:'app-carrinho',standalone:true,imports:[CommonModule],templateUrl:'./carrinho.html',styleUrl:'./carrinho.css'})
export class Carrinho {
 private carrinho=inject(CarrinhoService); private api=inject(ApiService); private router=inject(Router);
 itens:ItemCarrinho[]=this.carrinho.itens(); mensagem='';erro='';enviando=false;
 get total():number{return this.itens.reduce((s,i)=>s+i.produto.valor*i.quantidade,0);}
 atualizar():void{this.itens=this.carrinho.itens();}
 alterar(c:number,d:number):void{this.carrinho.alterar(c,d);this.atualizar();}
 remover(c:number):void{this.carrinho.remover(c);this.atualizar();}
 finalizar():void{
  const cliente=JSON.parse(localStorage.getItem('aura-spin-cliente')||'null');
  if(!cliente?.codigo){this.erro='Entre na sua conta antes de finalizar o pedido.';return;}
  if(!this.itens.length){this.erro='Seu carrinho está vazio.';return;}
  const pedido:PedidoApi={valorTotal:this.total,entrega:cliente.logradouro||'A combinar',obs:'Pedido realizado pelo site Aura Spin. Itens: '+this.itens.map(i=>`${i.produto.nome} x${i.quantidade}`).join('; '),dataPedido:new Date().toISOString().slice(0,10),codigoCliente:cliente.codigo};
  this.enviando=true;this.api.criarPedido(pedido).subscribe({next:r=>{this.mensagem=r;this.carrinho.limpar();this.atualizar();this.enviando=false;},error:e=>{this.erro=e.error||'Falha ao registrar pedido na API.';this.enviando=false;}});
 }
}
