import React, { useState, useEffect } from 'react';
import '../css/MarkdownPreviewer.css';

const MarkdownPreviewer = () => {
  return (
    <div id='wrapper2'>
        <div className='editorWrap'>
            <div className='toolbar'>
                <i className='fa fa-check-square-o'></i> 
                Editor
                <i className='fa fa-arrows-alt'></i> 
            </div>
            <textarea id='editor' typeof='text'></textarea>          
        </div>

        <div className='previewWrap'>
            <div className='toolbar'></div>
            <div id='preview'></div>
        </div>
    </div>
  )
}

export default MarkdownPreviewer