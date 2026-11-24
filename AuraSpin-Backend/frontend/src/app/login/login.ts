import { Component, inject } from '@angular/core'; import { CommonModule } from '@angular/common'; import { FormsModule } from '@angular/forms'; import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
@Component({selector:'app-login',standalone:true,imports:[CommonModule,FormsModule,RouterLink],templateUrl:'./login.html',styleUrl:'./login.css'})
export class Login {
 private api=inject(ApiService); private router=inject(Router);
 email='';senha='';erro='';sucesso='';
 entrar():void{this.erro='';this.api.login(this.email,this.senha).subscribe({next:c=>{if(!c.codigo){this.erro='Email ou senha inválidos, ou cliente inativo.';return;}localStorage.setItem('aura-spin-cliente',JSON.stringify(c));this.sucesso='Login realizado com sucesso!';this.router.navigate(['/']);},error:()=>this.erro='Não foi possível realizar login. Verifique se a API está ativa.'});}
}
