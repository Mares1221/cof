import {
  Box,
  Collapse,
  Group,
  rem,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import classes from "./navbar-link-group.module.css";
import clsx from "clsx";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  link?: string;
  opened: any;
  toggle: any;
  isAvatar?: boolean;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
  opened,
  isAvatar,
  toggle,
}: LinksGroupProps) {
  const [open, setOpened] = useState(initiallyOpened || false);
  const hasLinks = Array.isArray(links);
  const pathname = usePathname();
  const router = useRouter();
  const items = (hasLinks ? links : []).map((link, index) => (
    <Link
      href={link.link}
      key={index}
      className={classes.active}
      onClick={() => {
        if (open && link?.link !== pathname) {
          toggle();
        }
      }}
    >
      <Text
        className={classes.link}
        key={link.label}
        style={{
          background:
            link.link === `/${pathname.split("/")[1]}` ? "#d3f9d8" : "",
        }}
      >
        {link.label}
      </Text>
    </Link>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => {
          link ? router.push(link) : setOpened((o) => !o);
        }}
        className={clsx(
          classes.control,
          link === pathname && classes.activeControl,
        )}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(20), height: rem(20) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: open ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={open}>{items}</Collapse> : null}
    </>
  );
}
