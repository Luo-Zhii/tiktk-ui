import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
const cn = classNames.bind(styles);
function MenuItem({ title, icon, to, activeIcon }) {
  return (
    <NavLink
      className={(nav) => cn("menu-item", { active: nav.isActive })}
      to={to}
    >
      <span className={cn("icon")}>{icon}</span>
      <span className={cn("active-icon")}>{activeIcon}</span>
      <span className={cn("title")} data-area={title}>{title}</span>
    </NavLink>
  );
}
MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
};
export default MenuItem;
