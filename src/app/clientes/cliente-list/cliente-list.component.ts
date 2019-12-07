import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from '../clientes.service';
import { User } from 'src/app/login/user';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  constructor(private clienteService: ClientesService) { }

  clientes: User[] = [];
  criterio: string;
  searchText: string;

  ngOnInit() {
    this.clienteService.getAll()
      .subscribe(data => this.clientes = data
      );
    this.clienteService.clientesChanged.subscribe(
      (observable: any) => observable.subscribe(
        data => this.clientes = data
      )
    );
  }

}
