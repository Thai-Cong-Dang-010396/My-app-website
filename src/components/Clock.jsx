import React from 'react'

import '../css/Clock.css';

const Clock = () => {
  return (
    <div className='app--25-5Clock'>
      <div className='main-title'></div>
      <div className='length-control'>
        <div id='break-label'>Break Length</div>
      </div>
      <div className='length-control'>
        <div id='session-label'>Session Length</div>
      </div>
      <div className='timer' style={{color: "white;"}}>
        <div className='timer-wrapper'></div>
      </div>
      <div className='timer-control'>    
      </div>
    </div>
  )
}

export default Clock