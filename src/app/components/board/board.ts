import { Component, signal, computed } from '@angular/core';
import { Column } from '../column/column';
import { Task } from '../../models/task';

@Component({
  selector: 'app-board',
  imports: [Column],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  readonly tasks = signal<Task[]>([
    { id: '1', nome: 'Modelar entidade Task', categoria: 'Backend', prioridade: 1, status: 'BACKLOG' },
    { id: '2', nome: 'Definir endpoints REST', categoria: 'API', prioridade: 2, status: 'BACKLOG' },
    { id: '3', nome: 'Setup Spring Boot', categoria: 'Backend', prioridade: 2, status: 'TODO' },
    { id: '4', nome: 'Setup Angular', categoria: 'Front', prioridade: 3, status: 'TODO' },
    { id: '5', nome: 'Desenhar tela kanban', categoria: 'UI', prioridade: 3, status: 'DOING' },
    { id: '6', nome: 'Escolher tech stack', categoria: 'Planejamento', prioridade: 1, status: 'DONE' },
  ]);

  readonly backlog = computed(() => this.tasks().filter(t => t.status === 'BACKLOG'));
  readonly todo = computed(() => this.tasks().filter(t => t.status === 'TODO'));
  readonly doing = computed(() => this.tasks().filter(t => t.status === 'DOING'));
  readonly done = computed(() => this.tasks().filter(t => t.status === 'DONE'));
}