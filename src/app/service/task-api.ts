import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, DadosTarefa } from '../models/task';

const BASE_URL = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class TaskApi {
  private readonly http = inject(HttpClient);

  listar(workspaceId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${BASE_URL}/tasks`, { params: { workspaceId } });
  }

  criar(dados: DadosTarefa & { workspaceId: string }): Observable<Task> {
    return this.http.post<Task>(`${BASE_URL}/tasks`, dados);
  }

  atualizar(id: string, dados: Partial<DadosTarefa>): Observable<Task> {
    return this.http.patch<Task>(`${BASE_URL}/tasks/${id}`, dados);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/tasks/${id}`);
  }
}