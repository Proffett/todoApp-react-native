import { CHANGE_SCREEN } from '../types';

type HandlersType = {
  [action: string]: (state: number, payload: number) => typeof state;
};

const handlers: HandlersType = {
  [CHANGE_SCREEN]: (state, payload) => payload,
  DEFAULT: (state) => state,
};

export const screenReducer = (
  state: number,
  action: {
    type: string;
    payload: number;
  },
) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action.payload);
};
