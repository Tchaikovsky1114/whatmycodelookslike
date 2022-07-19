import React from 'react';
import {useCellSelector } from '../store/store';
import CellItem from './CellItem';


const CellList = () => {
  const {order,data} = useCellSelector((state) => state.cell)


  // order는 각 data의 id로 이루어진 배열임을 이용하여, 해당 id를 갖고 있는 data를 하나씩 불러들이며 정렬시킨다.
  const renderedCells = order.map((id) => data[id])
  
  
  
  return (
    <>
    <h1>Cell - LIST</h1>
    {renderedCells.map((cell) => <CellItem key={cell.id} cell={cell} />)}
    </>
  )
};

export default CellList;