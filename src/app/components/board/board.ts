import { Component } from '@angular/core';
import { Column } from '../column/column';

@Component({
  selector: 'app-board',
  imports: [Column],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
}