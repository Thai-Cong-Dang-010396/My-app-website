import React, { useState, useEffect } from 'react'
import { HashRouter, Routes, Route} from "react-router-dom";

import './App.css';
import { RandomQuoteMachine, MarkdownPreviewer } from './components';


const App = () => {
    
    return (
        <HashRouter>
            <Routes>
                <Route exact path='/' element={<RandomQuoteMachine />}></Route>
                <Route exact path='/MarkdownPreviewer' element={<MarkdownPreviewer />}></Route>
            </Routes>           
        </HashRouter>
    )
}

export default App