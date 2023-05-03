import { createStore } from '@reduxjs/toolkit';
import rootReducer from '../reducer/reducer';
export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
