import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  endereco: string = '';
  dataNascimento: string = '';

  mostrarAviso: boolean = false;
  mensagemErro: string = '';
  mensagemSucesso: string = '';

  emailsValidos: string[] = [
    '@gmail.com',
    '@outlook.com',
    '@hotmail.com',
    '@yahoo.com',
    '@live.com',
    '@icloud.com'
  ];

  validar(): void {
    this.mostrarAviso = false;
    this.mensagemErro = '';
    this.mensagemSucesso = '';
    if (
      !this.nome.trim() ||
      !this.email.trim() ||
      !this.senha.trim() ||
      !this.confirmarSenha.trim() ||
      !this.endereco.trim() ||
      !this.dataNascimento
    ) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios.';
      this.mostrarAviso = true;
      return;
    }
    const minusculo = this.email.toLowerCase().trim();
    const emailValido = this.emailsValidos.some(dominio => minusculo.endsWith(dominio));

    if (!emailValido) {
      this.mensagemErro = 'Insira um email válido';
      this.mostrarAviso = true;
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.mensagemErro = 'As senhas digitadas não são iguais'
      this.mostrarAviso = true;
      return;
    }

    if (this.senha.length < 6) {
      this.mensagemErro = 'A senha deve ter no mínimo 6 caracteres.';
      this.mostrarAviso = true;
      return;
    }

    this.mensagemSucesso = 'Cadastro realizado com sucesso!';
  }
}