import { Routes } from '@angular/router';
import { Vitrine } from './vitrine/vitrine';
import { Detalhe } from './detalhe/detalhe';
import { Busca } from './busca/busca';
import { Carrinho } from './carrinho/carrinho';
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { Esqueci } from './esqueci/esqueci';

export const routes: Routes = [
  { path: '', component: Vitrine },
  { path: 'detalhe', component: Detalhe },
  { path: 'busca', component: Busca },
  { path: 'carrinho', component: Carrinho },
  { path: 'login', component: Login },  
  { path: 'cadastro', component: Cadastro },
  { path: 'esqueci', component: Esqueci },
  { path: '**', redirectTo: '' }
];