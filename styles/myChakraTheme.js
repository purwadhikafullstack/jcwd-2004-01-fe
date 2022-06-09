import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button, BoxStyles as Box } from "./chakraComponents";

const theme = extendTheme({
  colors: {
    primary: "#845EC2",
    orangePrimary: "#EE4D2D",
    orangePrimaryDarker: "#B40C00",
    orangePrimaryLighter: "#ff8059",
    orangeSecondary: "#ff6d00",
    orangeSecondaryDarker: "#c43c00",
    orangeSecondaryDarkerer: "#912C00",
    orangeSecondaryLighter: "#ff9e40",
  },
  components: {
    Button,
    Box,
  },
});

export default theme;