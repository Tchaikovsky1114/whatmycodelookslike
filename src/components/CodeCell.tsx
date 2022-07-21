import React, { useEffect} from 'react';

import { Cell } from '../store/cell';
import { asyncBundleThunk } from '../store/slices/BundleSlice';
import {updateCell} from '../store/slices/CellSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';


interface CodeCellProps {
  cell: Cell;
}

const CodeCell = ({ cell }: CodeCellProps) => {
 
  const dispatch = useAppDispatch();
  // 아이디마다 개별적으로 수정할 수 있게끔 fix 필요... 
  const bundle = useAppSelector(state => state.bundle[cell.id])
  const onChange = (value: string) => {
    dispatch(
      updateCell({
        id: cell.id,
        content: value,
      })
    );
  };
  
  useEffect(() => {
    const timer = setTimeout(async () => {
       dispatch(asyncBundleThunk({
          id:cell.id,
          code: cell.content,
          err: ''
      }));

    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content,cell.id,dispatch]);
  console.log(cell.id)
  console.log(cell.content)
  console.log(bundle)
  return (
    <Resizable direction="vertical">
      <div className="h-[calc(100%-10px)] flex flex-row">
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={onChange}
            content={cell.content}
          />
        </Resizable>
        {bundle && <Preview code={bundle.code} statusError={bundle.err} />}
      </div>
    </Resizable>
  );
};

export default CodeCell;
