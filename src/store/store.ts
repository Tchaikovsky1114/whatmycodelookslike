import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cellReducer} from './slices/CellSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { bundleReducer } from './slices/BundleSlice';

import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist'
import localforage from 'localforage';




export const rootReducer = combineReducers({
  cell:cellReducer,
  bundle:bundleReducer,
  
})
const persistConfig = {
  key: 'root',
  version: 1,
  storage:localforage,
  whitelist:["cell"]
}

const persistedReducer = persistReducer(persistConfig,rootReducer)




export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
    }
  })
});

export let persistor = persistStore(store)

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// manually test code.


