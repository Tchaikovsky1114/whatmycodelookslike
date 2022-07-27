
import { CellTypes,Cell } from '../cell';

// 1. type 지정 - 2. type에 맞는 property 지정.

export type Direction = 'up' | 'down';

export interface MoveCellAction {
  id: string;
  direction: Direction;
}

export interface DeleteCellAction {
  id: string;
}

export interface InsertCellAfterAction {
  id: string | null;
  type: CellTypes;
}

export interface UpdateCellAction {
  id: string;
  content: string;
}

export interface BundleStartAction {
  id: string;
}

export interface BundleCompleteAction {
  id: string;
  code: string
  err: string
}

export interface FetchCellsLoadingAction {
 loading: boolean
}

export interface FetchCellsCompleteAction {
 data: Cell[]
}

export interface FetchCellsErrorAction {
  errorMessage: string;
}
