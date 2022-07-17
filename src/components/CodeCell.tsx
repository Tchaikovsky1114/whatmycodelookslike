
import React, { useState } from 'react';

import codeProcessor from '../bundler'
import CodeEditor from './CodeEditor';
import Preview from './Preview';

import Resizable from './Resizable';

const CodeCell = () => {
  const [inputValue, setInputValue] = useState('');
  const [code, setCode] = useState('');


  const onChange = (value:string) => {
    setInputValue(value);
  };

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
     const output = await codeProcessor(inputValue)
      setCode(output);
    } catch (err) {
      alert(err);
    }
  };

  //  const onChange = (e:ChangeEvent<HTML)
  return (
    <Resizable direction='vertical'>
      <div className='h-full flex flex-row'>
        <Resizable direction='horizontal'>
        <CodeEditor
          initialValue="const a = 1;"
          onChange={onChange}
        />
        </Resizable>
          <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell