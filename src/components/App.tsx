import React, { useReducer } from 'react';
import { Button, Container, Grid, Paper, styled } from '@mui/material';
import { GridDigitButton, GridOperationButton} from './Button';

const OutputContainer = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'right',
  height: '2em',
  padding: theme.spacing(2),
  fontSize: '3em',
  overflow: 'hidden',
}));

const CalculatorBase = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  borderRadius: 15,
}));

type CalculatorState = {
  prevValue: string;
  currentValue: string;
  operation: string;
  overwrite: boolean;
};

type CalculatorAction =
  | { type: 'SET_PREV_VALUE'; payload: string }
  | { type: 'SET_CURRENT_VALUE'; payload: string }
  | { type: 'SET_OPERATION'; payload: string }
  | { type: 'SET_OVERWRITE'; payload: boolean }
  | { type: 'DEL' }
  | { type: 'PERCENT' }
  | { type: 'EQUALS' }
  | { type: 'SET_DIGIT'; payload: { digit: string } };
  
const initialState = {
  prevValue: '',
  currentValue: '0',
  operation: '',
  overwrite: true,
};

const reducer = (state: CalculatorState, action: CalculatorAction) => {
  switch (action.type) {
    case 'SET_PREV_VALUE':
      return { ...state, prevValue: action.payload };
    case 'SET_CURRENT_VALUE':
      return { ...state, currentValue: action.payload };
    case 'SET_OPERATION':
      return { ...state, operation: action.payload };
    case 'SET_OVERWRITE':
      return { ...state, overwrite: action.payload };
    case 'DEL':
      return { ...state, currentValue: '0', overwrite: true };
    case 'PERCENT':
      return { ...state, currentValue: (parseFloat(state.currentValue) / 100).toString() };
    case 'EQUALS':
      const val = calculate(state);
      return { ...initialState, currentValue: `${val}` };
    case 'SET_DIGIT':
      const { digit } = action.payload;
      if (state.currentValue[0] === '0' && digit === '0') return state;
      if (state.currentValue.includes('.') && digit === '.') return state;
      if (state.overwrite && digit !== '.') {
        return { ...state, currentValue: digit, overwrite: false };
      } else {
        return { ...state, currentValue: `${state.currentValue}${digit}`, overwrite: false };
      }
    default:
      return state;
  }
};

const calculate = (state: { prevValue: any; currentValue: any; operation: any; }) => {
  const { prevValue, currentValue, operation } = state;
  if (!prevValue || !operation) return parseFloat(currentValue);

  const curr = parseFloat(currentValue);
  const prev = parseFloat(prevValue);

  let result = 0;
  switch (operation) {
    case '÷':
      result = prev / curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '+':
      result = prev + curr;
      break;
  }
  return result;
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const equals = () => {
    dispatch({ type: 'EQUALS' });
  };

  const del = () => {
    dispatch({ type: 'DEL' });
  };

  const percent = () => {
    dispatch({ type: 'PERCENT' });
  };

  const selectOperation = (x: any) => {
    if (state.prevValue) {
      const val = calculate(state);
      dispatch({ type: 'SET_CURRENT_VALUE', payload: `${val}` });
      dispatch({ type: 'SET_PREV_VALUE', payload: `${val}` });
    } else {
      dispatch({ type: 'SET_PREV_VALUE', payload: state.currentValue });
    }
    dispatch({ type: 'SET_OPERATION', payload: x });
    dispatch({ type: 'SET_OVERWRITE', payload: true });
  };

  const setDigit = (digit: any) => {
    dispatch({ type: 'SET_DIGIT', payload: { digit } });
  };

  return (
    <Container maxWidth="sm">
      <CalculatorBase elevation={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <OutputContainer data-testid="output">
              {state.currentValue}
            </OutputContainer>
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridOperationButton operation={'C'} selectOperation={del} selectedOperation={state.operation} />
            <GridOperationButton operation={'%'} selectOperation={percent} selectedOperation={state.operation} />
            <GridOperationButton operation={'÷'} selectOperation={selectOperation} selectedOperation={state.operation} />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={'7'} enterDigit={setDigit} selected={false} />
            <GridDigitButton digit={'8'} enterDigit={setDigit} selected={false} />
            <GridDigitButton digit={'9'} enterDigit={setDigit} selected={false} />
            <GridOperationButton operation={'*'} selectOperation={selectOperation} selectedOperation={state.operation} />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={'4'} enterDigit={setDigit} selected={false} />
            <GridDigitButton digit={'5'} enterDigit={setDigit} selected={false} />
            <GridDigitButton digit={'6'} enterDigit={setDigit} selected={false} />
            <GridOperationButton operation={'-'} selectOperation={selectOperation} selectedOperation={state.operation} />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={'1'} enterDigit={setDigit} selected={false} />
            <GridDigitButton digit={'2'} enterDigit={setDigit} selected={false} />
            <GridDigitButton digit={'3'} enterDigit={setDigit} selected={false} />
            <GridOperationButton operation={'+'} selectOperation={selectOperation} selectedOperation={state.operation} />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton xs={6} digit={'0'} enterDigit={setDigit} selected={false} />
            <GridDigitButton digit={'.'} enterDigit={setDigit} selected={false} />
            <Grid item xs={3}>
              <Button fullWidth variant="contained" onClick={equals}>
                =
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CalculatorBase>
    </Container>
  );
}

export default App;
