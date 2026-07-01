import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.html',
  styleUrl: './autenticar-usuario.css',
})
export class AutenticarUsuario {

  //declarar um objeto  do tipo HttpClient
  private http = inject(HttpClient);

  //Exibição de mensagens
  mensagemErro = signal<string>('');


  //Objeto para capturar o formuário de autenticação
  formAutenticar = new FormGroup({
    email : new FormControl('', [Validators.required]),
    senha : new FormControl('', [Validators.required]),

  });

  //Função para fazer a requisição para a API.
  //Será executada quando o botão "submit" for clicado
  autenticar() {
    //Enviando uma requisição HTTP POST para a API
    this.http.post('http://localhost:8082/api/v1/usuarios/autenticar', this.formAutenticar.value)
      .subscribe({
        next: (response) => {
          console.log('Sucesso!', response);
          //Salvar os dados do usuário autenticado na sessão do navegador
          sessionStorage.setItem('auth', JSON.stringify(response));

          //Redirecionar para o dashboard do sistema
          location.href = 'app/dashboard';
        },
        error: (e) => {
          this.mensagemErro.set(e.error);
        }
      });
    }
}
