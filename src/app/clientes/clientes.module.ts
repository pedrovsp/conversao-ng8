import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { clientesRouting } from './clientes.routing';
import { FormsModule } from '@angular/forms';

import { ClientesService } from './clientes.service';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteCrudComponent } from './cliente-crud/cliente-crud.component';

@NgModule({
  imports: [
    CommonModule, clientesRouting, FormsModule
  ],
  declarations: [ClienteListComponent, ClienteFormComponent, ClienteCrudComponent],
  providers: [ClientesService]
})
export class ClientesModule { }
