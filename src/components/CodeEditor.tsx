import MonacoEditor, { Monaco } from '@monaco-editor/react';
import * as monaco from 'C:/copypen/copypen/node_modules/monaco-editor/esm/vs/editor/editor.api';

import prettier from 'prettier';
// prettier는 다양한 언어를 지원하기 때문에 js에게 맞추기 위해서는 적절한 parser를 가져와야 한다.
import parser from 'prettier/parser-babel';
import { useRef } from 'react';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}



const CodeEditor = ({ onChange, initialValue }: CodeEditorProps) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  const onEditorDidMount = async (editor: monaco.editor.IStandaloneCodeEditor,_monaco: Monaco) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => onChange(editor.getValue()));
    editor.getModel()?.updateOptions({ tabSize: 2 });
  
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
      <MonacoEditor
        
        onMount={onEditorDidMount}
        defaultValue="const a = 1;"
        value={initialValue}
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