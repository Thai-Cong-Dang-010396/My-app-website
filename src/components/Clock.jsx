import React, { useState, useEffect, useRef } from 'react'
import '../css/Clock.css';
const $ = window.$;

const Clock = () => {
  const [breakNum, setBreakNum] = useState(5)
  const [sessionNum, setSessionNum] = useState(25)  
  let sessionTimer = useRef();
  let isSession = useRef(true);
  let sessionLength = sessionNum * 60;

  useEffect(() => {
    console.log('cleanup start...')
    return () => clearInterval(sessionTimer.current);
  }, [])

  const handleClickBreak = (event) => {
    if(sessionTimer.current === undefined) {
      const operator = event.target.className;
      let newBreak = (operator.includes('up')) ? (breakNum + 1): (breakNum - 1);
      (newBreak > 0 && newBreak < 61)? setBreakNum(newBreak): (newBreak = breakNum);
      (!isSession) ? ($('#time-left').text(`${newBreak}` + ':00')): (newBreak = newBreak);
    }
  }

  const handleClickSession = (event) => {
    if(sessionTimer.current === undefined) {
      const operator = event.target.className;
      let newSession = (operator.includes('up')) ? (sessionNum + 1): (sessionNum - 1);
      (newSession > 0 && newSession < 61)?(sessionLength = newSession): (sessionLength = -1);
      (newSession > 0 && newSession < 61)? setSessionNum(newSession): (newSession = sessionNum);
      if(newSession < 10) {newSession = '0' + newSession};
      (isSession) ? ($('#time-left').text(`${newSession}` + ':00')): (newSession = newSession);
    }
  }

  const handleTime = () => {
    if(sessionTimer.current === undefined) {
      sessionRun();
    } else {
      clearInterval(sessionTimer.current);
      sessionTimer.current = undefined;
    }
  }

  function sessionRun() {
    sessionTimer.current = setInterval(() => {
      sessionLength -= 1;

      if(sessionLength < 0 && isSession.current) {
        $('#timer-label').text('Break');
        sessionLength = breakNum * 60;
        isSession.current = !isSession.current;
      } else if(sessionLength < 0 && !isSession.current) {
        $('#timer-label').text('Session');
        sessionLength = sessionNum * 60;
        isSession.current = !isSession.current;
      }
      
      let timerMinutes ='' + Math.floor(sessionLength / 60);
      let timerSeconds ='' + sessionLength % 60;
      if(timerMinutes < 10 ) {timerMinutes = '0' + timerMinutes};
      if(timerSeconds < 10 ) {timerSeconds = '0' + timerSeconds};
      $('#time-left').text(`${timerMinutes}:${timerSeconds}`)
  }, 1000);
  }

  const handleReset = () => {
    // const audi = $("#beep");
    // audi.trigger('play');
    clearInterval(sessionTimer.current);
    sessionTimer.current = undefined;
    sessionLength = sessionNum * 60
    setBreakNum(5);
    setSessionNum(25);
    $('#timer-label').text('Session');
    $('#time-left').text('25' + ':00');
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
            <div id="time-left">25:00</div>
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
        <audio 
          id="beep" 
          preload="auto" 
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        >
        </audio>
      </div>
    </div>
  )
}

export default Clock