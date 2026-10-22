import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Status } from '../../models/task';

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
export class TaskModal {
  readonly fechar = output<void>();
  readonly salvar = output<DadosTarefa>();

  nome = '';
  descricao = '';
  categoria = '';
  prioridade = 3;
  status: Status = 'BACKLOG';
  dataLimite = '';

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