import  {createRoot}  from "react-dom/client"
import * as esbuild from 'esbuild-wasm'

import React, { ChangeEvent, useEffect, useState } from 'react';




export const App = () => {
  const [inputValue, setInpuValue] = useState('');
  const [code, setCode] = useState('');

  const startService = async() => {
    
    try{
      const service = await esbuild.initialize({
        worker:true,
        wasmURL: '/esbuild.wasm'
      })
    }catch(err){
      console.log(err)
    }
      

  }

  useEffect(() => {

    startService()
  },[])
  
  

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInpuValue(e.currentTarget.value)
  };

  const onClick = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try{
      const responseData = await esbuild.transform(inputValue, {
        loader: 'jsx',
        target: 'es2015'
      })
      console.log(responseData.code);
    }catch(err){
      console.log(err); 
    }
  }
  return (
    <div>
      <textarea value={inputValue} onChange={onChange}></textarea>
      <div>
        <button onClick={onClick}>제출</button>
      </div>
      
      
      <div>
        <h1>show</h1>
        {/* 코드를 보여주기 위한 html tag */}
        <pre>{code}</pre>
      </div>
    </div>
  );
};

let container:any;

document.addEventListener('DOMContentLoaded', function(event) {
  if (!container) {
    container = document.getElementById('root') as HTMLElement;
    const root = createRoot(container)
    root.render(
        <App/>
    );
  }
});