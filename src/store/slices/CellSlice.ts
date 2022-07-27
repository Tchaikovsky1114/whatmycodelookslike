import { Cell } from '../cell';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,

} from '../actions';
import { store } from '../store';
import _ from 'lodash'


// 3. reducer type definition

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};





export const fetchCells = createAsyncThunk('cell/fetchCells',async () => {
    const { data }: {data: Cell[]} = await axios.get('/cells');
    return data
}) 

const handler = async () => {
  const {cell: {data,order}} = store.getState();
  const cells = order.map(id => data[id]);

 await axios.post('/cells',{cells})
 
}

const debouncedHandler = _.debounce(handler,3000)


export const saveCells = createAsyncThunk('cell/saveCells', debouncedHandler)


const cellSlice = createSlice({
  name: 'cell',
  initialState,
  reducers: {
    updateCell(state: CellState, action: PayloadAction<UpdateCellAction>) {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },

    deleteCell(state: CellState, action: PayloadAction<DeleteCellAction>) {
      delete state.data[action.payload.id];
      state.order = state.order.filter((id) => id !== action.payload.id);
    },
    moveCell(state: CellState, action: PayloadAction<MoveCellAction>) {
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
    },
    insertCellAfter(
      state: CellState,
      action: PayloadAction<InsertCellAfterAction>
    ) {
      const cell: Cell = {
        id: randomId(),
        type: action.payload.type,
        content: '',
      };
      state.data[cell.id] = cell;

      const index = state.order.findIndex((id) => id === action.payload.id);
      if (index < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(index + 1, 0, cell.id);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCells.fulfilled,(state ,action) => {
      state.loading = false;
      state.order = action.payload.map(cell => cell.id)
      
      state.data = action.payload.reduce((acc,cell) => {
        acc[cell.id] = cell;
        return acc
      },{} as CellState['data'])
    })
    
    builder.addCase(fetchCells.rejected, (state ,action) => {
      const { message } = action.error
      state.loading = false;
      if ( message ){
        state.error = message
      } else {
        state.error = '코드 전송 중 알 수 없는 에러가 발생했습니다.'
      }
    })

    builder.addCase(fetchCells.pending, (state ,action) => {
      state.loading = true
    })

    builder.addCase(saveCells.fulfilled, (state,action) => {
      state.loading = false
    })
    builder.addCase(saveCells.pending, (state,action) => {
      state.loading = true
    })
    builder.addCase(saveCells.rejected, (state,action) => {
      const {message} = action.error
      state.loading = false
      if(message){
        state.error = message
      }
      
    })
  }
});

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export const cellReducer = cellSlice.reducer;
export const { updateCell, deleteCell, moveCell, insertCellAfter } =
  cellSlice.actions;
