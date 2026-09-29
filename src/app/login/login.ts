import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = '';
  senha: string = '';

  mostrarAviso: boolean = false;
  mensagemErro: string = '';

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

    if (!this.email.trim() || !this.senha.trim()) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios';
      this.mostrarAviso = true;
      return;
    }
    const minusculo = this.email.toLowerCase().trim();
    const emailValido = this.emailsValidos.some(email => minusculo.endsWith(email));

    if (!emailValido) {
      this.mensagemErro = 'Insira um email válido';
      this.mostrarAviso = true;
      return;
    }
  }
}