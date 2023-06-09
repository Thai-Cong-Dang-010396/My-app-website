import React, { useState, useRef, useEffect } from 'react'
import '../css/Clock.scss';

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
    const DEFAULT_BREAK_LENGTH = 5;
    const DEFAULT_SESSION_LENGTH = 25;

    const [started, setStarted] = useState(false);

    const [breakLength, setBreakLength] = useState(DEFAULT_BREAK_LENGTH);
    const [sessionLength, setSessionLength] = useState(DEFAULT_SESSION_LENGTH);

    const [activeClock, setActiveClock] = useState("S");

    const [reset, setReset] = useState(0);

  return (
    <div id='app-clock'>
        <div className='clock'>
            <div className='title'>25 + 5 Clock</div>
            <div className='length-setters'>
                <LengthSetter
                    type='break'
                    disabled={started}
                    label='Break Length'
                    length={breakLength}
                    setter={setBreakLength}
                />
                <LengthSetter
                    type='session'
                    disabled={started}
                    label='Session Length'
                    length={sessionLength}
                    setter={setSessionLength}
                />
            </div>
            <Display
                {...{
                    started,
                    reset,
                    activeClock,
                    setActiveClock,
                    breakLength,
                    sessionLength
                }}
            />
            <Controls 
                {...{setStarted, onReset: handleReset}}
            />
            <p></p>
        </div>
    </div>
  );

  function handleReset() {
    document.getElementById('beep').currentTime = 0;
    document.getElementById('beep').pause();
    setBreakLength(DEFAULT_BREAK_LENGTH);
    setSessionLength(DEFAULT_SESSION_LENGTH);
    setActiveClock("S");
    setReset(reset + 1);
    setStarted(false);
  };
}

function LengthSetter({ type, label, length, setter, disabled }) {
    const labelId = type + "-label";
    const decrementId = type + "-decrement";
    const incrementId = type + "-increment";
    const lengthId = type + "-length";

    return (
        <div className='length-setter'>
            <div id={labelId} className='label'>{label}</div>    
            <button id={decrementId}
                onClick={decrement}
            >
                <i className='fa fa-arrow-down fa-2x'></i>
            </button>
            <span id={lengthId}>{length}</span>
            <button id={incrementId}
                onClick={increment}
            >
                <i className='fa fa-arrow-up fa-2x'></i>
            </button>
        </div>
    );

    function decrement() {
        if (disabled) {
            return;
        }

        if (length > 1) {
            setter(length -1);
        }
    }

    function increment() {
        if (disabled) {
            return;
        }

        if (length < 60) {
            setter(length + 1);
        }
    }
}

function Display({
    started,
    reset,
    activeClock,
    setActiveClock,
    sessionLength,
    breakLength
}) {
    const audioRef = useRef();

    const [timer, setTimer] = useState(
        (activeClock === "S" ? sessionLength :
         breakLength) * 60
    );

    useEffect(() => {
        if (started) {
            const interval = accurateInterval(countDown, 1000);

            return function cleanup() {
                interval.cancel();
            };
        }
    }, [started]);

    useEffect(() => {
        setTimer(sessionLength * 60);
    }, [sessionLength]);

    useEffect(() => {
        setTimer((activeClock === "S" ?
        sessionLength : breakLength) * 60);
    }, [activeClock]);

    useEffect(() => {
        const audioEl = audioRef.current;
        audioEl.pause();
        audioEl.current = 0;
    }, [reset]);

    return (
        <div className="display">
            <div id='timer-label'>
                {activeClock === "S" ? "Session" : "Break"}
            </div>
            <div id='time-left' className='time-left'>
                {clockify()}
            </div>
            <audio 
          id="beep" 
          preload="auto" 
          ref={audioRef}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            >
            </audio>
        </div>
    );

    function countDown() {
        setTimer((preTimer) => {
            if (preTimer > 0) {
                return preTimer - 1;
            } else if (preTimer === 0) {
                setActiveClock((ac) => (ac === "S" ? "B" : "S"));
                const audioEl = audioRef.current;
                audioEl.play();
                
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

        return minutes + ":" + seconds;
    }
}

function Controls({ setStarted, onReset }) {
    return (
        <div className='controls'>
            <button
                id='start_stop'
                className='start-stop'
                onClick={handleStartStop}
            >
                <i className="fa fa-play fa-2x"></i>
                <i className="fa fa-pause fa-2x"></i>
            </button>
            <button id="reset" className='reset' onClick={onReset}>
                <i className="fa fa-refresh fa-2x"></i>
            </button>
        </div>
    );

    function handleStartStop() {
        setStarted((started) => !started);
    }
}

export default Clock