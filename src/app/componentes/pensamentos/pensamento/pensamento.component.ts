import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {

  @Input() pensamento: Pensamento  = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  };

  @Input() listaFavoritos: Pensamento[] = [];

  constructor(
    private pensamentoService: PensamentoService
  ) { }

  ngOnInit(): void {
  }

  larguraPensamento(): string {
    if (this.pensamento.conteudo.length >= 256)
      return 'pensamento-g';

    return 'pensamento-p';
  }

  checaIconeFavorito(): string {
    if(this.pensamento.favorito)
      return 'ativo';

    return 'inativo'
  }

  atualizarFavorito(): void {
    this.pensamentoService.atualizarFavorito(this.pensamento).subscribe(() => {
      this.removerPensamentoDaLista();
      
    });
  }

  removerPensamentoDaLista(): void {
    const index: number = this.listaFavoritos.indexOf(this.pensamento);
    this.listaFavoritos.splice(index, 1);
  }

}
