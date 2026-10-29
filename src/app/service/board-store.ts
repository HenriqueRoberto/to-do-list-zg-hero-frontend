import { Injectable, signal, computed, inject } from '@angular/core';
import { Task, Status, DadosTarefa } from '../models/task';
import { Workspace } from '../models/workspace';
import { TaskApi } from './task-api';
import { WorkspaceApi } from './workspace-api';

@Injectable({ providedIn: 'root' })
export class BoardStore {
  private readonly taskApi = inject(TaskApi);
  private readonly workspaceApi = inject(WorkspaceApi);

  readonly workspaces = signal<Workspace[]>([]);
  readonly workspaceAtivoId = signal('');
  readonly tasks = signal<Task[]>([]);

  readonly tarefasDoWorkspace = computed(() => this.tasks());

  constructor() {
    this.carregarWorkspaces();
  }

  private carregarWorkspaces() {
    this.workspaceApi.listar().subscribe(lista => {
      this.workspaces.set(lista);
      if (lista.length > 0 && !this.workspaceAtivoId()) {
        this.selecionarWorkspace(lista[0].id);
      }
    });
  }

  private carregarTarefas(workspaceId: string) {
    this.taskApi.listar(workspaceId).subscribe(lista => {
      this.tasks.set(lista);
    });
  }

  selecionarWorkspace(id: string) {
    this.workspaceAtivoId.set(id);
    this.carregarTarefas(id);
  }

  criarWorkspace(nome: string) {
    this.workspaceApi.criar(nome).subscribe(novo => {
      this.workspaces.update(lista => [...lista, novo]);
      this.selecionarWorkspace(novo.id);
    });
  }

  criarTarefa(dados: DadosTarefa) {
    const payload = { ...dados, workspaceId: this.workspaceAtivoId() };
    this.taskApi.criar(payload).subscribe(nova => {
      this.tasks.update(lista => [...lista, nova]);
    });
  }

  editarTarefa(id: string, dados: DadosTarefa) {
    this.taskApi.atualizar(id, dados).subscribe(atualizada => {
      this.tasks.update(lista => lista.map(t => t.id === id ? atualizada : t));
    });
  }

  deletarTarefa(id: string) {
    this.taskApi.deletar(id).subscribe(() => {
      this.tasks.update(lista => lista.filter(t => t.id !== id));
    });
  }

  avancarStatus(id: string) {
    const ordem: Status[] = ['BACKLOG', 'TODO', 'DOING', 'DONE'];
    const tarefa = this.tasks().find(t => t.id === id);
    if (!tarefa) return;

    const indice = ordem.indexOf(tarefa.status);
    if (indice >= ordem.length - 1) return;

    const novoStatus = ordem[indice + 1];
    this.taskApi.atualizar(id, { status: novoStatus }).subscribe(atualizada => {
      this.tasks.update(lista => lista.map(t => t.id === id ? atualizada : t));
    });
  }

  moverStatus(id: string, novoStatus: Status) {
    this.taskApi.atualizar(id, { status: novoStatus }).subscribe(atualizada => {
      this.tasks.update(lista => lista.map(t => t.id === id ? atualizada : t));
    });
  }
}