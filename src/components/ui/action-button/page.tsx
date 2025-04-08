import { Group, Text, Tooltip, UnstyledButton } from "@mantine/core";
import styles from "./style.module.css";

export function ActionButton({
  children,
  icon,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Tooltip label="Хандах эрхгүй байна" disabled={!disabled}>
      <UnstyledButton
        p={7}
        pr={20}
        w="100%"
        h="100%"
        disabled={disabled}
        className={disabled ? styles.disabled : styles.card}
        onClick={() => onClick && onClick()}
      >
        <Group gap={10}>
          {icon}
          <Text size="sm" fw={500} c={disabled ? "gray" : "inherit"}>
            {children}
          </Text>
        </Group>
      </UnstyledButton>
    </Tooltip>
  );
}
