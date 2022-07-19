import React, { ReactElement } from 'react';
import { Cell } from '../store/cell';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';

interface CellItemProps {
  cell:Cell
}

const CellItem = ({cell}:CellItemProps) => {

  let child: ReactElement

  if(cell.type === 'code') {
    child = <CodeCell cell={cell} />
  }else {
    child = <TextEditor cell={cell} />
  }

  return (
    <>
    {child}
    </>
  );
};

export default CellItem;