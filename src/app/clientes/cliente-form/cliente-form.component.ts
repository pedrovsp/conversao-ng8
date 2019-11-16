import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ClientesService } from '../clientes.service';
import { Cliente } from '../cliente';
import { User } from 'src/app/login/user';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  private clienteIndex: number;
  public isNew = true;
  public cliente: User;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private clienteService: ClientesService) { }

  ngOnInit() {
    this.novo();
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.clienteIndex = params['id'];
          this.clienteIndex = +params['id'];
          this.clienteService.getById(this.clienteIndex).subscribe(data => this.cliente = data);
        } else {
          this.isNew = true;
        }
      }
    );
  }

  novo() {
    this.cliente = new User();
  }

  salvar() {
    let result;
    if (this.isNew) {
      result = this.clienteService.add(this.cliente);
    } else {
      result = this.clienteService.update(this.cliente);
    }
    this.novo();
    this.voltar();
    result.subscribe(data => alert('Sucesso ' + data),
      err => {
        alert('An error occurred. ' + err);
      });
  }

  excluir() {
    if (this.cliente.id == null) {
      alert('Selecione algum cliente.');
    } else {
      if (confirm('Você realmente quer excluir o cliente ' + this.cliente.name + '?')) {
        this.clienteService.remove(this.cliente.id)
          .subscribe(
            data => alert('Cliente removido ' + data),
            err => {
              alert('Cliente não removido');
            });
        this.novo();
        this.voltar();
      }
    }
  }

  cancelar() {
    this.voltar();
  }

  voltar() {
    this.router.navigate(['/clientes']);
  }

}
