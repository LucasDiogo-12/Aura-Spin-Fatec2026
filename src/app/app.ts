import { Component, signal, HostListener  } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('aura-spin');
  girando: boolean = false;
  private timer: any;

  quantidadeCarrinho = 0;
  @HostListener('window:carrinhoAtualizado')
    atualizarQuantidadeCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

    this.quantidadeCarrinho = carrinho.reduce(
      (total: number, item: any) => total + item.quantidade,
      0
    );
  }

  giraPorTempo(segundos: number = 3): void {
    // Se já estiver girando, cancela o timer anterior para reiniciar
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.girando = true;

    // Converte segundos para milissegundos e desliga a classe ao finalizar
    this.timer = setTimeout(() => {
      this.girando = false;
    }, segundos * 1000);
  }
}
