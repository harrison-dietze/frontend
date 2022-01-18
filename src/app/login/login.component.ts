import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Usuario } from './usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuarioLogado: Usuario;
  senhaValidacao = new FormControl();

  loginForm: FormGroup;
  dados: FormData;

  isCriacao = true;
  resultado: any;
  isSenhasIguais = true;

  naoPreenchidos = { nome: false, senha: false, senhaValidacao: false };

  constructor(private LoginService: LoginService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      nome: new FormControl('', {
        validators: [Validators.required],
      }),
      senha: new FormControl('', { validators: [Validators.required] }),
    });

    this.senhaValidacao = new FormControl('', {
      validators: [Validators.required],
    });
  }

  onLogin(isCriacao: boolean) {
    if (!isCriacao) {
      this.onEntrarUsuario();
    } else {
      this.onCriarUsuario();
    }
  }

  onEntrarUsuario(): void {
    this.dados = new FormData();
    this.dados.append('usuarioEntrar', JSON.stringify(this.loginForm.value));
    this.LoginService.loginService(this.dados).subscribe(
      (res) => {
        if (res != 'Usuário ou senha incorretos.') {
          localStorage.setItem('nomeUsuario', res.nome);
          localStorage.setItem('permissao', res.permissao);
          location.href = 'home';
        } else {
          alert(res);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCriarUsuario() {
    if (!this.verificarCamposObrigatorios(this.isCriacao)) {
      return;
    }
    if (!this.verificarSenhasIguais()) {
      return;
    }
    this.dados = new FormData();
    this.dados.append('usuarioCriar', JSON.stringify(this.loginForm.value));
    this.LoginService.loginService(this.dados).subscribe(
      (res) => {
        if (res != 'Já existe um usuário com este nome.') {
          alert('Usuário criado com sucesso');
        } else {
          alert(res);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  verificarSenhasIguais() {
    if (this.senhaValidacao.value != this.loginForm.value.senha) {
      this.isSenhasIguais = false;
      return false;
    } else {
      this.isSenhasIguais = true;
      return true;
    }
  }

  verificarCamposObrigatorios(isCriacao) {
    this.naoPreenchidos = { nome: false, senha: false, senhaValidacao: false };
    if (this.loginForm.value.nome.toString().length < 4) {
      this.naoPreenchidos.nome = true;
    }
    if (this.loginForm.value.senha.toString().length < 6) {
      this.naoPreenchidos.senha = true;
    }
    if (isCriacao) {
      if (this.senhaValidacao.value == '') {
        this.naoPreenchidos.senhaValidacao = true;
      }
    }
    if (
      this.naoPreenchidos['nome'] ||
      this.naoPreenchidos['senha'] ||
      this.naoPreenchidos['senhaValidacao']
    ) {
      return false;
    } else {
      return true;
    }
  }
}
