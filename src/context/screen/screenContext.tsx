import React from 'react';

const defaultValue = {
  todoId: {},
  changeScreen: (id: string | null) => id || null,
};

export const ScreenContext = React.createContext(defaultValue);
