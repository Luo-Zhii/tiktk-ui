/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const cn = classNames.bind(styles);

function Button({
  to,
  href,
  types,
  size,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  ...passProps
}) {
  let Component = "button";
  const props = {
    onClick,
    ...passProps,
  };
  // Remove event listener when btn is disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Component = Link;
  } else if (href) {
    props.href = href;
    Component = "a";
  }
  const classes = cn("wrapper", types, size, { disabled });
  return (
    <Component className={classes} {...props}>
      {leftIcon && <span className={cn("icon")}>{leftIcon}</span>}
      <span className={cn("title")}>{children}</span>
      {rightIcon && <span className={cn("icon")}>{rightIcon}</span>}
    </Component>
  );
}

export default Button;
