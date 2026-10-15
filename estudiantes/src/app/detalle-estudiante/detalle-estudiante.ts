import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Estudiante } from '../services/estudiante';

@Component({
  selector: 'app-detalle-estudiante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-estudiante.html'
})
export class DetalleEstudiante implements OnInit {
  estudiante: Estudiante | undefined;
  cargando = false; // <-- Declarada aquí para solucionar el error del HTML

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.estudiante = navigation.extras.state['estudianteData'];
    }
  }

  ngOnInit(): void {
    if (!this.estudiante) {
      this.router.navigate(['/estudiantes']);
    }
  }

  get sumaNotas(): number {
    if (!this.estudiante) return 0;
    return this.estudiante.nota1 + this.estudiante.nota2 + this.estudiante.nota3;
  }

  get promedio(): number {
    return Number((this.sumaNotas / 3).toFixed(2));
  }

  get estadoAcademico(): string {
    return this.promedio >= 13 ? 'Aprobado' : 'Desaprobado';
  }

  get observacion(): string {
    const p = this.promedio;
    if (p >= 17) {
      return 'Excelente';
    } else if (p >= 13) {
      return 'Regular';
    } else {
      return 'En riesgo';
    }
  }

  volver(): void {
    this.router.navigate(['/estudiantes']);
  }
}