export type Status = 'BACKLOG' | 'TODO' | 'DOING' | 'DONE';

export interface Task {
  id: string;
  workspaceId: string;
  nome: string;
  descricao?: string;
  categoria?: string;
  prioridade: number;
  status: Status;
  dataLimite?: string;
}

export interface DadosTarefa {
  nome: string;
  descricao?: string;
  categoria?: string;
  prioridade: number;
  status: Status;
  dataLimite?: string;
}