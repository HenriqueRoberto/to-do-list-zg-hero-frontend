import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workspace } from '../models/workspace';

const BASE_URL = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class WorkspaceApi {
  private readonly http = inject(HttpClient);

  listar(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${BASE_URL}/workspaces`);
  }

  criar(nome: string): Observable<Workspace> {
    return this.http.post<Workspace>(`${BASE_URL}/workspaces`, { nome });
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/workspaces/${id}`);
  }
}