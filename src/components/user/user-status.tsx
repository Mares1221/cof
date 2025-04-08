"use client";

import { Badge } from "@mantine/core";
import React from "react";

export default function UserStatus({ isActive }: { isActive: boolean }) {
  if (isActive) {
    return (
      <Badge color="green" p={4} radius={4} variant="light">
        Идэвхтэй
      </Badge>
    );
  }

  return (
    <Badge color="gray" p={4} radius={4} variant="light">
      Идэвхгүй
    </Badge>
  );
}
