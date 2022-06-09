import { whiten } from "@chakra-ui/theme-tools";

export const ButtonStyles = {
  baseStyle: {
    _focus: {
      boxShadow: "orangeSecondary",
    },
  },
  sizes: {},
  variants: {
    fillCustom: {
      bg: "orangeSecondaryDarker",
      color: "white",
      _hover: {
        bg: "orangeSecondaryDarkerer",
      },
    },
    outlineCustom: {
      bg: "none",
      color: "orangeSecondaryDarker",
      border: "2px solid",
      borderColor: "orangeSecondaryDarker",
      _hover: {
        bg: whiten("orangeSecondaryLighter", 80),
      },
    },
  },
  defaultProps: {},
};