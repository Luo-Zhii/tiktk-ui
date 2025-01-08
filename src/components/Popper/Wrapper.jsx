import PropTypes from "prop-types";

import classNames from "classnames/bind";
import styles from "./Popper.module.scss";
const cn = classNames.bind(styles);
// eslint-disable-next-line react/prop-types
function Wrapper({ children }) {
  return <div className={cn("popper-wrapper")}>{children}</div>;
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Wrapper;
