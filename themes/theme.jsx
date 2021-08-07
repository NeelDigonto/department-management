import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createTheme({
  typography: {
    htmlFontSize: 16,
    /*  fontFamily: ["Alegreya", "serif", "sans-serif"].join(","), */
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: /* "#556cd6",*/ "#ffb703",
    },
    secondary: {
      main: /* "#19857b",*/ "#219ebc",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
