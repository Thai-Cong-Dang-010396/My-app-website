import React, { useState, useRef } from 'react'
import '../css/Clock.css';
const $ = window.$;

const accurateInterval = function(fn, time) {
  let cancel, nextAt, timeout, wrapper;
  nextAt = new Date().getTime + time;
  timeout = null;
  wrapper = function() {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  }; 
  cancel = function() {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel
  };
};

const Clock = () => {
  const [breakNum, setBreakNum] = useState(5)
  const [sessionNum, setSessionNum] = useState(25)  
  const [sessionLength, setSessionLength] = useState(25 * 60);
  let sessionTimer = useRef();
  let isSession = useRef(true);

  const handleClickBreak = (event) => {
    const operator = event.target.className;
    let newBreak = (operator.includes('up')) ? (breakNum + 1): (breakNum - 1);
    if(sessionTimer.current === undefined) {
      if(newBreak > 0 && newBreak < 61) {
        setBreakNum(newBreak);
      }
      if(!isSession.current && newBreak > 0 && newBreak < 61) {      
        setSessionLength(newBreak * 60);
        (newBreak < 10)? ($('#time-left').text('0' + `${newBreak}` + ':00')): ($('#time-left').text(`${newBreak}` + ':00'));
      }
    }
  }

  const handleClickSession = (event) => {
    const operator = event.target.className;
    let newSession = (operator.includes('up')) ? (sessionNum + 1): (sessionNum - 1);
    if(sessionTimer.current === undefined) {
      if(newSession > 0 && newSession < 61){
        setSessionNum(newSession);
      }
      if(isSession.current && newSession > 0 && newSession < 61) {
        setSessionLength(newSession * 60);
        (newSession < 10)? ($('#time-left').text('0' + `${newSession}` + ':00')): ($('#time-left').text(`${newSession}` + ':00'));     
      }
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
    let newSessionLength = sessionLength;
    sessionTimer.current = setInterval(function() {
      newSessionLength -= 1; 
      setSessionLength(newSessionLength);
      if((newSessionLength) < 0 && isSession.current) {
        $('#timer-label').text('Break');
        newSessionLength = breakNum * 60;
        isSession.current = false;
      } else if(newSessionLength < 0 && !isSession.current) {
        $('#timer-label').text('Session');
        newSessionLength = sessionNum * 60;
        isSession.current = true;
      }
      
      let timerMinutes ='' + Math.floor(newSessionLength / 60);
      let timerSeconds ='' + (newSessionLength - timerMinutes * 60);
      if(timerMinutes < 10 ) {timerMinutes = '0' + timerMinutes};
      if(timerSeconds < 10 ) {timerSeconds = '0' + timerSeconds};
      if (timerMinutes == '00' && timerSeconds == '00') {
        document.getElementById('beep').play();
      };
      $('#time-left').text(`${timerMinutes}:${timerSeconds}`);
      console.log(`${timerMinutes}:${timerSeconds}`);
    }, 1000);
  }

  function clockify() {
    const SECONDS_IN_MINUTES = 60;
    let minutes = Math.floor(sessionLength / SECONDS_IN_MINUTES);
    let seconds = sessionLength - minutes * SECONDS_IN_MINUTES;

    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    return minutes + ":" + seconds;
  }

  const handleReset = () => {
    if(sessionTimer.current !== undefined) {
      clearInterval(sessionTimer.current);
      sessionTimer.current = undefined;
    }
    isSession.current = true;
    setSessionNum(25);
    setSessionLength(25 * 60);
    setBreakNum(5);
    document.getElementById('beep').currentTime = 0;
    document.getElementById('beep').pause();
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
          >{breakNum}</div>
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
            <div id="time-left" className='time-left'>{clockify()}</div>
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