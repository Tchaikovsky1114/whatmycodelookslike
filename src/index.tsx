import { createRoot } from 'react-dom/client';
import * as esbuild from 'esbuild-wasm';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

export const App = () => {
  const iframe = useRef<any>();
  const [inputValue, setInputValue] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    try {
      await esbuild.initialize({
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.49/esbuild.wasm',
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    startService();
  }, []);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value);
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
        // 번들링 진입점
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        // plugins - onLoad - contents에 들어가야 할 inputValue
        plugins: [unpkgPathPlugin(), fetchPlugin(inputValue)],

        define: {
          global: 'window',
        },
      });

      // setCode(result.outputFiles[0].text);

      iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
    } catch (err) {
      alert(err);
    }
  };


  const html = /*html*/ `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message',(event) => {
          try{
            eval(event.data)
          }catch(err){
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red"><h4>RUNTIME ERROR</h4>' + err + '</div>'
            console.error(err);
          }
          
        },false)
      </script>
    </body>
  </html>
`;
  return (
    <div>
      <textarea value={inputValue} onChange={onChange}></textarea>
      <div>
        <button onClick={onClick}>제출</button>
      </div>

      <div style={{ width: '360px' }}>
        <h1>Transfiling to ES2015</h1>
        <pre>{code}</pre>
        {/* sandbox를 빈칸으로 두어 모든 상속 관계를 disable (allow-same-origin X) */}
        {/* srcDoc property 속성을 사용하면 iframe을 통해 컨텐츠를 load하는게 아니라 반대로 일부 콘텐츠를 iFrame에 로드할 수 있다. */}
        {/* 즉 URL 외부로 이동하여 요청하도록 지시할 수 있다. */}
        {/* allow-scripts를 통해서 iframe내에 들어오는 script 태그 내 javascript를 실행할 수 있게 된다. */}
        <iframe ref={iframe} srcDoc={html} sandbox="allow-scripts" />
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
