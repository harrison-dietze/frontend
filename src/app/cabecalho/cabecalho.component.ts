import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent implements OnInit {
  constructor() {}

  @Input() carrinho = true;
  isAdmin = false;

  pesquisaForm: any;
  menuVisivel = false;

  ngOnInit(): void {
    this.iniciarFiltro();
    this.tratarPermissao();
  }
  onPesquisar = () => {};

  botaoCarrinho = () => {
    location.href = '/carrinho';
  };

  tratarMenu() {
    this.menuVisivel = !this.menuVisivel;
  }

  logOut = () => {
    localStorage.removeItem('nomeUsuario');
    location.href = '';
  };

  tratarPermissao = () => {
    if (localStorage.getItem('permissao') != 'usuario') {
      this.carrinho = false;
      this.isAdmin = true;
    }

    if (localStorage.getItem('nomeUsuario')) {
      alert('Bem vindo, ' + localStorage.getItem('nomeUsuario') + '!');
    } else {
      location.href = '';
    }
  };

  iniciarFiltro = () => {
    this.pesquisaForm = new FormGroup({
      pesquisa: new FormControl(''),
    });
  };
}
