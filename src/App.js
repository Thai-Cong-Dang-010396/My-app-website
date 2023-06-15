import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RandomQuoteMachine, MarkdownPreviewer, DrumMachine, JavaScriptCalculator, Clock, ClockAnother } from './components';
import "./css/App.css";

const App = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<RandomQuoteMachine />} />
                <Route path='/MarkdownPreviewer' element={<MarkdownPreviewer />} />
                <Route path='/DrumMachine' element={<DrumMachine />} />
                <Route path='/JavaScriptCalculator' element={<JavaScriptCalculator />} />
                <Route path='/25--5-Clock' element={<Clock />} />
                <Route path='/25--5-ClockAnother' element={<ClockAnother />} />
                <Route path='*' element={<div>Page not found</div>} />
            </Routes>           
        </BrowserRouter>
    )
}

export default App