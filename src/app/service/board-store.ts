import { Injectable, signal, computed } from '@angular/core';
import { Task, Status, DadosTarefa } from '../models/task';
import { Workspace } from '../models/workspace';

@Injectable({ providedIn: 'root' })
export class BoardStore {
  readonly workspaces = signal<Workspace[]>([
    { id: 'w1', nome: 'Pessoal' },
    { id: 'w2', nome: 'Trabalho' },
  ]);

  readonly workspaceAtivoId = signal('w1');

  readonly tasks = signal<Task[]>([
    { id: '1', workspaceId: 'w1', nome: 'Modelar entidade Task', categoria: 'Backend', prioridade: 1, status: 'BACKLOG' },
    { id: '2', workspaceId: 'w1', nome: 'Definir endpoints REST', categoria: 'API', prioridade: 2, status: 'BACKLOG' },
    { id: '3', workspaceId: 'w1', nome: 'Setup Spring Boot', categoria: 'Backend', prioridade: 2, status: 'TODO' },
    { id: '4', workspaceId: 'w1', nome: 'Setup Angular', categoria: 'Front', prioridade: 3, status: 'TODO' },
    { id: '5', workspaceId: 'w1', nome: 'Desenhar tela kanban', categoria: 'UI', prioridade: 3, status: 'DOING' },
    { id: '6', workspaceId: 'w1', nome: 'Escolher tech stack', categoria: 'Planejamento', prioridade: 1, status: 'DONE' },
    { id: '7', workspaceId: 'w2', nome: 'Revisar contrato', categoria: 'Admin', prioridade: 2, status: 'TODO' },
  ]);

  readonly tarefasDoWorkspace = computed(() =>
    this.tasks().filter(t => t.workspaceId === this.workspaceAtivoId())
  );

  selecionarWorkspace(id: string) {
    this.workspaceAtivoId.set(id);
  }

  criarWorkspace(nome: string) {
    const novo: Workspace = { id: crypto.randomUUID(), nome };
    this.workspaces.update(lista => [...lista, novo]);
    this.workspaceAtivoId.set(novo.id);
  }

  criarTarefa(dados: DadosTarefa) {
    const nova: Task = { id: crypto.randomUUID(), workspaceId: this.workspaceAtivoId(), ...dados };
    this.tasks.update(lista => [...lista, nova]);
  }

  editarTarefa(id: string, dados: DadosTarefa) {
    this.tasks.update(lista =>
      lista.map(t => t.id === id ? { ...t, ...dados } : t)
    );
  }

  deletarTarefa(id: string) {
    this.tasks.update(lista => lista.filter(t => t.id !== id));
  }

  avancarStatus(id: string) {
    const ordem: Status[] = ['BACKLOG', 'TODO', 'DOING', 'DONE'];
    this.tasks.update(lista =>
      lista.map(tarefa => {
        if (tarefa.id !== id) return tarefa;
        const indice = ordem.indexOf(tarefa.status);
        if (indice >= ordem.length - 1) return tarefa;
        return { ...tarefa, status: ordem[indice + 1] };
      })
    );
  }

  moverStatus(id: string, novoStatus: Status) {
    this.tasks.update(lista =>
      lista.map(tarefa => tarefa.id === id ? { ...tarefa, status: novoStatus } : tarefa)
    );
  }
}