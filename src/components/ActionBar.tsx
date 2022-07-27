import React from 'react';
import { deleteCell,moveCell, saveCells } from '../store/slices/CellSlice';
import { useAppDispatch } from '../store/store';


interface ActionBarProps {
  id: string;
  bgColor?:string;
}

const ActionBar = ({id,bgColor}:ActionBarProps) => {
  const dispatch = useAppDispatch()

  const cellUpHandler = () => {
    dispatch(moveCell({id,direction:'up'}))
    dispatch(saveCells())
  }
  const cellDownHandler = () => {
    dispatch(moveCell({id,direction:'down'}))
    dispatch(saveCells())
  }
  const cellDeleteHandler = () => {
    dispatch(deleteCell({id}))
    dispatch(saveCells())
  }

  return (
    <div className={`absolute top-0 right-0 z-20 ${bgColor} rounded-bl-lg opacity-50 hover:opacity-90 transition-all duration-200`}>
      <button onClick={cellUpHandler} className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-1" >
      <span className='icon'><i className='fas fa-arrow-up' /></span>
      </button>
      <button onClick={cellDownHandler} className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-1 ">
      <span className='icon'><i className='fas fa-arrow-down' /></span>
      </button>
      <button onClick={cellDeleteHandler} className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-1 ">
      <span className='icon'><i className='fas fa-trash' /></span>
      </button>
    </div>
  );
};

export default ActionBar;