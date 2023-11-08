//Button.tsx

import React from 'react';
import { Button, Grid, styled } from "@mui/material";

interface StyledButtonProps {
  selected: boolean;
}

const StyledDigitButton = styled(Button)<StyledButtonProps>(({ selected }) => ({
  borderColor: selected ? "#fff" : "rgba(255, 241, 73, 0.5)",
}));

interface GridDigitButtonProps { 
  digit: string;
  selected: boolean;
  enterDigit: (digit: string) => void;
  xs?: number;
}

export const GridDigitButton: React.FC<GridDigitButtonProps> = ({ digit, selected, enterDigit, xs = 3 }) => {
  return (
    <Grid item xs={xs}>
      <StyledDigitButton
        fullWidth
        variant="outlined"
        selected={selected}
        onClick={() => enterDigit(digit)}
      >
        {digit}
      </StyledDigitButton>
    </Grid>
  );
}

const StyledOperationButton = styled(Button)<StyledButtonProps>(({ selected }) => ({
  borderColor: selected ? "#fff" : "rgba(255, 241, 73, 0.5)",
  backgroundColor: selected ? "rgb(254,241,73,.1)" : "inherit",
}));

interface GridOperationButtonProps { 
  selectedOperation: string;
  operation: string;
  selectOperation: (operation: string) => void;
  xs?: number;
}

export const GridOperationButton: React.FC<GridOperationButtonProps> = ({ selectedOperation, operation, selectOperation, xs = 3 }) => {
  const selected = selectedOperation === operation;

  return (
    <Grid item xs={xs}>
      <StyledOperationButton
        fullWidth
        variant="outlined"
        selected={selected}
        onClick={() => selectOperation(operation)}
      >
        {operation}
      </StyledOperationButton>
    </Grid>
  );
}
