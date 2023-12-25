import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
export interface SessionState {
  session: string
}

const store = configureStore({
  reducer: {
    session: sessionReducer
  }
});

export default store;
