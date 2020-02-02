import React from "react";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import { indigo, pink } from "material-ui/colors";
import { hot } from "react-hot-loader";

// Create a theme instance.
//zzJSS pattern! zzmaterial-ui - zzCSS-in-zzJS ((ℹ️ zzpp._05._y20.0129-2345))
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#7571e8",
      main: "#1f51b5",
      dark: "#002984",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff79b0",
      main: "#ff4081",
      dark: "#c60055",
      contrastText: "#000"
    },
    openTitle: indigo["400"],
    protectedTitle: pink["400"],
    type: "light"
  }
});

const App = () => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <MainRouter />
    </MuiThemeProvider>
  </BrowserRouter>
);

export default hot(module)(App);
//export default App;
