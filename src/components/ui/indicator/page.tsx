import { useEffect, useRef, useState } from "react";
import { FloatingIndicator, UnstyledButton } from "@mantine/core";
import classes from "./indicator.module.css";

export function Indicator({
  setFilters,
  data,
  value,
}: {
  data: { label: string; value: string }[];
  setFilters: (value: string) => void;
  value: string;
}) {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const controlsRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const setControlRef = (index: number) => (node: HTMLButtonElement | null) => {
    controlsRefs.current[index] = node; // `useRef` ашиглан `controlsRefs`-ийг шууд шинэчилнэ
  };

  useEffect(() => {
    const activeIndex = data.findIndex((item) => item.value === value);
    if (activeIndex !== -1) {
      setActive(activeIndex);
    } else {
      setActive(0);
    }
  }, [value, data]);

  const controls = data.map((item, index) => (
    <UnstyledButton
      key={item.value}
      className={classes.control}
      ref={setControlRef(index)}
      onClick={() => {
        setActive(index);
        setFilters(item.value);
      }}
      mod={{ active: active === index }}
    >
      <span className={classes.controlLabel}>{item.label}</span>
    </UnstyledButton>
  ));

  return (
    <div className={classes.root} ref={rootRef}>
      {controls}
      <FloatingIndicator
        target={controlsRefs.current[active]}
        parent={rootRef.current}
        className={classes.indicator}
      />
    </div>
  );
}
