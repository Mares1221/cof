import { Button, Tooltip } from "@mantine/core";

export function ActionButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Tooltip label="Хандах эрхгүй байна" disabled={!disabled}>
      <Button
        p={7}
        disabled={disabled}
        onClick={() => onClick && onClick()}
        variant="default"
      >
        {children}
      </Button>
    </Tooltip>
  );
}
