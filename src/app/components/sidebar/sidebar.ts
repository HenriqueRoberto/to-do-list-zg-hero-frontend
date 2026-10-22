import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BoardStore } from '../../service/board-store';

@Component({
  selector: 'app-sidebar',
  imports: [FormsModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private readonly store = inject(BoardStore);

  readonly workspaces = this.store.workspaces;
  readonly workspaceAtivoId = this.store.workspaceAtivoId;

  readonly criandoWorkspace = signal(false);
  nomeNovoWorkspace = '';

  selecionar(id: string) {
    this.store.selecionarWorkspace(id);
  }

  abrirCriacao() {
    this.criandoWorkspace.set(true);
  }

  confirmarCriacao() {
    const nome = this.nomeNovoWorkspace.trim();
    if (nome) {
      this.store.criarWorkspace(nome);
    }
    this.nomeNovoWorkspace = '';
    this.criandoWorkspace.set(false);
  }
}