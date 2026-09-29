import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-esqueci',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './esqueci.html',
  styleUrl: './esqueci.css'
})
export class Esqueci {
  email: string = '';

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

    if (!this.email.trim()) {
      this.mensagemErro = ' Entrada Ínvalida';
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
    console.log('Recuperação enviada com sucesso!');
    alert('Recuperação Enviada!');
  }
}