import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  links: {
    default: '#1478a6',
    hover: '#126991',
  },
  typography: {
    fontFamily: [
      'Lato'
    ],
    fontSize: 16
  }
});

export default theme;
