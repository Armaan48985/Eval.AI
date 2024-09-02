'use client';
import React, { useEffect } from 'react';
import Editor, { loader } from '@monaco-editor/react';



interface MonacoEditorResultProps {
  result: string;
  language?: string; // Optional: Allow specifying language
}

const MonacoEditorResult: React.FC<MonacoEditorResultProps> = ({ result, language = 'plaintext' }) => {
  
  return (
    <Editor
      height="45vh"
      defaultLanguage="plaintext"
      value={result}
      theme="vs-light"
    />
  );
};

export default MonacoEditorResult;
