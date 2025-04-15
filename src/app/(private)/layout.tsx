"use client";

import { Logo } from "@/components/layout/navbar/logo";
import { Navbar } from "@/components/layout/navbar/navbar";
import { UserButton } from "@/components/layout/navbar/user-button";
import AdminProvider from "@/providers/init";
import { AppShell, Burger, Group, rem } from "@mantine/core";
import "@mantine/dates/styles.css";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import React from "react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isHeader = useMediaQuery("(max-width: 1200px)");
  const [opened, { toggle }] = useDisclosure();

  return (
    <AdminProvider>
      <AppShell
        navbar={{
          width: 270,
          breakpoint: "lg",
          collapsed: { mobile: !opened },
        }}
        header={{ height: isHeader ? 70 : 0 }}
        className="navigation"
      >
        {isHeader && (
          <AppShell.Header
            style={{ borderBottom: "2px  solid rgb(200, 2, 2)" }}
          >
            <Group justify="space-between" align="center" mx="4px">
              <div style={{ marginLeft: "10px" }}>
                <Group align="center" justify="center">
                  <Burger opened={opened} onClick={toggle} size="md" />
                  <Logo style={{ width: rem(120) }} />
                </Group>
              </div>
              <div>
                <UserButton />
              </div>
            </Group>
          </AppShell.Header>
        )}
        <AppShell.Navbar>
          <Navbar opened={opened} toggle={() => toggle()} />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </AdminProvider>
  );
}
