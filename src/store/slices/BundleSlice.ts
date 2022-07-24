import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import codeProcessor from '../../bundler';
import { BundleCompleteAction } from '../actions';

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

    builder.addCase(asyncBundleThunk.fulfilled, (state, action:PayloadAction<BundleCompleteAction>):BundleState => {
      // meta, dispatch 이전 입력되는 data, payload thunk를 통해 변환된 data
    state[action.payload.id] = {
      loading:false,
      code: action.payload.code,
      err: action.payload.err
    }
      return state
  });

    builder.addCase(asyncBundleThunk.rejected, (state, action):BundleState => {
      
      if(action.error.message){
        state[action.meta.arg.id] = {
          loading:false,
          code: '',
          err: action.error.message
        }
      }else{
        state[action.meta.arg.id] = {
          loading:false,
          code: '',
          err: 'unkwown error occured'
        }
      }
      
      return state
    });
  },
});

export const bundleReducer = bundleSlice.reducer;
