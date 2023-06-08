import React, { useState, useEffect } from 'react';
import '../css/MarkdownPreviewer.css';
import renderPreview from '../scripts/MarkdownPreviewer';
import { marked } from 'marked';

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState('# markdown preview')

  useEffect (() => {
    getPreview();
  }, []);

  const getPreview = () => {
    const getPre = marked.parse(markdown);
    renderPreview(getPre);
  }

  const handleChange = (event) => {
    setMarkdown(event.target.value);
    getPreview();
  }

  return (
    <div id='wrapper2'>
        <div className='editorWrap'>
            <div className='toolbar'>
                <i className='fa fa-check-square-o'></i> 
                Editor
                <i className='fa fa-arrows-alt'></i> 
            </div>
            <textarea 
              id='editor' 
              typeof='text' 
              value={markdown}
              onChange={handleChange}
            >
            </textarea>          
        </div>

        <div className='previewWrap'>
            <div className='toolbar'>
                <i className='fa fa-check-square-o'></i> 
                Previwer
                <i className='fa fa-arrows-alt'></i> 
            </div>
            <div id='preview'></div>
        </div>
    </div>
  )
}

export default MarkdownPreviewer