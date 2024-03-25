# Todo Test - Backend NodeJS

## Plataforma
TodoApp é um aplicativo de lista de tarefas, a idéia é criar um aplicativo onde posso adicionar itens a serem feitos.
O item deve ter um status de pendente e concluído.
Quando eu concluir uma tarefa tem que marcar a hora que foi concluida.

> Exemplo da aplicação

- [x] Tarefa #1
- [x] Tarefa #1
- [ ] Tarefa #1
- [x] Tarefa #1
- [ ] Tarefa #1

## Features
- Listar tarefas
- Criar uma tarefa
- Atualizar a descrição de uma tarefa
- Atualizar status da tarefa,
- Deletar uma tarefa
- Completar tarefas em lote
- Deletar tarefas em lote
- Quantidade de tarefas pendentes
- Quantidade de tarefas completas
- Atualização em realtime usando websocket ou SSE

### Estrutura

**Requisitos**
> Todas as rotas devem ter o prefixo /api (Exemplo: http://localhost:3000/api/list)
> As rotas devem seguir o padrão REST

Todo Schema
```ts
type Todo = {
  body: string;
  completed: string;
  completedAt: Date;
  createdAt: Date; // Timestamp
  updatedAt: Date; // Timestamp
}
```

### Listar tarefas

Preciso de uma rota que retorne todas as tarefas do banco de dados.

> Se esta rota aceitar paginação receberá pontos extras. (Pode ser via skip&limit ou informando a página, faça o que preferir)

### Criar uma tarefa

Preciso de uma rota onde irei enviar apenas o texto do item do Todo

### Atualizar a descrição de uma tarefa

Preciso de uma rota onde irei enviar o id do item a ser atualizado e o novo texto para atualizar

### Atualizar status da tarefa,

Preciso de uma rota onde irei enviar o status da tarefa (completed: true | false)

### Deletar uma tarefa

Preciso de uma rota onde vou enviar o id do item que quero deletar

### Completar tarefas em lote

Preciso de um rota onde vou enviar vários ids de itens e o status para ser atualizado (completed: true | false)

### Deletar tarefas em lote

Preciso de um rota onde vou enviar vários ids para serem deletados.

### Quantidade de tarefas pendentes

Preciso de uma rota que me retorne a quantidade de tarefas pendentes.

### Quantidade de tarefas completas

Preciso de uma rota que me retorne a quantidade de tarefas completas.

<hr>

## Extra #1

Preciso de uma rota de relação data de tarefas completas.

Exemplo do retorno
```ts
type CompletedTodosByDate = {
  "01-01-2022": [],
  "02-01-2022": [],
  "03-01-2022": [],
}
```

## Extra #2

Atualmente temos uma rota que trás informações de alguns usuários, porém, está api está retornando em inglês, precisamos criar uma API nossa que retorne as mesmas informações, porém, em português.
A rota também considera que o usuário é adulto quando sua idade for 21, devemos atualizar para considerar adulto idades superiores a 17 e guardar como "adulto americano" se for superior a 20

A rota que possuimos é a seguinte.
> https://api.toitdrop.com/mock/users

A rota a ser criada deve ser `/usuarios`
