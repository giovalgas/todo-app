# Desafio Back-End: Construção de API para Lista de Tarefas

## Requisitos

Neste desafio, você será responsável por desenvolver uma API REST para uma aplicação de lista de tarefas.
Para isso você devá utilizar das seguintes tecnologias:

- NodeJS
- Typescript
- MongoDB
- Websocket
- Fastify

## Desafio

O desafio consiste na construção de uma API REST para um aplicativo de lista de tarefas chamado TodoApp. Este aplicativo tem como objetivo permitir que os usuários gerenciem suas tarefas diárias, podendo adicioná-las, atualizá-las, marcá-las como concluídas e excluí-las conforme necessário. Cada tarefa deve ter um texto descritivo, um status indicando se está pendente ou concluída, bem como registros de data e hora de criação e, quando aplicável, de conclusão.

### Funcionalidades Principais

- **Listar Tarefas:** Esta funcionalidade permite aos usuários recuperarem todas as tarefas armazenadas no sistema. Se necessário, a listagem pode ser paginada para melhorar a experiência do usuário.

- **Criar uma Tarefa:** Os usuários podem adicionar novas tarefas ao sistema fornecendo apenas o texto descritivo da tarefa. O status da tarefa é automaticamente definido como pendente no momento da criação.

- **Atualizar a Descrição de uma Tarefa:** Os usuários têm a capacidade de modificar o texto descritivo de uma tarefa existente, fornecendo o ID da tarefa a ser atualizada e o novo texto.

- **Atualizar o Status de uma Tarefa:** Esta funcionalidade permite aos usuários marcarem uma tarefa como concluída ou pendente, fornecendo o ID da tarefa e o novo status.

- **Deletar uma Tarefa:** Os usuários podem excluir uma tarefa específica fornecendo o ID correspondente.

- **Completar Tarefas em Lote:** Além de atualizar o status de uma única tarefa, os usuários podem marcar várias tarefas como concluídas ou pendentes, fornecendo uma lista de IDs das tarefas e o novo status desejado.

- **Deletar Tarefas em Lote:** Da mesma forma que é possível completar tarefas em lote, os usuários também podem excluir várias tarefas simultaneamente fornecendo uma lista de IDs das tarefas a serem removidas.

- **Obter Quantidade de Tarefas Pendentes e Concluídas:** Esta funcionalidade fornece aos usuários informações sobre o número total de tarefas pendentes e concluídas no sistema.

- **Atualização em Tempo Real:** Para melhorar a experiência do usuário, a aplicação deve ser capaz de fornecer atualizações em tempo real utilizando WebSockets.

## Estrutura da API

### Requisitos

- Todas as rotas devem seguir o padrão REST e ter o prefixo /api (por exemplo: http://localhost:3000/api/list).

### Estrutura do Objeto de Tarefa (Todo)

```typescript
type Todo = {
  body: string;
  completed: boolean;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
