import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bundle } from 'typescript';
import codeProcessor from '../../bundler';
import { BundleCompleteAction, BundleStartAction } from '../actions';

export {};

interface BundleState {
    [key:string]: {
      loading: boolean;
      code: string;
      err: string;
    }
}


const initialState: BundleState = {};

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
    builder.addCase(asyncBundleThunk.pending, (state, action):BundleState => {
      state[action.meta.arg.id] = {
        loading: true,
        code: '',
        err: ''
      }
      return state
    });

    builder.addCase(asyncBundleThunk.fulfilled, (state, action):BundleState => {
    state[action.meta.arg.id] = {
      loading:false,
      code: action.meta.arg.code,
      err: action.meta.arg.err
    }
      return state
  });

    builder.addCase(asyncBundleThunk.rejected, (state, action):BundleState => {

      return state
    });
  },
});

export const bundleReducer = bundleSlice.reducer;
