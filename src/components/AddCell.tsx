import React from 'react';
import { insertCellAfter, saveCells } from '../store/slices/CellSlice';
import { useAppDispatch } from '../store/store';

interface AddCellProps {
  prevCellId: string | null;
  isVisible?:boolean;
  isHidden?:boolean;
}

const AddCell = ({prevCellId,isVisible,isHidden}:AddCellProps) => {
  const dispatch = useAppDispatch()

  const addTextHandler = () => {
    dispatch(insertCellAfter({
      id:prevCellId,
      type:'text'}))
      dispatch(saveCells())
  }
  const addCodeHandler = () => {
    dispatch(insertCellAfter({
      id:prevCellId,
      type:'code'}))
      dispatch(saveCells())
  }
  return (

    <>
    <div className={`relative flex justify-center items-center gap-20 h-full py-4 hover:opacity-100 transition-opacity duration-300 ease-in
    ${isVisible ? 'opacity-100' :'opacity-0'}
    ${isHidden && 'hidden'}
    `}>
      <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-4 rounded-full flex items-center justify-center" onClick={addTextHandler}><i className="pr-2 fa-solid fa-plus fa-xs" /><span className='text-sm p-2 align-text-top '>TEXT</span></button>
      <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-4 rounded-full flex items-center justify-center" onClick={addCodeHandler}><i className="pr-2 fa-solid fa-plus fa-xs" /><span className='text-sm p-2'>CODE</span></button>      
      <div className=' absolute top-1/2 bottom-1/2 left-[2.5%] right-[2.5%] border-b border-gray-500 -z-10'></div>
    </div>
    
    </>
    
  );
};

export default AddCell;