import React, { useEffect, useRef } from 'react';

import './Preview.css'

interface PreviewProps {
  code: string;
  
}
const html = /*html*/ `
<html>
  <head>
    <style>html {background-color:white;}</style>
  </head>
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

const Preview = ({code}:PreviewProps) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    iframeRef.current.contentWindow.postMessage(code, '*');
  },[code])

  return (
  <div className='preview-wrapper'>
  <iframe className='bg-white h-full w-full block' ref={iframeRef} title="code preview" srcDoc={html} sandbox="allow-scripts" />
  </div>)
    
};

export default Preview
























