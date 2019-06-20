import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      text: {
        background: 'linear-gradient(45deg, #001064 30%, #283593 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 20px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
});

function CoolButton({onClick, text}) {
  return (
    <ThemeProvider theme={theme}>
      <Button onClick={onClick}>{text}</Button>
    </ThemeProvider>
  );
}

export default CoolButton;