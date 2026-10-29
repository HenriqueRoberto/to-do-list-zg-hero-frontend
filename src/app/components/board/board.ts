import { Component, signal, computed, inject } from '@angular/core';
import { Column } from '../column/column';
import { TaskModal } from '../task-modal/task-modal';
import { Task, Status, DadosTarefa } from '../../models/task';
import { BoardStore } from '../../service/board-store';

@Component({
  selector: 'app-board',
  imports: [Column, TaskModal],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  private readonly store = inject(BoardStore);

  readonly busca = signal(this.lerFiltro('busca'));
  readonly filtroCategoria = signal(this.lerFiltro('categoria'));
  readonly filtroPrioridade = signal<number | null>(this.lerFiltroNumero('prioridade'));
  readonly filtroData = signal(this.lerFiltro('data'));

  readonly categoriasDisponiveis = computed(() => {
    const conjunto = new Set<string>();
    for (const t of this.store.tarefasDoWorkspace()) {
      if (t.categoria) conjunto.add(t.categoria);
    }
    return Array.from(conjunto).sort();
  });

  private readonly tarefasFiltradas = computed(() => {
    const texto = this.busca().trim().toLowerCase();
    const categoria = this.filtroCategoria();
    const prioridade = this.filtroPrioridade();
    const data = this.filtroData();

    return this.store.tarefasDoWorkspace().filter(tarefa => {
      if (texto && !tarefa.nome.toLowerCase().includes(texto)) return false;
      if (categoria && tarefa.categoria !== categoria) return false;
      if (prioridade !== null && tarefa.prioridade !== prioridade) return false;
      if (data && (!tarefa.dataLimite || tarefa.dataLimite > data)) return false;
      return true;
    });
  });

  readonly backlog = computed(() => this.tarefasFiltradas().filter(t => t.status === 'BACKLOG'));
  readonly todo = computed(() => this.tarefasFiltradas().filter(t => t.status === 'TODO'));
  readonly doing = computed(() => this.tarefasFiltradas().filter(t => t.status === 'DOING'));
  readonly done = computed(() => this.tarefasFiltradas().filter(t => t.status === 'DONE'));

  readonly modalAberto = signal(false);
  readonly tarefaEditando = signal<Task | null>(null);
  readonly statusInicial = signal<Status | null>(null);

  atualizarBusca(evento: Event) {
    const valor = (evento.target as HTMLInputElement).value;
    this.busca.set(valor);
    this.salvarFiltro('busca', valor);
  }

  mudarCategoria(evento: Event) {
    const valor = (evento.target as HTMLSelectElement).value;
    this.filtroCategoria.set(valor);
    this.salvarFiltro('categoria', valor);
  }

  mudarPrioridade(evento: Event) {
    const valor = (evento.target as HTMLSelectElement).value;
    this.filtroPrioridade.set(valor ? Number(valor) : null);
    this.salvarFiltro('prioridade', valor);
  }

  mudarData(evento: Event) {
    const valor = (evento.target as HTMLInputElement).value;
    this.filtroData.set(valor);
    this.salvarFiltro('data', valor);
  }

  private lerFiltro(chave: string): string {
    try {
      return localStorage.getItem(`filtro.${chave}`) ?? '';
    } catch {
      return '';
    }
  }

  private lerFiltroNumero(chave: string): number | null {
    const valor = this.lerFiltro(chave);
    return valor ? Number(valor) : null;
  }

  private salvarFiltro(chave: string, valor: string) {
    try {
      localStorage.setItem(`filtro.${chave}`, valor);
    } catch {}
  }

  abrirModal() {
    this.tarefaEditando.set(null);
    this.statusInicial.set(null);
    this.modalAberto.set(true);
  }

  abrirCriacaoComStatus(status: Status) {
    this.tarefaEditando.set(null);
    this.statusInicial.set(status);
    this.modalAberto.set(true);
  }

  abrirEdicao(tarefa: Task) {
    this.tarefaEditando.set(tarefa);
    this.statusInicial.set(null);
    this.modalAberto.set(true);
  }

  fecharModal() {
    this.modalAberto.set(false);
    this.tarefaEditando.set(null);
    this.statusInicial.set(null);
  }

  salvarTarefa(dados: DadosTarefa) {
    const editando = this.tarefaEditando();
    if (editando) {
      this.store.editarTarefa(editando.id, dados);
    } else {
      this.store.criarTarefa(dados);
    }
    this.fecharModal();
  }

  deletarTarefa() {
    const editando = this.tarefaEditando();
    if (editando) {
      this.store.deletarTarefa(editando.id);
    }
    this.fecharModal();
  }

  avancarStatus(id: string) {
    this.store.avancarStatus(id);
  }

  moverStatus(evento: { id: string; novoStatus: Status }) {
    this.store.moverStatus(evento.id, evento.novoStatus);
  }
}