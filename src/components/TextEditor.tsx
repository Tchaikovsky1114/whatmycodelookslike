import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../store/cell';
import { useAppDispatch } from '../store/store';
import { saveCells, updateCell } from '../store/slices/CellSlice';


interface TextEditorProps {
  cell:Cell
}


const TextEditor = ({cell}:TextEditorProps) => {
  const dispatch = useAppDispatch()
  const [editing,setEditing] = useState(false)
  const ref = useRef<HTMLDivElement>(null);
  const onChange = (_:any,e:ChangeEvent<HTMLTextAreaElement> | undefined,__:any) => {
    dispatch(updateCell({
      id: cell.id,
      content:e!.currentTarget.value
    }
    ))
    dispatch(saveCells())
  }

  const handleToggleEditor = () => {
    setEditing(prev => !prev)
  }

  useEffect(() => {
    const listener = (e:MouseEvent) => {
      if(ref.current && e.target && ref.current.contains(e.target as Node)){
        return;
      }else{
        setEditing(false);
      }
    }
    document.addEventListener('click', listener, {capture: true})

    return () => {
      document.removeEventListener('click',listener, {capture:true})
    
  }
  },[])


  if(editing) {
    return ( 
      <div ref={ref}>
      <MDEditor value={cell.content || 'EDIT'} onChange={onChange} />
      </div>
    )
  }else{
    return (
      <div onClick={handleToggleEditor}>
      <MDEditor.Markdown source={cell.content || 'EDIT'} style={{ whiteSpace: 'pre-wrap' }} />  
      </div>
    );
  }
  
};

export default TextEditor;