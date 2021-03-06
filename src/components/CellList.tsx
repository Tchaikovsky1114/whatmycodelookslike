import React from 'react';
import { Fragment } from 'react';
import {useAppSelector } from '../store/store';
import CellItem from './CellItem';
import AddCell from './AddCell';

const CellList = () => {

  
  const {order,data} = useAppSelector((state) => state.cell)
  
  
  
  // order는 각 data의 id로 이루어진 배열임을 이용하여, 해당 id를 갖고 있는 data를 하나씩 불러들이며 정렬시킨다.
  const renderedCells = order.map((id) => data[id])
  // console.log(order)
  return (
    <>
    {renderedCells.map((cell) => 
    <Fragment key={'AddCell' + cell.id}>
    <CellItem cell={cell} />    
    <AddCell prevCellId={cell.id} />
    </Fragment>)
    }

    
    <AddCell isVisible={renderedCells.length === 0} isHidden={renderedCells.length > 0} prevCellId={null} />
    
    </>
  )
};

export default CellList;