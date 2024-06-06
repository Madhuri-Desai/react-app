// src/components/RichTextEditor.js
import React, { useState, useCallback, useEffect } from 'react';
import {Typography,Paper } from '@mui/material';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw ,ContentState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import '../App.css'; // Optional: Add custom styles here

const TextEditor = ({ initialData }) => {
  const [editorState, setEditorState] = useState(() => {
    return initialData
      ? EditorState.createWithContent(convertFromRaw(initialData))
      : EditorState.createEmpty();
  });

  const handleKeyCommand = useCallback((command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }, []);

  const onChange = (newState) => {
    setEditorState(newState);
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  useEffect(() => {
    // Save the editor content to localStorage whenever it changes
    const contentState = editorState.getCurrentContent();
    localStorage.setItem('editorContent', JSON.stringify(convertToRaw(contentState)));
  }, [editorState]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      const content = `
        UserId : ${userData.id}
        Name: ${userData.name}
        Address: ${userData.address}
        Email: ${userData.email}
        Phone: ${userData.phone}
      `;
      const contentState = ContentState.createFromText(content);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);


  return (
    <div>
      <Paper className="rich-text-section">
        <Typography variant="h5">Rich Text Editor</Typography>
          <div className="editor-toolbar">
            <button onClick={() => toggleInlineStyle('BOLD')}>Bold</button>
            <button onClick={() => toggleInlineStyle('ITALIC')}>Italic</button>
            <button onClick={() => toggleInlineStyle('UNDERLINE')}>Underline</button>
            <button onClick={() => toggleBlockType('unordered-list-item')}>Bullet List</button>
            <button onClick={() => toggleBlockType('ordered-list-item')}>Numbered List</button>
          </div>
          <div className="editor-container">
            <Editor
              editorState={editorState}
              handleKeyCommand={handleKeyCommand}
              onChange={onChange}
            />
          </div>
      </Paper>
    </div>
  );
};

export default TextEditor;
