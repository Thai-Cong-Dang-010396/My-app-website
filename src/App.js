import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RandomQuoteMachine, MarkdownPreviewer, DrumMachine } from './components';
import "./css/App.css";

const App = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<RandomQuoteMachine />} />
                <Route path='/MarkdownPreviewer' element={<MarkdownPreviewer />} />
                <Route path='/DrumMachine' element={<DrumMachine />} />
                <Route path='*' element={<div>Page not found</div>} />
            </Routes>           
        </BrowserRouter>
    )
}

export default App