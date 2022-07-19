import { Cell } from '../cell';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellBeforeAction,
} from '../actions';

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

// export const insertCellBefore = (id:string,type:CellTypes ):InsertCellBeforeAction =>{

//   return {
//     type: ActionType.INSERT_CELL_BEFORE,
//     data: {
//       id,
//       type
//     }
//   }
// }
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
      state.order.filter((id) => id !== action.payload.id);
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
    insertCellBefore(
      state: CellState,
      action: PayloadAction<InsertCellBeforeAction>
    ) {
      const cell: Cell = {
        id: randomId(),
        type: action.payload.type,
        content: '',
      };
      state.data[cell.id] = cell;

      const index = state.order.findIndex((id) => id === action.payload.id);
      if (index < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(index, 0, cell.id);
      }
    },
  },
});

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export const cellReducer = cellSlice.reducer;
export const { updateCell, deleteCell, moveCell, insertCellBefore } =
  cellSlice.actions;
