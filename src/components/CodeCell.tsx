import React, { useEffect} from 'react';
import useUnifiedCode from '../hooks/useUnifiedCode';

import { Cell } from '../store/cell';
import { asyncBundleThunk } from '../store/slices/BundleSlice';
import {saveCells, updateCell} from '../store/slices/CellSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import CodeEditor from './CodeEditor';
import LoadingSpinner from './LoadingSpinner';
import Preview from './Preview';
import Resizable from './Resizable';


interface CodeCellProps {
  cell: Cell;
}

const CodeCell = ({ cell }: CodeCellProps) => {
  const dispatch = useAppDispatch();
  const bundle = useAppSelector(state => state.bundle[cell.id])
  const unifiedCode = useUnifiedCode(cell.id)

  const onChange = (value: string) => {
    dispatch(
      updateCell({
        id: cell.id,
        content: value,
      }));
      dispatch(saveCells())
  };
  
  useEffect(() => {
    if(!bundle){
      dispatch(asyncBundleThunk({
        id:cell.id,
        code: unifiedCode,
        err:''
      }))
      dispatch(saveCells())
    }
    const timer = setTimeout(async () => {
       dispatch(asyncBundleThunk({
          id:cell.id,
          code:  unifiedCode,
          err: ''
      }));
      dispatch(saveCells())
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unifiedCode,cell.id,dispatch]);



  return (
    <Resizable direction="vertical">
      <div className="h-[calc(100%-10px)] flex flex-row">
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={onChange}
            content={cell.content}
          />
        </Resizable>
        
        {!bundle || bundle.loading ? <LoadingSpinner /> : <Preview code={bundle.code} statusError={bundle.err} />}
        
      </div>
    </Resizable>
  );
};

export default CodeCell;
