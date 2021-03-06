import { whiten } from "@chakra-ui/theme-tools";

export const ButtonStyles = {
  baseStyle: {
    _focus: {
      boxShadow: "blackPrimary",
    },
  },
  sizes: {},
  variants: {
    fillCustom: {
      bg: "blackPrimary",
      color: "white",
      _hover: {
        bg: whiten("blackPrimary", 20),
        _disabled: {
          bg: whiten("blackPrimary", 0),
        },
      },
    },
    outlineCustom: {
      bg: "none",
      color: "blackPrimary",
      border: "2px solid",
      borderColor: "blackPrimary",
      _hover: {
        bg: whiten("blackPrimary", 90),
        _disabled: {
          bg: whiten("blackPrimary", 0),
        },
      },
    },
  },
  defaultProps: {},
};
