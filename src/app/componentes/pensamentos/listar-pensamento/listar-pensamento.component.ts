import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  titulo: string = "Meu Mural"
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = "";
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  constructor(
    private pensamentoService: PensamentoService
  ) { }

  ngOnInit(): void {
    this.listarPensamentos();
  }

  listarPensamentos(): void {
    this.reiniciarPaginaAtual();
    this.atualizarEstadoBotaoVerMais(true);
    this.pensamentoService.listar().subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos;
      this.atualizarTitulo();
      this.popularListaFavoritos();
    });
  }

  atualizarFiltro(): void {
    this.pensamentoService.filtro = this.filtro;
    this.listarPensamentos();
  }

  buscarPensamentosFavoritos(): void {
    this.atualizarFavoritos(true);
    this.listarPensamentos();
  }

  atualizarMural(): void {
    this.atualizarFavoritos(false);
    this.listarPensamentos();
  }

  carregarMaisPensamentos(): void {
    this.incrementarPaginaAtual();
    this.atualizarListaDePensamentos();
  }

  private checarSeExistemPensamentos(listaPensamentos: Pensamento[]): void {
    if (!listaPensamentos.length)
      this.atualizarEstadoBotaoVerMais(false);
  }

  private incrementarPaginaAtual(): void {
    this.paginaAtual++;
    this.pensamentoService.paginaAtual = this.paginaAtual;
  }

  private reiniciarPaginaAtual() {
    this.paginaAtual = 1;
    this.pensamentoService.paginaAtual = this.paginaAtual;
  }

  private atualizarListaDePensamentos() {
    this.pensamentoService.listar().subscribe((listaPensamentos: Pensamento[]) => {
      this.checarSeExistemPensamentos(listaPensamentos);
      this.listaPensamentos.push(...listaPensamentos);
    });
  }

  private atualizarEstadoBotaoVerMais(estado: boolean): void {
    this.haMaisPensamentos = estado;
  }

  private atualizarFavoritos(estado: boolean): void {
    this.favoritos = estado;
    this.pensamentoService.favoritos = this.favoritos;
  }

  private popularListaFavoritos(): void {
    this.listaFavoritos = this.favoritos ? this.listaPensamentos : [];
  }

  private atualizarTitulo(): void {
    this.titulo = this.favoritos ? 'Meus Favoritos' : 'Meu Mural'
  }

}
