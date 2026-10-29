# To-Do List ZG Hero - Front-end

Interface web para gerenciamento de tarefas em modelo Kanban (Backlog, To-do, Doing, Done), com suporte a múltiplos workspaces. Consome a API REST do back-end.

## Back-end

O back-end (Java + Spring Boot) fica em um repositório separado e precisa estar rodando para a aplicação funcionar:

- Front-end: `http://localhost:4200` (este repositório)
- Back-end: `http://localhost:8080`

Repositório do back: https://github.com/HenriqueRoberto/to-do-list-zg-hero-backend

## Tecnologias

- Angular
- TypeScript
- Angular CDK (arrastar e soltar)
- CSS

## Funcionalidades

- Quadro Kanban com 4 colunas fixas: Backlog, To-do, Doing, Done
- Criar, editar e excluir tarefas
- Arrastar tarefas entre colunas
- Avançar o status da tarefa pelo indicador no card
- Indicador de prazo: muda de cor conforme a proximidade da data limite
- Múltiplos workspaces, com troca e criação
- Busca por nome e filtros por categoria, prioridade e data
- Tema claro e escuro

## Como rodar

Com o back-end já rodando:

```bash
npm install
ng serve
```

A aplicação fica disponível em `http://localhost:4200`.

## Estrutura

- **models** — interfaces `Task` e `Workspace`
- **service** — comunicação com a API (`task-api`, `workspace-api`) e estado da aplicação (`board-store`)
- **components** — `sidebar`, `board`, `column`, `task-card`, `task-modal`

## Armazenamento local

Apenas preferências de interface ficam no navegador (filtros aplicados e tema escolhido). Todos os dados de tarefas e workspaces vêm do back-end.