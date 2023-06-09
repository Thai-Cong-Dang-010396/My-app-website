import React, { useState, useEffect } from 'react';
import '../css/MarkdownPreviewer.css';
import renderPreview from '../scripts/MarkdownPreviewer';

const defaultMarkdown = "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)";

const MarkdownPreviewer = () => {
    const [markdown, setMarkdown] = useState(defaultMarkdown);

    useEffect (() => {
        getPreview();
    }, []);

    const getPreview = () => {
        renderPreview();
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setMarkdown(value);
        getPreview();
    };

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
              onChange={handleChange}
              value={markdown}
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