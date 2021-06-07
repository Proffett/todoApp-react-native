import React, { Dispatch, ReducerAction, useContext, useReducer } from 'react';
import { Alert } from 'react-native';

import { Http } from '../../http';
import { ScreenContext } from '../screen/screenContext';
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

import { TodoContext } from './todoContext';
import { TodoReducer } from './todoReducer';

export interface initialStateType {
  todos: [];
  loading: false;
  error: null;
}

interface TooStateProps {
  children: Element;
}

export const TodoState = ({ children }: TooStateProps): JSX.Element => {
  const initialState: initialStateType = {
    todos: [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(TodoReducer, initialState);
  const { changeScreen } = useContext(ScreenContext);

  const addTodo = async (title: string) => {
    clearError();
    try {
      const data = await Http.post(
        'https://todoapp-udemy-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
        { title },
      );

      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (e) {
      showError('что-то пошло не так');
    }
  };

  const removeTodo = (id: string) => {
    clearError();
    const todo = state.todos.find((t: { id: string }) => t.id === id);
    Alert.alert(
      'Удаление задачи',
      `Удалить "${todo?.title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            changeScreen(null);
            await Http.delete(
              `https://todoapp-udemy-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
            );
            dispatch({ type: REMOVE_TODO, id });
          },
        },
      ],
      { cancelable: false },
    );
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const data = await Http.get(
        'https://todoapp-udemy-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
      );
      const todos = Object.keys(data).map((key) => ({
        ...data[key],
        id: key,
      }));

      dispatch({ type: FETCH_TODOS, todos });
    } catch (error) {
      showError('ошибка загрузки, попробуйте снова');
    } finally {
      hideLoader();
    }

    hideLoader();
  };

  const updateTodo = async (id: string, title: string) => {
    clearError();

    try {
      await Http.patch(
        `https://todoapp-udemy-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
        { title },
      );
      dispatch({ type: UPDATE_TODO, title, id });
    } catch (e) {
      showError(`что-то пошло не так`);
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const showError = (error: string) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
