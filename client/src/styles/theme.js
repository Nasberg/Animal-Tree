import React from "react";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { indigo, deepPurple, red } from "@material-ui/core/colors";

let theme = createMuiTheme({
  palette: {
    background: {
      default: "#fafafa",
    },
    primary: {
      main: indigo[900],
      dark: "#000051",
      light: "#534bae",
    },
    secondary: {
      main: red["A400"],
      dark: "#c4001d",
      light: "#ff616f",
    },
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: "1.5rem",
      },
    },
    MuiInputBase: {
      root: {
        outline: "none",
        backgroundColor: "white",
      },
    },
    MuiTabs: {
      indicator: {
        width: 4,
        height: 4,
      },
    },
    MuiTab: {
      textColorSecondary: {
        color: "white",
      },
    },
    MuiTypography: {
      colorTextSecondary: {
        color: "white",
      },
    },
    MuiButton: {
      root: {
        borderRadius: "1.5rem",
      },
      textPrimary: {
        color: "white",
        "&:disabled": {
          color: "white",
          opacity: ".68",
        },
      },
      outlinedPrimary: {
        color: "white",
        borderColor: "white",
      },
    },
    MuiIconButton: {
      colorInherit: {
        color: "white",
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: red["A400"],
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
