import { Component, input, output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, Status } from '../../models/task';

export interface DadosTarefa {
  nome: string;
  descricao?: string;
  categoria?: string;
  prioridade: number;
  status: Status;
  dataLimite?: string;
}

@Component({
  selector: 'app-task-modal',
  imports: [FormsModule],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.css',
})
export class TaskModal implements OnInit {
  readonly tarefa = input<Task | null>(null);
  readonly fechar = output<void>();
  readonly salvar = output<DadosTarefa>();
  readonly deletar = output<void>();

  nome = '';
  descricao = '';
  categoria = '';
  prioridade = 3;
  status: Status = 'BACKLOG';
  dataLimite = '';

  confirmandoExclusao = false;

  ngOnInit() {
    const t = this.tarefa();
    if (t) {
      this.nome = t.nome;
      this.descricao = t.descricao ?? '';
      this.categoria = t.categoria ?? '';
      this.prioridade = t.prioridade;
      this.status = t.status;
      this.dataLimite = t.dataLimite ?? '';
    }
  }

  get editando(): boolean {
    return this.tarefa() !== null;
  }

  pedirConfirmacao() {
    this.confirmandoExclusao = true;
  }

  cancelarExclusao() {
    this.confirmandoExclusao = false;
  }

  aoSalvar() {
    if (!this.nome.trim()) return;
    this.salvar.emit({
      nome: this.nome.trim(),
      descricao: this.descricao.trim() || undefined,
      categoria: this.categoria.trim() || undefined,
      prioridade: this.prioridade,
      status: this.status,
      dataLimite: this.dataLimite || undefined,
    });
  }
}