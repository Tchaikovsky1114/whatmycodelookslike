import { configureStore } from '@reduxjs/toolkit';
import { cellReducer, insertCellAfter } from './slices/CellSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { bundleReducer } from './slices/BundleSlice';


export const store = configureStore({
  reducer: {
    cell: cellReducer,
    bundle: bundleReducer
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// manually test code.

store.dispatch(
  insertCellAfter({
    id: null,
    type: 'code',
  })
);

store.dispatch(
  insertCellAfter({
    id: null,
    type: 'text',
  })
);

