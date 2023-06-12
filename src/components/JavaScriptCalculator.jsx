import React from 'react'

import '../css/JavaScriptCalculator.css'

const JavaScriptCalculator = () => {

  const butCalculators = [
    {
      id: 'clear',
      value: 'AC'
    }, 
    {
      id: 'divide',
      value: '/'
    }, 
    {
      id: 'multiply',
      value: 'x'
    },
    {
      id: 'seven',
      value: '7'
    },
    {
      id: 'eight',
      value: '8'
    },
    {
      id: 'nine',
      value: '9'
    },
    {
      id: 'subtract',
      value: '-'
    },
    {
      id: 'four',
      value: '4'
    },
    {
      id: 'five',
      value: '5'
    },
    {
      id: 'six',
      value: '6'
    },
    {
      id: 'add',
      value: '+'
    },
    {
      id: 'one',
      value: '1'
    },
    {
      id: 'two',
      value: '2'
    },
    {
      id: 'three',
      value: '3'
    },
    {
      id: 'zero',
      value: '0'
    },
    {
      id: 'decimal',
      value: '.'
    },
    {
      id: 'equals',
      value: '='
    }
  ];

  return (
    <div className='app-JavaScripCalculator'>
      <div className='calculator'>
        <div className='formulaScreen'></div>
        <div id='display'></div>
        <div className='butCalculator'>
          {butCalculators.map((butCalculator) => (
            <button 
              id={butCalculator.id} 
              value={butCalculator.value}
              style={{
                background: "rgb(102, 102, 102)"
              }}
            >
              {butCalculator.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JavaScriptCalculator