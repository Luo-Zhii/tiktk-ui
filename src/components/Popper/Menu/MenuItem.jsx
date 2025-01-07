/* eslint-disable react/prop-types */
import Button from "../../Button";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
const cn = classNames.bind(styles);

function MenuItem({ data, onClick }) {
  const classes = cn("menu-item", { separate: data.separate });
  return (
    <Button
      className={classes}
      leftIcon={data.icon}
      to={data.to}
      onClick={onClick}
    >
      {data.title}
    </Button>
  );
}

export default MenuItem;
