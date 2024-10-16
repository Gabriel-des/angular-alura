import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { permitirApenasLetrasMinusculas } from '../validators/minusculoValidator';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarPensamento(): void {
    if (this.formulario.valid)
      this.pensamentoService.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
  }

  cancelar(): void {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): string {
    if(this.formulario.valid)
      return "botao"

    return "botao__desabilitado"
  }

  private criarFormulario(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
        permitirApenasLetrasMinusculas
      ])],
      modelo: ['modelo1'],
      favorito: [false]
    });
  }

}