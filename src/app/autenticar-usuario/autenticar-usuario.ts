import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
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
      .subscribe((response) => {
        console.log(response);
      });
    }
}
