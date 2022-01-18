import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProdutoCarrinho } from './produto.interface';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {
  carrinhoIconVisivel: boolean = false;
  carrinho: ProdutoCarrinho[];
  estados: any[] = [];
  cidades: any[] = [];
  total: number = 0;
  totalString: string;
  localizacao: any;
  enderecoForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.enderecoForm = new FormGroup({
      estado: new FormControl(''),
      cidade: new FormControl(''),
    });
    this.popularTela();
    this.calcularTotal();
  }

  calcularTotal = () => {
    for (let item of this.carrinho) {
      this.total = item.preco * item.quantidade + this.total;
      this.totalString = this.total.toFixed(2);
    }
  };

  popularTela = () => {
    this.carrinho = [
      {
        titulo: 'HyperX 8GB',
        descricao: 'Memória RAM',
        imagem:
          'https://upload.wikimedia.org/wikipedia/commons/4/49/MEMORIARAM.png',
        preco: 299.9,
        quantidade: 2,
      },
      {
        titulo: 'Intel Core I7',
        descricao: 'Processador',
        imagem:
          'https://www.imagensempng.com.br/wp-content/uploads/2021/10/900.png',
        preco: 699.9,
        quantidade: 1,
      },
      {
        titulo: 'HyperX 8GB',
        descricao: 'Memória RAM',
        imagem:
          'https://upload.wikimedia.org/wikipedia/commons/4/49/MEMORIARAM.png',
        preco: 299.9,
        quantidade: 2,
      },
      {
        titulo: 'Intel Core I7',
        descricao: 'Processador',
        imagem:
          'https://www.imagensempng.com.br/wp-content/uploads/2021/10/900.png',
        preco: 699.9,
        quantidade: 1,
      },
      {
        titulo: 'Memória Ram',
        descricao: 'Memória de 8GB',
        imagem:
          'https://upload.wikimedia.org/wikipedia/commons/4/49/MEMORIARAM.png',
        preco: 299.9,
        quantidade: 2,
      },
      {
        titulo: 'Intel Core I7',
        descricao: 'Processador',
        imagem:
          'https://www.imagensempng.com.br/wp-content/uploads/2021/10/900.png',
        preco: 699.9,
        quantidade: 1,
      },
    ];
    this.estados = [
      { sigla: 'RS', valor: 43 },
      { sigla: 'SC', valor: 42 },
      { sigla: 'PR', valor: 41 },
    ];
  };

  public ouvirEstadoChange = () => {
    this.enderecoForm.get('estado').valueChanges.subscribe(() => {});
  };
}
