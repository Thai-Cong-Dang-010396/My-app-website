import React from 'react'

import '../css/Clock.css';

const Clock = () => {
  return (
    <div className='app--25-5Clock'>
      <div className='main-title'>25 + 5 Clock</div>

      <div className='length-control'>
        <div id='break-label'>Break Length</div>
        <button 
          className='btn-level'
          id='break-decrement'
          value='-'
        >
          <i className='fa fa-arrow-down fa-2x'></i>
        </button>
        <div 
          className='btn-level'
          id='break-length'
        >
          5
        </div>
        <button
          className='btn-level'
          id='break-increment'
          value='+'
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
        >
          <i className="fa fa-arrow-down fa-2x"></i>
        </button>
        <div className="btn-level" id="session-length">25</div>
        <button className="btn-level" id="session-increment" value="+">
          <i className="fa fa-arrow-up fa-2x"></i>
        </button>
      </div>

      <div className="timer" style={{color:" white;"}}>
        <div className="timer-wrapper">
          <div id="timer-label">Session</div>
          <div id="time-left">25:00</div>
        </div>
      </div>
      
      <div className="timer-control">
        <button id="start_stop">
          <i className="fa fa-play fa-2x"></i>
          <i className="fa fa-pause fa-2x"></i>
        </button>
        <button id="reset">
          <i className="fa fa-refresh fa-2x"></i>
        </button>
      </div>
    </div>
  )
}

export default Clock