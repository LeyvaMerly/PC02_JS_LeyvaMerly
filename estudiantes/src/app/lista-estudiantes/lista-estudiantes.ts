import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Estudiante, EstudianteService } from '../services/estudiante';

@Component({
  selector: 'app-lista-estudiantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-estudiantes.html'
})
export class ListaEstudiantes implements OnInit {
  estudiantes: Estudiante[] = [];
  cargando = false;
  error = '';

  constructor(
    private estudianteService: EstudianteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.error = '';

    this.estudianteService.obtenerEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al conectar con la API:', err);
        this.error = 'No se pudo cargar la lista de estudiantes.';
        this.cargando = false;
      }
    });
  }

  verDetalle(estudiante: Estudiante): void {
    this.router.navigate(['/detalle', estudiante.id], {
      state: { estudianteData: estudiante }
    });
  }
}