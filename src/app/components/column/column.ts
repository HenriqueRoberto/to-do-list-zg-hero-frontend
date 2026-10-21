import { Component, input, output } from '@angular/core';
import { CdkDropList, CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Task, Status } from '../../models/task';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-column',
  imports: [TaskCard, CdkDropList, CdkDrag],
  templateUrl: './column.html',
  styleUrl: './column.css',
})
export class Column {
  readonly title = input.required<string>();
  readonly color = input.required<string>();
  readonly status = input.required<Status>();
  readonly tasks = input<Task[]>([]);
  readonly avancarTask = output<string>();
  readonly moverTask = output<{ id: string; novoStatus: Status }>();

  aoSoltar(evento: CdkDragDrop<Task[]>) {
    if (evento.previousContainer === evento.container) {
      return;
    }
    const tarefa = evento.previousContainer.data[evento.previousIndex];
    this.moverTask.emit({ id: tarefa.id, novoStatus: this.status() });
  }
}