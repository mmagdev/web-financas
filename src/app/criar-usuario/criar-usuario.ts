import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-usuario',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './criar-usuario.html',
  styleUrl: './criar-usuario.css',
})
export class CriarUsuario {

  //Injeção de dependência da classe HttpClient
  private http = inject(HttpClient);

  //Criando a estrutura do formulário
  formCriarUsuario = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8)]),
    email : new FormControl('', [Validators.required, Validators.email]),
    senha : new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/)]),
    senhaConfirmacao : new FormControl('', [Validators.required]),
    aceiteTermos : new FormControl(false, [Validators.requiredTrue])
  });

  //função para capturar o evento de submir do formulário
  criarUsuario() {
    //Criando um Json somente com os campos requeridos pela API
    const json = {
      nome : this.formCriarUsuario.value.nome,
      email : this.formCriarUsuario.value.email,
      senha : this.formCriarUsuario.value.senha

    };
    //Enviando a requisição para o backend
    this.http.post('http://localhost:8082/api/v1/usuarios/criar', json)
    .subscribe({          //Aguardando o retorno da API
      next: (response) => { //Capturando se o retorno for sucesso
        console.log('Sucesso!', response);

      },
      error: (e) => {//Capturando se o retorno dor erro da API
        console.log('Erro!', e.error);

      }
    });


  }
}
