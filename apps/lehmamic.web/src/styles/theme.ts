import { lightBlue, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#206DA8',
    },
    secondary: lightBlue,
    error: {
      main: red.A400,
    },
  },
});

export default theme;
