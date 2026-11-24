import { Component, inject } from '@angular/core'; import { CommonModule } from '@angular/common'; import { FormsModule } from '@angular/forms'; import { Router } from '@angular/router';
import { ApiService } from '../services/api.service'; import { ClienteApi } from '../services/models';
@Component({selector:'app-cadastro',standalone:true,imports:[CommonModule,FormsModule],templateUrl:'./cadastro.html',styleUrl:'./cadastro.css'})
export class Cadastro {
 private api=inject(ApiService); private router=inject(Router);
 cliente:ClienteApi={nome:'',telefone:'',documento:'',senha:'',logradouro:'',email:'',ativo:1}; mensagem=''; erro=''; enviando=false;
 cadastrar():void{this.erro='';this.mensagem='';if(!this.cliente.nome||!this.cliente.email||!this.cliente.senha){this.erro='Preencha nome, email e senha.';return;}
 this.enviando=true;this.api.criarCliente(this.cliente).subscribe({next:r=>{this.mensagem=r;this.enviando=false;setTimeout(()=>this.router.navigate(['/login']),900);},error:e=>{this.erro=e.error||'Não foi possível cadastrar. Confira a API.';this.enviando=false;}});}
}
