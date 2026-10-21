export type Status = 'BACKLOG' | 'TODO' | 'DOING' | 'DONE';

export interface Task {
  id: string;
  nome: string;
  descricao?: string;
  categoria?: string;
  prioridade: number;
  status: Status;
  dataLimite?: string;
}