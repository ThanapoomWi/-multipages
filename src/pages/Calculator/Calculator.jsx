import { React, useEffect, useState } from 'react'
import './Calculator.css'

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [lastOperator, setLastOperator] = useState(null);
  const [lastOperand, setLastOperand] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [operatorPressed, setOperatorPressed] = useState(false);
  const [equalPressed, setEqualPressed] = useState(false);

  const appendToDisplay = (value) => {
    if (displayValue === '0' || operatorPressed) {
      setDisplayValue(value);
      setOperatorPressed(false);
    } 
    else if (displayValue && equalPressed){
      setLastOperand(null)
      setLastOperator(null)
      setLastResult(null)
      setEqualPressed(false)
      setOperatorPressed(false)
      setDisplayValue(value)
    }
    else {
      setDisplayValue(displayValue + value);
    }
  };

  const handleOperator = (operator) => {
    const currentValue = parseFloat(displayValue);

    // หากมีการกด = ก่อนหน้านี้ และกด operator ใหม่
    if (equalPressed) {
      setLastResult(currentValue);  // เริ่มคำนวณใหม่จากค่าปัจจุบัน
      setLastOperand(null);
    } else if (lastResult === null) {
      setLastResult(currentValue);
    } else if (lastOperator && !operatorPressed) {
      calculateResult(); // คำนวณผลลัพธ์ก่อนเปลี่ยน operator
    }

    setLastOperator(operator);
    setLastOperand(currentValue);
    setOperatorPressed(true);
    setEqualPressed(false);
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setLastOperator(null);
    setLastOperand(null);
    setLastResult(null);
    setOperatorPressed(false);
    setEqualPressed(false);
  };

  const deleteLast = () => {
    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
      setLastResult(displayValue.slice(0,-1));
    } else {
      setDisplayValue('0');
    }
  };

  const calculateResult = () => {
    let result = lastResult;
    const currentValue = parseFloat(displayValue);

    switch (lastOperator) {
      case '+':
        result += currentValue;
        break;
      case '-':
        result -= currentValue;
        break;
      default:
        result = currentValue;
        break;
    }

    setLastResult(result);
    setDisplayValue(String(result));
    setLastOperand(currentValue);
    setOperatorPressed(false);
  };

  const handleEqual = () => {
    if (!equalPressed) {
      calculateResult();
      setEqualPressed(true);  // ตั้งค่า equalPressed ให้เป็น true หลังจากกด =
    } else {
      if (lastOperator) {
        let result = lastResult;
        switch (lastOperator) {
          case '+':
            result += lastOperand;
            break;
          case '-':
            result -= lastOperand;
            break;
          default:
            break;
        }
        setLastResult(result);
        setDisplayValue(String(result));
      }
    }
  };

  const addNumber = (e) => {
    console.log(e.key);
    if (e.key >= 0 && e.key <= 9) {
      appendToDisplay(e.key);
    } 
    else if (e.key === 'Escape') {
      clearDisplay();
    }
    else if (e.key === 'Backspace') {
      deleteLast();
    }
     else if (e.key === '+' || e.key === '=') {
      handleOperator('+');
    } 
    else if (e.key === '-') {
      handleOperator('-');
    }
     else if (e.key === 'Enter') {
      handleEqual();
    }
    console.log(e.key);
  };

  useEffect(() => {
    document.addEventListener('keydown', addNumber);
    return () => document.removeEventListener('keydown', addNumber);
  }, [displayValue, lastOperator, equalPressed]);

  return (
    <div className="Cal-container">
      <div className="calculator">
        <input type="text" id="display" value={displayValue} disabled />

        <div className="buttons-container">
          <button className='clear danger' onClick={clearDisplay}>C</button>
          <button className="del danger" onClick={deleteLast}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace" viewBox="0 0 16 16">
              <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
              <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
            </svg>
          </button>
          <button className='operand' onClick={() => appendToDisplay('9')}>9</button>
          <button className='operand' onClick={() => appendToDisplay('8')}>8</button>
          <button className='operand' onClick={() => appendToDisplay('7')}>7</button>
          <button className="ope" onClick={() => handleOperator('-')}>-</button>
          <button className='operand' onClick={() => appendToDisplay('6')}>6</button>
          <button className='operand' onClick={() => appendToDisplay('5')}>5</button>
          <button className='operand' onClick={() => appendToDisplay('4')}>4</button>
          <button className="ope" onClick={() => handleOperator('+')}>+</button>
          <button className='operand' onClick={() => appendToDisplay('3')}>3</button>
          <button className='operand' onClick={() => appendToDisplay('2')}>2</button>
          <button className='operand' onClick={() => appendToDisplay('1')}>1</button>
          <button className="ope" onClick={() => appendToDisplay('.')}>.</button>
          <button className='zero operand' onClick={() => appendToDisplay('0')}>0</button>
          <button className="ope equal" onClick={handleEqual}>=</button>
        </div>
        
      </div>
    </div>
  );
}

export default Calculator;
