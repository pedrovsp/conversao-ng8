import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './login/login-guard';
import { LoginComponent } from './login/login/login.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'produtos',
    loadChildren: () => import('./produtos/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
