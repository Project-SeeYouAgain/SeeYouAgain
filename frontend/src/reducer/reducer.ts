import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    example: ExampleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
