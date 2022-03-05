import logo from './logo.svg';
import './App.css';
import { useReducer } from 'react';
import DigitButtion from './components/DigitButton';
import OperationButtion from './components/OperationButton';


export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit'
}

//reducer takes 2 param, state and action but can break action into {type, payload}
function reducer(state, {type, payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === '0' && state.currentOperand === '0'){
        return state
      }
      if (payload.digit === '.' && state.currentOperand.includes('.')){
        return state
      }
      return {
        ...state, 
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand === null && state.previousOperand === null){
          return state
      }
      if (state.previousOperand === null){
        return {
          ...state, 
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      return{
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null     
      }
    
    case ACTIONS.CLEAR:
      return {}
  
}

function evaluate({ currentOperand, previousOperand, operation}){
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ''
  let computation = ''
  switch (operation){
    case '+':
      computation = prev + current
      break
    case '-':
      computation = prev - current
      break
    case '*':
      computation = prev * current
      break
    case '÷':
      computation = prev / current
      break
  }

  return computation.toString()
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
