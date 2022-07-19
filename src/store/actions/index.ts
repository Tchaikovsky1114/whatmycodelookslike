// import { ActionType } from "../action-types";
import {CellTypes} from '../cell'


// 1. type 지정 - 2. type에 맞는 property 지정.


export type Direction = 'up' | 'down'


export interface MoveCellAction {

    id: string;
    direction: Direction
  
}

export interface DeleteCellAction {

  id: string
}

export interface InsertCellBeforeAction{
    id:string | null;
    type: CellTypes;
  
}

export interface UpdateCellAction {
    id: string;
    content: string;
}

// actions
export type Action = MoveCellAction | DeleteCellAction | InsertCellBeforeAction | UpdateCellAction
