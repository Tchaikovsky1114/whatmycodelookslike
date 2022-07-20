import React, { ReactElement } from 'react';
import { Cell } from '../store/cell';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';
import ActionBar from './ActionBar'
interface CellItemProps {
  cell:Cell
}

const CellItem = ({cell}:CellItemProps) => {

  let child: ReactElement

  if(cell.type === 'code') {
    child = <>
    <div className='h-6 bg-slate-700'>
    <ActionBar id={cell.id} />
    </div>
    <CodeCell cell={cell} />
    </>
  }else {
    child = <>
    <div className='h-6 bg-slate-700 mt-3'>
    <ActionBar id={cell.id} bgColor="bg-slate-800"  />
    </div>
    <TextEditor cell={cell} />
    </>
  }

  return (
    <div className='relative'>
    {child}
    </div>
  );
};

export default CellItem;