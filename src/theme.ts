"use client";

import { createTheme, Modal } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "brand",
  colors: {
    brand: [
      "#f2fbf3",
      "#e1f7e4",
      "#c4eecb",
      "#95e0a3",
      "#5fc973",
      "#3aad4f",
      "#2f9e44",
      "#247133",
      "#215a2d",
      "#1d4a27",
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
