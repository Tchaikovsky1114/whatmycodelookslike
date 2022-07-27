import Editor, { Monaco } from '@monaco-editor/react';
import * as monaco from '../../node_modules/monaco-editor/esm/vs/editor/editor.api';

import prettier from 'prettier';

import parser from 'prettier/parser-babel';
import { useRef } from 'react';

interface CodeEditorProps {
  onChange(value: string): void;
  content:string;
}



const CodeEditor = ({ onChange,content }: CodeEditorProps) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>();

  const onEditorBeforeMount = (monaco:Monaco) =>{
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    
  }

  const onEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor,_monaco: Monaco) => {
    
    editorRef.current = editor;
    editor.getModel()?.updateOptions({ tabSize: 2 });
    editor.onDidChangeModelContent(() => onChange(editor.getValue()));
  };

  const onFormat = () => {
    // editor로부터 get value
    if (editorRef.current) {
      const unformatted = editorRef.current.getValue();
      // formatting
      const formatting = prettier
        .format(unformatted, {
          parser: 'babel',
          plugins: [parser],
          useTabs: false,
          semi: true,
          singleQuote: true,
        })
        .replace(/\n$/, '');
      // setting values return
      editorRef.current?.setValue(formatting);
    }
  };
  return (
    <div className={`relative h-full w-full  bg-white group`}>
      <button
        className="text-sm group-hover:opacity-100 text-white absolute top-1 right-1 z-20 opacity-0 transition-opacity duration-300"
        onClick={onFormat}
      >
        코드정리
      </button>
      <Editor
      beforeMount={onEditorBeforeMount}
        onMount={onEditorDidMount}
        value={content}
        defaultLanguage="javascript"
        height="100%"
        theme="vs-dark"
        
        options={{    
          wordWrap: 'on',
          minimap: {
            enabled: false,
          },
          folding: false,
          lineNumbersMinChars: 2,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      
      />
    </div>
  );
};

export default CodeEditor;
