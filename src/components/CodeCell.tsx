import React, { useEffect, useState } from 'react';
import codeProcessor from '../bundler';
import { Cell } from '../store/cell';
import {
  updateCell,
  moveCell,
  insertCellBefore,
  deleteCell,
} from '../store/slices/CellSlice';
import { useAppDispatch } from '../store/store';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';


interface CodeCellProps {
  cell: Cell;
}

const CodeCell = ({ cell }: CodeCellProps) => {
  // const [inputValue, setInputValue] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const dispatch = useAppDispatch();

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
      const output = await codeProcessor(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div className="h-full flex flex-row">
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={onChange}
            content={cell.content}
          />
        </Resizable>
        <Preview code={code} statusError={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
