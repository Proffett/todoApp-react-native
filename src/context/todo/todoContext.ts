import { createContext } from 'react';

export type TodoContextProps = {
  todos: [];
  loading: boolean;
  error: null | boolean;
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (title: string, id: string) => void;
  fetchTodos: () => void;
};

export const TodoContext = createContext(<Partial<TodoContextProps>>[]);
