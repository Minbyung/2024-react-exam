import {ThemeProvider, CssBaseline, createTheme} from "@mui/material";
import App from './App';

export default function Root() {
    // Create a theme instance.
    const theme = createTheme({
      typography: {
        fontFamily: ["GmarketSansMedium"]
      },
      palette: {
        primary: {
          main: '#5bb098',
        },
      }
    });
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    );
}