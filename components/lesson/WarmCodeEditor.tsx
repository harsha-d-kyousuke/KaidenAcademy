import React from 'react';
import Editor, { OnMount, OnChange } from '@monaco-editor/react';

interface WarmCodeEditorProps {
  defaultValue?: string;
  onChange?: OnChange;
}

const WarmCodeEditor: React.FC<WarmCodeEditorProps> = ({ defaultValue, onChange }) => {
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monaco.editor.defineTheme('kaiden-warm', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: 'BFA08A', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'C47B1E', fontStyle: 'bold' },
        { token: 'string', foreground: '5B6D58' },
        { token: 'number', foreground: 'B44446' },
        { token: 'type', foreground: '9D7B9C' },
        { token: 'delimiter', foreground: 'BFA08A' },
        { token: 'identifier', foreground: '3B2C19'},
        { token: 'function', foreground: '9D7B9C', fontStyle: 'bold' }
      ],
      colors: {
        'editor.background': '#FFF9F3',
        'editor.foreground': '#3B2C19',
        'editorLineNumber.foreground': '#BFA08A',
        'editor.selectionBackground': '#F2B66150',
        'editorCursor.foreground': '#C47B1E',
        'editorWidget.background': '#EDE8D0',
        'editorWidget.border': '#D8A04F',
      }
    });
    monaco.editor.setTheme('kaiden-warm');
  };

  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue={defaultValue}
      onChange={onChange}
      theme="kaiden-warm"
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
        fontFamily: 'monospace',
        fontSize: 14,
        lineNumbers: 'on',
        wordWrap: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: {
            top: 16,
            bottom: 16,
        }
      }}
    />
  );
};

export default WarmCodeEditor;