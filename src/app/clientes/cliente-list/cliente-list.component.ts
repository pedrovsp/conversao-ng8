import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  constructor(private clienteService: ClientesService) { }

  clientes: Cliente[] = [];
  criterio: String;

  ngOnInit() {
    /*this.clientes = [{
      'codigo': 1,
      'nome': 'Camila',
      'cargo': 'Analista de Sistemas',
      'endereco': 'Rua A',
      'cidade': 'Uberaba',
      'cep': '38.000-000',
      'pais': 'Brasil',
      'telefone': '(34) 3326-1407',
      'fax': '(34) 3326-1400'
    },
    {
      'codigo': 2,
      'nome': 'Xuliana',
      'cargo': 'Chefe na Ype',
      'endereco': 'Rua B',
      'cidade': 'Uberlândia',
      'cep': '38.000-000',
      'pais': 'Brasil',
      'telefone': '(34) 3326-1507',
      'fax': '(34) 3326-1500'
    }];*/

    this.clienteService.getAll()
      .subscribe(data => this.clientes = data, 
        err => alert('Aconteceu um erro!' + err)
      );
    this.clienteService.clientesChanged.subscribe(
      (observable: any) => observable.subscribe(
        data => this.clientes = data
      )
    );
  }

}
