"use client";

import { createTheme, Modal } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "brand",
  colors: {
    brand: [
      "#e7f5ff",
      "#d0ebff",
      "#a5d8ff",
      "#74c0fc",
      "#4dabf7",
      "#339af0",
      "#228be6",
      "#1c7ed6",
      "#1971c2",
      "#1864ab",
    ],
  },
  components: {
    Modal: Modal.extend({
      defaultProps: {
        radius: "6px",
      },
      styles: {
        title: {
          fontWeight: 600,
          fontSize: 20,
          padding: "8px 0",
        },
      },
    }),
  },
});
