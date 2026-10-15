import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Estudiante {
  id: number;
  nombre: string;
  nota1: number;
  nota2: number;
  nota3: number;
}

@Injectable({ providedIn: 'root' })
export class EstudianteService {
  private url = 'https://careli2021.github.io/api_examen/api/estudiante.json';
  private estudiantesCache: Estudiante[] = [];

  constructor(private http: HttpClient) {}

  obtenerEstudiantes(): Observable<Estudiante[]> {
    // Si ya tenemos los datos en caché, los devolvemos de inmediato sin consultar otra vez
    if (this.estudiantesCache.length > 0) {
      return of(this.estudiantesCache);
    }
    // Si no, hacemos la petición y guardamos el resultado en caché
    return this.http.get<Estudiante[]>(this.url).pipe(
      tap(data => this.estudiantesCache = data)
    );
  }
}