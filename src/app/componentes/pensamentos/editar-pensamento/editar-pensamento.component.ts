import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { permitirApenasLetrasMinusculas } from '../validators/minusculoValidator';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  formulario!: FormGroup;
  
  constructor(
    private pensamentoService: PensamentoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.pensamentoService.buscarPorId(id).subscribe((pensamento: Pensamento) => {
      this.formulario = this.formBuilder.group({
        conteudo: [pensamento.conteudo, Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ])],
        autoria: [pensamento.autoria, Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
          permitirApenasLetrasMinusculas
        ])],
        modelo: [pensamento.modelo],
        favorito: [pensamento.favorito]
      })
    });
  }

  editarPensamento(): void {
    this.pensamentoService.editar(this.formulario.value).subscribe(() => {
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

}
