import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-column',
  imports: [TaskCard],
  templateUrl: './column.html',
  styleUrl: './column.css',
})
export class Column {
  readonly title = input.required<string>();
  readonly color = input.required<string>();
  readonly tasks = input<Task[]>([]);
  readonly avancarTask = output<string>();
}