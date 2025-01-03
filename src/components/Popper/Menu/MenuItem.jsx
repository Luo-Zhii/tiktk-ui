/* eslint-disable react/prop-types */
import Button from "../../Layouts/components/Button";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
const cn = classNames.bind(styles);

function MenuItem({ data }) {
  return (
    <Button className={cn("menu-item")} leftIcon={data.icon} to={data.to}>
      {data.title}
    </Button>
  );
}

export default MenuItem;
