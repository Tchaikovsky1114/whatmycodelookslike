import { configureStore } from '@reduxjs/toolkit';
import { cellReducer, insertCellBefore } from './slices/CellSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { ActionType } from './action-types';

export const store = configureStore({
  reducer: {
    cell: cellReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useCellSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// manually test code.

store.dispatch(
  insertCellBefore({
    id: null,
    type: 'code',
  })
);

store.dispatch(
  insertCellBefore({
    id: null,
    type: 'text',
  })
);
console.log(store.getState());
