import classes from "./page-filter.module.css";

export function PageFilter({ left, right }: FilterProps) {
  return (
    <div className={classes.pageFilter}>
      <div className={classes.sectionElement}>{left}</div>
      <div className={classes.sectionElement}>{right}</div>
    </div>
  );
}

type FilterProps = {
  left?: JSX.Element[] | JSX.Element;
  right?: JSX.Element[] | JSX.Element;
};
