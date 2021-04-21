import { createContext } from 'react';
import { PromiseTask } from 'react-native';

export type ContextProps = {
  todos?: [] | undefined;
  loading: boolean;
  error: null | boolean;
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (title: string, id: string) => void;
  fetchTodos: () => void;
};

export const TodoContext = createContext(<Partial<ContextProps>>[]);
