'use client';
import React from 'react';
import Editor from '@monaco-editor/react';

interface MonacoEditorProps {
  inputCode: string;
  setInputCode: (code: string) => void;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ inputCode, setInputCode }) => {
  // Handle editor change
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setInputCode(value);
    }
  };

  return (
    <div className="w-[500px] h-[600px] p-2 bg-[#21293f] rounded-lg shadow-lg overflow-hidden">
      <Editor
        height="calc(100vh - 12rem)" // Adjusting height to fit within padding
        value={inputCode}
        language="java" // Changed to TypeScript for example
        theme="vs-dark" // Changed to a dark theme for consistency with a dark mode design
        onChange={handleEditorChange}
        options={{
          wordWrap: 'on', // Enable word wrapping
          minimap: { enabled: false }, // Hide the minimap
          scrollBeyondLastLine: false, // Prevent scrolling beyond the last line
        }}
        
      />
    </div>
  );
};

export default MonacoEditor;
