import React, { useState, useEffect, useRef } from 'react'
import '../css/Clock.css';
const $ = window.$;

const Clock = () => {
  const [breakNum, setBreakNum] = useState(5)
  const [sessionNum, setSessionNum] = useState(25)  // 0 to 60

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

  let sessionTimer = useRef();
  let isSessionMode = true;
  let sessionLength = sessionNum * 60;
  const handleTime = () => {
    if(sessionTimer.current === undefined) {
      sessionTimer.current = setInterval(() => {
        sessionLength -= 1;
        const timerMinutes = Math.floor(sessionLength / 60);
        const timerSeconds = sessionLength % 60;
        $('#time-left').text(`${timerMinutes} : ${timerSeconds}`)
    }, 1000);
      console.log(sessionTimer.current );
    } else {
      clearInterval(sessionTimer.current);
      sessionTimer.current = undefined;
    }
  }

  const handleReset = () => {
    setBreakNum(5);
    setSessionNum(25);
    $('#time-left').text(`${sessionNum}` + ' : 00')
  }

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
            style={{border: "none"}}
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
            style={{border: "none"}}
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
            style={{border: "none"}}
            onClick={handleClickSession}
          >
            <i className="fa fa-arrow-down fa-2x"></i>
          </button>
          <div className="btn-level" id="session-length">{sessionNum}</div>
          <button 
            className="btn-level" 
            id="session-increment" 
            value="+"
            style={{border: "none"}}
            onClick={handleClickSession}
          >
            <i className="fa fa-arrow-up fa-2x"></i>
          </button>
        </div>

        <div className="timer" style={{color:" white"}}>
          <div className="timer-wrapper">
            <div id="timer-label">Session</div>
            <div id="time-left">{sessionNum} : 00</div>
          </div>
        </div>
        
        <div className="timer-control">
          <button id="start_stop" style={{border: "none"}} onClick={handleTime}>
            <i className="fa fa-play fa-2x"></i>
            <i className="fa fa-pause fa-2x"></i>
          </button>
          <button id="reset" style={{border: "none", marginLeft:"3px"}} onClick={handleReset}>
            <i className="fa fa-refresh fa-2x"></i>
          </button>
          </div>
      </div>
    </div>
  )
}

export default Clock