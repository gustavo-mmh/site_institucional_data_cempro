import { Import } from './../../node_modules/@angular/cdk/schematics/update-tool/utils/imports.d';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuemSomosComponent } from './pages/quem-somos/quem-somos.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { SouClienteComponent } from './pages/sou-cliente/sou-cliente.component';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'quem-somos', component: QuemSomosComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'sou-cliente', component: SouClienteComponent },
];
