import {combineReducers, createStore, Dispatch} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
// @ts-ignore
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'

import {user} from './User'
import type {RootAction} from './Actions'

export const RootReducer = combineReducers({
  user: user,
})

// configure store
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
}
const persistedReducer = persistReducer(persistConfig, RootReducer)
export const initiateStore = () => createStore(persistedReducer)

export type RootStore = ReturnType<typeof initiateStore>
export type RootState = Exclude<ReturnType<typeof persistedReducer>, undefined>
export type RootDispatch = Dispatch<RootAction>

export const persistor = (store: RootStore) => persistStore(store)

export * from './User'
