import { Component, input, output, computed } from '@angular/core';
import { Task, Status } from '../../models/task';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  readonly task = input.required<Task>();
  readonly avancar = output<string>();

  readonly corRelogio = computed(() => {
    const tarefa = this.task();
    const hoje = this.zerarHora(new Date());

    if (tarefa.status === 'DONE') {
      if (tarefa.dataLimite && this.parseData(tarefa.dataLimite) < hoje) {
        return 'vermelho';
      }
      return 'verde';
    }

    if (!tarefa.dataLimite) {
      return 'branco';
    }

    const limite = this.parseData(tarefa.dataLimite);
    const umDia = 1000 * 60 * 60 * 24;
    const diasRestantes = Math.ceil((limite.getTime() - hoje.getTime()) / umDia);

    if (diasRestantes < 0) return 'vermelho';
    if (diasRestantes <= 3) return 'amarelo';
    return 'branco';
  });

  private parseData(texto: string): Date {
    const [ano, mes, dia] = texto.split('-').map(Number);
    return new Date(ano, mes - 1, dia);
  }

  private zerarHora(data: Date): Date {
    data.setHours(0, 0, 0, 0);
    return data;
  }
}