import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button, BoxStyles as Box } from "./chakraComponents";

const theme = extendTheme({
  fonts: {
    heading: "Open Sans",
    body: "Open Sans",
  },
  colors: {
    blackPrimary: "#1A191B",
  },
  components: {
    Button,
    Box,
  },
});

export default theme;
