import React, { useEffect, useRef } from 'react';

import './Preview.css'

interface PreviewProps {
  code: string;
  statusError:string;
}
const html = /*html*/ `
<html>
  <head>
    <style>html {background-color:white;}</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (err) => {
        const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: rgb(225,29,72)"><h4>RUNTIME ERROR</h4>' + err + '</div>'
          console.error(err);
      }

      window.addEventListener('error', (e) => {
        // 기본 기능인 console에 error를 출력하는 것을 막음(console에 발생시키는 error는 브라우저의 기본 기능으로 대체)
        e.preventDefault()
        handleError(e.error);
      })

      window.addEventListener('message',(event) => {
        try{
          eval(event.data)
        }catch(err){
          handleError(err);
          
        }
        
      },false)
    </script>
  </body>
</html>
`;

const Preview = ({code,statusError}:PreviewProps) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    },50)
    
  },[code])

  return (
  <div className='preview-wrapper'>
  <iframe className='bg-white h-full w-full block' ref={iframeRef} title="code preview" srcDoc={html} sandbox="allow-scripts" />
  {statusError && <p className='absolute top-3 left-3 text-rose-600 '>{statusError}</p>}
  </div>)
    
};

export default Preview
























