//Calculator.tsx


import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const calculateResult = () => {
    try {
      const sanitizedInput = input.replace(/[^-()\d/*+.]/g, ''); // Sadece güvenli karakterlere izin ver
      setResult(Function(`'use strict'; return (${sanitizedInput});`)().toString());
    } catch (error) {
      setResult('Hata');
    }
  };
  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      calculateResult(); 
    } else if (value === 'C') {
      clearInput();
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <input type="text" value={input} readOnly />
        <span>{result}</span>
      </div>
      <div className="buttons">
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button onClick={() => handleButtonClick('+')}>+</button>
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button onClick={() => handleButtonClick('-')}>-</button>
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button onClick={() => handleButtonClick('*')}>*</button>
        <button onClick={() => handleButtonClick('C')}>C</button>
        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('=')}>=</button>
        <button onClick={() => handleButtonClick('/')}>/</button>
      </div>
    </div>
  );
};

export default Calculator;