import React, { useState, useEffect} from 'react'

import '../css/DrumMachine.css'

const DrumMachine = () => {
    const [activeKey, setActiveKey] = useState('')

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            playSound(event.key.toUpperCase())
        });

    }, [])

    const drumPads = [
        {
          keyCode: 81,
          name: "Heater-1",
          text: "Q",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
        },
        {
          keyCode: 87,
          name: "Heater-2",
          text: "W",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
        },
        {
          keyCode: 69,
          name: "Heater-3",
          text: "E",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
        },
        {
          keyCode: 65,
          name: "Heater-4",
          text: "A",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
        },
        {
          keyCode: 83,
          name: "Clap",
          text: "S",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
        },
        {
          keyCode: 68,
          name: "Open-HH",
          text: "D",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
        },
        {
          keyCode: 90,
          name: "Kick-n'-Hat",
          text: "Z",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
        },
        {
          keyCode: 88,
          name: "Kick",
          text: "X",
          src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
        },
        {
          keyCode: 67,
          name: "Closed-HH",
          text: "C",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
        }
      ];

    const playSound = (selector) => {
        const audio = document.getElementById(selector);
        (audio !== null) ? (audio.play() && setActiveKey(selector)): console.warn('Selector not valid');
    }

  return (
    <div className='App-drum'>
        <div id='drum-machine'>
            <div className='pad-bank'>
                {drumPads.map((drumPad) => (
                <div className='drum-pad' 
                    id={drumPad.name}
                    key={drumPad.name}
                    onClick={() => {
                        playSound(drumPad.text);
                    }}
                >
                    {drumPad.text}
                    <audio className='clip' id={drumPad.text} src={drumPad.src}></audio>
                </div>
                ))}   
            </div>
            <div className='controls-container'>
                <div id='display'>{activeKey}</div>
            </div>
        </div>
    </div>
  )
}

export default DrumMachine