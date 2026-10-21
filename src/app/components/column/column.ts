import { Component, input } from '@angular/core';

@Component({
  selector: 'app-column',
  imports: [],
  templateUrl: './column.html',
  styleUrl: './column.css',
})
export class Column {
  readonly title = input.required<string>();
  readonly color = input.required<string>();
  readonly count = input<number>(0);
}