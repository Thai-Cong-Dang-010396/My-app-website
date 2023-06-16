import React, { useState, useRef, useEffect } from 'react'
import '../css/Clock.css';

const accurateInterval = function(fn, time) {
  let cancel, nextAt, timeout, wrapper;
  nextAt = new Date().getTime() + time;
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
  const [timer, setTimer] = useState(25 * 60);
  const [started, setStarted] = useState(false);
  const [isSession, setIsSession] = useState(true);

  useEffect(() => {
    if (started) {
      const interval = accurateInterval(countDown, 1000);

      return function cleanup() {
        interval.cancel();
      }
    }
  }, [started]);

  useEffect(() => {
    console.log(isSession)
    setTimer((!isSession ? breakNum : sessionNum) * 60);
  }, [isSession])

  const handleClickBreak = (event) => {
    const operator = event.target.className;
    let newBreak = (operator.includes('up')) ? (breakNum + 1): (breakNum - 1);

    if(!started) {
      if(newBreak > 0 && newBreak < 61) {
        setBreakNum(newBreak);
      }
      if(!isSession && newBreak > 0 && newBreak < 61) {      
        setTimer(newBreak * 60);
      }
    }
  }

  const handleClickSession = (event) => {
    const operator = event.target.className;
    let newSession = (operator.includes('up')) ? (sessionNum + 1): (sessionNum - 1);

    if(!started) {
      if(newSession > 0 && newSession < 61){
        setSessionNum(newSession);
      }
      if(isSession && newSession > 0 && newSession < 61) {
        setTimer(newSession * 60);
      }
    }
  }

  const handleStartStop = () => {
    setStarted((started) => !started);
  }

  function countDown() {
    setTimer((preTimer) => {
      if (preTimer > 0) {
        return preTimer - 1;
      } else if (preTimer === 0) {
        setIsSession(!isSession);
        
        return preTimer;
      } else {
        throw Error(`Timer ${preTimer} should not happen`);
      }
    });
  }

  function clockify() {
    const SECONDS_IN_MINUTES = 60;
    let minutes = Math.floor(timer / SECONDS_IN_MINUTES);
    let seconds = timer - minutes * SECONDS_IN_MINUTES;

    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    if (minutes == '00' && seconds == '00') {
        document.getElementById('beep').play();
      };

    return minutes + ":" + seconds;
  }

  const handleReset = () => {
    document.getElementById('beep').currentTime = 0;
    document.getElementById('beep').pause();

    setIsSession(true);
    setSessionNum(25);
    setBreakNum(5);
    setTimer(25 * 60);
    setStarted(false);
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
          {/* <div className="timer-wrapper"> */}
            <div id="timer-label">{isSession ? "Session" : "Break"}</div>
            <div id="time-left">{clockify()}</div>
          {/* </div> */}
        </div>
        
        <div className="timer-control">
          <button id="start_stop" style={{border: "none"}} onClick={handleStartStop}>
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