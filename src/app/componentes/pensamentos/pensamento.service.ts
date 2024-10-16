import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API: string = "http://localhost:3000/pensamentos";
  private _filtro: string = '';
  private _limitePensamentosPorPagina: number = 6;
  private _paginaAtual: number = 1;
  private _favoritos: boolean = false;
  constructor(
    private http: HttpClient
  ) { }

  get filtro(): string {
    return this._filtro;
  }

  set filtro(filtro: string) {
    this._filtro = filtro;
  }

  get limitePensamentosPorPagina(): number {
    return this._limitePensamentosPorPagina;
  }

  set limitePensamentosPorPagina(limit: number) {
    this._limitePensamentosPorPagina = limit;
  }

  get paginaAtual(): number {
    return this._paginaAtual;
  }

  set paginaAtual(pagina: number) {
    this._paginaAtual = pagina;
  }

  get favoritos(): boolean {
    return this._favoritos;
  }

  set favoritos(favoritos: boolean) {
    this._favoritos = favoritos;
  }

  listar(): Observable<Pensamento[]> {
    let params: HttpParams = new HttpParams()
      .set("_page", this._paginaAtual)
      .set("_limit", this._limitePensamentosPorPagina);

    if (this.checarConteudoFiltro(this.filtro))
      params = params.set("q", this.filtro);
    
    if (this.favoritos)
      params = params.set("favorito", true);

    return this.http.get<Pensamento[]>(this.API, { params });
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url: string = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(url, pensamento);
  }

  atualizarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;
    return this.editar(pensamento);
  }

  excluir(id: number): Observable<Pensamento> {
    const url: string = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(url);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url: string = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url);
  }

  private checarConteudoFiltro(filtro: string): boolean {
    return filtro.trim().length > 2;
  }
}