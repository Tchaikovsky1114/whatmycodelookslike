import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import codeProcessor from '../../bundler';
import { BundleCompleteAction } from '../actions';

export {};

interface BundleState {
  id: string;
  loading: boolean;
  code: string;
  err: string;
}

const initialState: BundleState = {
  id: '',
  loading: false,
  code: '',
  err: '',
};

export const asyncBundleThunk = createAsyncThunk<
  any,
  BundleCompleteAction,
  { rejectValue: Error }
>('bundle/start', async (action: BundleCompleteAction) => {
  const { id } = action;
  const result = await codeProcessor(action.code);
  const data = {
    id,
    code: result.code,
    err: result.err,
  };

  return data;
});

const bundleSlice = createSlice({
  name: 'bundle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncBundleThunk.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(asyncBundleThunk.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.loading = false;
      state.code = action.payload.code;
      state.err = action.payload.err;
    });

    builder.addCase(asyncBundleThunk.rejected, (state, action) => {
      if (action.error) {
        state.id = '';
        state.loading = false;
        state.code = '';
        state.err = action.error.message || 'error';
      } else {
        state.id = '';
        state.loading = false;
        state.code = '';
        state.err = 'unkwon error occured';
      }
    });
  },
});

export const bundleReducer = bundleSlice.reducer;
