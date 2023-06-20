import React, {useState, useEffect} from 'react'

import '../css/JavaScriptCalculator.css'

const JavaScriptCalculator = () => {
  const [display, setDisplay] = useState('')
  const [valuePress, setValuePress] = useState('0')

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
    const indexLastOperator = display.toString().lastIndexOf(' ');
    const lastTermNumber = (indexLastOperator === -1) ? display : display.toString().slice(indexLastOperator);

    if(number === 'AC') {
      setValuePress('0')
      return setDisplay('')
    };
    
    if(number === '.' && display.endsWith('.')) {
      return;
    } else if(number === '.' && lastTermNumber.includes('.')) {
      return;
    };

    if(display === '0') {
      setDisplay(number)
    }else {
      setDisplay(display + number)
    }; 
    setValuePress(number)

  }

  const handleOperator = (event) => {
    const operator = event.target.value;
    setValuePress(operator)
    setDisplay(display + ' ' + operator + ' ');
  }

  const handleEqual = () => {
    if(display.toString().includes('=')) {
      setValuePress((preValuePress) => {
        setDisplay(preValuePress)
      })
      return;
    }
    const resutls = eval(display);
    setValuePress(resutls);
    setDisplay(preDisplay => preDisplay + ' = ' + resutls)
  }

  return (
    <div className='app-JavaScripCalculator'>
      <div className='calculator'>
        <div>
          <div className='formulaScreen' style={{width: "240px", textAlign:"right"}}>
            <div>{display}</div>
          </div>
          <div style={{width: "240px", textAlign:"right"}}>
            <div id='display'>{valuePress}</div>
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