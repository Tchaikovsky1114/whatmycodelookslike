import { Fragment, useEffect } from 'react';
import {useAppSelector } from '../store/store';
import CellItem from './CellItem';
import AddCell from './AddCell';
import { useAppDispatch } from '../store/store';
import { fetchCells, saveCells} from '../store/slices/CellSlice';
const CellList = () => {

  const dispatch = useAppDispatch()
  const {order,data} = useAppSelector((state) => state.cell)
  
  useEffect(() => {
    dispatch(fetchCells())
    dispatch(saveCells())
  }, [dispatch])
  

  // order는 각 data의 id로 이루어진 배열임을 이용하여, 해당 id를 갖고 있는 data를 하나씩 불러들이며 정렬시킨다.
  const renderedCells = order.map((id) => data[id])
  // console.log(order)
  return (
    <div className='cell-list my-0 mx-6 mb-96'>
    {renderedCells.map((cell) => 
    <Fragment key={'AddCell' + cell.id}>
    <CellItem cell={cell} />    
    <AddCell prevCellId={cell.id} />
    </Fragment>)
    }

    
    <AddCell isVisible={renderedCells.length === 0} isHidden={renderedCells.length > 0} prevCellId={null} />
    
    </div>
  )
};

export default CellList;