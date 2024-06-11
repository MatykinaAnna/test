import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import reducer from './reducer'

export const rootReducer = combineReducers({
  mainReducer: reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
