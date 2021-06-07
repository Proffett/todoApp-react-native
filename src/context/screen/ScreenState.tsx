import React, { useReducer } from 'react';

import { CHANGE_SCREEN } from '../types';

import { ScreenContext } from './screenContext';
import { screenReducer } from './screenReducer';

type ScreenStateProps = {
  children: Element;
};

export const ScreenState = ({ children }: ScreenStateProps) => {
  const [state, dispatch] = useReducer(screenReducer, 0, undefined);

  const changeScreen = (id: string | null): string | null =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch({ type: CHANGE_SCREEN, payload: id });

  return (
    <ScreenContext.Provider
      value={{
        changeScreen,
        todoId: state,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};
