import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from '../types';

type HandlersType = {
  [action: string]: (
    state: { todos: { id: string; title: string }[] },
    todos: { title: string; id: string; error?: string; todos: { id: string; title: string }[] },
  ) => typeof state;
};

const handlers: HandlersType = {
  [ADD_TODO]: (state, { title, id }) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id,
        title,
      },
    ],
  }),

  [REMOVE_TODO]: (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo: { id: string; title: string }) => todo.id !== id),
  }),
  [UPDATE_TODO]: (state, { title, id }) => ({
    ...state,
    todos: state.todos.map((todo: { id: string; title: string }) => {
      if (todo.id === id) {
        // eslint-disable-next-line no-param-reassign
        todo.title = title;
      }
      return todo;
    }),
  }),

  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [HIDE_LOADER]: (state) => ({ ...state, loading: false }),
  [CLEAR_ERROR]: (state) => ({ ...state, error: null }),
  [SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  [FETCH_TODOS]: (state, { todos }) => ({ ...state, todos }),

  DEFAULT: (state) => state,
};

export const TodoReducer = (
  state: never,
  action: { id: string; title: string; type: string; todos: { id: string; title: string }[] },
) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
