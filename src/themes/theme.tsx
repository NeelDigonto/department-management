import { createTheme } from "@mui/material/styles";
import { red, grey } from "@mui/material/colors";
import { color } from "@mui/system";
import type {} from "@mui/lab/themeAugmentation";
import { COLORS } from "@lib/Constants";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: COLORS.OrangeYellowCrayola,
    },
    secondary: {
      main: COLORS.SandyBrown,
    },
    error: {
      main: red.A400,
    },
    //text: { primary: "", secondary: "", disabled: "" },
    /* action: {
      active: "",
      hover: "",
      selected: "",
      disabled: "",
      disabledBackground: "",
    }, */
    background: { default: COLORS.PersianGreen, paper: COLORS.Charcoal },
    divider: COLORS.SandyBrown,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },
});

export default theme;
