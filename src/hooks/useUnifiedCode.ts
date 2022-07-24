import React from 'react';
import { useAppSelector } from '../store/store';

const useUnifiedCode = (cellId:string) => {
  const unifiedCode = useAppSelector((state) => {

    const {data , order} = state.cell
    const orderedCells = order.map(cellId => data[cellId])


    const showFunc = /*javascript*/`
    import _React from 'react'
    import { createRoot as _createRoot } from 'react-dom/client';
    
      var show = (value) => {
        const root = document.querySelector('#root')
        if(typeof value === 'object'){
          if(value.$$typeof && value.props){
            const reactRoot = _createRoot(root)
            reactRoot.render(value)
          }else{
            root.innerHTML = JSON.stringify(value);
          }
        }else{
          root.innerHTML = value
        }
      }
    `
    const showFuncNoop = ` var show = () => {}`
    const unifiedCodeArray = [];
    
    for(let oCell of orderedCells) {
      if(oCell.type === 'code') {
        if(oCell.id === cellId){
          unifiedCodeArray.push(showFunc)
        }else{
          unifiedCodeArray.push(showFuncNoop);
        }
        unifiedCodeArray.push(oCell.content)
      }
      if(oCell.id === cellId ) {
        break;
      }
    }
    return unifiedCodeArray
  }).join('\n')
  return unifiedCode
};

export default useUnifiedCode;