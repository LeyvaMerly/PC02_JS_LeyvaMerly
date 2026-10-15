import { Routes } from '@angular/router';
import { ListaEstudiantes } from './lista-estudiantes/lista-estudiantes';
import { DetalleEstudiante } from './detalle-estudiante/detalle-estudiante';

export const routes: Routes = [
  { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
  { path: 'estudiantes', component: ListaEstudiantes },
  { path: 'detalle/:id', component: DetalleEstudiante }
];