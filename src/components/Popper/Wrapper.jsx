import classNames from "classnames/bind";
import styles from "./Popper.module.scss";
const cn = classNames.bind(styles);
// eslint-disable-next-line react/prop-types
function Wrapper({ children, className }) {
  return <div className={(cn("wrapper"), className)}>{children}</div>;
}
export default Wrapper;
