import { usePermission } from "@/hooks/use-permission";
import { Group, ScrollArea, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBuilding,
  IconChartBar,
  IconDoor,
  IconHome,
  IconScale,
  IconUser,
} from "@tabler/icons-react";
import { LinksGroup } from "./navbar-link-group";
import classes from "./navbar.module.css";
import { UserButton } from "./user-button";

export function Navbar({ opened, toggle }: any) {
  const isHeader = useMediaQuery("(max-width: 1200px)");
  const PERMISSIONS = {
    DASHBOARD: "DASHBOARD",
    ROLE: "ROLE",
    COMPLEX: "COMPLEX",
    BUILDING: "BUILDING",
    ENTRANCE: "ENTRANCE",
    STAFF: "STAFF",
  } as const;

  const { checkPermission } = usePermission();

  const hasReadPermission = (code: string) =>
    checkPermission(code, true, false, false, false);

  const permissions = {
    dashboard: hasReadPermission(PERMISSIONS.DASHBOARD),
    role: hasReadPermission(PERMISSIONS.ROLE),
    complex: hasReadPermission(PERMISSIONS.ROLE),
    building: hasReadPermission(PERMISSIONS.ROLE),
    entrance: hasReadPermission(PERMISSIONS.ROLE),
    staff: hasReadPermission(PERMISSIONS.ROLE),
  };

  const menuConfig = [
    {
      label: "Хянах самбар",
      icon: IconChartBar,
      link: "/",
      initiallyOpened: true,
      condition: permissions.dashboard,
    },
    {
      label: "Хотхон",
      icon: IconBuilding,
      link: "/complex",
      initiallyOpened: true,
      condition: permissions.complex,
    },
    {
      label: "Байр",
      icon: IconHome,
      link: "/building",
      initiallyOpened: true,
      condition: permissions.building,
    },
    {
      label: "Орц",
      icon: IconDoor,
      link: "/entrance",
      initiallyOpened: true,
      condition: permissions.entrance,
    },
    {
      label: "Зар",
      icon: IconScale,
      link: "/ad",
      initiallyOpened: true,
      condition: permissions.entrance,
    },
    {
      label: "Ажилтан",
      icon: IconUser,
      link: "/staff",
      initiallyOpened: true,
      condition: permissions.staff,
    },
  ];
  const links = menuConfig.map((item, index) => (
    <LinksGroup {...item} key={index} opened={opened} toggle={toggle} />
  ));

  return (
    <nav className={classes.navbar}>
      {!isHeader && (
        <div className={classes.header}>
          <Group gap="xs">
            <Text fw={600} size="25px">
              interlock
            </Text>
          </Group>
        </div>
      )}
      <ScrollArea
        className={classes.links}
        style={{ marginTop: isHeader ? undefined : "10px" }}
      >
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}
