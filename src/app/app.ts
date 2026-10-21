import { Component, signal } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';
import { Board } from './components/board/board';

@Component({
  selector: 'app-root',
  imports: [Sidebar, Board],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('to-do-list-zg-hero-frontend');
}