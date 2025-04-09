"use client";

import { createTheme, Modal } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "brand",
  colors: {
    brand: [
      "#141414",
      "#141414",
      "#141414",
      "#141414",
      "#141414",
      "#141414",
      "#141414",
      "#141414",
      "#141414",
      "#141414",
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
