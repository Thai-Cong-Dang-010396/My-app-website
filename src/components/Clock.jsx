import React, { useState, useEffect } from 'react'

import '../css/Clock.css';

const Clock = () => {
  const [breakNum, setBreakNum] = useState(5)
  const [sessionNum, setSessionNum] = useState(25)  // 0 to 60

  useEffect(() => {
    handleTime()
  }, [])

  const handleClickBreak = (event) => {
    const operator = event.target.className;
    const newBreak = (operator.includes('up')) ? (breakNum + 1): (breakNum - 1);
    (newBreak < 0 || newBreak > 60) ? console.warn("Invalid range") : setBreakNum(newBreak);
  }

  const handleClickSession = (event) => {
    const operator = event.target.className;
    const newSession = (operator.includes('up')) ? (sessionNum + 1): (sessionNum - 1);
    (newSession < 0 || newSession > 60) ? console.warn("Invalid range") : setSessionNum(newSession);
  }

  const handleTime = () => {
    document.getElementById("time-left").innerHTML = `${sessionNum}` + ":59"
  };

  return (
    <div className='app--25-5Clock'>
      <div style={{display: "block", width: "500px"}}>
        <div className='main-title'>25 + 5 Clock</div>

        <div className='length-control'>
          <div id='break-label'>Break Length</div>
          <button 
            className='btn-level'
            id='break-decrement'
            value='-'
            onClick={handleClickBreak}
          >
            <i className='fa fa-arrow-down fa-2x'></i>
          </button>
          <div 
            className='btn-level'
            id='break-length'
          >
            {breakNum}
          </div>
          <button
            className='btn-level'
            id='break-increment'
            value='+'
            onClick={handleClickBreak}
          >
            <i className='fa fa-arrow-up fa-2x'></i>
          </button>
        </div>

        <div className="length-control">
          <div id="session-label">Session Length</div>
          <button 
            className="btn-level" 
            id="session-decrement" 
            value="-"
            onClick={handleClickSession}
          >
            <i className="fa fa-arrow-down fa-2x"></i>
          </button>
          <div className="btn-level" id="session-length">{sessionNum}</div>
          <button 
            className="btn-level" 
            id="session-increment" 
            value="+"
            onClick={handleClickSession}
          >
            <i className="fa fa-arrow-up fa-2x"></i>
          </button>
        </div>

        <div className="timer" style={{color:" white"}}>
          <div className="timer-wrapper">
            <div id="timer-label">Session</div>
            <div id="time-left">{sessionNum}:00</div>
          </div>
        </div>
        
        <div className="timer-control">
          <button id="start_stop" onClick={handleTime}>
            <i className="fa fa-play fa-2x"></i>
            <i className="fa fa-pause fa-2x"></i>
          </button>
          <button id="reset">
            <i className="fa fa-refresh fa-2x"></i>
          </button>
          </div>
      </div>
    </div>
  )
}

export default Clock