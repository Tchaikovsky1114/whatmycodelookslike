import React from 'react';
import { deleteCell,moveCell } from '../store/slices/CellSlice';
import { useAppDispatch } from '../store/store';


interface ActionBarProps {
  id: string;
  bgColor?:string;
}

const ActionBar = ({id,bgColor}:ActionBarProps) => {
  const dispatch = useAppDispatch()

  const cellUpHandler = () => {
    dispatch(moveCell({id,direction:'up'}))
  }
  const cellDownHandler = () => {
    dispatch(moveCell({id,direction:'down'}))
  }
  const cellDeleteHandler = () => {
    dispatch(deleteCell({id}))
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