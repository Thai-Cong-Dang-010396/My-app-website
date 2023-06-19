import React, {useState, useEffect} from 'react'

import '../css/JavaScriptCalculator.css'

const JavaScriptCalculator = () => {
  const [display, setDisplay] = useState('0')

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
      value: '*'
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
    }, {
      id: 'equals',
      value: '='
    }
  ];
  const arrOperator = ['+', '-',  '*', '/'];
  
  const handleNumber = (event) => {
    const number = event.target.value;
    console.log(number);
    (number === 'AC') ? setDisplay('0') : (
      (display === '0') ? setDisplay(number) : setDisplay(display + number));
    
  }

  const handleOperator = (event) => {
    const operator = event.target.value;
    setDisplay(display + ' ' + operator + ' ');
  }

  const handleEqual = () => {
    setDisplay(eval(display));
  }

  return (
    <div className='app-JavaScripCalculator'>
      <div className='calculator'>
        <div>
          <div className='formulaScreen'></div>
          <div style={{width: "240px", textAlign:"right"}}>
            <div id='display'>{display}</div>
          </div>
        </div>
        <div className='butCalculator'>
          {butCalculators.map((butCalculator) => (
            <button 
              key={butCalculator.value}
              id={butCalculator.id} 
              value={butCalculator.value}
              onClick={
                (butCalculator.value === '=') ? handleEqual : (
                  (arrOperator.indexOf(butCalculator.value) === -1) ? handleNumber: handleOperator)                 
              }
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