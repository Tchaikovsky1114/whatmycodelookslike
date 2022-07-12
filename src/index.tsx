import { createRoot } from 'react-dom/client';
import * as esbuild from 'esbuild-wasm';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';



export const App = () => {
  
  const [inputValue, setInpuValue] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    try {
      await esbuild.initialize({
        worker: true,
        wasmURL: '/esbuild.wasm',
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    startService();
  }, []);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInpuValue(e.currentTarget.value);
  };

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      // const responseData = await esbuild.transform(inputValue, {
      //   loader: 'jsx',
      //   target: 'es2015',
      // });
      const result = await esbuild.build({
        // 번들 진입점
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        // plugins - onLoad - contents에 들어가야 할 inputValue
        plugins: [unpkgPathPlugin(),fetchPlugin(inputValue)],

        define: {
          'process.env.NODE_ENV': "production",
          global: "window"
        }
      })
      
      setCode(result.outputFiles[0].text);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <textarea value={inputValue} onChange={onChange}></textarea>
      <div>
        <button onClick={onClick}>제출</button>
      </div>

      <div style={{ width: '360px' }}>
        <h1>Transfiling to ES2015</h1>
        <pre>{code}</pre>
      </div>
    </div>
  );
};

let container: any;

document.addEventListener('DOMContentLoaded', function (event) {
  if (!container) {
    container = document.getElementById('root') as HTMLElement;
    const root = createRoot(container);
    root.render(<App />);
  }
});
